'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const { InvalidSessionException } = require('@adonisjs/auth/src/Exceptions')

class IsAdmin {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Request} ctx.response
   * @param {Function} next
   */
  async handle({ request, auth, response }, next) {
    try {
      await auth.check()
    } catch  {
      return response.route('login.create')
    }
    await next()
  }
}

module.exports = IsAdmin
