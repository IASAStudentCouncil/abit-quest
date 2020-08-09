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
      if (new Date().getTime() >= Date.parse("27 Aug 2020 23:59:59 GMT+3") ) {
        return response.sendStatus(403)
      }
    } catch  {
      return response.route('login.create')
    }
    await next()
  }
}

module.exports = IsAdmin
