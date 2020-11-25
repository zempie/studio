import firebase from "firebase";
import Vue from "vue";

enum LoginState {
    none,//초기화중,
    customToken,               //커스텀 토큰 발급
    logout,
    login_noAuth,       //개발자 등록 안함
    login,
    no_user             //회원가입 안함
}

export default {
    state: {
        loginState: LoginState.none,
        idToken: undefined,
        // developer: null,
        user: null,
        redirectUrl : null,
    },
    getters: {
        loginState(state: any) {
            return state.loginState;
        },

        isLoginNoAuth(state: any) {
            return state.loginState === LoginState.login_noAuth;
        },

        isNoUser(state: any) {
            return state.loginState === LoginState.no_user;
        },

        isLogin(state: any) {
            return state.loginState === LoginState.login;
        },

        idToken(state: any) {
            return state.idToken;
        },

        // developer(state: any) {
        //     return state.developer;
        // },

        user(state: any) {
            return state.user;
        },

        redirectUrl(state: any) {
            return state.redirectUrl;
        },
    },

    mutations: {
        loginState(state: any, payload: any) {
            state.loginState = payload;
        },

        isLogin(state: any, payload: any) {
            state.isLogin = payload;
        },

        idToken(state: any, payload: any) {
            state.idToken = payload;
        },

        redirectUrl(state: any, payload: any) {
            state.redirectUrl = payload;
        },

        // developer(state: any, payload: any) {
        //     state.developer = payload;
        // },
        async user(state: any, payload: any) {
            state.user = payload;

            if( state.user && !state.user.email_verified && firebase.auth().currentUser.emailVerified ) {
                await Vue.$http.verifyEmail();
                state.user.email_verified = true;
            }
        },
        userInfoUpdate(state: any, payload : any) {
            if( payload.name ) {
                state.user.name = payload.name;
            }
            if( payload.picture ) {
                state.user.picture = payload.picture;
            }
            if( payload.state_msg ) {
                state.user.profile.state_msg = payload.state_msg;
            }
            if( payload.channel_id ) {
                state.user.channel_id = payload.channel_id;
            }
            if( payload.url_banner ) {
                state.user.profile.url_banner = payload.url_banner;
            }
        },
    },

    //dispatch
    actions: {
        async loginState(context: any) {
            return new Promise((resolve, reject) => {
                function wait() {
                    if (context.state.loginState === LoginState.none
                        || context.state.loginState === LoginState.customToken ) {
                        setTimeout(wait, 500);
                    } else {
                        return resolve(context.getters.loginState);
                    }
                }

                wait();
            })
        },
        // async login( context: any ) {
        //     const user = await Vue.$api.user();
        //
        // },
        async logout(context: any) {
            await firebase.auth().signOut();
            context.commit('user', null);
            context.commit('idToken', null);
            // context.commit('developer', null);
            context.commit('loginState', LoginState.logout);
        }
    }
}


export {LoginState};
