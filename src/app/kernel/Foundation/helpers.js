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

require.context('./Helpers', true, /\.js$/, 'sync').keys().forEach(r => {
    helpers.push(require('./Helpers/' + r.substring(2, r.length)))
})

helpers.forEach(helper => {
    Object.keys(helper).forEach(key => {
        global[ key ] = helper[ key ]
    })
})
