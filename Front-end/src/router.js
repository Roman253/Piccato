import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/admin',
        name: 'admin',
        component: () =>
            import('./views/Admin.vue')
    },
    {
        path: '/booking',
        name: 'booking',
        component: () => import('./views/Booking.vue'),
        children:
            [
                {
                    path: 'artworkItem/:id',
                    name: 'artworkItem',
                    component: () => import('./components/artworkItem.vue'),
                    children:
                        [
                            {
                                path: 'artworkDesc/:artworkDescId',
                                name: 'artworkDesc',
                                component: () => import('./components/artworkDesc.vue')
                            }
                        ]

                }

            ]
    },
    {
        path: '/calendar',
        name: 'calendar',
        component: () =>
            import('./views/Calendar.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import('./views/Login.vue')
    },
    {
        path: '/user',
        name: 'user',
        component: () =>
            import('./views/User.vue')
    }

    ]
})