'use strict'

const User = use('App/Models/User')
const Env = use('Env')
const chance = require('chance')()

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/ally/src/Ally')} Ally */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with logins
 */
class LoginController {
  /**
   * Show a list of all logins.
   * GET logins
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new login.
   * GET logins/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Ally} ctx.ally
   * @param {View} ctx.view
   * @param {Response} ctx.response
   */
  async create({ request, ally, view, response }) {
    const telegramBot = Env.get('TELEGRAM_BOT') || "#telegram"
    const googleUrl = await ally.driver('google').getRedirectUrl() || "#google"
    return view.render('pages.login', { telegramBot, googleUrl })
  }

  /**
   * Create/save a new login.
   * POST logins
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth, session, response }) {
    await auth.attempt(request.input('email'), request.input('password'))

    session.flash({ successMessage: 'You have logged in successfully!' })
    return response.route('tasks.index')
  }

  /**
   * Display a single login.
   * GET logins/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing login.
   * GET logins/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update login details.
   * PUT or PATCH logins/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a login with id.
   * DELETE logins/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }


  async redirect ({ ally }) {
    await ally.driver('google').redirect()
  }


  /**
   * Callback for auth
   * Get callback
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async callback({ params, request, ally, auth, session, response }) {

    // user details to be saved
    const userDetails = {
      password: chance.string({ length: 16 }),
      login_source: params.socials
    }

    switch (params.social) {
      case 'telegram':
        let name = chance.name();
        if (request.input('first_name') || request.input('last_name')) {
          name = request.input('first_name') || '' + ' ' + request.input('last_name') || ''
        }

        userDetails.name = name
        userDetails.login = request.input('username')
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
    return response.route('/abitquest.php/tasks/', userDetails)
  }
}

module.exports = LoginController
