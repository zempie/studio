import firebase from 'firebase/app';
import {LoginState} from "@/store/modules/user";
import Cookie from "./cookie";
import Vue from "vue";
import _store from './../store';

const cookieName = 'ZempieCookie';

class Login {

    static async autoLogin() {
        if( _store.getters.loginState === LoginState.none ) {
            const currentUser = firebase.auth().currentUser;
            if ( currentUser ) {
                const idToken = await currentUser.getIdToken(true);
                _store.commit('idToken', idToken);
                console.log(idToken);

                const cookie = Cookie.read( cookieName );
                if( cookie ) {
                    const result = await Vue.$http.getUserInfo();
                    if( !result || result.error ) {
                        await Login.logout();
                    }
                    else {
                        const { user } = result;
                        _store.commit('user', user);
                        await Login.login();
                    }
                }
                else {
                    await Login.logout();
                }
            }
            else {
                const cookie = Cookie.read(cookieName);
                if( cookie ) {
                    const result = await Vue.$http.session();
                    console.log(result);
                    if( !result || result.error ) {
                        await Login.logout();
                    }
                    else {
                        const { customToken } = result;
                        _store.commit('loginState', LoginState.customToken );
                        await firebase.auth().signInWithCustomToken( customToken );
                    }
                }
                else {
                    await Login.logout();
                }
            }
        }
        else if( _store.getters.loginState === LoginState.customToken ) {
            const currentUser = firebase.auth().currentUser;
            const idToken = await currentUser.getIdToken(true);
            _store.commit('idToken', idToken);
            console.log(idToken);
            const result = await Vue.$http.getUserInfo();
            if( !result || result.error ) {
                await Login.logout();
            }
            else {
                const { user } = result;
                _store.commit('user', user);
                await Login.login();
            }
        }
    }

    static async login() {
        _store.commit('loginState', LoginState.login );
        Cookie.write( cookieName, 'true', 30, process.env.VUE_APP_COOKIE_DOMAIN );
    }

    static async logout() {
        await firebase.auth().signOut();
        await _store.dispatch('logout');
        Cookie.delete( cookieName, process.env.VUE_APP_COOKIE_DOMAIN );
    }

}

export default Login;
