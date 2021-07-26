import Vue from 'vue'
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


import 'tiny-slider'

import 'simplebar/dist/simplebar.min.css';


Vue.config.productionTip = false


new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
