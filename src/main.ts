import Vue from 'vue'
import Component from 'vue-class-component'
import './plugins/axios'
import './plugins/firebase'
import './api/rpc';
import './api/http';
import App from './App.vue'
import router from './router'
import store from './store'
import './quasar'
import './plugins/analytics';
import i18n from './plugins/i18n';
import './styles/styles.css'


// import 'tiny-slider'
import '@/scripts/utils/svg-loader'
import 'simplebar/dist/simplebar.min.css';


import VueGoogleCharts from 'vue-google-charts'

Vue.use(VueGoogleCharts)

import Toasted from 'vue-toasted'; 
Vue.use(Toasted)

Vue.config.productionTip = false

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate'
])

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
