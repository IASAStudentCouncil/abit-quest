'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Task = use('App/Models/Task')
const Database = use('Database')

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

    const tasks_serialized = await Task.query().where('started_at', '<', new Date()).orderBy('id').fetch()
    console.log(tasks_serialized.toJSON()[9])
    return view.render('pages.tasks.index', { user: user.toJSON(), tasks: tasks_serialized.toJSON() })
  }

  /**
   * Если answer != null && answered_at != null то имееться 3 состояния ответа
   * 1. checked == true                         - ответ верный
   * 2. checked == false && checked_at != null  - ответ неверный
   * 3. checked == false && checked_at == null  - ответ на рассмотрении
   */
  async answer({ auth, params, request, response }) {
    const { slug } = params
    const answer = request.input('answer')

    const user = await auth.getUser()
    const task = await Task.findBy('slug', slug)

    await Database.table('task_user')
                  .where('task_id', task.id)
                  .where('user_id', user.id)
                  .update({ answer: answer, answered_at: Date.now() })

    if (!task.is_manual) {
      await Database.table('task_user')
                    .where('task_id', task.id)
                    .where('user_id', user.id)
                    .update({ checked: answer == task.answer, checked_at: Date.now()})

    }

    return response.route("tasks.index")
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

    const user = await auth.getUser()
    const task = await Task.findBy('slug', slug)

    if (!task) {
      return response.sendStatus(404)
    }

    const hasTask = await user.tasks().where('slug', slug).getCount()
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
