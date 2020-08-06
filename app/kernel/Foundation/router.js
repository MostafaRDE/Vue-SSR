/*
|--------------------------------------------------------------------------
| Express Router Initializer
|--------------------------------------------------------------------------
|
| Here we setup express router for application.
|
*/

const path = require('path')
const LRU = require('lru-cache')
const { createBundleRenderer } = require('vue-server-renderer')

/*
|--------------------------------------------------------------------------
| Renderer Function
|--------------------------------------------------------------------------
|
| This function setup in production or development config. It will
| rendering your application as html, css and ... .
|
*/

global.renderer = null

/*
|--------------------------------------------------------------------------
| Ready Promise Function
|--------------------------------------------------------------------------
|
| This function for check if development mode and webpack plugins for debug
| is ready or not for started application in development mode.
|
*/

global.readyPromise = null

/*
|--------------------------------------------------------------------------
| File resolver
|--------------------------------------------------------------------------
|
| This for resolve files.
|
*/

const resolve = file => path.resolve(__dirname, file)

/*
|--------------------------------------------------------------------------
| Renderer Creator
|--------------------------------------------------------------------------
|
| Here we need to a renderer creator for create renderer function in
| development and production mode router files
| ( './Router/development_router.js' and './Router/production_router.js' ).
|
*/

global.createRenderer = (bundle, options) => {
    try {
        return createBundleRenderer(bundle, Object.assign(options, {
            // for component caching
            cache: new LRU({ max: 1000, maxAge: 1000 * 60 * 15 }),
            // this is only needed when vue-server-renderer is npm-linked
            basedir: resolve(global.env('APP_OUTPUT_DIR')),
            // inject: false,
            renderStyles: () => {},
            renderState: () => {},
            renderScripts: () => {},
            shouldPreload: (file, type) => {
                // https://fetch.spec.whatwg.org/#concept-request-destination
                if (type === 'script' || type === 'style')
                    return true
                if (type === 'font')
                    return /\.woff2$/.test(file)
                if (type === 'image') {}
            },
            // shouldPrefetch: (file, type) => false,
            shouldPrefetch: () => false,
            // recommended for performance
            runInNewContext: false,
        }))
    }
    catch (e) {
        console.error(e)
    }
}

/*
|--------------------------------------------------------------------------
| Final Rendering
|--------------------------------------------------------------------------
|
| With this method, we render your codes and send rendered your application
| or responses to the client.
|
*/

function render(req, res) {
    const s = Date.now()

    res.setHeader('Content-Type', 'text/html')

    const handleError = err => {
        if (err.url) {
            res.redirect(err.url)
        }
        else if (err.code === 404) {
            res.status(404).send('404 | Page Not Found')
        }
        else {
            // Render Error Page or Redirect
            res.status(500).send('500 | Internal Server Error')
            console.error(`error during render : ${ req.url }`)
            console.error(err.stack)
        }
    }

    const context = {
        // default title
        title: null,
        url: req.url,
    }

    global.renderer.renderToString(context, (err, html) => {
        if (err) {
            return handleError(err)
        }
        res.send(html)

        if (global.node_env === 'development') {
            console.log(`Whole request: ${ Date.now() - s }ms`)
        }
    })
}

/*
|--------------------------------------------------------------------------
| Mode renderers
|--------------------------------------------------------------------------
|
| Here send your client to the development or production mode with your
| running option at started application.
|
*/

if (global.node_env === 'production') {
    require('../Foundation/Router/production_router.js')

    global.app.get('*', render)
}
else {
    require('../Foundation/Router/development_router.js')

    global.app.get('*', (req, res) => {
        global.readyPromise.then(() => render(req, res))
    })
}
