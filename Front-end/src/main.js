import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VCalendar from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css'

Vue.prototype.$eventHub = new Vue();

Vue.use(VueAxios, axios)
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')


// Use v-calendar, v-date-picker & v-popover components
Vue.use(VCalendar, {
    firstDayOfWeek: 2,
    popoverVisibility: "visible",
});