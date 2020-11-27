import Vue from 'vue';
import VueAnalytics from 'vue-analytics'
import router from './../router';

Vue.use(VueAnalytics,{
    id: 'G-9Y6WQ70RQ2', // 콘솔에서 본인의 키를 확인하세요!
    router // 원활한 트래킹을 위해 router를 꼭 바인드 해 주어야 합니다!
})