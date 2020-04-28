'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

// /** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Task = use('App/Models/Task')

const moment = use('moment')

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
  async index({ request, response, view }) {
    const tasks = (await Task.all()).toJSON()
    tasks.forEach(task => {
      task.started_at = moment(task.started_at).format('YYYY-MM-DD HH:mm')
    });
    return view.render('pages.admin.tasks.index', { tasks })
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
    return view.render('pages.admin.tasks.create')
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
    const task = await Task.findOrCreate(
      {
        name: request.input('name'),
        slug: request.input('slug')
      },
      {
        name: request.input('name'),
        slug: request.input('slug'),
        answer: request.input('answer'),
        score: request.input('score'),
        is_manual: !!request.input('is_manual'),
        bonus_time: request.input('bonus_time'),
        bonus_coef: request.input('bonus_coef')
      }
    )

    return response.route('admin.tasks.index')
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
  async show({ params, request, response, view }) {
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
    const { id } = params
    const task = await Task.find(id)
    await task.delete()
    return response.route('admin.tasks.index')
  }
}

module.exports = TaskController
