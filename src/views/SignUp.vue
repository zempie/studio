<template>
    <div class="signup">
        <content-box>
            <h5>스튜디오 프로필</h5>
            <content-box-block title="스튜디오 이름">
                <q-input counter maxlength="50"
                         v-model="name"
                         :error="!!nameErrorMessage"
                         :error-message="nameErrorMessage"
                         @input="nameErrorMessage=''"
                />
                <div class="hintText">
                    스튜디오 이름은 애플리케이션 이름 아래에 공개적으로 표시됩니다.
                </div>
            </content-box-block>
            <content-box-line></content-box-line>
            <content-box-block title="스튜디오 이미지">
                <content-box-block-image-uploader
                    :defaultSrc="defaultImgSrc"
                    text="이미지 업로드"
                    v-on:@file="( file )=>{ imgFile = file }"
                >
                </content-box-block-image-uploader>
            </content-box-block>
        </content-box>
        <div class="fixed">
            <q-btn class="saveButton" color="primary" @click="save">가입</q-btn>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import ContentBox from "@/components/layout/contentBox.vue";
import ContentBoxBlock from "@/components/layout/contentBoxBlock.vue";
import ContentBoxLine from "@/components/layout/contentBoxLine.vue";
import ContentBoxBlockImageUploader from "@/components/layout/contentBoxBlockImageUploader.vue";
import store from "@/store";
import * as firebase from "firebase";
import {ErrorMessage} from "@/scripts/errorMessge";
import {evaAward} from "@quasar/extras/eva-icons";

@Component({
    components: {
        ContentBoxBlockImageUploader,
        ContentBoxLine, ContentBoxBlock, ContentBox}
})
export default class SignUp extends Vue {

    private name : string = '';
    private defaultImgSrc : string = '';
    private imgFile : File = null;
    private nameErrorMessage : string = '';

    async mounted() {
        const currentUser = firebase.auth().currentUser;
        const idToken = await currentUser.getIdToken(true);

        const params = {
            authorization : `Bearer ${idToken}`
        }
        const {user} = await this.$rpc.requestRpc('get-user-info', params);
        console.log( user );

        this.name = user.name;
        this.defaultImgSrc = user.picture;

    }


    async save() {
        if( !this.name ) {
            this.nameErrorMessage = ErrorMessage.INPUT_NAME;
            return;
        }

        this.$store.commit('ajaxBar', true);
        const result = await this.$http.createDev( this.name, this.imgFile );
        this.$store.commit('ajaxBar', false);

        this.$store.commit('developer', result);

        this.$router.push('/studio').catch(() => {
        });
    }

}
</script>

<style scoped lang="scss">
    .signup {
        margin-top: 20px;
    }

    .fixed {
        width: 100%;
        height: 70px;
        background-color: white;
        position: fixed;
        bottom: 0;
        left: 0;
        text-align: right;

        .saveButton {
            margin: 20px 20px 0 0;
        }
    }

</style>