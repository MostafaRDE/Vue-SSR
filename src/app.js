/*
|--------------------------------------------------------------------------
| The Application Manager
|--------------------------------------------------------------------------
|
| Here we start, config and manage application system.
|
*/

/*
|--------------------------------------------------------------------------
| Vue-SSR Initializer
|--------------------------------------------------------------------------
|
| We must call internal initializer for setup base config.
|
*/

import './app/kernel/Initializer'

// Vue Importing
import Vue from 'vue'
import App from './App.vue'

/*
|--------------------------------------------------------------------------
| Import System Parts
|--------------------------------------------------------------------------
|
| Here we import important parts of system; such as vue parts, plugins and
| more.
|
*/

import { createRouter } from './router'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'

// Import locales manager system
import { i18n } from './locals'

// Import mixins
import './mixins'

// Load Plugins
global.loadPlugins()

/*
|--------------------------------------------------------------------------
| CSS Framework Loader
|--------------------------------------------------------------------------
|
| Here we import your css framework.
|
*/

// import './app/assets/restyl/index.styl'

/*
|--------------------------------------------------------------------------
| App Creator
|--------------------------------------------------------------------------
|
| Export a factory function for creating fresh app, router and store
| instances.
|
*/

export function createApp () {

    // Create router and store instances
    const store = createStore()
    const router = createRouter({ i18n })

    // Sync so that route state is available as part of the store
    sync(store, router)

    // Create the app instance, injecting both the router and the store
    const app = new Vue({
        router,
        store,
        i18n,
        // The root instance simply renders the App component.
        render: h => h(App),
    })

    // Expose the app, the router and the store.
    return { app, router, store, i18n }

}
