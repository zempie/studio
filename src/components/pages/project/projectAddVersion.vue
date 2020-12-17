<template>
    <div class="q-pa-lg">
        <content-box class="relative-position">
            <div class="text-h6 q-mb-lg">
                새 버전 등록
            </div>
<!--            <content-box-block class="q-my-xl" title="게임 제목">-->
<!--                <q-input :error="titleError !== ''" :error-message="titleError" counter maxlength="50" v-model="title" @change="(str)=>{ if( str ){ titleError = '' } }" />-->
<!--            </content-box-block>-->

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
                    <content-box-block class="q-mb-xl" title="버전">
                        <q-input counter maxlength="50" v-model="version" :error="versionError !== ''"
                            :error-message="versionError"/>
                        <div class="hintText">버전은 Major.Miner.Patch 의 순서로 번호를 기록 하며 .으로 구분 됩니다. 새로 만드는 버전은 항상 이전 버전 보다 높은 번호 여야 합니다.</div>
                    </content-box-block>
                </div>
            </q-slide-transition>
            <q-btn flat class="full-width" @click="uploadMore = !uploadMore">
                고급
                <q-icon v-if="!uploadMore" name="arrow_drop_down" />
                <q-icon v-else name="arrow_drop_up" />
            </q-btn>
            <div class="q-mb-xl"></div>
            <fixed-bottom v-if="!isUpdate">
                <q-btn :loading="wait" class="q-mr-md" color="primary" @click="save">저장</q-btn>
            </fixed-bottom>
            <div v-if="isUpdate" class="bg-fade-70 full-width full-height absolute-top">
                <div class="text-h4 text-center q-my-xl"> 이미 업데이트중인 버전이 있습니다. </div>
<!--                <div class="text-h4 text-center q-my-xl"> 이미 업데이트중인 버전이 있습니다. </div>-->
            </div>
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
import {ErrorMessage} from "@/scripts/errorMessge";
import {Notify} from "quasar";


@Component({
    components: {FixedBottom, ContentBoxBlock, ContentBox}
})
export default class ProjectAddVersion extends Vue {
    @Prop() private projectId!: number;

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
        this.$store.commit('pageName', '버전 추가');

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
            message: '잠시만 기다려 주세요.'
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
        Notify.create({
            message : '저장 되었습니다.',
            position : 'top',
            color : 'primary',
            timeout: 2000
        });
    }

    async save() {

        if( this.wait ) {
            return;
        }

        this.wait = true;
        let isError = false;


        if (!Version.validity(this.version)) {
            isError = true;
            this.versionError = ErrorMessage.NOT_VALID_VERSION;
        }
        else {
            const lastVersion = this.$store.getters.lastVersion(this.projectId);
            if (lastVersion && Version.validity(lastVersion.version)) {
                const newVersion = new Version(this.version);
                const oldVersion = new Version(lastVersion.version);

                if (!newVersion.isNew(oldVersion)) {
                    isError = true;
                    //이전 버전 보다 작음.
                    this.versionError = ErrorMessage.LOW_VERSION;
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
            this.wait = false;
            return;
        }


        this.$store.commit('ajaxBar', true);
        this.$q.loading.show({
            message: '잠시만 기다려 주세요.'
        });
        const version = await this.$http.createVersion(this.projectId, this.version, this.uploadGameFiles, this.startFile, this.autoDeploy, this.totalSize);



        this.$store.commit('ajaxBar', false);
        this.$q.loading.hide();
        this.wait = false;

        if( !version || version.error ) {
            Notify.create({
                message : version && version.error || '실패하였습니다. 파일을 확인 후 다시 시도해 주세요.',
                position : 'top',
                color : 'negative',
                timeout: 2000
            });
        }
        else {
            const project = this.$store.getters.project( this.projectId );
            project.update_version_id = version.id;
            this.$store.commit('version', version);
            Notify.create({
                message : '저장 되었습니다.',
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
</style>