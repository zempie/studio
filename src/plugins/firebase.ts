import * as firebase from 'firebase/app';
import 'firebase/messaging';
import 'firebase/auth'
import store from './../store';
import Vue from 'vue';
import {LoginState} from "@/store/modules/user";
import Login from "./../scripts/login";

const firebaseConfig = {
    apiKey: "AIzaSyAXt32ipLLoSlyijdCKAMSpapooo7wbTTE",
    authDomain: "zempie.firebaseapp.com",
    databaseURL: "https://zempie.firebaseio.com",
    projectId: "zempie",
    storageBucket: "zempie.appspot.com",
    messagingSenderId: "235654438895",
    appId: "1:235654438895:web:03bb6a5b89826f37c9601a",
    measurementId: "G-Z3JMFZBKM3"
};
const dev_firebaseConfig = {
    apiKey: "AIzaSyAE2WeLg2L9n2niQMysGbXzACLNIXd5msE",
    authDomain: "zempie-dev.firebaseapp.com",
    projectId: "zempie-dev",
    storageBucket: "zempie-dev.appspot.com",
    messagingSenderId: "797641160577",
    appId: "1:797641160577:web:3c10f8e96f7827d2645a80",
    measurementId: "G-NFY628EX60"
};

firebase.initializeApp(process.env.VUE_APP_FIRESTORE_CONFIG === 'development' ? dev_firebaseConfig : firebaseConfig);
initAuth();

function initAuth() {
    firebase.auth().onAuthStateChanged( Login.autoLogin );
}



// async function onAuthStateChanged( user : any ) {
//     const currentUser = firebase.auth().currentUser;
//     console.log( currentUser );
//
//     if ( currentUser ) {
//         const idToken = await currentUser.getIdToken(true);
//         store.commit('idToken', idToken );
//
//         const result = await Vue.$http.getUserInfo();
//
//         if( result.error ) {
//             if( result.error === "유저 정보를 찾을 수 없습니다." ) {
//                 store.commit('loginState', LoginState.no_user);
//             }
//             else {
//                 alert( result.error.message );
//             }
//             return;
//         }
//
//         const { user } = result;
//         store.commit('user', user);
//
//         if( user.is_developer ) {
//             store.commit('loginState', LoginState.login);
//         }
//         else {
//             store.commit('loginState', LoginState.login_noAuth);
//         }
//     }
//     else {
//         store.commit('loginState', LoginState.logout);
//         store.commit('idToken', undefined);
//     }
// }

// export {
//     onAuthStateChanged
// }