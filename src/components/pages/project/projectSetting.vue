<template>
    <q-page class="projectSetting">
        <div class="box">
            <div>
                게임 세부 정보
            </div>
            <table>
                <tr>
                    <td style="width: 20%"><span>제목</span></td>
                    <td style="width: 80%">
                        <q-input counter maxlength="50" v-model="title" />
                    </td>
                </tr>
<!--                <tr>-->
<!--                    <td style="width: 20%"><span>간단한 설명</span></td>-->
<!--                    <td style="width: 80%">-->
<!--                        <q-input type="textarea" counter maxlength="200" v-model="description" />-->
<!--                    </td>-->
<!--                </tr>-->
                <tr>
                    <td style="width: 20%"><span>자세한 설명</span></td>
                    <td style="width: 80%">
                        <q-input type="textarea" counter maxlength="2000" v-model="description" />
                    </td>
                </tr>
                <tr>
                    <td style="width: 20%"><span>썸네일 이미지</span></td>
                    <td style="width: 80%">
                        <q-img v-if="imgUrl" width="250px" height="250px" style="margin-right: 20px" :src="imgUrl">
                        </q-img>
                        <button class="addImage" @click="fileLoader.addFile()">
                            <q-icon name="publish" />
                            <div>썸네일 업로드</div>
                        </button>
                    </td>
                </tr>
                <tr>
                    <td style="width: 20%"><span>컨트롤 타입</span></td>
                    <td style="width: 80%">
                        <q-select v-model="controlType" :options="controlTypeOptions"/>
                    </td>
                </tr>
                <tr>
                    <td style="width: 20%"><span>게임 ID</span></td>
                    <td style="width: 80%">
                        <q-input v-model="projectId" disable  />
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
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import {FileLoader} from "@/common/fileLoader";

    @Component({
        components: {

        }
    })
    export default class ProjectSetting extends Vue {

        @Prop() private projectId! : number;

        private title : string = '';
        private description : string = '';
        private gameId : string = '';
        private controlType : string = '일반';
        private controlTypeOptions : string[] = [
            '아이프레임',
            '멀티',
            '일반',
        ]

        private fileLoader : FileLoader = new FileLoader();
        private file : File = undefined;
        private imgUrl : string = '';

        async mounted() {
            this.$store.commit('pageName', '설정');

            let project = await this.$store.dispatch( 'project', this.projectId );
            console.log( project );
            this.title = project.name;
            this.description = project.description;
            this.controlType = this.controlTypeOptions[ project.control_type ];
            this.imgUrl = project.picture;

           this.fileLoader.on( 'onLoadFile', this.onLoadFile )
        }

        onLoadFile(dataString, file) {
            this.file = file;
            this.imgUrl = dataString;
        }

        async save() {
            let project = await this.$store.dispatch( 'project', this.projectId );
            const control_type = this.controlTypeOptions.indexOf( this.controlType );
            const option : any = {
                id : this.projectId,
                deploy_version_id : project.deploy_version_id,
                control_type,
            }
            if( this.title ) {
                option.title = this.title;
            }
            if( this.description ) {
                option.description = this.description;
            }


            this.$store.commit('ajaxBar', true);
            const result = await this.$rpc.updateProject( option, this.file );
            console.log(result);
            this.$store.commit('ajaxBar', false);
        }
    }
</script>

<style scoped lang="scss">
    .projectSetting {
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
                border-collapse: collapse;

                tr {
                    width: 100%;
                    border-bottom: 1px solid #d7d7d7;

                    &:last-child {
                        border-bottom:0;
                    }


                    td {
                        padding: 30px 16px 30px 16px;
                        vertical-align: top;

                        .hintText {
                            padding: 16px 0 16px 0;
                            color: #777;
                            font-size: 13px;
                        }

                        .addImage {
                            border: 0;
                            padding: 20px;
                        }
                    }
                }
            }
        }

        .addImage {

            color: #777777;

            i {
                font-size: 20px;
                margin-bottom: 14px;
            }

            &:hover {
                background-color: rgb(227, 224, 224);
                color: #474747;
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