/*
|--------------------------------------------------------------------------
| Production Express Router Config
|--------------------------------------------------------------------------
|
| Here setup config express router for production mode.
|
*/

const fs = require('fs')
const path = require('path')

const resolve = file => path.resolve(__dirname, file)
const templatePath = resolve('../../../../public/index.template.html')

// In production: create server renderer using template and built server bundle.
// The server bundle is generated by vue-ssr-webpack-plugin.
const template = fs.readFileSync(templatePath, 'utf-8')
const bundle = require('../../../../dist/vue-ssr-server-bundle.json')

// The client manifests are optional, but it allows the renderer
// to automatically infer preload/prefetch links and directly add <script>
// tags for any async chunks used during render, avoiding waterfall requests.
const clientManifest = require('../../../../dist/vue-ssr-client-manifest.json')

global.renderer = global.createRenderer(bundle, {
    template,
    clientManifest,
})