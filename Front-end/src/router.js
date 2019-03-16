import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import auth from './auth';

Vue.use(Router)

let router = new Router({
    routes: [{
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/admin',
            name: 'admin',
            component: () =>
                import ('./views/Admin.vue'),
            meta: {
                requiresAuth: true,
                requiresAdmin: true
            },
            beforeEnter: (to, from, next) => {

                if (to.matched.some(record => record.meta.requiresAdmin) && !auth.isAdmin()) {
                    next({
                        path: '/login'
                    });
                } else {
                    next();
                }
            }
        },
        {
            path: '/booking',
            name: 'booking',
            component: () =>
                import ('./views/Booking.vue')
        },
        {
            path: '/calendar',
            name: 'calendar',
            component: () =>
                import ('./views/Calendar.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () =>
                import('./views/Login.vue'),
            meta: {
                requiresAuth: true
            },
            beforeEnter: (to, from, next) => {

                if (to.matched.some(record => record.meta.requiresAuth) && auth.isAuthenticated()) {
                    next({
                        path: '/user'
                    });
                } else {
                    next();
                }
            }

        },
        {
            path: '/registration',
            name: 'registration',
            component: () =>
                import ('./components/Registration.vue'),
        },
        {
            path: '/user',
            name: 'user',
            component: () =>
                import ('./views/User.vue'),
            meta: {
                requiresUser: true,
                requiresAuth: true
            },
            beforeEnter: (to, from, next) => {

                if (to.matched.some(record => record.meta.requiresUser) && auth.isAdmin()) {
                    next({
                        path: '/admin'
                    });
                } else if (to.matched.some(record => record.meta.requiresAuth) && !auth.isAuthenticated()) {
                    next({
                        path: '/login'
                    });
                } else {
                    next();
                }
            }
        }

    ],


});




export default router;