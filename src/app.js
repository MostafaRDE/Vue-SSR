/*
|--------------------------------------------------------------------------
| The Application Manager
|--------------------------------------------------------------------------
|
| Here we start, config and manage application system.
|
*/

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

// Import mixins
import './mixins'

/*
|--------------------------------------------------------------------------
| CSS Framework Loader
|--------------------------------------------------------------------------
|
| Here we import your css framework.
|
*/

import './app/assets/restyl/index.styl'

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
    const router = createRouter()
    const store = createStore()

    // Sync so that route state is available as part of the store
    sync(store, router)

    // Create the app instance, injecting both the router and the store
    const app = new Vue({
        router,
        store,
        // The root instance simply renders the App component.
        render: h => h(App),
    })

    // Expose the app, the router and the store.
    return { app, router, store }
}
