import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import { check_lang } from './middleware_reader'

Vue.use(Router)

export function createRouter ({ i18n }) {

    const routerPush = Router.prototype.push
    Router.prototype.push = function push(location) {
        return routerPush.call(this, location).catch(error=> error)
    }

    const router = new Router({
        mode: 'history',

        linkActiveClass: 'active',
        linkExactActiveClass: 'exact-active',

        routes,
    })


    /* ======================================== *
     * Middleware:
     *     - Checking language support
     *     - Authentication
     *                                          */

    router.beforeEach(check_lang({ i18n }))

    return router

}
