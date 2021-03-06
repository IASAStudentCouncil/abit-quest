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

    this.addHook('afterFetch', async (userInstances) => {
      for (const userInstance of userInstances) {
        userInstance.score = await userInstance.score()
      };
    })
    this.addHook('afterFind', async (userInstance) => {
      userInstance.score = await userInstance.score()
    })
  }

  static get computed() {
    return ['username']
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


  getUsername({ login }) {
    const username = login.split("@")[0]
    return username
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
      .pivotModel('App/Models/UserTask')
  }

  score() {
    return this.tasks().wherePivot('checked', true).fetch()
      .then(tasks =>
        tasks.rows
          .map((task) => task.score)
          .reduce((sum, item) => sum + item, 0)
      )
  }
}

module.exports = User
