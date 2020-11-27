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
            <content-box-block class="q-mb-xl" title="썸네일 이미지">
                <content-box-block-image-uploader :default-src="imgUrl" v-on:@file="(file)=>{thumbFile = file;}" text="이미지 업로드" limit-size="4">
                </content-box-block-image-uploader>
                <div class="hintText">
                    정사각형 모양의 JPEG, PNG 파일을 업로드 해주세요. ( 최대 4MB )
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
                    한번 삭제한 게임은 북구 할 수 없습니다.
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

    @Component({
        components: {
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

        private thumbFile : File = null;
        private imgUrl : string = '';

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
            this.gameId = project.id;
            this.gamePath = project && project.game && project.game.pathname || '';
        }


        async save() {

            if( this.wait ) {
                return;
            }

            this.wait = true;

            const option : any = {
                id : this.projectId,
            }
            if( this.title ) {
                option.title = this.title;
            }
            if( this.description ) {
                option.description = this.description;
            }


            this.$store.commit('ajaxBar', true);
            const result = await this.$http.updateProject( option, this.thumbFile );
            this.$store.commit('ajaxBar', false);

            Notify.create({
                message : '저장 되었습니다.',
                position : 'top',
                color : 'primary',
                timeout: 2000
            });

            this.wait = false;
        }

        async deleteProject() {
            if( this.wait ) {
                return;
            }

            this.wait = true;
            const result = await this.$http.deleteProject( this.projectId );
            this.wait = false;

            if( result.error ) {

            }
            else {
                this.$store.getters.projects[ this.projectId ] = null;
                await this.$router.replace( '/studio' );
            }
        }
    }
</script>

<style scoped lang="scss">

</style>