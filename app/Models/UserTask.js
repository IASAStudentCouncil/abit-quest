'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UserTask extends Model {
  static get dates () {
    return super.dates.concat(['answered_at', 'checked_at'])
  }

  user () {
    return this.belongsTo('App/Models/User')
  }

  task () {
    return this.belongsTo('App/Models/Task')
  }
}

module.exports = UserTask
