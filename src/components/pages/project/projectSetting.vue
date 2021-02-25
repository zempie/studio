<template>
    <div class="q-pa-lg">
        <content-box>
            <div class="text-h6 q-mb-lg">
                게임 세부 정보
            </div>
            <content-box-block class="q-my-xl" title="게임 제목">
                <q-input :error="titleError !== ''" :error-message="titleError" counter maxlength="50" v-model="title" @change="(str)=>{ if( str ){ titleError = '' } }" />
            </content-box-block>
            <content-box-block class="q-mb-xl" title="자세한 설명">
                <q-input type="textarea" counter maxlength="2000" v-model="description"/>
            </content-box-block>
            <content-box-block class="q-mb-xl" title="태그">
                <q-input counter maxlength="255" :error="hashtagsError !== ''" :error-message="hashtagsError" v-model="hashtags" @change="onChangeHashtags"/>
                <div class="hintText">
                    게임을 나타낼 수 있는 단어를 태그로 설정하세요. 여러 개를 사용하는 경우 쉼표로 구분해 주세요.
                </div>
            </content-box-block>
            <content-box-block class="q-mb-xl" title="썸네일 이미지">
                <content-box-block-image-uploader :default-src="imgUrl" v-on:@file="(file)=>{thumbFile = file;}" text="이미지 업로드" limit-size="4">
                </content-box-block-image-uploader>
                <div class="hintText">
                    512*340 사이즈의 JPEG, PNG 파일을 업로드 해주세요. (최대 4MB)
                </div>
            </content-box-block>
            <content-box-block class="q-mb-xl" title="미리보기 이미지">
                <content-box-block-image-uploader-g-i-f :default-src="imgUrl2" v-on:@file="(file)=>{thumbFile2 = file;}" text="이미지 업로드" limit-size="10">
                </content-box-block-image-uploader-g-i-f>
                <div class="hintText">
                    512*340 사이즈의 GIF 파일을 업로드 해주세요. (최대 10MB)
                </div>
            </content-box-block>
            <content-box-block class="q-mb-xl" title="접속 아이디">
                <q-input v-model="gamePath" readonly />
            </content-box-block>
            <content-box-block class="q-mb-xl" title="게임 아이디">
                <q-input v-model="gameId" readonly />
            </content-box-block>
            <content-box-line></content-box-line>
            <content-box-block title="게임 삭제" class="q-mb-xl">
                <div class="hintText">
                    한 번 삭제한 게임은 복구할 수 없습니다.
                </div>
                <div class="text-right">
                    <q-btn @click="deleteProject">삭제</q-btn>
                </div>
            </content-box-block>
        </content-box>
        <fixed-bottom>
            <q-btn class="q-mr-md" color="primary" :loading="wait" @click="save">저장</q-btn>
        </fixed-bottom>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import {FileLoader} from "@/common/fileLoader";
    import ContentBox from "@/components/layout/contentBox.vue";
    import ContentBoxBlock from "@/components/layout/contentBoxBlock.vue";
    import ContentBoxBlockImageUploader from "@/components/layout/contentBoxBlockImageUploader.vue";
    import FixedBottom from "@/components/fixedBottom.vue";
    import ContentBoxLine from "@/components/layout/contentBoxLine.vue";
    import {Notify} from "quasar";
    import {verifyHashtags} from "@/scripts/verifyHashtag";
    import ContentBoxBlockImageUploaderGIF from "@/components/layout/contentBoxBlockImageUploaderGIF.vue";

    @Component({
        components: {
            ContentBoxBlockImageUploaderGIF,
            ContentBoxLine,
            FixedBottom,
            ContentBoxBlockImageUploader,
            ContentBoxBlock,
            ContentBox

        }
    })
    export default class ProjectSetting extends Vue {

        @Prop() private projectId! : number;

        private title : string = '';
        private titleError : string = '';

        private description : string = '';

        private hashtags : string = '';
        private hashtagsError : string = '';

        private thumbFile : File = null;
        private imgUrl : string = '';


        private thumbFile2 : File = null;
        private imgUrl2 : string = '';


        private gamePath : string = '';

        private gameId : string = '';

        private wait : boolean = false;

        async mounted() {
            this.$store.commit('pageName', '설정');

            let project = await this.$store.dispatch( 'project', this.projectId );
            // console.log( project );
            this.title = project.name;
            this.description = project.description;
            this.imgUrl = project.picture;
            this.imgUrl2 = project.picture2;
            this.gameId = project.id;
            this.gamePath = project && project.game && project.game.pathname || '';
            this.hashtags = project.hashtags;
        }

        private onChangeHashtags() {
            if( this.hashtags === '' ) {
                this.hashtagsError = '';
            }
            else {
                this.hashtagsError = verifyHashtags( this.hashtags );
            }
        }


        async save() {

            if( this.wait || this.hashtagsError ) {
                return;
            }


            this.wait = true;

            const option : any = {
                id : this.projectId,
            }
            if( this.title ) {
                option.name = this.title;
            }
            if( this.description ) {
                option.description = this.description;
            }
            if( this.hashtags ) {
                option.hashtags = this.hashtags;
            }


            this.$store.commit('ajaxBar', true);
            this.$q.loading.show({
                message: '잠시만 기다려 주세요.'
            });
            const result = await this.$http.updateProject( option, this.thumbFile, this.thumbFile2 );
            this.$store.commit('ajaxBar', false);
            this.$q.loading.hide();

            if( !result || result.error ) {
                Notify.create({
                    message : result && result.error || '실패하였습니다.',
                    position : 'top',
                    color : 'negative',
                    timeout: 2000
                });
                console.error( result && result.error );
            }
            else {
                Notify.create({
                    message : '저장되었습니다.',
                    position : 'top',
                    color : 'primary',
                    timeout: 2000
                });

                if( option.name ) {

                }
                if( option.description ) {

                }
                if( option.hashtags ) {

                }
                if(this.thumbFile) {

                }
                if(this.thumbFile2) {

                }

            }
            this.wait = false;
        }

        async deleteProject() {
            if( this.wait ) {
                return;
            }

            const ok = confirm( '한 번 삭제한 게임은 복구할 수 없습니다. 정말 삭제하시겠습니까?' );
            if( ok ) {
                this.wait = true;
                const result = await this.$http.deleteProject( this.projectId );
                this.wait = false;

                if( !result || result.error ) {
                    Notify.create({
                        message : result && result.error || '게임을 삭제하는데 실패하였습니다.',
                        position : 'top',
                        color : 'negative',
                        timeout: 2000
                    });
                    console.error( result && result.error );
                }
                else {
                    this.$store.getters.projects[ this.projectId ] = null;
                    await this.$router.replace( '/studio' );
                }
            }
            else {

            }
        }
    }
</script>

<style scoped lang="scss">

</style>