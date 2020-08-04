'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TaskUserSchema extends Schema {
  up () {
    this.create('task_user', (table) => {
      table.increments()
      table.integer('user_id').unsigned()
      table.integer('task_id').unsigned()
      table.string('answer').nullable()
      table.timestamp('answered_at').nullable()
      table.boolean('checked').notNullable().defaultTo(false)
      table.timestamp('checked_at').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('task_user')
  }
}

module.exports = TaskUserSchema
