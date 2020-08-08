/*
|--------------------------------------------------------------------------
| Load helpers
|--------------------------------------------------------------------------
|
| In this file, we load all helpers files and save a global variable with
| *helpers* name.
|
*/

const helpers = []

helpers.push(import('./Helpers/foundation.js'))

helpers.forEach(helper => {
    Object.keys(helper).forEach(key => {
        global[ key ] = helper[ key ]
    })
})
