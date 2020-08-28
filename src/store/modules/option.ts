export default {
    state : {
        pageName : '',
        ajaxBar : false,
    },
    getters : {
        pageName(state) {
            return state.pageName;
        },
        ajaxBar(state) {
            return state.ajaxBar;
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