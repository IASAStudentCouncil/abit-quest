'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/ally/src/Ally')} Ally */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} AuthSession */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')
const Env = use('Env')
const chance = require('chance')()

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
    return view.render('pages.admin.login')
  }

  /**
   * Create/save a new login.
   * POST logins
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {AuthSession} ctx.auth
   * @param {Response} ctx.response
   */
  async store({ request, auth, session, response }) {
    await auth.attempt(request.input('email'), request.input('password'))
    let user = await auth.getUser()
    if(!user.is_admin) {
      await auth.logout()
    }
    // session.flash({ successMessage: 'You have logged in successfully!' })
    return response.route('admin.index')
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

}

module.exports = LoginController
