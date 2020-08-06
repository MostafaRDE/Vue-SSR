/*
|--------------------------------------------------------------------------
| Load recommended components
|--------------------------------------------------------------------------
|
| In this file, we load all recommended components and add its to globally
| in *vue components*.
|
*/

let { readdirSync } = require('fs')

// readdirSync('./src/app/components').forEach(file => {
//     if (/\.vue$/.test(file)) {
//         const filename = file.replace(/\.vue$/, '')
//         let functions = require(`./${ filename }`)
//         Object.keys(functions).forEach(key => {
//             global[ key ] = functions[ key ]
//         })
//     }
// })
