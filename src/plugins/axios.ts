import Vue, { PluginObject } from 'vue';
import axios from 'axios/index';
import store from '@/store';

const config = {
  baseURL: process.env.VUE_APP_BASE_API || process.env.baseURL || process.env.apiUrl || '',
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
    (cfg) => {

      // Do something before request is sent
      if (store.getters.idToken) {
            cfg.headers.authorization = `Bearer ${store.getters.idToken}`;
      }

      return cfg;
    },
    (err) => {
      // Do something with request error
      return Promise.reject(err);
    },
);

// Add a response interceptor
_axios.interceptors.response.use(
  (res) => {
    
    
      // Do something with response data

      if ( res.data.jsonrpc ) {
        res.data = res.data.result;
        console.log('res.data')
      }
      else if ( res.data.data ) {
        res.data = res.data.data;
      }

      // res.data = res.data.data;
      return res;
    },
    (err) => {
      // Do something with response error
      return Promise.reject(err);
    },
);

const Plugin: PluginObject<any> = {
  install: (Vue) => {
    Vue.$axios = _axios;
  },
};
Plugin.install = (Vue) => {
  Vue.$axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    $axios: {
      get() {
        return _axios;
      },
    },
  });
};

Vue.use(Plugin);

export default Plugin;
