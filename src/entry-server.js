import { createApp } from './app.js'

const { app, router, store, i18n } = createApp()

export { app, router, store, i18n }

export default context => {
    // since there could potentially be asynchronous route hooks or components,
    // we will be returning a Promise so that the server can wait until
    // everything is ready before rendering.
    return new Promise((resolve, reject) => {

        const { app, router, store, i18n } = createApp()

        // set server-side router's location
        router.push(context.url)

        // wait until router has resolved possible async components and hooks
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents()
            // no matched routes, reject with 404
            if (!matchedComponents.length) {
                return reject({ code: 404 })
            }


            context.lang = store.state.route.params.lang || 'fa'
            if (context.lang !== 'en' && context.lang !== 'fa' || context.lang === '')
                context.lang = 'fa'

            i18n.locale = context.lang

            switch (context.lang) {
                case 'af':
                case 'ar':
                case 'fa':
                    store.commit('setDirection', 'rtl')
                    break

                default:
                    store.commit('setDirection', 'ltr')
            }

            Promise.all(matchedComponents.map(({ asyncData }) => asyncData && asyncData({
                store,
                route: router.currentRoute,
            }))).then(() => {
            // After all preFetch hooks are resolved, our store is now
            // filled with the state needed to render the app.
            // Expose the state on the render context, and let the request handler
            // inline the state in the HTML response. This allows the client-side
            // store to pick-up the server-side state without having to duplicate
            // the initial data fetching on the client.

                context.state = store.state
                resolve(app)
            }).catch(reject)

            // This `rendered` hook is called when the app has finished rendering
            // context.rendered = () => {
            //     // After the app is rendered, our store is now
            //     // filled with the state from our components.
            //     // When we attach the state to the context, and the `template` option
            //     // is used for the renderer, the state will automatically be
            //     // serialized and injected into the HTML as `window.__INITIAL_STATE__`.
            //     context.state = store.state
            // }

            // the Promise should resolve to the app instance so it can be rendered
            // resolve(app)
        }, reject)
    })
}
