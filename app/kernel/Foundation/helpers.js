/*
|--------------------------------------------------------------------------
| Load helpers
|--------------------------------------------------------------------------
|
| In this file, we load all helpers files and save a global variable with
| *helpers* name.
|
*/

let { readdirSync } = require('fs')

readdirSync('./app/kernel/Foundation/Helpers').forEach(file => {
    if (/\.js$/.test(file)) {
        let functions = require(`./Helpers/${ file }`)
        Object.keys(functions).forEach(key => {
            global[ key ] = functions[ key ]
        })
    }
})
