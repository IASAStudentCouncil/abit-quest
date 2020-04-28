'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const { InvalidSessionException } = require('@adonisjs/auth/src/Exceptions')

class IsAdmin {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Function} next
   */
  async handle({ request, auth, response }, next) {
    try {
      let user = await auth.getUser()
      if (!user.is_admin) {
        throw InvalidSessionException.invoke()
      }
      await next()
    } catch(ex) {
      console.log(ex)
      return response.route('admin.login.create')
    }
  }
}

module.exports = IsAdmin
