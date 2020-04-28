'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class AllowGuestOnly {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Function} next
   */
  async handle({ request, auth, response }, next) {
    try {
      await auth.check()
      response.route('index')
    }
    catch {
      // call next to advance the request
      await next()
    }
  }
}

module.exports = AllowGuestOnly
