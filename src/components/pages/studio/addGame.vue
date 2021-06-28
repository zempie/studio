<template>
    <q-page class="q-pa-lg">
        <content-box>
            <div class="text-h6 q-mb-sm">
                  {{$t('addGame.addGameTitle')}}
            </div>
            <content-box-block class="q-my-xl" :title="$t('addGame.title')" :star="'*'">
                <q-input :error="titleError !== ''" :error-message="titleError" counter maxlength="50" v-model="title" @change="(str)=>{ if( str ){ titleError = '' } }" />
            </content-box-block>
            <content-box-block class="q-mb-xl" :title="$t('addGame.description')" :star="'*'" >
                <q-input type="textarea" counter maxlength="2000" v-model="description" :error="descError !== ''" :error-message="descError" />
            </content-box-block>
            <content-box-block class="q-mb-xl" :title="$t('addGame.tag.title')" :star="'*'">
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
                    {{$t('addGame.tag.rules')}}
                </div>
            </content-box-block>
            <content-box-block class="q-mb-xl" :title="$t('addGame.thumbnailImg.title')" :star="'*'">                
                
                    <content-box-block-image-uploader  v-on:@file="(file)=>{thumbFile = file;}" :text="$t('addGame.thumbnailImg.text')" limit-size="4"></content-box-block-image-uploader>
                    <div :class="thumbnailErr && !thumbFile? 'thumbnailErr' : 'thumbnailErr off'">{{$t('addGame.error.thumbnailBlank')}}</div>
                <div class="hintText">
                    {{$t('addGame.thumbnailImg.rules')}}
                
                </div>
                
            </content-box-block>

            <content-box-block class="q-mb-xl" :title="$t('addGame.previewImg.title')">
                <content-box-block-image-uploader-g-i-f v-on:@file="(file)=>{thumbFile2 = file;}" :text="$t('addGame.thumbnailImg.text')" limit-size="10"></content-box-block-image-uploader-g-i-f>
                <div class="hintText">
                    {{$t('addGame.previewImg.rules')}}
                </div>
            </content-box-block>

            <content-box-block class="q-mb-xl" :title="$t('addGame.engGameIdSetting.title')" >
                <q-toggle v-model="autoGamePath">{{ autoGamePath ? $t('addGame.engGameIdSetting.autoInput'):$t('addGame.engGameIdSetting.manualInput') }}</q-toggle>
                <q-slide-transition>
                    <div v-if="!autoGamePath">
                        <q-input :disable="waitGamePath"
                                 v-model="gamePath"
                                 :mask="'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'"
                                 :error="gamePathError !== ''"
                                 :error-message="gamePathError"
                                 @change="(str)=>{ confirmedGamePath = false; if( str ){ gamePathError = '' } }"
                        >
                            <template v-slot:append>
                                <q-btn v-if="!confirmedGamePath" :loading="waitGamePath" style="background-color: #3b3b3b" @click="checkGamePath">{{$t('addGame.engGameIdSetting.duplicateCheck')}}</q-btn>
                                <span class="text-body2 text-primary" v-else>{{$t('addGame.engGameIdSetting.completeBtn')}}</span>
                            </template>
                        </q-input>
                        <div class="hintText">
                            {{$t('addGame.engGameIdSetting.rules')}}
                        </div>
                    </div>

                </q-slide-transition>


            </content-box-block>

            <content-box-line></content-box-line>
            <div class="text-h6 q-my-xl">
                {{$t('addGame.firstVersionAdd')}}
            </div>
            <content-box-block class="q-mb-xl" :title="$t('addGame.gameFileUpload.title')" :star="'*'">
                <q-input
                    @input="val => { uploadGameFile = val[0] }"
                    filled
                    type="file"
                    accept=".zip"
                    :error="uploadGameFileError !== ''"
                    :error-message="uploadGameFileError"
                />
                <div v-if="uploadGameFiles.length" class="text-body2 text-right">  {{$t('addGame.totalSize')}} : {{ totalSize < 1 ? `${totalSize * 1000} KB`  : `${totalSize} MB` }} </div>
                <div class="hintText">
                    {{$t('addGame.gameFileUpload.rules')}}
                </div>
            </content-box-block>
            <q-slide-transition>
                <div v-if="uploadMore">
                    <content-box-block class="q-mb-xl" :title="$t('addGame.startFileSelect.title')" :star="'*'">
                        <q-select style="margin-top: 20px"
                                  :label="$t('addGame.startFileSelect.desc')"
                                  v-model="startFile"
                                  :options="startFileOptions"
                                  :error="startFileError !== ''" :error-message="startFileError"

                        ></q-select>
                    </content-box-block>
                    <content-box-block class="q-mb-xl" :title="$t('addGame.autoDeployStatus.title')">
                        <q-toggle v-model="autoDeploy">{{ autoDeploy ? $t('addGame.autoDeployStatus.autoDeployMode') : $t('addGame.autoDeployStatus.manualDeployMode') }}</q-toggle>
                        <div class="hintText"> {{$t('addGame.autoDeployStatus.rules')}}</div>
                    </content-box-block>
