'use strict'

const Env = use('Env')

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

      return response.redirect('/abitquest.php/login')
    }

    /**
     * We are authenticated.
     */
    return response.redirect('/abitquest.php/tasks')
  }

  async delete ({ auth, response }) {
    await auth.logout()

    return response.redirect('/abitquest.php/')
  }
}

module.exports = SessionController
