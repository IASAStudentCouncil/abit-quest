'use strict'

/*
|--------------------------------------------------------------------------
| TaskSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Task = use('App/Models/Task')


class TaskSeeder {
  async run () {

    const tasksInfo = [
      {
        name: "Ребус",
        slug: "SimonHaley",
        answer: "ИПСА ИПСА САПР САПР ММСА",
        score: 5,
        is_manual: false,
        // started_at: Date.parse('02 Aug 2020 23:59:59 GMT+3'),
      },
      {
        name: "Книга всем книгам",
        slug: "KarlRamirez",
        answer: "Михаил",
        score: 5,
        is_manual: false,
        started_at: Date.parse('01 Aug 2020 23:59:59 GMT+3'),
      },
      {
        name: "Где-то я эту штуку видел...",
        slug: "DavidShields",
        answer: "3301199726359",
        score: 5,
        is_manual: false,
        started_at: Date.parse('02 Aug 2020 23:59:59 GMT+3'),
      },
      {
        name: "А все ли так двоично?",
        slug: "KyranCervantes",
        answer: "14",
        score: 10,
        is_manual: false,
        started_at: Date.parse('09 Aug 2020 23:59:59 GMT+3'),
      },
      {
        name: "Цезарь говорит",
        slug: "RayJarvis",
        answer: "пусть умолкнет всякий критик я системный аналитик",
        score: 10,
        is_manual: false,
        started_at: Date.parse('09 Aug 2020 23:59:59 GMT+3'),
      },
      {
        name: "Жмакай на кнопку",
        slug: "BenHolmes",
        answer: "enable",
        score: 10,
        is_manual: false,
        started_at: Date.parse('09 Aug 2020 23:59:59 GMT+3'),
      },
      {
        name: "Неумелый верстальщик",
        slug: "RubbishOwls",
        answer: "3301IASA",
        score: 15,
        is_manual: false,
        started_at: Date.parse('16 Aug 2020 23:59:59 GMT+3'),
      },
      {
        name: "Иголка в стоге сена",
        slug: "ZakariyaRuiz",
        answer: "IASAisalifestyle",
        score: 15,
        is_manual: false,
        started_at: Date.parse('16 Aug 2020 23:59:59 GMT+3'),
      },
      {
        name: "Часовая пиктограмма",
        slug: "DeanSolis",
        answer: "аллилуия",
        score: 20,
        is_manual: false,
        started_at: Date.parse('23 Aug 2020 23:59:59 GMT+3'),
      },
      {
        name: "Wake up, samurai",
        slug: "CarmenAcevedo",
        answer: "16384",
        score: 20,
        is_manual: false,
        started_at: Date.parse('23 Aug 2020 23:59:59 GMT+3'),
      },
      {
        name: "Я спортсмен",
        slug: "ChewyChewy",
        answer: "",
        score: 20,
        is_manual: true,
        started_at: Date.parse('23 Aug 2020 23:59:59 GMT+3'),
      },
      {
        name: "Почувствуй себя Богом",
        slug: "WalkingDolls",
        answer: "MATAN",
        score: 20,
        is_manual: false,
        started_at: Date.parse('23 Aug 2020 23:59:59 GMT+3'),
      },
      {
        name: "Это не картинка",
        slug: "LimpKnight",
        answer: "FROM IASA WITH LOVE",
        score: 25,
        is_manual: false,
        started_at: Date.parse('30 Aug 2020 23:59:59 GMT+3'),
      },
    ]

    const tasks = await Task.createMany(tasksInfo)
  }
}

module.exports = TaskSeeder
