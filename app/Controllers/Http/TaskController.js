'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Task = use('App/Models/Task')

/**
 * Resourceful controller for interacting with tasks
 */
class TaskController {
  /**
   * Show a list of all tasks.
   * GET tasks
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ auth, request, response, view }) {
    const user = await auth.getUser()
    const now = Date.now()
    const tasks_serialized = await Task.query().where('started_at', '<', now).fetch()

    return view.render('pages.tasks.index', { user: user, tasks: tasks_serialized.toJSON() })
  }

  async answer({ auth, params, request, response }) {
    const user = auth.getUser()
    const { slug } = params
    const task = await Task.findBy('slug', slug)
    const answer = request.input('answer')
    console.log(task.is_manual, task.answer)
    if (!task.is_manual && task.answer === answer) {
      await user.tasks().create(task.toJSON())
      return response.route("tasks.index")
    } else {
      return response.route("tasks.show." + slug)
    }
  }

  /**
   * Render a form to be used for creating a new task.
   * GET tasks/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new task.
   * POST tasks
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
  }

  /**
   * Display a single task.
   * GET tasks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ auth, params, request, response, view }) {
    const { slug } = params

    const user = auth.getUser()
    const task = await Task.findBy('slug', slug)
    console.log(task.slug, task.answer, task.is_manual)

    if (!task) {
      return response.sendStatus(404)
    }

    const hasTask = await user.tasks().where('id', task.id).getCount()
    if (!hasTask) {
      user.tasks().attach([task.id])
    }

    return view.render('pages.tasks.' + task.slug)
  }

  /**
   * Render a form to update an existing task.
   * GET tasks/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update task details.
   * PUT or PATCH tasks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a task with id.
   * DELETE tasks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = TaskController
