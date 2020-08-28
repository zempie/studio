enum LoginState {
    none,//초기화중
    logout,
    login_noAuth,
    login,
}

export default {
    state : {
        loginState : LoginState.none,
        idToken : undefined,
        developer : null
    },
    getters : {
        loginState( state ) {
            return state.loginState;
        },

        isLoginNoAuth( state ) {
            return state.loginState === LoginState.login_noAuth;
        },

        isLogin( state ) {
            return state.loginState === LoginState.login;
        },

        idToken( state ) {
            return state.idToken;
        },

        developer( state ) {
            return state.developer;
        }
    },

    mutations : {
        loginState( state, payload ) {
            state.loginState = payload;
        },

        isLogin( state, payload ) {
            state.isLogin = payload;
        },

        idToken( state, payload ) {
            state.idToken = payload;
        },

        developer( state, payload ) {
            state.developer = payload;
        }
    },

    actions : {
        async isLogin( context : any ) {
            return new Promise( ( resolve, reject ) => {
                function wait() {
                    if( context.state.loginState === LoginState.none ) {
                        setTimeout( wait, 500 );
                    }
                    else {
                        return resolve( context.getters.isLogin );
                    }
                }
                wait();
            } )
        }
    }
}


export {LoginState};
