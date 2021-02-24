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
    },

    mutations: {
        mails : ( state : any, payload : any ) => {
            state.mails = payload;
        },
        setMailContent : ( state : any, payload : any ) => {
            let mail = state.mails.find((mail) => mail.id == payload.id);
            mail.content = payload.content;
            mail.open = true;
            state.mails = state.mails.map(x=>x);
        },
        deleteMail : ( state : any, payload : any ) => {
            state.mails = state.mails.filter( mail => mail.id != payload.id );
        },
        addMail : ( state : any, payload : any ) => {
            state.mails.unshift( payload );
        },
        clearMail : ( state : any, payload : any ) => {
            state.mails = [];
        },
        openMail : ( state : any, payload : any ) => {
            let mail = state.mails.find((mail) => mail.id == payload.id);
            mail.open = true;
            state.mails = state.mails.map(x=>x);
        },
        closeMail : ( state : any, payload : any ) => {
            let mail = state.mails.find((mail) => mail.id == payload.id);
            mail.open = false;
            state.mails = state.mails.map(x=>x);
        },
        mailPopupMobile(state: any) {
            return state.mailPopupMobile;
        },
    }
    ,
    actions: {
        loadMails : async ( context: any ) => {
            const result = await Vue.$http.mails();
            if( !result || result.error ) {
                result && result.error && console.error( result.error );
                context.commit('mails', []);
                return [];
            }
            let { mails } = result;

            if( context.state.mails.length === 0 ) {
                mails = mails.map( mail => {
                    mail.open = false;
                    return mail;
                } )
                context.commit('mails', mails);
            } else {
                const mailIds = context.getters.mails.map((mail) => mail.id);
                const newMails = mails.filter((mail) => !mailIds.includes(mail.id));
                for( let i = 0; i < newMails.length; i++ ) {
                    const mail = newMails[i];
                    mail.open = false;
                    context.commit('addMail', mail);
                }
            }

            return mails;
        },
        deleteMail : async ( context : any, { id } ) => {
            const result = await Vue.$http.deleteMail( id );
            if( !result || result.error ) {
                result && result.error && console.error( result.error );
            }
            context.commit('deleteMail', { id });
        },
        mailPopupMobile(state: any, payload: boolean) {
            state.mailPopupMobile = payload;
        },
    }
}
