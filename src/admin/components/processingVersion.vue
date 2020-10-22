<template>
    <q-page class="projectVersion">
        <div class="box">
            <div> 버전 리스트 </div>
            <q-list bordered class="rounded-borders versionList">
                <div v-for="(version, index) in versionList">
                    <q-expansion-item>
                        <template v-slot:header>

                            <q-item-section avatar>
                                {{version.project.id}}
                            </q-item-section>

                            <q-item-section avatar>
                                {{version.project.name}}
                            </q-item-section>

                            <q-item-section avatar>
                                {{version.version}}
                            </q-item-section>

                            <q-item-section>
                                <span style="color: #F2C037; font-weight: bold" v-if="version.state === 'process'">심사 대기</span>
                                <span style="color: #027BE3; font-weight: bold" v-if="version.state === 'passed'">심사 완료</span>
                                <span style="color: #C10015; font-weight: bold" v-if="version.state === 'fail'">심사 미통과</span>
                                <span style="color: #2AC940; font-weight: bold" v-if="version.state === 'deploy'">배포 중</span>

                                <!--심사중, 심사 통과, 심사 미통과, 배포중-->
                            </q-item-section>

                            <q-item-section avatar>
                                {{new Date(version.updated_at).toLocaleString()}}
                            </q-item-section>

                            <q-item-section side>

                            </q-item-section>
                        </template>

                        <q-card>
                            <q-card-section>

                                <q-field outlined label="자세한 설명" stack-label>
                                    <template v-slot:control>
                                        <div class="self-center full-width no-outline" tabindex="0">{{version.description}}</div>
                                    </template>
                                </q-field>

                                <!--                                <div> 심사 미통과시 사유 </div>-->
                                <div>
                                    <router-link :to="'/admin/testGame/' + version.id" >테스트 이동</router-link>
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
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import * as _ from 'lodash';

    @Component({
        components: {

        }
    })
    export default class ProcessingVersion extends Vue {

        private versionList : any[] = [];

        mounted() {
            this.$store.commit('pageName', '심사 대기 버전');
            this.loadVersions();
        }

        async loadVersions() {
            const result = await this.$rpc.requestRpc( 'admin-get-versions', {
                where : {
                    state : 'process'
                }
            } );

            this.versionList = result;
            console.log( result );
        }

        async onClickTestGame( id ) {
            this.$router.push(`/admin/testGame/${id}` );
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
            background-color: #242424;
            box-shadow: 0 3px 1px -2px rgba(0,0,0,.14), 0 2px 2px 0 rgba(0,0,0,.098), 0 1px 5px 0 rgba(0,0,0,.084);


            .versionList {
                margin: 16px;
            }
        }

    }
</style>