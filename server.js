let isProd = process.env.NODE_ENV === 'production'

const path = require('path')
const server = require('express')()
const { createRenderer } = require('vue-server-renderer')

const template = require('fs').readFileSync(path.resolve(__dirname, './public/index.template.html'), 'utf-8')
// const serverBundle = require('./dist/vue-ssr-server-bundle.json')
// const clientManifest = require('./dist/vue-ssr-client-manifest.json')

const renderer = createRenderer({
    runInNewContext: false, // recommended
    template, // (optional) page template
    // clientManifest // (optional) client build manifest
})

const context = {
    title: 'vue ssr',
    metas: `
        <meta name="keyword" content="vue,ssr">
        <meta name="description" content="vue srr demo">
    `,
}

const resolve = file => path.resolve(__dirname, file)
// const createApp = require('./dist/built-server-bundle.js')
const templatePath = resolve('./public/index.template.html')
server.get('*', isProd ? (req, res) => {
    const context = { url: req.url }
    // createApp(context).then(app => {
    renderer.renderToString(context, (err, html) => {
        if (err) {
            if (err.code === 404) {
                res.status(404).end('Page not found')
            }
            else {
                res.status(500).end(err)
            }
        }
        else {
            res.end(html)
        }
    })
// })
} : (req, res) => {
    require('./build/setup-dev-server')(
        server,
        templatePath,
        (bundle, options) => {
            let renderer = createRenderer(bundle, options)
        },
    ).then(() => render(req, res))
})



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
            // console.error(`error during render : ${req.url}`)
            // console.error(err.stack)
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
            console.log(`whole request: ${Date.now() - s}ms`)
        }
    })
}


server.listen(8080)
