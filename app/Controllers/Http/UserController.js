'use strict'

const User = use('App/Models/User')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new user.
   * GET users/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
  }

  /**
   * Display a single user.
   * GET users/show
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ auth, params, request, response, view }) {
    const { id } = params
    const current = await auth.getUser()
    const user = await User.find(id)

    if (!user || !current || current.id != user.id) {
      return response.status(404)
    }

    // get top-5 users
    let all_users = await User.query().with('tasks').withCount('tasks as tasks_count').fetch()
    let top_users = []
    let i = 0
    for (let user of all_users.rows) {
      let username = await user.getUsername()
      let score = await user.score()
      top_users[i] = { ...(user.toJSON()), score, username }
      i++
    }

    //ratingList.map( (user) => ({...(user.toJSON()), username: user.getUsername() , score: user.score(), tasks_count: user.tasks().length }) ).sort( (userA, userB) => userB.score - userA.score).slice(0, 5)
    const top_5 = top_users.sort( (userA, userB) => userB.score - userA.score ).slice(0, 5)
    console.log(top_5)

    const score = await user.score()
    const username = await user.getUsername()
    return view.render("pages.users.show", {
      user: {
        ...(user.toJSON()),
        score,
        username,
      },
      top_5
    })
  }

  /**
   * Render a form to update an existing user.
   * GET users/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }

  /**
   * Update user active status
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async online({ params, request, response }) {
    const user = await User.find(params.id)
    user.updated_at = new Date()
    await user.save()
    return 'OK'
  }
}

module.exports = UserController
