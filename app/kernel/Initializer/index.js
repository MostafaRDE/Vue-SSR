/*
|--------------------------------------------------------------------------
| Set *node_env* Variable
|--------------------------------------------------------------------------
|
| This variable has NODE_ENV mode in global variable for easy access to it.
|
*/

global.node_env = process.env.NODE_ENV

/*
|--------------------------------------------------------------------------
| Load env variables
|--------------------------------------------------------------------------
|
| The first thing we will loading env variables.
|
*/

require('dotenv').config({ path: '.env' })
require('dotenv').config({ path: `.env.${ process.env.NODE_ENV }` })

// If we will processing of server, then add env server variables to
// *process.env*
if (!process.browser) {
    require('dotenv').config({ path: '.env.server' })
}

/*
|--------------------------------------------------------------------------
| Load helpers
|--------------------------------------------------------------------------
|
| For easy work with program, we need load some foundation helpers in
| first time.
|
*/

require('../Foundation/helpers.js')

/*
|--------------------------------------------------------------------------
| Load configs
|--------------------------------------------------------------------------
|
| After load env variables and helpers, we load all configs and save it
| in global variables.
|
*/

require('../Foundation/config.js')

/*
|--------------------------------------------------------------------------
| Run Cache system
|--------------------------------------------------------------------------
|
| After load env variables and helpers, we load all configs and save it
| in global variables.
|
*/

require('../Foundation/cache.js')

/*
|--------------------------------------------------------------------------
| Config Express Router
|--------------------------------------------------------------------------
|
| After load base config, we need to set default router options.
|
*/

require('../Foundation/router.js')
