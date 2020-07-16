'use strict'

const User = use('App/Models/User')
const { validateAll } = use('Validator')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  async create ({ view, ally }) {
    const telegramBot = Env.get('TELEGRAM_BOT') || "#telegram"
    const googleUrl = await ally.driver('google').getRedirectUrl() || "#google"
    return view.render('user.create', googleUrl, telegramBot)
  }

  async store ({ auth, session, request, response }) {
    const data = request.only(['username', 'email', 'password', 'password_confirmation'])

    const validation = await validateAll(data, {
      username: 'required|unique:users',
      email: 'required|email|unique:users',
      password: 'required',
      password_confirmation: 'required_if:password|same:password',
    })

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashExcept(['password'])

      return response.redirect('back')
    }

    delete data.password_confirmation
    data.name = data.username

    const user = await User.create(data)

    await auth.login(user)

    return response.redirect('/abitquest.php/tasks')
  }

  async show ({ auth, session, request, response, view }) {
    try {
      const user = await auth.getUser()
      return view.render("user.show", {user:user})
    } catch (error) {
      response.send('Missing or invalid api token')
      return response.redirect('/abitquest.php/login')
    }


  }
}

module.exports = UserController
