<template>
    <q-page class="projectVersion">
        <div class="top">
            <q-btn class="addButton" color="primary" @click="$router.push(`/project/addVersion/${projectId}`)">버전 추가하기</q-btn>
        </div>
        <div class="box">
            <div> 버전 리스트 </div>
            <q-list bordered class="rounded-borders versionList">
                <div v-for="(version, index) in versionList">
                    <q-expansion-item>
                        <template v-slot:header>
                            <q-item-section avatar>
                                {{version.number}}
                            </q-item-section>

                            <q-item-section avatar>
                                {{version.version}}
                            </q-item-section>

                            <q-item-section>
                                <span style="color: #F2C037; font-weight: bold" v-if="version.state === 'process'">심사중</span>
                                <span style="color: #027BE3; font-weight: bold" v-if="version.state === 'passed'">심사 완료</span>
                                <span style="color: #C10015; font-weight: bold" v-if="version.state === 'fail'">심사 미통과</span>
                                <span style="color: #2AC940; font-weight: bold" v-if="version.state === 'deploy'">배포 중</span>

                                <!--심사중, 심사 통과, 심사 미통과, 배포중-->
                            </q-item-section>

                            <q-item-section side>

                            </q-item-section>
                        </template>

                        <q-card>
                            <q-card-section>

                                <q-field outlined label="자세한 설명" stack-label style="margin-bottom: 5px">
                                    <template v-slot:control>
                                        <div class="self-center full-width no-outline" tabindex="0">{{version.description}}</div>
                                    </template>
                                </q-field>

                                <q-field v-if="version.reason" outlined label="심사 미통과 사유" stack-label  style="margin-bottom: 5px">
                                    <template v-slot:control>
                                        <div class="self-center full-width no-outline" tabindex="0">{{version.reason}}</div>
                                    </template>
                                </q-field>

<!--                                <div> 심사 미통과시 사유 </div>-->
                                <div>
                                    <a @click.stop target="_blank" :href="version.url">업로드 주소 보기</a>
                                </div>
                            </q-card-section>
                        </q-card>
                    </q-expansion-item>
                    <q-separator v-if="index < versionList.length - 1" />
                </div>
            </q-list>
        </div>
    </q-page>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component({
        components: {

        }
    })
    export default class ProjectVersion extends Vue {
        @Prop() private projectId! : number;

        private versionList : any[] = [
            // {
            //     number : 1,
            //     version : '0.0.2',
            //     state : 'passed',
            //     url : 'http://gtest.fromthered.com',
            //     description : '',
            //     reasonForFail : '',
            // },
            // {
            //     number : 2,
            //     version : '0.0.1',
            //     state : 'none',
            //     url : '',
            //     description : '',
            //     reasonForFail : '',
            // }
        ];

        mounted() {
            this.$store.commit('pageName', '버전');

            this.loadVersions();
        }

        async loadVersions() {
            const result = await this.$rpc.getVersions( this.projectId );
            this.versionList = result;
            this.$store.commit('versions', result);

            console.log( result );
        }
    }
</script>

<style scoped lang="scss">
    .projectVersion {

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