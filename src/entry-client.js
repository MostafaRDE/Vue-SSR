import { createApp } from './app.js'

// Load Client Plugins
global.loadPlugins('client')
import './registerServiceWorker.js'

// client-specific bootstrapping logic...

const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
    // We initialize the store state with the data injected from the server
    store.replaceState(window.__INITIAL_STATE__)
}

// this assumes App.vue template root element has `id="app"`
router.onReady(() => {
    app.$mount('#app')
})

export default { app, router, store }
