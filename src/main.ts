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

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
