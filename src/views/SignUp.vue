<template>
    <div class="signup">
        <content-box>
            <div class="text-h5 q-mb-sm">
                  {{$t('signUp.signUpTitle')}}
            </div>


            <q-stepper
                v-model="step"
                ref="stepper"
                alternative-labels
                animated
                active-color="light-blue"
                class="stepper q-mb-xl"
            >
                <q-step
                    :name="1"
                    :title="$t('signUp.TermsOfService.stepTitle')"
                    prefix="1"
                >
                    <div class="stepTitle">
                         {{$t('signUp.TermsOfService.title')}}
                    </div>
                    <div class="MAB20">
                         {{$t('signUp.TermsOfService.agreement')}}
                    </div>
                    <tos v-on:@agree="onAgree">

                    </tos>

                </q-step>

                <q-step
                    :name="2"
                    :title="$t('signUp.developerInfo.stepTitle')"
                    prefix="2"
                >
                    <div class="stepTitle">
                        {{$t('signUp.developerInfo.title')}}
                    </div>
                    <div class="MAB20">
                        {{$t('signUp.developerInfo.contactConfirm')}}
                    </div>
                    <div class="BLINE MAB40"></div>
                    <content-box-block :title="$t('signUp.emailVerify.title')" class="MAB40">
                        <q-input :hint="$t('signUp.emailVerify.text')" readonly v-model="email">
                            <template v-slot:append>
                                <div v-if="verifyEmail" class="q-ml-md bg-grey-9 q-px-md appendBox text-no-wrap">
                                    {{$t('signUp.emailVerify.success')}}
                                </div>
                                <div v-else>
                                    <div v-if="!loadingEmail">
                                        <q-btn color="grey-9"  @click="requestEmail">
                                            {{$t('signUp.emailVerify.request')}}
                                        </q-btn>
                                    </div>
                                    <div v-else>
                                        <q-btn color="grey-9" class="q-mr-sm"  @click="requestEmail">
                                            {{$t('signUp.emailVerify.retry')}}
                                        </q-btn>
                                        <q-btn color="grey-9"  @click="confirmEmail">
                                            {{$t('signUp.emailVerify.confirm')}}
                                        </q-btn>
                                    </div>


                                </div>
                            </template>
                        </q-input>
                    </content-box-block>
<!--                    <content-box-block title="전화번호" class="MAB40">-->
<!--                        <q-input hint="더하기 기호, 국가 코드, 지역 번호를 포함하세요. 이 정보는 Zempie에서 연락하는 데 사용됩니다. "></q-input>-->
<!--                    </content-box-block>-->
                    <div class="BLINE"></div>
                    <fixed-bottom>
                        <q-btn :loading="loading" :disable="!verifyEmail" class="MAR10" color="light-blue" :label="$t('signUp.register')" @click="signup" />
                    </fixed-bottom>
                </q-step>

                <q-step
                    :name="3"
                    :title="$t('signUp.registeredDeveloper.title')"
                    prefix="3"
                    icon="add_comment"
                >
                    <div class="text-center">
                        <div style="margin: 0 auto; width: 50%">
                            <q-img src="img/img-zempie-screen.png"></q-img>
                        </div>


                        <div class="q-my-xl text-h6">
                            {{$t('signUp.registeredDeveloper.desc')}}
                        </div>

                        <router-link to="/addGame">
                            <q-btn class="q-mb-xl" color="primary">{{$t('signUp.registeredDeveloper.addGame')}}</q-btn>
                        </router-link>

                    </div>

                </q-step>
            </q-stepper>
            <div class="q-pb-xl"></div>

        </content-box>



    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import ContentBox from "@/components/layout/contentBox.vue";
import ContentBoxBlock from "@/components/layout/contentBoxBlock.vue";
import ContentBoxLine from "@/components/layout/contentBoxLine.vue";
import ContentBoxBlockImageUploader from "@/components/layout/contentBoxBlockImageUploader.vue";
import * as firebase from "firebase";
import {ErrorMessage} from "@/scripts/errorMessge";
import Tos from "@/components/tos.vue";
import FixedBottom from "@/components/fixedBottom.vue";
import {LoginState} from "@/store/modules/user";

@Component({
    components: {
        FixedBottom,
        Tos,
        ContentBoxLine,
        ContentBoxBlock,
        ContentBox
    }
})
export default class SignUp extends Vue {

    private email : string = ''
    private verifyEmail : boolean = false;
    private phoneNumber : string = '';
    private step : number = 1;
    private requestSignup : boolean = false;

    private loading : boolean = false;
    private loadingEmail : boolean = false;

    async mounted() {
        // const currentUser = firebase.auth().currentUser;
        // const idToken = await currentUser.getIdToken(true);
        //
        // const params = {
        //     authorization : `Bearer ${idToken}`
        // }
        // const {user} = await this.$rpc.requestRpc('get-user-info', params);
        // console.log( user );

        const loginState = await this.$store.dispatch('loginState');
        if( loginState === LoginState.logout ) {

        }
        else {
            // console.log(this.$store.getters.user);
            this.email = this.$store.getters.user.email;
            this.verifyEmail = this.$store.getters.user.email_verified;
        }


    }

    onAgree(marktPrAgreAtChk) {
        this.step = 2;
    }

    async signup() {

        this.loading = true;
        // this.requestSignup = true;
        // const picture = this.$store.getters.user.picture;
        const result = await this.$http.signupDev();
        if( !result || result.error ) {
            result && result.error && alert( result.error );
            console.error( result && result.error || 'error' );
        }
        else {


            const currentUser = firebase.auth().currentUser;
                if (currentUser) {
                    const idToken = await currentUser.getIdToken(true);
                    this.$store.commit('idToken', idToken);
                }
                
            this.$store.getters.user.is_developer = true;
            this.step = 3;
        }

        this.loading = false;
    }

    async save() {
        this.step++;
    }

    async requestEmail() {
        this.loadingEmail = true;

        try {
            await firebase.auth().currentUser.sendEmailVerification();
            alert(this.$t('signUp.emailVerify.sendEmailText').toString());
        }
        catch (e) {
            alert(this.$t('signUp.error.sendEmail').toString());
        }


    }

    async confirmEmail() {
        await firebase.auth().currentUser.reload();
        // console.log(firebase.auth().currentUser.emailVerified);
        if(firebase.auth().currentUser.emailVerified) {
            const result = await this.$http.verifyEmail();
            this.verifyEmail = true;
        }
        else {
            alert(this.$t('signUp.error.verifyEmil').toString());
        }
    }

}
</script>

<style scoped lang="scss">
    a {
        color: inherit;
        text-decoration: none;
    }

    .signup {
        margin-top: 20px;

        .stepper {
            box-shadow: none;

            .stepTitle {
                font-size: 20px;
                font-weight: 400;
                margin-bottom: 10px;
            }
        }
    }

</style>