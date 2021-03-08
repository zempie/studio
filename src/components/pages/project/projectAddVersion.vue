<template>
    <div class="q-pa-lg">
        <content-box class="relative-position">
            <div class="text-h6 q-mb-lg">
                  {{$t('projectAddVersion.addNewVersionText')}}
            </div>
<!--            <content-box-block class="q-my-xl" title="게임 제목">-->
<!--                <q-input :error="titleError !== ''" :error-message="titleError" counter maxlength="50" v-model="title" @change="(str)=>{ if( str ){ titleError = '' } }" />-->
<!--            </content-box-block>-->

<!--            <content-box-block class="q-mb-xl" title="버전 설명">-->
<!--                <q-input type="textarea" counter maxlength="2000" v-model="description"/>-->
<!--                <div class="hintText">-->
<!--                    새로운 버전에 대한 내용을 입력해 주세요.-->
<!--                </div>-->
<!--            </content-box-block>-->

            <content-box-block class="q-mb-xl" :title="$t('projectAddVersion.uploadGameFile.title')">
                <q-input
                    @input="val => { uploadGameFile = val[0] }"
                    filled
                    type="file"
                    accept=".zip"
                    :error="uploadGameFileError !== ''"
                    :error-message="uploadGameFileError"
                />
                <div v-if="uploadGameFiles.length" class="text-body2 text-right">  {{$t('projectAddVersion.totalSize')}} : {{ totalSize < 1 ? `${totalSize * 1000} KB`  : `${totalSize} MB` }} </div>
                <div class="hintText">
                    {{$t('projectAddVersion.uploadGameFile.rules')}}
                </div>
            </content-box-block>
            <q-slide-transition>
                <div v-if="uploadMore">
                    <content-box-block class="q-mb-xl" :title="$t('projectAddVersion.startFile.title')">
                        <q-select style="margin-top: 20px"
                                  :label="$t('projectAddVersion.startFile.label')"
                                  v-model="startFile"
                                  :options="startFileOptions"
                                  :error="startFileError !== ''" :error-message="startFileError"

                        ></q-select>
                    </content-box-block>
                    <content-box-block class="q-mb-xl" :title="$t('projectAddVersion.autoDeploy.title')">
                        <q-toggle v-model="autoDeploy">{{ autoDeploy ? $t('projectAddVersion.autoDeploy.autoDeployMode'): $t('projectAddVersion.autoDeploy.manualDeployMode') }}</q-toggle>
                        <div class="hintText">  {{$t('projectAddVersion.autoDeploy.rules')}}</div>
                    </content-box-block>
                    <content-box-block class="q-mb-xl" :title="$t('projectAddVersion.version.title')">
                        <q-input counter maxlength="50" v-model="version" :error="versionError !== ''"
                            :error-message="versionError"/>
                        <div class="hintText"> {{$t('projectAddVersion.version.rules')}}</div>
                    </content-box-block>
                </div>
            </q-slide-transition>
            <q-btn flat class="full-width" @click="uploadMore = !uploadMore">
                {{$t('advancedSetting')}}
                <q-icon v-if="!uploadMore" name="arrow_drop_down" />
                <q-icon v-else name="arrow_drop_up" />
            </q-btn>
            <div class="q-mb-xl"></div>
            <!-- <fixed-bottom v-if="!isUpdate">
                <q-btn :loading="wait" class="q-mr-md" color="primary" @click="save">저장</q-btn>
            </fixed-bottom> -->
            
            <div v-if="isUpdate" class="bg-fade-70 full-width full-height absolute-top">
                <div class="text-h4 text-center q-my-xl">{{$t('projectAddVersion.versionError')}}</div>
<!--                <div class="text-h4 text-center q-my-xl"> 이미 업데이트중인 버전이 있습니다. </div>-->
            </div>
        </content-box>
         <!-- 저장 버튼 -->
        <content-box class="save-btn"  v-if="!isUpdate">
            <q-btn :loading="wait" color="primary" @click="save"> {{$t('save')}}</q-btn>
        </content-box>
    </div>

<!--    <q-page class="projectAddVersion">-->
<!--        <div class="box">-->
<!--            <div>-->
<!--                버전 정보-->
<!--            </div>-->
<!--            <table>-->
<!--                <tr>-->
<!--                    <td style="width: 20%"><span>버전</span></td>-->
<!--                    <td style="width: 80%">-->
<!--                        <q-input counter maxlength="50" v-model="version" :error="inputError1.isError"-->
<!--                                 :error-message="inputError1.message"/>-->
<!--                        <div class="hintText">버전은 Major.Miner.Patch 의 순서로 번호를 기록 하며 .으로 구분 됩니다. 새로 만드는 버전은 항상 이전 버전 보다-->
<!--                            높은 번호 여야 합니다.-->
<!--                        </div>-->
<!--                    </td>-->
<!--                </tr>-->
<!--                <tr>-->
<!--                    <td style="width: 20%"><span>자세한 설명</span></td>-->
<!--                    <td style="width: 80%">-->
<!--                        <q-input type="textarea" counter maxlength="2000" v-model="description"/>-->
<!--                    </td>-->
<!--                </tr>-->
<!--                <tr>-->
<!--                    <td style="width: 20%"><span>파일업로드</span></td>-->
<!--                    <td style="width: 80%">-->
<!--                        <q-input-->
<!--                            @input="val => { file = val[0] }"-->
<!--                            filled-->
<!--                            type="file"-->
<!--                            accept=".zip"-->
<!--                            hint="게임이 포함된 웹페이지를 압축 파일로 업로드 해 주세요. .zip 파일만 업로드 가능 합니다."-->
<!--                            :error="inputError2.isError" :error-message="inputError2.message"-->
<!--                        />-->
<!--                        <q-select v-if="files.length"-->
<!--                                  style="margin-top: 20px"-->
<!--                                  label="시작 파일을 선택 해 주세요."-->
<!--                                  v-model="startFile"-->
<!--                                  :options="options"-->
<!--                                  :error="inputError3.isError" :error-message="inputError3.message"-->

