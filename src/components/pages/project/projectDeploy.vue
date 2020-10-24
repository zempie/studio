<template>
    <q-page class="projectDeploy q-pa-md">
        <content-box>
            <div class="text-h6 q-mb-xl">
                배포 정보
            </div>

            <div class="q-mb-xl">
                <div class="text-h7">
                    아직 배포된 게임이 없습니다.
                </div>
            </div>

            <div class="q-mb-lg">
                <content-box-block title="버전(숫자)" class="q-mb-xl">
                    <q-input readonly v-model="number">
                    </q-input>
                </content-box-block>
                <content-box-block title="버전(세부 버전)" class="q-mb-xl">
                    <q-input readonly v-model="version">
                    </q-input>
                </content-box-block>
            </div>

            <content-box-line class="q-mb-xl"></content-box-line>

            <div class="text-h6 q-mb-xl">
                배포 하기
            </div>
            <content-box-block title="배포 버전 선택" class="q-mb-xl">
                <q-select v-model="selectVersion" :options="options"></q-select>
            </content-box-block>
        </content-box>
        <fixed-bottom>
            <q-btn color="primary q-mx-md" @click="deploy">배포</q-btn>
        </fixed-bottom>

<!--        <div class="box">-->
<!--            <div class="info">-->
<!--                <div class="bold">배포 정보</div>-->
<!--                <div v-if="deployVersion">-->
<!--                    <div>{{deployVersion.version}}</div>-->
<!--                    <div>url : {{deployVersion.url}}</div>-->
<!--                </div>-->
<!--                <div v-else>-->
<!--                    배포된 정보가 없습니다.-->
<!--                </div>-->
<!--            </div>-->
<!--            <q-separator></q-separator>-->
<!--            <div class="deploy">-->
<!--                <div class="bold">배포 하기</div>-->
<!--&lt;!&ndash;                <q-input label="path"></q-input>&ndash;&gt;-->
<!--&lt;!&ndash;                <q-select v-model="version" :options="['0.0.1','0.0.2','0.0.3','0.0.4']"></q-select>&ndash;&gt;-->
<!--                <table>-->
<!--                    <tr>-->
<!--                        <td style="width: 20%"><span>path</span></td>-->
<!--                        <td style="width: 80%">-->
<!--                            <q-input :error="pathError.isError" :error-message="pathError.errorMsg" :disable="pathDisable" counter maxlength="50" v-model="path" />-->
<!--                        </td>-->
<!--                    </tr>-->
<!--                    <tr>-->
<!--                        <td style="width: 20%"><span>버전 선택</span></td>-->
<!--                        <td style="width: 80%">-->
<!--                            <q-select v-model="version" :options="options"/>-->
<!--                        </td>-->
<!--                    </tr>-->
<!--                </table>-->
<!--                <div style="width: 100%; text-align: right; margin-top: 10px">-->
<!--                    <q-btn @click="deploy">배포</q-btn>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
    </q-page>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import * as _ from 'lodash';
    import ContentBox from "@/components/layout/contentBox.vue";
    import ContentBoxBlock from "@/components/layout/contentBoxBlock.vue";
    import ContentBoxLine from "@/components/layout/contentBoxLine.vue";
    import FixedBottom from "@/components/fixedBottom.vue";

    @Component({
        components: {
            FixedBottom,
            ContentBoxLine,
            ContentBoxBlock,
            ContentBox

        }
    })
    export default class ProjectDeploy extends Vue {
        @Prop() private projectId! : number;

        private path : string = '';
        private version : string = '';
        private number : number = 0;

        private selectVersion : string = '';
        private options : string[] = [];

        private deployVersion : any = null;

        async mounted() {
            this.$store.commit('pageName', '배포');

            const project = this.$store.getters.project( this.projectId );
            const versions = this.$store.getters.versionList( this.projectId );

            if( project.deploy_version_id ) {
                const deployVersion = _.find( versions, v => v.id === project.deploy_version_id );
                this.version = deployVersion.version;
                this.number = deployVersion.number;
                this.deployVersion = deployVersion;
            }

            const passedList = versions.filter( ( version )=>{
                return version.state === 'passed';
            } );

            this.options = passedList.map( version => version.version );

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
            const result = await this.$http.updateProject( {
                id : this.projectId,
                deploy_version_id,
            } );

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