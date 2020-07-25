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

const Database = use('Database')

class TaskSeeder {
  async run () {

    const tasksInfo = [
      {
        name: "Ребус",
        slug: "1",
        answer: "ИПСА ИПСА САПР САПР ММСА",
        score: 5,
        is_manual: false,
        // started_at: Date.parse('02 Aug 2020 23:59:59 GMT+3'),
      },
      {
        name: "Книга всем книгам",
        slug: "2",
        answer: "Михаил",
        score: 5,
        is_manual: false,
        // started_at: Date.parse('02 Aug 2020 23:59:59 GMT+3'),
      },
      {
        name: "Где-то я эту штуку видел...",
        slug: "3",
        answer: "3301199726359",
        score: 5,
        is_manual: false,
        // started_at: Date.parse('02 Aug 2020 23:59:59 GMT+3'),
      },
      {
        name: "А все ли так двоично?",
        slug: "4",
        answer: "14",
        score: 10,
        is_manual: false,
        // started_at: Date.parse('09 Aug 2020 23:59:59 GMT+3'),
      },
      {
        name: "Цезарь говорит",
        slug: "5",
        answer: "пусть умолкнет всякий критик я системный аналитик",
        score: 10,
        is_manual: false,
        // started_at: Date.parse('09 Aug 2020 23:59:59 GMT+3'),
      },
      {
        name: "Жмакай на кнопку",
        slug: "6",
        answer: "enable",
        score: 10,
        is_manual: false,
        // started_at: Date.parse('09 Aug 2020 23:59:59 GMT+3'),
      },
      {
        name: "Неумелый верстальщик",
        slug: "7",
        answer: "3301IASA",
        score: 15,
        is_manual: false,
        // started_at: Date.parse('16 Aug 2020 23:59:59 GMT+3'),
      },
      {
        name: "Иголка в стоге сена",
        slug: "8",
        answer: "IASAisalifestyle",
        score: 15,
        is_manual: false,
        // started_at: Date.parse('16 Aug 2020 23:59:59 GMT+3'),
      },
      {
        name: "Часовая пиктограмма",
        slug: "9",
        answer: "аллилуия",
        score: 20,
        is_manual: false,
        // started_at: Date.parse('23 Aug 2020 23:59:59 GMT+3'),
      },
      {
        name: "Wake up, samurai",
        slug: "10",
        answer: "16384",
        score: 20,
        is_manual: false,
        // started_at: Date.parse('23 Aug 2020 23:59:59 GMT+3'),
      },
      {
        name: "Я спортсмен",
        slug: "11",
        answer: "",
        score: 20,
        is_manual: true,
        // started_at: Date.parse('23 Aug 2020 23:59:59 GMT+3'),
      },
      {
        name: "Почувствуй себя Богом",
        slug: "12",
        answer: "MATAN",
        score: 20,
        is_manual: false,
        // started_at: Date.parse('23 Aug 2020 23:59:59 GMT+3'),
      },
      {
        name: "Это не картинка",
        slug: "13",
        answer: "FROM IASA WITH LOVE",
        score: 25,
        is_manual: false,
        // started_at: Date.parse('30 Aug 2020 23:59:59 GMT+3'),
      },
    ]
    for (let i = 1; i <= tasksInfo.length; i++) {
      await Database.table('tasks').insert(tasksInfo[i])
    }
  }
}

module.exports = TaskSeeder
