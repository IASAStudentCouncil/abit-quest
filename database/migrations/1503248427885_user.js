'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.string('login').notNullable().unique()
      table.string('password').notNullable()
      table.enu('login_source', ['telegram', 'google', 'email']).default('email')
      table.string('photo_url').nullable()
      table.enu('rank', ['student_ptu', 'kpishnik', 'ipsashnik', 'ipsashnik_na_povishke']).default('student_ptu')
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