<!--                    <content-box-block class="q-mb-xl" title="버전 설명">-->
<!--                        <q-input type="textarea" counter maxlength="2000" v-model="versionDescription"/>-->
<!--                        <div class="hintText">-->
<!--                            새로운 버전에 대한 내용을 입력해 주세요.-->
<!--                        </div>-->
<!--                    </content-box-block>-->
                </div>
            </q-slide-transition>

            <q-btn flat class="full-width" @click="uploadMore = !uploadMore">
                {{$t('advancedSetting')}}
                <q-icon v-if="!uploadMore" name="arrow_drop_down" />
                <q-icon v-else name="arrow_drop_up" />
            </q-btn>
        </content-box>
        <!-- 저장 버튼 -->
        <content-box class="save-btn">
            <q-btn :loading="waitSave" color="primary" @click="save">{{$t('save')}}</q-btn>
        </content-box>
        
    </q-page>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import FixedBottom from "@/components/fixedBottom.vue";
    import ContentBoxBlock from "@/components/layout/contentBoxBlock.vue";
    import ContentBoxBlockImageUploader from "@/components/layout/contentBoxBlockImageUploader.vue";
    import ContentBoxLine from "@/components/layout/contentBoxLine.vue";
    import ContentBox from "@/components/layout/contentBox.vue";
    import ZipUtil from "@/common/zipUtil";
    import {randomString} from "@/common/util";
    import {Notify} from "quasar";
    import {mbToByte} from "@/common/fileLoader";
    import {verifyHashtags} from "@/scripts/verifyHashtag";
    import {verifySelectHashtags} from "@/scripts/verifySelectHashtags";
    import ContentBoxBlockImageUploaderGIF from "@/components/layout/contentBoxBlockImageUploaderGIF.vue";

    @Component({
        components: {
            ContentBoxBlockImageUploaderGIF,
            ContentBox,
            ContentBoxLine,
            ContentBoxBlockImageUploader,
            ContentBoxBlock,
            FixedBottom,            

        }
    })
    export default class AddGame extends Vue {

        private title : string = '';
        private titleError : string = '';
        private description : string = '';
        private descError : string = '';
        private hashtags : string = '';

        private thumbFile : File = null;
        private thumbnailErr : boolean = false;
        private thumbFile2 : File = null;

        private autoGamePath : boolean = true;
        private gamePath : string = '';
        private confirmedGamePath : boolean = false;
        private gamePathError : string = '';
        private waitGamePath : boolean = false;
        private hashtagsError : string = '';

        private uploadMore : boolean = false;

        private limitSize : number = 1024 * 1000 * 100;
        private totalSize : number = 0;
        private uploadGameFileError : string = '';
        private uploadGameFile : File = null;
        private uploadGameFiles : File[] = [];

        private startFileOptions : string[] = [];
        private startFile : string = '';
        private startFileError : string = '';

        private autoDeploy : boolean = true;

        private versionDescription : string = '';

        private waitSave : boolean = false;


        private hashtagsArr: string[] = [];
        private inputValue: string =  '';
        private isShowTag: boolean =  false;
        private star: string ='';


        mounted() {
            this.$store.commit('pageName', this.$t('addGame.toolbarTitle'));
            // this.gamePath = randomString( 100 );
            
        }



        @Watch('uploadGameFile')
        private async onChangedFile() {
            if( !this.uploadGameFile ) {
                return;
            }

            this.$store.commit('ajaxBar', true);
            this.$q.loading.show({
                message: this.$t('addGame.success.checkFile').toString()
            });

            const zip = await ZipUtil.zipFileToZip(this.uploadGameFile);
            // console.log( zip );

            const files = await ZipUtil.zipToFiles(zip);
            let size = 0;
            for( let f in files ) {
                size += files[f].size;
            }

            if( size > this.limitSize ) {
                this.uploadGameFileError = this.$t('addGame.error.fileSizeExceeded').toString();
                return;
            }

            this.totalSize = Number((size / (1024 * 1000)).toFixed( 2 ));
            this.uploadGameFiles = files;
            // console.log(this.uploadGameFiles);

            const htmls = this.uploadGameFiles.filter((file) => {
                return file.name.indexOf('.html') > -1;
            });

            this.startFileOptions = htmls.map(file => file.name);
            this.startFileOptions.sort( (a, b) => a.length - b.length );
            const indexFiles = this.startFileOptions.filter( name => name.includes( 'index' ) );

            if( indexFiles.length ) {
                indexFiles.sort( (a, b) => a.length - b.length );
                this.startFile = indexFiles[0];
            }
            else {
                this.startFile = this.startFileOptions[0];
            }

            this.startFileOptions.sort( ( a, b ) => a.length - b.length );

            if (this.startFileOptions.length) {
                this.uploadGameFileError = '';
            } else {
                this.uploadGameFileError = this.$t('addGame.error.notFoundHtml').toString();
            }

            this.$store.commit('ajaxBar', false);
            this.$q.loading.hide();
        }

        private onChangeHashtags() {
            if( this.hashtags === '' ) {
                this.hashtagsError = '';
            }
            else {
                this.hashtagsError = verifySelectHashtags( this.hashtags );
            }
        }

        async checkGamePath() {
            this.waitGamePath = true;
            const result = await this.$http.confirmGamePath( this.gamePath );
            if( result && result.success ) {
                this.confirmedGamePath = true;
                this.gamePathError = '';
            }
            else {
                this.gamePathError = this.$t('addGame.error.usedId').toString();
            }
            this.waitGamePath = false;
        }
        @Watch('description')
        watchDesc(){
            if(
            this.description.length> 0){
                this.descError = '';
            }
        }
        async save() {

            if( this.waitSave ) {
                return;
            }

            this.waitSave = true;

            let isError = false;


            if( !this.title ) {
                this.titleError = this.$t('addGame.error.blankTitle').toString();
                isError = true;
            }
            if(!this.description){
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

            if( !this.confirmedGamePath ) {

                if( !this.autoGamePath ) {
                    this.gamePathError =this.$t('addGame.error.doubleCheckEngId').toString();
                    isError = true;
                }
                else {
                    let count = 0;
                    while ( !this.confirmedGamePath && count < 10 ) {
                        count++;
                        this.gamePath = randomString( 11 );
                        const result = await this.$http.confirmGamePath( this.gamePath );
                        if( result && result.success ) {
                            this.confirmedGamePath = true;
                        }
                    }

                    if( !this.confirmedGamePath ) {
                        Notify.create({
                            message : this.$t('commonError').toString(),
                            position : 'top',
                            color : 'negative',
                            timeout: 2000
                        });
                        this.waitSave = false;
                        return;
                    }
                }
            }

            if( !this.uploadGameFiles.length ) {
                isError = true;
                this.uploadGameFileError = this.$t('addGame.error.noLoadFile').toString();
            }

            if( !this.startFileOptions.length ) {
                isError = true;
            }



            if( isError ) {
                this.waitSave = false;
                return;
            }

            this.$store.commit('ajaxBar', true);
            this.$q.loading.show({
                message: this.$t('waiting').toString()
            });

            console.log( this.versionDescription );
            

            const result = await this.$http.createProject( {
                name : this.title,
                description : this.description,
                pathname : this.gamePath,
                project_picture : this.thumbFile,
                project_picture2 : this.thumbFile2,
                hashtags : this.hashtagsArr.toString(),
            }, {
                autoDeploy : this.autoDeploy,
                startFile : this.startFile,
                size : this.totalSize,
                version_description : this.versionDescription
            }, this.uploadGameFiles  );

            this.$store.commit('ajaxBar', false);
            this.$q.loading.hide();
            this.waitSave = false;

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
                    message : this.$t('addGame.error.uploadGame').toString(),
                    position : 'top',
                    color : 'negative',
                    timeout: 2000
                });              
                }
                console.error( result && result.error || 'error' );
            }
            else {
                Notify.create({
                    message : this.$t('addGame.success.uploadGame').toString(),
                    position : 'top',
                    color : 'primary',
                    timeout: 2000
                });
                this.$router.push('/studio').catch(() => {
                });
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
                this.hashtagsError = this.$t('addGame.error.tooManyInputs').toString()
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
.fileUpload{
    // background-color: red;
    // width: 100%;
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