'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TaskUserSchema extends Schema {
  up () {
    this.create('user_tasks', (table) => {
      table.increments()
      table.integer('user_id').unsigned()
      table.integer('task_id').unsigned()
      table.string('answer').nullable()
      table.datetime('answered_at').nullable()
      table.boolean('checked').notNullable().defaultTo(false)
      table.datetime('checked_at').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('user_tasks')
  }
}

module.exports = TaskUserSchema
