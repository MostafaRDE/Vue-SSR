/*
|--------------------------------------------------------------------------
| Caching system
|--------------------------------------------------------------------------
|
| For speedup and performance of your application, we need cache static
| pages and routes.
|
*/

const path = require('path')
const express = require('express')

const resolve = file => path.resolve(__dirname, file)
const isProd = global.node_env === 'production'

// Serving static paths and caching
global.serve = (path, cache) => express.static(resolve(path), {
    maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0,
})

// Static paths
global.config.cache.routes.forEach(item => {
    global.app.use(item.url, global.serve(item.path, item.canCache))
})
