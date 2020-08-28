'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('pages.index').as('index')

Route.group(() => {
  Route.get('/login', 'LoginController.create').as('login.create')
  Route.post('/login', 'LoginController.store').as('login.store')

  Route.get('login/callback/:social', 'LoginController.callback').as('login.callback')
}).middleware(['guest'])

Route.group(() => {
  Route.get('/user/:id/online', 'UserController.online').as('user.online')
  Route.get('/tasks', 'TaskController.index').as('tasks.index')
  Route.get('/tasks/:slug', 'TaskController.show').as('tasks.show')
  Route.post('/tasks/:slug', 'TaskController.answer').as('tasks.answer')

  Route.get('logout', 'LoginController.destroy').as('login.destroy')
  Route.get('users/:id', 'UserController.show').as('users.show')
}).middleware(['auth'])

Route.group(() => {
  Route.get('/login', 'LoginController.create').as('login.create')
  Route.post('/login', 'LoginController.store').as('login.store')
}).prefix('admin').namespace('Admin').as('admin')

Route.group(() => {
  Route.get('/', 'AdminController.index').as('index')
  Route.resource('tasks', 'TaskController')
  Route.resource('answers', 'AnswerController')
  Route.resource('users', 'UserController')
}).prefix('admin').namespace('Admin').as('admin').middleware(['authAdmin'])
