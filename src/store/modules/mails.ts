import Vue from 'vue';

export default {
    state: {

        limit : 20,
        mails : [],
        mailPopupMobile : false,
    },
    getters: {
        mails : ( state : any ) => {
            return state.mails;
        },
        mailPopupMobile(state: any) {
            return state.mailPopupMobile;
        },
    },

    mutations: {
        mails : ( state : any, payload : any ) => {
            state.mails = payload;
        },
        setMailContent : ( state : any, payload : any ) => {
            let mail = state.mails.find((mail) => mail.id == payload.id);
            mail.content = payload.content;
            state.mails = state.mails.map(x=>x);
        },
        deleteMail : ( state : any, payload : any ) => {
            state.mails = state.mails.filter( mail => mail.id != payload.id );
        },
        mailPopupMobile(state: any, payload: boolean) {
            state.mailPopupMobile = payload;
        },
    },
    actions: {
        loadMails : async (context: any) => {
            const result = await Vue.$http.mails();
            if( !result || result.error ) {
                result && result.error && console.error( result.error );
                context.commit('mails', []);
                return [];
            }
            let { mails } = result;
            context.commit('mails', mails);
            return mails;
        }
    }
}

