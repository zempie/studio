export default {
    state : {
        pageName : '',
        ajaxBar : false,
        zempieUrl : process.env.VUE_APP_ZEMPIE_URL,
        supportUrl : process.env.VUE_APP_SERVICE_CENTER_URL,
    },
    getters : {
        pageName(state) {
            return state.pageName;
        },
        ajaxBar(state) {
            return state.ajaxBar;
        },
        zempieUrl(state) {
            return state.zempieUrl;
        },
        supportUrl(state) {
            return state.supportUrl;
        },
    },

    mutations : {
        pageName( state, payload ) {
            state.pageName = payload;
        },
        ajaxBar( state, payload ) {
            state.ajaxBar = payload;
        },
    },

    actions : {

    }
}