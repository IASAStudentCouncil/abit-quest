'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TasksSchema extends Schema {
  up () {
    this.create('tasks', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.string('slug').notNullable()
      table.string('answer').notNullable()
      table.integer('score').notNullable()
      table.boolean('is_manual').nullable()
      // table.text('description').nullable()
      table.timestamp('started_at').notNullable().defaultTo(this.fn.now())
      table.integer('bonus_time').notNullable().defaultTo(0)
      table.float('bonus_coef').notNullable().defaultTo(1)
      table.timestamps()
    })
  }

  down () {
    this.drop('tasks')
  }
}

module.exports = TasksSchema
