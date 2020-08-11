/*
|--------------------------------------------------------------------------
| Caching system
|--------------------------------------------------------------------------
|
| For speedup and performance of your application, we need cache static
| pages and routes.
|
*/

const express = require('express')

const isProd = global.node_env === 'production'

// Serving static paths and caching
global.serve = (path, cache) => express.static(global.resolve(path), {
    maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0,
})

// Static paths
global.config.cache.routes.forEach(item => {
    global.app.use(item.url, global.serve(item.path, item.canCache))
})
