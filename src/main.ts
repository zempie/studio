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
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
