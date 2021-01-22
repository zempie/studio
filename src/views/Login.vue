<template>
    <div>
<!--        <h2 style="text-align: center; color: #00b4ff; font-weight: bold">-->
<!--            ZEMPIE STUDIO-->
<!--        </h2>-->


<!--        <div class="inputBox">-->
<!--            <div class="icon">-->
<!--                <i class="ri-mail-fill"></i>-->
<!--            </div>-->
<!--            <div class="input">-->
<!--                <input ref="id" placeholder="Email">-->
<!--            </div>-->
<!--        </div>-->
<!--        <div class="inputBox">-->
<!--            <div class="icon">-->
<!--                <i class="ri-lock-fill"></i>-->
<!--            </div>-->
<!--            <div class="input">-->
<!--                <input ref="pass" type="password" placeholder="Password">-->
<!--            </div>-->
<!--        </div>-->
<!--        <button class="button loginButton" :disabled="!isLogin" @click="email">Log in</button>-->
<!--&lt;!&ndash;        <div class="forgot"><router-link to="/resetps">Forgot your password?</router-link></div>&ndash;&gt;-->
<!--&lt;!&ndash;        <button class="button loginButton" style="margin-top: 40px" @click="signup">Sign up with email</button>&ndash;&gt;-->
<!--        <button class="button facebookButton" style="margin-top: 40px" @click="facebook"><i class="ri-facebook-circle-fill"></i><span>Continue with Facebook</span></button>-->
<!--        <button class="button googleButton" style="margin-top: 20px" @click="google"><i class="ri-google-fill"></i><span>Continue with Google+</span></button>-->
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import firebase from "firebase";
    import {LoginState} from "@/store/modules/user";
    import {UrlHelper} from "@/scripts/util";
    // import {onAuthStateChanged} from "@/plugins/firebase";

    @Component({
        components: {}
    })
    export default class Login extends Vue {
        private isLogin : boolean = false;

        mounted() {
            this.$store.state.pathName = 'login';

            // const id = this.$refs.id as HTMLInputElement;
            // const pass = this.$refs.pass as HTMLInputElement;
            //
            // id.addEventListener('keyup', ()=>{
            //     this.isLogin = !!id.value && !!pass.value;
            // });
            // pass.addEventListener('keyup', ()=>{
            //     this.isLogin = !!id.value && !!pass.value;
            // });
            //
            // if( this.$store.getters.user ) {
            //     this.$router.replace( '/' );
            // }


            const url = UrlHelper.addParameter( process.env.VUE_APP_LOGIN_URL, 'z_redirect_url', process.env.VUE_APP_BASE_URL );

            window.location.href = url;
        }


        // async email() {
        //     this.$store.commit('loginState', LoginState.none);
        //     const id = this.$refs.id as HTMLInputElement;
        //     const pass = this.$refs.pass as HTMLInputElement;
        //
        //     try {
        //         const obj = await firebase.auth().signInWithEmailAndPassword(id.value, pass.value);
        //         if( obj && obj.user ) {
        //             await this.waitLogin();
        //         }
        //         else {
        //             alert('실패!!');
        //         }
        //     }
        //     catch (e) {
        //         const {code} = e;
        //
        //         switch (code) {
        //             case 'auth/invalid-email':
        //                 break;
        //
        //             case 'auth/weak-password':
        //                 break;
        //
        //             case 'auth/user-not-found':
        //                 break;
        //         }
        //
        //         alert( e );
        //     }
        // }
        //
        // async google() {
        //     try {
        //         this.$store.commit('loginState', LoginState.none);
        //
        //         const provider = new firebase.auth.GoogleAuthProvider();
        //         const result: any = await firebase.auth().signInWithPopup(provider);
        //
        //         // This gives you a Google Access Token. You can use it to access the Google API.
        //         const token = result.credential.accessToken;
        //         // The signed-in user info.
        //         const user = result.user;
        //
        //         await this.waitLogin();
        //
        //     }
        //     catch (error) {
        //         // Handle Errors here.
        //         const errorCode = error.code;
        //         const errorMessage = error.message;
        //         // The email of the user's account used.
        //         const email = error.email;
        //         // The firebase.auth.AuthCredential type that was used.
        //         const credential = error.credential;
        //
        //         alert( error );
        //     }
        // }
        //
        // async facebook() {
        //     try {
        //         const provider = new firebase.auth.FacebookAuthProvider();
        //         const result: any = await firebase.auth().signInWithPopup(provider);
        //
        //         // This gives you a Google Access Token. You can use it to access the Google API.
        //         const token = result.credential.accessToken;
        //         // The signed-in user info.
        //         const user = result.user;
        //     }
        //     catch (error) {
        //         // Handle Errors here.
        //         const errorCode = error.code;
        //         const errorMessage = error.message;
        //         // The email of the user's account used.
        //         const email = error.email;
        //         // The firebase.auth.AuthCredential type that was used.
        //         const credential = error.credential;
        //
        //         alert( error );
        //     }
        // }
        //
        // async waitLogin(retryCount : number = 0 ) {
        //
        //     const loginState = await this.$store.dispatch('loginState');
        //
        //     switch ( loginState ) {
        //         case LoginState.login : {
        //             this.$router.push('/studio').catch(() => {
        //             });
        //             break;
        //         }
        //         case LoginState.logout : {
        //             this.$router.push('/login').catch(() => {
        //             });
        //             break;
        //         }
        //         case LoginState.no_user : {
        //             const result = await this.$http.getUserInfo();
        //
        //             if( retryCount < 3 ) {
        //                 await onAuthStateChanged(null );
        //                 await this.waitLogin( ++retryCount );
        //             }
        //
        //             break;
        //         }
        //         case LoginState.login_noAuth : {
        //             this.$router.push('/signup').catch(() => {
        //             });
        //             break;
        //         }
        //     }
        // }
    }
