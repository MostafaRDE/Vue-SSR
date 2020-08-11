/*
|--------------------------------------------------------------------------
| Create The Application
|--------------------------------------------------------------------------
|
| The first thing we will do is create a new Vue-SSR application instance
| which serves all program at on the your custom port.
|
*/

const express = require('express')

global.app = express()

/*
|--------------------------------------------------------------------------
| Root Directory Resolver
|--------------------------------------------------------------------------
|
| After, we create root directory resolver in global variable.
|
*/

const path = require('path')
global.resolve = file => path.resolve(__dirname, file)

/*
|--------------------------------------------------------------------------
| Bootstrapping and config application
|--------------------------------------------------------------------------
|
| The second thing we will config application for run and use it.
|
*/

require('./app/kernel/bootstrap')

/*
|--------------------------------------------------------------------------
| Running server at the custom port system
|--------------------------------------------------------------------------
|
| After create and config app, then run it at the custom port system.
|
*/

const chalk = require('chalk')

global.app.listen(parseInt(global.env('APP_PORT', '8080')), global.env('APP_HOSTNAME', '127.0.0.1'), () => {
    console.log(chalk.green('Server started at:') + ` <127.0.0.1:${ global.env('APP_PORT', '8080') }>`)
})
