'use strict'

const moment = require('moment')
const _ = require('lodash')

const User = use('App/Models/User')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with admins
 */
class AdminController {
  /**
   * Show a list of all admins.
   * GET admins
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const [total, active, ranks, growth] = await Promise.all([
      User.getCount(),
      User.query().where('updated_at', '>', moment().subtract(2, 'd').toDate()).getCount(),
      this.getRanksDistribution(),
      this.getGrowth()
    ])
    const users = { total, active, ranks, growth}

    return view.render('pages.admin.index', { users })
  }

  /**
   * Render a form to be used for creating a new admin.
   * GET admins/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new admin.
   * POST admins
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
  }

  /**
   * Display a single admin.
   * GET admins/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing admin.
   * GET admins/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update admin details.
   * PUT or PATCH admins/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a admin with id.
   * DELETE admins/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }

  async getRanksDistribution() {
    const ranksColors = {
      'student_ptu': ['primary', '#4e73df', '#2e59d9'],
      'kpishnik': ['success', '#1cc88a', '#17a673'],
      'ipsashnik': ['info', '#36b9cc', '#2c9faf'],
      'ipsashnik_na_povishke': ['warning', '#f6c23e', '#f4b619']
    }
    const ranks = await User.query().select('rank').groupBy('rank').count('* as total')
    return ranks.map(item => ({ ...item, color: ranksColors[item.rank] }))

  }

  async getGrowth() {
    let userCount = 0;
    const users = await User.query().select('created_at').pluck('created_at')
    const growth = _.countBy(users.map(i => moment(i).format('DD.MM.YYYY')))
    return Object.entries(growth).map(([key, value]) => {
      userCount += value
      return { date: key, total: userCount }
    })

  }
}

module.exports = AdminController
