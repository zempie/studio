<template>
    <q-page class="q-pa-lg">
        <content-box>
            <div class="text-h6 q-mb-sm">
                새 게임 추가
            </div>
            <content-box-block class="q-my-xl" title="게임 제목">
                <q-input :error="titleError !== ''" :error-message="titleError" counter maxlength="50" v-model="title" @change="(str)=>{ if( str ){ titleError = '' } }" />
            </content-box-block>
            <content-box-block class="q-mb-xl" title="자세한 설명">
                <q-input type="textarea" counter maxlength="2000" v-model="description"/>
            </content-box-block>
            <content-box-block class="q-mb-xl" title="태그">
                <q-chips-input counter maxlength="255" :error="hashtagsError !== ''" :error-message="hashtagsError" v-model="hashtags" @change="onChangeHashtags" />
                <!-- <q-input class="q-chips-input" counter maxlength="255" :error="hashtagsError !== ''" :error-message="hashtagsError" v-model="hashtags" @change="onChangeHashtags"/> -->
                <div class="hintText">
                    게임을 나타낼 수 있는 단어를 태그로 설정하세요. 여러 개를 사용하는 경우 쉼표로 구분해 주세요.
                </div>
            </content-box-block>
            <content-box-block class="q-mb-xl" title="썸네일 이미지">
                <content-box-block-image-uploader v-on:@file="(file)=>{thumbFile = file;}" text="이미지 업로드" limit-size="4"></content-box-block-image-uploader>
                <div class="hintText">
                    512*340 사이즈의 JPEG, PNG 파일을 업로드 해주세요. (최대 4MB)
                </div>
            </content-box-block>

            <content-box-block class="q-mb-xl" title="미리보기 이미지">
                <content-box-block-image-uploader-g-i-f v-on:@file="(file)=>{thumbFile2 = file;}" text="이미지 업로드" limit-size="10"></content-box-block-image-uploader-g-i-f>
                <div class="hintText">
                    512*340 사이즈의 GIF 파일을 업로드 해주세요. (최대 10MB)
                </div>
            </content-box-block>

            <content-box-block class="q-mb-xl" title="영문 게임 아이디 설정">
                <q-toggle v-model="autoGamePath">{{ autoGamePath ? '자동 입력':'수동 입력' }}</q-toggle>
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
                                <q-btn v-if="!confirmedGamePath" :loading="waitGamePath" style="background-color: #3b3b3b" @click="checkGamePath">중복 확인</q-btn>
                                <span class="text-body2 text-primary" v-else>확인 완료</span>
                            </template>
                        </q-input>
                        <div class="hintText">
                            영문과 숫자로 된 고유한 게임 아이디를 만듭니다. 만들어진 아이디는 게임 접속 주소등으로 사용됩니다.
                        </div>
                    </div>

                </q-slide-transition>


            </content-box-block>

            <content-box-line></content-box-line>
            <div class="text-h6 q-my-xl">
                첫번째 버전 추가
            </div>
            <content-box-block class="q-mb-xl" title="게임 업로드">
                <q-input
                    @input="val => { uploadGameFile = val[0] }"
                    filled
                    type="file"
                    accept=".zip"
                    :error="uploadGameFileError !== ''"
                    :error-message="uploadGameFileError"
                />
                <div v-if="uploadGameFiles.length" class="text-body2 text-right">총 사이즈 : {{ totalSize < 1 ? `${totalSize * 1000} KB`  : `${totalSize} MB` }} </div>
                <div class="hintText">
                    게임이 포함된 웹페이지를 압축 파일로 업로드 해 주세요. zip 파일만 업로드가 가능하고, 압축하지 않은 파일들의 총 크기가 100MB 이하여야 합니다.
                </div>
            </content-box-block>
            <q-slide-transition>
                <div v-if="uploadMore">
                    <content-box-block class="q-mb-xl" title="시작파일 선택">
                        <q-select style="margin-top: 20px"
                                  label="시작 파일을 선택 해 주세요."
                                  v-model="startFile"
                                  :options="startFileOptions"
                                  :error="startFileError !== ''" :error-message="startFileError"

                        ></q-select>
                    </content-box-block>
                    <content-box-block class="q-mb-xl" title="자동 배포 여부">
                        <q-toggle v-model="autoDeploy">{{ autoDeploy ? '자동 배포모드' : '자동 배포모드 해제' }}</q-toggle>
                        <div class="hintText">자동배포 모드에서는 심사를 마치면 자동으로 공개됩니다. 자동배포를 원하지 않으시면, 자동배포 모드를 비활성화하고 심사가 끝난후에 수동으로 배포하십시오.</div>
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
                고급
                <q-icon v-if="!uploadMore" name="arrow_drop_down" />
                <q-icon v-else name="arrow_drop_up" />
            </q-btn>
        </content-box>
        <!-- 저장 버튼 -->
        <content-box class="save-btn">
            <q-btn :loading="waitSave" color="primary" @click="save">저장</q-btn>
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
    import {ErrorMessage} from "@/scripts/errorMessge";
    import {Notify} from "quasar";
    import {mbToByte} from "@/common/fileLoader";
    import {verifyHashtags} from "@/scripts/verifyHashtag";
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
        private hashtags : string = '';

        private thumbFile : File = null;
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



        mounted() {
            this.$store.commit('pageName', '게임 추가');
            // this.gamePath = randomString( 100 );
            
        }



        @Watch('uploadGameFile')
        private async onChangedFile() {

            if( !this.uploadGameFile ) {
                return;
            }

            this.$store.commit('ajaxBar', true);
            this.$q.loading.show({
                message: '파일을 확인하고 있습니다. 잠시만 기다려 주세요.'
            });

            const zip = await ZipUtil.zipFileToZip(this.uploadGameFile);
            // console.log( zip );

            const files = await ZipUtil.zipToFiles(zip);
            let size = 0;
            for( let f in files ) {
                size += files[f].size;
            }

            if( size > this.limitSize ) {
                this.uploadGameFileError = ErrorMessage.FILE_SIZE_EXCEEDED;
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
                this.uploadGameFileError = ErrorMessage.NOT_FOUND_HTML;
            }

            this.$store.commit('ajaxBar', false);
            this.$q.loading.hide();
        }

        private onChangeHashtags() {
            if( this.hashtags === '' ) {
                this.hashtagsError = '';
            }
            else {
                this.hashtagsError = verifyHashtags( this.hashtags );
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
                this.gamePathError = ErrorMessage.ALREADY_EXIST_GAME_PATH;
            }
            this.waitGamePath = false;
        }

        async save() {

            if( this.waitSave ) {
                return;
            }

            this.waitSave = true;

            let isError = false;


            if( !this.title ) {
                this.titleError = ErrorMessage.BLANK_GAME_TITLE;
                isError = true;
            }
            if( this.hashtagsError ) {
                isError = true;
            }

            if( !this.confirmedGamePath ) {

                if( !this.autoGamePath ) {
                    this.gamePathError = ErrorMessage.NO_CONFIRMED_GAME_PATH;
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
                            message : '실패하였습니다. 잠시 후 다시 시도해 주세요.',
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
                this.uploadGameFileError = ErrorMessage.NO_UPLOAD_FILE;
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
                message: '잠시만 기다려 주세요.'
            });

            console.log( this.versionDescription );

            const result = await this.$http.createProject( {
                name : this.title,
                description : this.description,
                pathname : this.gamePath,
                project_picture : this.thumbFile,
                project_picture2 : this.thumbFile2,
                hashtags : this.hashtags,
            }, {
                autoDeploy : this.autoDeploy,
                startFile : this.startFile,
                size : this.totalSize,
                version_description : this.versionDescription
            }, this.uploadGameFiles  );

            // console.log(result);

            this.$store.commit('ajaxBar', false);
            this.$q.loading.hide();
            this.waitSave = false;

            if( !result || result.error ) {
                if(result.error.code === 40101){
                    Notify.create({
                    message : '올바르지 않은 단어가 포함되어 있습니다.',
                    position : 'top',
                    color : 'negative',
                    timeout: 2000
                }); 
                }
                else{
                Notify.create({
                    message : result && result.error || '실패하였습니다. 파일을 확인 후 다시 시도해 주세요.',
                    position : 'top',
                    color : 'negative',
                    timeout: 2000
                });              
                }
                console.error( result && result.error || 'error' );
            }
            else {
                Notify.create({
                    message : '추가되었습니다.',
                    position : 'top',
                    color : 'primary',
                    timeout: 2000
                });
                this.$router.push('/studio').catch(() => {
                });
            }



        }
    }
</script>

<style scoped lang="scss">
.save-btn{
    background: rgb(255 255 255 / 0%);
    text-align: right;
    padding-right: 0px;
}
</style>