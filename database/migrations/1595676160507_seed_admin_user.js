'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const User = use('App/Models/User')

class SeedAdminSchema extends Schema {
  async up () {
    const user = new User()
    user.name = 'admin'
    user.login = 'admin@iasa.com'
    user.is_admin = true
    user.password = 'admin13t52g'

    await user.save()
  }

  async down () {
    const user = await User.findBy('login', 'admin@iasa.com')
    if(user) {
      await user.delete();
    }
  }
}

module.exports = SeedAdminSchema
