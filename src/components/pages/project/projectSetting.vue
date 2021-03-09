<template>
    <div class="q-pa-lg">
        <content-box>
            <div class="text-h6 q-mb-lg">
                  {{$t('projectSetting.projectSettingText')}}
            </div>
            <content-box-block class="q-my-xl" :title="$t('projectSetting.title')" :star="'*'">
                <q-input :error="titleError !== ''" :error-message="titleError" counter maxlength="50" v-model="title" @change="(str)=>{ if( str ){ titleError = '' } }" />
            </content-box-block>
            <content-box-block class="q-mb-xl" :title="$t('projectSetting.description')" :star="'*'">
                <q-input type="textarea" counter maxlength="2000" v-model="description" :error="descError !== ''" :error-message="descError"/>
            </content-box-block>
            <content-box-block class="q-mb-xl" :title="$t('projectSetting.tag.title')" :star="'*'">
                <q-select
                    ref="hashtagsArr"
                    v-model="hashtagsArr"
                    multiple
                    use-chips
                    use-input
                    new-value-mode="add-unique"            
                    hide-dropdown-icon            
                    @input.native="createTagChip($event.target.value)"
                    @new-value="createValue"
                    :error="hashtagsError !== ''" :error-message="hashtagsError"
                >
                    <template v-slot:selected-item="scope">
                        <q-chip
                        removable              
                        @remove="scope.removeAtIndex(scope.index)"       
                        class="q-chip"
                        >
                        {{ scope.opt }}
                        </q-chip>
                    </template>
                </q-select>
                <!-- <q-input counter maxlength="255" :error="hashtagsError !== ''" :error-message="hashtagsError" v-model="hashtags" @change="onChangeHashtags"/> -->
               
               
                <div class="hintText">
                    {{$t('projectSetting.tag.rules')}}
                </div>
            </content-box-block>
            <content-box-block class="q-mb-xl" :title="$t('projectSetting.thumbnailImg.title')" :star="'*'">
                <content-box-block-image-uploader :default-src="imgUrl" v-on:@file="(file)=>{thumbFile = file;}" :text="$t('projectSetting.thumbnailImg.text')" limit-size="4">
                </content-box-block-image-uploader>
                 <div :class="thumbnailErr && !thumbFile? 'thumbnailErr' : 'thumbnailErr off'">{{$t('addGame.error.thumbnailBlank')}}</div>
                <div class="hintText">
                    {{$t('projectSetting.thumbnailImg.rules')}}
                </div>
            </content-box-block>
            <content-box-block class="q-mb-xl" :title="$t('projectSetting.previewImg.title')">
                <content-box-block-image-uploader-g-i-f :default-src="imgUrl2" v-on:@file="(file)=>{thumbFile2 = file;}" :text="$t('projectSetting.thumbnailImg.text')" limit-size="10">
                </content-box-block-image-uploader-g-i-f>
                <div class="hintText">
                 {{$t('projectSetting.previewImg.rules')}}
                </div>
            </content-box-block>
            <content-box-block class="q-mb-xl" :title="$t('projectSetting.gamePath')">
                <q-input v-model="gamePath" readonly />
            </content-box-block>
            <content-box-block class="q-mb-xl" :title="$t('projectSetting.gameId')">
                <q-input v-model="gameId" readonly />
            </content-box-block>
            <content-box-line></content-box-line>
            <content-box-block :title="$t('projectSetting.delete.title')" class="q-mb-xl">
                <div class="hintText">
                     {{$t('projectSetting.delete.rules')}}
                </div>
                <div class="text-right">
                    <q-btn @click="deleteProject"> {{$t('projectSetting.delete.btn')}}</q-btn>
                </div>
            </content-box-block>
        </content-box>
        <!-- <fixed-bottom>
            <q-btn class="q-mr-md" color="primary" :loading="wait" @click="save">저장</q-btn>
        </fixed-bottom> -->

         <!-- 저장 버튼 -->
        <content-box class="save-btn">
            <q-btn :loading="wait" color="primary" @click="save">{{$t('save')}}</q-btn>
        </content-box>
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
    import {verifySelectHashtags} from "@/scripts/verifySelectHashtags";
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
        private descError : string = '';

        private hashtags : string = '';
        private hashtagsError : string = '';

        private thumbFile : File = null;
        private thumbnailErr : boolean = false;
        private imgUrl : string = '';


        private thumbFile2 : File = null;
        private imgUrl2 : string = '';


        private gamePath : string = '';

        private gameId : string = '';

        private wait : boolean = false;

        
        private hashtagsArr: string[] = [];
        private inputValue: string =  '';
        private isShowTag: boolean =  false;

        async mounted() {
            this.$store.commit('pageName',  this.$t('projectSetting.toolbarTitle'));

            let project = await this.$store.dispatch( 'project', this.projectId );

            this.title = project.name;
            this.description = project.description;
            this.imgUrl = project.picture;
            this.imgUrl2 = project.picture2;
            this.gameId = project.id;
            this.gamePath = project && project.game && project.game.pathname || '';

            if(project.hashtags === ''){
                this.hashtagsArr =[];
            }else{

                this.hashtagsArr = project.hashtags.split(',');
            }
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
            let isError = false;

            const option : any = {
                id : this.projectId,
            }
            if( this.title ) {
                option.name = this.title;
            }else{
                 this.titleError = this.$t('addGame.error.blankTitle').toString();
                isError = true;
            }
            if( this.description ) {
                option.description = this.description;
            }else{
                this.descError = this.$t('addGame.error.blankDescription').toString();
                isError = true;
            }
            if(this.hashtagsArr.length === 0){
                this.hashtagsError = this.$t('addGame.error.blankHashtag').toString();
                isError = true;
            }
            if(!this.thumbFile){
                this.thumbnailErr = true;
                isError = true;
            }
            if( this.hashtagsError ) {
                isError = true;
            }
            if( this.hashtagsArr ) {
                option.hashtags = this.hashtagsArr.toString();
                
            }

            if( isError ) {
                this.wait = false;
                return;
            }
            this.$store.commit('ajaxBar', true);
            this.$q.loading.show({
                message: this.$t('waiting').toString()
            });
            const result = await this.$http.updateProject( option, this.thumbFile, this.thumbFile2 );
            this.$store.commit('ajaxBar', false);
            this.$q.loading.hide();

            if( !result || result.error ) {
                 if(result.error.code === 40101){
                    Notify.create({
                    message :this.$t('forbiddenString').toString(),
                    position : 'top',
                    color : 'negative',
                    timeout: 2000
                }); 
                }
                else{
                Notify.create({
                    message : this.$t('projectSetting.error.saveEditGameFail').toString(),
                    position : 'top',
                    color : 'negative',
                    timeout: 2000
                });
                }
                console.error( result && result.error );
            }
            else {
                Notify.create({
                    message : this.$t('projectSetting.success.editSave').toString(),
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

            const ok = confirm( this.$t('projectSetting.delete.confirm').toString() );
            if( ok ) {
                this.wait = true;
                const result = await this.$http.deleteProject( this.projectId );
                this.wait = false;

                if( !result || result.error ) {
                    Notify.create({
                        message : this.$t('projectSetting.error.deleteGameFail').toString(),
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
        createValue (val, done) {
            this.isShowTag = false
            if(this.hashtagsArr.length <=20){
                if( val === '' ) {
                    this.hashtagsError = '';
                    
                }else{
                    this.hashtagsError = verifySelectHashtags( val );                
                }
                if(this.hashtagsError === ''){
                    if(done) {
                        done(val)
                    } 
                }
            }else{
                this.hashtagsError = this.$t('projectSetting.error.tooManyInputs').toString()
            }
        }

        createTagChip (val) {
        this.isShowTag = true
        this.inputValue = val
        
        }
    }
</script>

<style scoped lang="scss">
.save-btn{
    background: rgb(255 255 255 / 0%);
    text-align: right;
    padding-right: 0px;
}
.q-chip{
    background-color: rgb(244,186,47) ;
    border-radius: 5px ;
    color: black ;
    padding: 15px ;
}
.thumbnailErr.off{
    display: none;
}
.thumbnailErr{
    color:#C10015;
    font-size:12px;
    margin-top:2px
}
</style>