import { createApp } from './app.js'

// <editor-fold desc="PWA">

let pwaStatus = process.env.PWA
if (typeof pwaStatus === 'string')
    pwaStatus = pwaStatus === 'true'
console.log('pwaStatus', typeof pwaStatus)
if (pwaStatus)
    import ('./registerServiceWorker.js')

// </editor-fold>

// client-specific bootstrapping logic...

const { app, router, store, i18n } = createApp()

if (window.__INITIAL_STATE__) {
    // We initialize the store state with the data injected from the server
    store.replaceState(window.__INITIAL_STATE__)
}

// this assumes App.vue template root element has `id="app"`
router.onReady(() => {
    app.$mount('#system')
})

export { app, router, store, i18n }

// Load Client Plugins
global.loadPlugins('client')
