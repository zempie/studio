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
                <content-box-block-image-uploader :default-src="imgUrl" v-on:@file="(file)=>{thumbFile = file;}" text="이미지 업로드"></content-box-block-image-uploader>
            </content-box-block>
            <content-box-block class="q-mb-xl" title="접속 아이디">
                <q-input v-model="gamePath" readonly />
            </content-box-block>
            <content-box-block class="q-mb-xl" title="게임 아이디">
                <q-input v-model="gameId" readonly />
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

    @Component({
        components: {
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
            console.log( project );
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
            this.wait = false;
        }
    }
</script>

<style scoped lang="scss">

</style>