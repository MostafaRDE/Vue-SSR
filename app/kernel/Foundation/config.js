/*
|--------------------------------------------------------------------------
| Load configs
|--------------------------------------------------------------------------
|
| In this file, we load all config files and save a global variable with
| *config* name.
|
*/

const { readdirSync } = require('fs'),
    config = {}

readdirSync('./src/config').forEach(file => {
    if (/\.js$/.test(file)) {
        const filename = file.replace(/\.js$/, '')
        config[ filename ] = require(`../../../src/config/${ file }`)
    }
})

global.config = config
