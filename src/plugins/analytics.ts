import Vue from 'vue';
import VueGtag from "vue-gtag";
import router from './../router';

Vue.use(VueGtag,{
    config:{
        id: process.env.VUE_APP_GA_ENV === 'production' ? 'G-HDLWZYZFBD' : 'G-TF16DY55JN'
    },
}, router);
