<template>
    <q-page class="projectDeploy">
        <div class="box">
            <div class="info">
                <div class="bold">배포 정보</div>
                <div v-if="deployVersion">
                    <div>{{deployVersion.version}}</div>
                    <div>url : {{deployVersion.url}}</div>
                </div>
                <div v-else>
                    배포된 정보가 없습니다.
                </div>
            </div>
            <q-separator></q-separator>
            <div class="deploy">
                <div class="bold">배포 하기</div>
<!--                <q-input label="path"></q-input>-->
<!--                <q-select v-model="version" :options="['0.0.1','0.0.2','0.0.3','0.0.4']"></q-select>-->
                <table>
                    <tr>
                        <td style="width: 20%"><span>path</span></td>
                        <td style="width: 80%">
                            <q-input :error="pathError.isError" :error-message="pathError.errorMsg" :disable="pathDisable" counter maxlength="50" v-model="path" />
                        </td>
                    </tr>
                    <tr>
                        <td style="width: 20%"><span>버전 선택</span></td>
                        <td style="width: 80%">
                            <q-select v-model="version" :options="options"/>
                        </td>
                    </tr>
                </table>
                <div style="width: 100%; text-align: right; margin-top: 10px">
                    <q-btn @click="deploy">배포</q-btn>
                </div>
            </div>
        </div>
    </q-page>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import * as _ from 'lodash';

    @Component({
        components: {

        }
    })
    export default class ProjectDeploy extends Vue {
        @Prop() private projectId! : number;

        private path : string = '';
        private version : string = '';
        private options : any[] = [];
        private pathDisable : boolean = false;

        private deployVersion : any = null;

        private pathError = {
            isError : false,
            errorMsg : '',
        }

        async mounted() {
            this.$store.commit('pageName', '배포');

            const project = await this.$store.dispatch( 'project', this.projectId );

            const versions : any[] = await this.$rpc.getVersions( this.projectId );
            this.$store.commit('versions', versions);

            const passedList = versions.filter( ( version )=>{
                return version.state === 'passed';
            } );


            this.options = passedList.map( version => version.version );

            const game = project.game;
            if( game ) {
                this.pathDisable = true;
                this.path = project.game.pathname;
                this.deployVersion = _.find( versions, v => v.id === project.deploy_version_id );
            }
        }

        @Watch('path')
        private onChangedPath() {
            this.pathError.isError = false;
        }

        async deploy() {
            if( !this.path ) {
                //
                console.log( 'path 없음'  );
                return;
            }

            if( !this.version ) {
                console.log( 'version 선택 안됨'  );
                return;
            }

            const versions = this.$store.getters.versions( this.projectId );
            const version = _.find( versions, v => v.version === this.version );

            const deploy_version_id = version.id;

            this.$store.commit('ajaxBar', true);
            const result = await this.$rpc.updateProject( {
                id : this.projectId,
                deploy_version_id,
                pathname : this.path,
            } );

            if( result.error ) {
                this.pathError.isError = true;
                this.pathError.errorMsg = result.error;
                //path 중복 에러
            }
            console.log(result);

            this.$store.commit('ajaxBar', false);
        }
    }
</script>

<style scoped lang="scss">
    .projectDeploy {

        position: relative;
        padding: 16px;

        .box {
            max-width: 960px;
            width: 100%;
            padding:16px;
            margin: 0 auto 180px auto;
            background-color: white;
            box-shadow: 0 3px 1px -2px rgba(0,0,0,.14), 0 2px 2px 0 rgba(0,0,0,.098), 0 1px 5px 0 rgba(0,0,0,.084);


            .versionList {
                margin: 16px;
            }

            .bold {
                font-size: 20px;
                font-weight: bold;
            }

            .info {
                padding: 16px;
            }

            .deploy {
                padding: 16px;
            }

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

        .top {
            margin: 0 auto;
            max-width: 960px;
            text-align: right;

            .addButton {
                margin: 10px 0;
            }
        }
    }
</style>