</script>

<style scoped lang="scss">
    .inputBox {
        position: relative;
        margin: 40px auto;
        max-width: 540px;
        width: 90%;
        height: 48px;
        background-color: #F5F7F9;

        border-radius: 10px;
        line-height: 48px;

        .icon {
            position: absolute;
            display: inline-block;
            left: 15px;
            top: -3px;

            color: #9AA7B4;
            font-size: 24px;
        }

        .input {
            display: inline-block;
            padding: 0 20px 0 50px;
            box-sizing: border-box;

            width: 100%;


            input {
                border: 0;
                width: 100%;

                font-size: 20px;
                line-height: 20px;
                background-color: inherit;

                &:focus {
                    outline: 0;
                }

                &::placeholder {
                    color: #9AA7B4;
                }
            }
        }
    }

    .button {
        display: block;
        margin: 0 auto;
        max-width: 540px;
        width: 90%;
        height: 48px;

        border: 0;
        background-color: #2AC940;
        border-radius: 10px;
        color: white;
        font-size: 20px;

        &::selection {
            outline: 0;
        }
    }

    .loginButton {
        background-color: #2AC940;
        &:hover {
            background-color: #21ba36;
        }

        &:active {
            background-color: #17b42d;
        }

        &:disabled {
            background-color: #8dea9c;
        }
    }

    .forgot {
        margin-top: 10px;
        text-align: center;
        font-size: 14px;
        a {
            color: #9AA7B4;
        }
    }

    .facebookButton {
        position: relative;
        background-color: #409FFF;

        i {
            position: absolute;
            font-size: 24px;
            margin: -2px 0 0 -20px;
        }

        span {
            margin-left: 20px;
        }


        &:hover {
            background-color: #308fe8;
        }

        &:active {
            background-color: #2c85e5;
        }
    }

    .googleButton {
        position: relative;
        background-color: #db4437;

        i {
            position: absolute;
            font-size: 24px;
            margin: -2px 0 0 -20px;
        }

        span {
            margin-left: 20px;
        }


        &:hover {
            background-color: #db3d2f;
        }

        &:active {
            background-color: #d5392b;
        }
    }
</style>