import * as firebase from 'firebase/app';
import 'firebase/messaging';
import 'firebase/auth'
import store from './../store';
import Vue from 'vue';
import {LoginState} from "@/store/modules/user";

let firebaseConfig = {
    apiKey: 'AIzaSyB1CgghEsLYQpzuNxhSbPldQ2H-uN2z7AM',
    authDomain: 'zemini.firebaseapp.com',
    databaseURL: 'https://zemini.firebaseio.com',
    projectId: 'zemini',
    storageBucket: 'zemini.appspot.com',
    messagingSenderId: '382409597816',
    appId: '1:382409597816:web:8e5682e47f05d169221e8d'
};
firebase.initializeApp(firebaseConfig);
initAuth();

function initAuth() {
    firebase.auth().onAuthStateChanged( onAuthStateChanged );
}

async function onAuthStateChanged( user : any ) {
    const currentUser = firebase.auth().currentUser;
    console.log( currentUser );

    if ( currentUser ) {
        const idToken = await currentUser.getIdToken(true);
        store.commit('idToken', idToken );

        const result = await Vue.$rpc.getDev();
        const dev = result.developer;
        const user = result.user;

        if( user ) {
            store.commit( 'user', user );
        }

        if( result && result.error ) {
            if( result.error.message === "유저 정보를 찾을 수 없습니다." ) {
                store.commit('loginState', LoginState.no_user);
            }
            else {
                alert( result.error.message );
            }
        }
        else if( dev ) {
            store.commit('loginState', LoginState.login);
            store.commit( 'developer', dev );
        }
        else {
            store.commit('loginState', LoginState.login_noAuth);
        }
    }
    else {
        store.commit('loginState', LoginState.logout);
        store.commit('idToken', undefined);
    }
}

export {
    onAuthStateChanged
}