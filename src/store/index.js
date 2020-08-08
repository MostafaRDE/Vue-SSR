import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Assume we have a universal API that returns Promises
// and ignore the implementation details
// import { ... } from './api'

export function createStore () {
    return new Vuex.Store({
        // IMPORTANT: state must be a function so the module can be
        // instantiated multiple times
        state: () => ({

            // Direction variable for set direction design
            dir: 'ltr',

            // Theme variable for set theme design
            theme: 'dark',

        }),

        mutations: {

            // "setDirection" mutation-method for update "dir" variable in states
            setDirection(state, dir) {
                state.dir = dir
            },

            // "setTheme" mutation-method for update "theme" variable in states
            setTheme(state, theme) {
                state.theme = theme
            },

        },

        actions: {

        },
    })
}
