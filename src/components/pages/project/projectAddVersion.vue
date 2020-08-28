<template>
    <q-page class="projectAddVersion">
        <div class="box">
            <div>
                버전 정보
            </div>
            <table>
                <tr>
                    <td style="width: 20%"><span>버전</span></td>
                    <td style="width: 80%">
                        <q-input counter maxlength="50" v-model="version" :error="inputError1.isError" :error-message="inputError1.message" />
                        <div class="hintText">버전은 Major.Miner.Patch 의 순서로 번호를 기록 하며 .으로 구분 됩니다. 새로 만드는 버전은 항상 이전 버전 보다 높은 번호 여야 합니다.</div>
                    </td>
                </tr>
                <tr>
                    <td style="width: 20%"><span>자세한 설명</span></td>
                    <td style="width: 80%">
                        <q-input type="textarea" counter maxlength="2000" v-model="description" />
                    </td>
                </tr>
                <tr>
                    <td style="width: 20%"><span>파일업로드</span></td>
                    <td style="width: 80%">
                        <q-input
                                @input="val => { file = val[0] }"
                                filled
                                type="file"
                                accept=".zip"
                                hint="게임이 포함된 웹페이지를 압축 파일로 업로드 해 주세요. .zip 파일만 업로드 가능 합니다."
                                :error="inputError2.isError" :error-message="inputError2.message"
                        />
                        <q-select v-if="files.length"
                                  style="margin-top: 20px"
                                  label="시작 파일을 선택 해 주세요."
                                  v-model="startFile"
                                  :options="options"
                                  :error="inputError3.isError" :error-message="inputError3.message"

                        ></q-select>
                    </td>
                </tr>
            </table>
            <div class="fixed">
                <q-btn class="saveButton" color="primary" @click="save">저장</q-btn>
            </div>
        </div>
    </q-page>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import * as _ from 'lodash';
    import ZipUtil from "@/common/zipUtil";
    import Version from "@/common/version";

    interface IInputError {
        message : string;
        isError : boolean;
    }

    @Component({
        components: {

        }
    })
    export default class ProjectAddVersion extends Vue {
        @Prop() private projectId! : number;

        private file : File = null;
        private description : string = '';
        private version : string = '0.0.1';

        private files : File[] = [];
        private options : string[] = [];
        private startFile : string = '';

        private inputError1 = { message : '', isError : false }
        private inputError2 = { message : '', isError : false }
        private inputError3 = { message : '', isError : false }

        mounted() {
            this.$store.commit('pageName', '버전 추가');

            const lastVersion = this.$store.getters.lastVersion( this.projectId );
            if( lastVersion ) {
                const ver = new Version(lastVersion.version)
                ver.patch++;
                this.version = ver.toString();
            }
        }

        @Watch( 'file' )
        private async onChangedFile() {

            this.$store.commit('ajaxBar', true);

            const zip = await ZipUtil.zipFileToZip( this.file );
            const files = await ZipUtil.zipToFiles( zip );
            this.files = files;
            console.log( this.files );

            const htmls = this.files.filter( ( file )=>{
                return file.name.indexOf( '.html' ) > -1;
            } );
            this.options = htmls.map( file => file.name );

            if( this.options.length ) {
                this.inputError2.isError = false;
            }
            else {
                this.inputError2.message = '.html 파일을 찾을 수 없습니다.';
                this.inputError2.isError = true;
            }

            this.$store.commit('ajaxBar', false);
        }

        @Watch( 'startFile' )
        private onChangeSelect() {
            if( this.startFile ) {
                this.inputError3.isError = false;
            }
        }


        async save() {

            if( !this.files.length ) {
                this.inputError2.message = '파일을 업로드 해 주세요.';
                this.inputError2.isError = true;
                return;
            }


            if( !this.startFile ) {
                this.inputError3.message = '시작 파일을 선택 해 주세요.';
                this.inputError3.isError = true;
                return;
            }

            if( !Version.validity( this.version ) ) {
                //유효 하지 않은 버전
                this.inputError1.message = '유효 하지 않은 버전 입니다.';
                this.inputError1.isError = true;
                return;
            }

            const lastVersion = this.$store.getters.lastVersion( this.projectId );

            if( lastVersion && Version.validity( lastVersion.version )) {
                const newVersion = new Version( this.version );
                const oldVersion = new Version( lastVersion.version );


                if( !newVersion.isNew( oldVersion ) ) {
                    //이전 버전 보다 작음.
                    this.inputError1.message = '새로운 버전이 이전 버전 보다 낮습니다.';
                    this.inputError1.isError = true;
                    return;
                }
            }

            this.inputError1.isError = false;
            this.inputError2.isError = false;
            this.inputError3.isError = false;

            this.$store.commit('ajaxBar', true);
            const result = await this.$rpc.createVersion( this.projectId, this.version, this.description, this.files, this.startFile );
            console.log( result );
            this.$store.commit('ajaxBar', false);

        }
    }
</script>

<style scoped lang="scss">
    .projectAddVersion {

        position: relative;
        padding: 16px;


        .box {
            max-width: 960px;
            width: 100%;
            padding:16px;
            margin: 0 auto 180px auto;
            background-color: white;
            box-shadow: 0 3px 1px -2px rgba(0,0,0,.14), 0 2px 2px 0 rgba(0,0,0,.098), 0 1px 5px 0 rgba(0,0,0,.084);


            table {
                width: 100%;

                tr {
                    td {
                        padding: 30px 16px 30px 16px;
                        vertical-align: top;

                        .hintText {
                            padding: 16px 0 16px 0;
                            color: #777;
                            font-size: 13px;
                        }
                    }
                }
            }
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
    }
</style>