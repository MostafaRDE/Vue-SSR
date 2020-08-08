export default [
    {
        path: '/',
        beforeEnter(to, from, next) {
            return next(process.env.LOCALE)
        },
    },
    {
        path: '/:lang',
        component: () => import('../views/Lang.vue'),
        children: [
            {
                path: '',
                component: () => import ('../views/Home.vue'),
            },
        ],
    },
]
