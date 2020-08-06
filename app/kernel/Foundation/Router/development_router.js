/*
|--------------------------------------------------------------------------
| Development Express Router Config
|--------------------------------------------------------------------------
|
| Here setup config express router for development mode.
|
*/

const path = require('path')

global.readyPromise = require('../../../../builder/setup-dev-server')(
    global.app,
    path.resolve(__dirname, '../../../../public/index.template.html'),
    (bundle, options) => {
        global.renderer = global.createRenderer(bundle, options)
    },
)
