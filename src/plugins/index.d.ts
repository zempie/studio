import Vue, { VueConstructor } from 'vue';
import { AxiosInstance } from 'axios';
import RPC from './../api/rpc';


declare global {
  interface Window {
    axios: AxiosInstance
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance,
    $rpc: RPC,
  }
  interface VueConstructor {
    $axios: AxiosInstance
    $rpc: RPC,
  }
}
