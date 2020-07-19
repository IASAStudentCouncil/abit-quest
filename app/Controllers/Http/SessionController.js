'use strict'

const User = use("App/Models/User")
const Env = use('Env')
const chance = require('chance')()

class SessionController {
  async create ({ view, ally }) {
    const telegramBot = Env.get('TELEGRAM_BOT')
    const googleUrl = await ally.driver('google').getRedirectUrl()
    return view.render('session.create', {googleUrl, telegramBot})
  }

  /**
   * Store a session.
   */
  async store ({ auth, request, response, session }) {
    const { username, password } = request.all()

    try {
      await auth.attempt(username, password)
    } catch (e) {

      session.flashExcept(['password'])

      session.flash({ error: 'We cannot find any account with these credentials.' })

      return response.redirect('/abitquest.php/login/')
    }

    /**
     * We are authenticated.
     */
    return response.redirect('/abitquest.php/tasks/')
  }

  async callback ({params, request, response, auth, ally, session}) {

        // user details to be saved
        const userDetails = {
          password: chance.string({ length: 16 }),
          login_source: params.social
        }

        switch (params.social) {
          case 'telegram':
            let name = chance.name();
            if (request.input('first_name') || request.input('last_name')) {
              name = request.input('first_name') || '' + ' ' + request.input('last_name') || ''
            }

            userDetails.name = name
            userDetails.login = request.input('email')
            userDetails.username = request.input('username')
            userDetails.photo_url = request.input('photo_url')
            break;

          case 'google':
            const googleUser = await ally.driver('google').getUser()
            userDetails.name = googleUser.getName() || "Mr. Smith"
            userDetails.username = googleUser.getNickname() || "incognito"
            userDetails.login = googleUser.getEmail()
            userDetails.photo_url = googleUser.getAvatar()
            break;
        }

        // search for existing user
        const whereClause = {
          login: userDetails.login
        }

        const user = await User.findOrCreate(whereClause, userDetails)
        await auth.login(user)

        session.flash({ successMessage: 'You have logged in successfully!' })
        return response.route('/abitquest.php/tasks/')
  }


  async delete ({ auth, response }) {
    await auth.logout()

    return response.redirect('/abitquest.php/')
  }
}

module.exports = SessionController
