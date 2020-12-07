<template>
    <div class="signup">
        <content-box>
            <div class="text-h5 q-mb-sm">
                개발자 등록 페이지
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
                    title="개발자 이용약관 동의"
                    prefix="1"
                >
                    <div class="stepTitle">
                        개발자 이용약관
                    </div>
                    <div class="MAB20">
                        Zempie studio 가입을 위해서는 아래 '이용약관' 및 '개인정보 수집 및 이용'을 읽고, 동의해 주시기 바랍니다.
                    </div>
                    <tos v-on:@agree="onAgree">

                    </tos>

                </q-step>

                <q-step
                    :name="2"
                    title="개발자 정보 확인"
                    prefix="2"
                >
                    <div class="stepTitle">
                        개발자 정보 확인
                    </div>
                    <div class="MAB20">
                        연락처 정보를 확인해 주세요.
                    </div>
                    <div class="BLINE MAB40"></div>
                    <content-box-block title="이메일 주소" class="MAB40">
                        <q-input hint="이 정보는 Zempie에서 연락을 드리는 데 사용됩니다." readonly v-model="email">
                            <template v-slot:append>
                                <div v-if="verifyEmail" class="q-ml-md bg-grey-9 q-px-md appendBox text-no-wrap">
                                    인증 완료
                                </div>
                                <div v-else>
                                    <div v-if="!loadingEmail">
                                        <q-btn color="grey-9"  @click="requestEmail">
                                            인증 요청
                                        </q-btn>
                                    </div>
                                    <div v-else>
                                        <q-btn color="grey-9" class="q-mr-sm"  @click="requestEmail">
                                            다시 요청
                                        </q-btn>
                                        <q-btn color="grey-9"  @click="confirmEmail">
                                            인증 확인
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
                        <q-btn :loading="loading" :disable="!verifyEmail" class="MAR10" color="light-blue" label="등록" @click="signup" />
                    </fixed-bottom>
                </q-step>

                <q-step
                    :name="3"
                    title="개발자 등록 완료"
                    prefix="3"
                    icon="add_comment"
                >
                    <div class="text-center">
                        <div style="margin: 0 auto; width: 50%">
                            <q-img src="img/img-zempie-screen.png"></q-img>
                        </div>


                        <div class="q-my-xl text-h6">
                            축하합니다! 이제 Zempie에 게임 업로드를 신청할 수 있습니다.
                        </div>

                        <q-btn class="q-mb-xl" color="primary" @click="goToAddGame">게임 업로드 하러 가기</q-btn>
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
            this.$store.getters.user.is_developer = true;
            this.step = 3;
        }

        this.loading = false;
    }

    async save() {
        this.step++;
    }

    async goToAddGame() {
        await this.$router.replace( '/addGame' )
    }

    async requestEmail() {
        this.loadingEmail = true;

        try {
            await firebase.auth().currentUser.sendEmailVerification();
            alert('인증 메일을 보냈습니다. 등록된 메일함을 확인해 주세요.');
        }
        catch (e) {
            alert('메일을 보낼 수 없습니다. 잠시 후 다시 시도해주세요.');
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
            alert( '이메일이 인증되지 않았습니다. 메일을 확인해주세요.' );
        }
    }

}
</script>

<style scoped lang="scss">
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