<!--                        ></q-select>-->
<!--                    </td>-->
<!--                </tr>-->
<!--            </table>-->
<!--            <div class="fixed">-->
<!--                <q-btn class="saveButton" color="primary" @click="save">저장</q-btn>-->
<!--            </div>-->
<!--        </div>-->
<!--    </q-page>-->
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
import ZipUtil from "@/common/zipUtil";
import Version from "@/common/version";
import ContentBox from "@/components/layout/contentBox.vue";
import ContentBoxBlock from "@/components/layout/contentBoxBlock.vue";
import FixedBottom from "@/components/fixedBottom.vue";
import {Notify} from "quasar";


@Component({
    components: {FixedBottom, ContentBoxBlock, ContentBox}
})
export default class ProjectAddVersion extends Vue {
    @Prop() private projectId!: number;

    private description : string = '';

    private limitSize : number = 1024 * 1000 * 100;
    private totalSize : number = 0;
    private uploadGameFileError : string = '';
    private uploadGameFile : File = null;
    private uploadGameFiles : File[] = [];

    private wait : boolean = false;

    private startFileOptions : string[] = [];
    private startFile : string = '';
    private startFileError : string = '';


    private version: string = '0.0.1';
    private versionError : string = '';

    private autoDeploy : boolean = true;

    private uploadMore : boolean = false;

    private isUpdate : boolean = false;


    mounted() {
        this.$store.commit('pageName', this.$t('projectAddVersion.toolbarTitle'));

        const lastVersion = this.$store.getters.lastVersion(this.projectId);
        if (lastVersion) {
            const ver = new Version(lastVersion.version)
            ver.patch++;
            this.version = ver.toString();
        }

        const updateVersion = this.$store.getters.updateVersion( this.projectId );
        // console.log( updateVersion );
        this.isUpdate = updateVersion && updateVersion.state === 'process';
    }

    @Watch('uploadGameFile')
    private async onChangedFile() {

        if( !this.uploadGameFile ) {
            return;
        }

        this.$store.commit('ajaxBar', true);
        this.$q.loading.show({
            message: this.$t('waiting').toString()
        });

        const zip = await ZipUtil.zipFileToZip(this.uploadGameFile);
        // console.log( zip );

        const files = await ZipUtil.zipToFiles(zip);
        let size = 0;
        for( let f in files ) {
            size += files[f].size;
        }

        if( size > this.limitSize ) {
            this.uploadGameFileError = this.$t('projectAddVersion.error.fileSizeExceeded').toString();
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
            Notify.create({
            message : this.$t('projectAddVersion.success.loadFile').toString(),
            position : 'top',
            color : 'primary',
            timeout: 2000
        });
        } else {
            this.uploadGameFileError = this.$t('projectAddVersion.error.notFoundHtml').toString();
            Notify.create({
            message : this.$t('projectAddVersion.error.uploadFail').toString(),
            position : 'top',
            color : 'negative',
            timeout: 2000
        });
        }

        this.$store.commit('ajaxBar', false);
        
        this.$q.loading.hide();

       
    }

    async save() {

        if( this.wait ) {
            return;
        }

        this.wait = true;
        let isError = false;


        if (!Version.validity(this.version)) {
            isError = true;
            this.versionError = this.$t('projectAddVersion.error.notValidVersion').toString();
        }
        else {
            const lastVersion = this.$store.getters.lastVersion(this.projectId);
            if (lastVersion && Version.validity(lastVersion.version)) {
                const newVersion = new Version(this.version);
                const oldVersion = new Version(lastVersion.version);

                if (!newVersion.isNew(oldVersion)) {
                    isError = true;
                    //이전 버전 보다 작음.
                    this.versionError = this.$t('projectAddVersion.error.lowVersion').toString();
                    return;
                }
            }
        }


        if( !this.uploadGameFiles.length ) {
            isError = true;
            this.uploadGameFileError = this.$t('projectAddVersion.error.noUploadFile').toString();
        }

        if( !this.startFileOptions.length ) {
            isError = true;
        }

        if( isError ) {
            this.wait = false;
            return;
        }


        this.$store.commit('ajaxBar', true);
        this.$q.loading.show({
            message: this.$t('waiting').toString()
        });
        const version = await this.$http.createVersion(this.projectId, this.version, this.uploadGameFiles, this.startFile, this.autoDeploy, this.totalSize, this.description);



        this.$store.commit('ajaxBar', false);
        this.$q.loading.hide();
        this.wait = false;

        if( !version || version.error ) {
            Notify.create({
                message : this.$t('projectAddVersion.error.newVersionUploadFail').toString(),
                position : 'top',
                color : 'negative',
                timeout: 2000
            });
        }
        else {
            const project = this.$store.getters.project( this.projectId );
            project.update_version_id = version.id;
            project.projectVersions.push(version);
            project.versions[ version.id ] = version;
            
            Notify.create({
                message : this.$t('projectAddVersion.success.uploadFile').toString(),
                position : 'top',
                color : 'primary',
                timeout: 2000
            });
            this.$router.replace( `/project/${this.projectId}` );
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