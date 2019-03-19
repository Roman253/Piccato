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
            import('./views/Admin.vue'),
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
            import('./views/Booking.vue')
    },
    {
        path: '/book',
        name: 'book',
        component: () =>
            import('./views/Book.vue')
    },
    {
        path: '/calendar',
        name: 'calendar',
        component: () =>
            import('./views/Calendar.vue')
    },
    {
        path: '/adminedit',
        name: 'adminedit',
        component: () =>
            import('./views/AdminEdit.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import('./components/Login.vue'),
        meta: {
            requiresAuth: false
        },
        props: (route) => ({
            to: route.query.to
        }),
        beforeEnter: (to, from, next) => {

            if (to.matched.some(record => !record.meta.requiresAuth) && !auth.isAuthenticated()) {
                next();
            } else {
                next({
                    path: '/user'
                });
            }
        }
    },
    {
        path: '/registration',
        name: 'registration',
        component: () =>
            import('./components/Registration.vue'),
    },
    {
        path: '/user',
        name: 'user',
        component: () =>
            import('./views/User.vue'),
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