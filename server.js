// Node locally modules
const path = require('path')
// const fs = require('fs')

// Packages
const chalk = require('chalk')
const portfinder = require('portfinder')
const express = require('express')
// const csrf = require('csurf')
const LRU = require('lru-cache')
const { createBundleRenderer } = require('vue-server-renderer')

// Get environment mode
const resolve = file => path.resolve(__dirname, file)
let isProd = process.env.NODE_ENV === 'production'

// Create main app-server instance
const app = express()

let readyPromise = null, renderer = null

console.log(isProd)
if (isProd) {
    readyPromise = require('./build/setup-dev-server')(
        app,
        path.resolve(__dirname, './public/index.template.html'),
        (bundle, options) => {
            renderer = createRenderer(bundle, options)
        },
    )
}
else {
    readyPromise = require('./build/setup-dev-server')(
        app,
        path.resolve(__dirname, './public/index.template.html'),
        (bundle, options) => {
            renderer = createRenderer(bundle, options)
        },
    )
}

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
            console.error(`error during render : ${req.url}`)
            console.error(err.stack)
        }
    }

    const context = {
        title: null, // default title
        url: req.url,
    }

    renderer.renderToString(context, (err, html) => {
        if (err) {
            return handleError(err)
        }
        res.send(html)

        if (!isProd) {
            console.log(`Whole request: ${Date.now() - s}ms`)
        }
    })
}

function createRenderer(bundle, options) {
    try {
        return createBundleRenderer(bundle, Object.assign(options, {
            // for component caching
            cache: new LRU({
                max: 1000,
                maxAge: 1000 * 60 * 15,
            }),
            // this is only needed when vue-server-renderer is npm-linked
            basedir: resolve('./dist'),
            // inject: false,
            renderStyles: () => {

            },
            renderState: () => {

            },
            renderScripts: () =>{

            },
            shouldPreload: (file, type) => {
                // https://fetch.spec.whatwg.org/#concept-request-destination
                // console.log(file,type);
                if (type === 'script' || type === 'style') {
                    return true
                }

                if (type === 'font') {
                    return /\.woff2$/.test(file)
                }
                if (type === 'image') {}
            },
            shouldPrefetch: () => {
                return false
            },
            // shouldPrefetch: (file, type) => {
            //     return false
            // },
            // recommended for performance
            runInNewContext: false,
        }))
    }
    catch (e) {
        console.error(e)
    }
}

app.get('*', (req, res) => {
    readyPromise.then(() => render(req, res))
})

// Running app
console.log('\nSearching for a free guaranteed port...')
portfinder.getPortPromise()
    .then(port => {
        console.log(chalk.green('App started at:') + ` <127.0.0.1:${port}>`)
        app.listen(port)
    })
    .catch(err => {
        console.error(err)
    })
