'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')



class User extends Model {
  static boot() {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }


  getRank(rank) {
    const ranksDict = {
      'student_ptu': 'Студент ПТУ',
      'kpishnik': 'КПИшник',
      'ipsashnik': 'ИПСАшник',
      'ipsashnik_na_povishke': 'ИПСАшник на повышкe'
    }
    return ranksDict[rank]
  }


  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany('App/Models/Token')
  }

  /**
   * A relationship on tasks
   *
   * @method tasks
   *
   * @return {Object}
   */
  tasks() {
    return this
      .belongsToMany('App/Models/Task')
      .withPivot(['answer', 'answered_at', 'checked', 'checked_at'])
      .withTimestamps()
  }

  score() {
    return this.tasks().fetch().then(tasks => tasks.rows.map((task) => task.score).reduce((sum, item) => sum + item))
  }
}

module.exports = User
