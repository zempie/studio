<template>
    <q-page class="projectDeploy">
        <content-box>
            <div class="text-h6 q-mb-xl">
                  {{$t('projectDeploy.deployTitle')}}
            </div>

            <div class="q-mb-xl" v-if="!deployVersion">
                <div class="text-h7">
                   {{$t('projectDeploy.noGame')}}
                </div>
            </div>

            <div class="q-mb-lg" v-else>
                <content-box-block :title="$t('projectDeploy.versionNumber')" class="q-mb-xl">
                    <q-input readonly v-model="number">
                    </q-input>
                </content-box-block>
                <content-box-block :title="$t('projectDeploy.versionDetail')" class="q-mb-xl">
                    <q-input readonly v-model="version">
                    </q-input>
                </content-box-block>
            </div>

            <content-box-line class="q-mb-xl"></content-box-line>

            <div class="text-h6 q-mb-xl">
                {{$t('projectDeploy.deployText')}}
            </div>
            <content-box-block :title="$t('projectDeploy.versionSelect')" class="q-pb-xl">
                <q-select v-model="selectVersion" :options="options"></q-select>
            </content-box-block>
            <div class="q-pb-xl"></div>

            <content-box-block :title="$t('projectDeploy.cancelDeploy.title')" class="q-mb-xl" v-if="deployVersion">
                <div class="hintText">
                     {{$t('projectDeploy.cancelDeploy.desc')}}
                </div>
                <div class="text-right">
                    <q-btn @click="cancelDeploy"> {{$t('projectDeploy.cancelDeploy.btn')}}</q-btn>
                </div>
            </content-box-block>

        </content-box>

        <!-- <fixed-bottom>
            <q-btn :loading="wait" color="primary q-mx-md" @click="deploy">배포</q-btn>
        </fixed-bottom> -->
         <!-- 저장 버튼 -->
        <content-box class="save-btn">
            <q-btn :loading="wait" color="primary" @click="deploy">  {{$t('save')}}</q-btn>
        </content-box>


    </q-page>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import * as _ from 'lodash';
    import ContentBox from "@/components/layout/contentBox.vue";
    import ContentBoxBlock from "@/components/layout/contentBoxBlock.vue";
    import ContentBoxLine from "@/components/layout/contentBoxLine.vue";
    import FixedBottom from "@/components/fixedBottom.vue";
    import {roundFace} from "@quasar/extras/material-icons-round";
    import {Notify} from "quasar";

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

        private version : string = '';
        private number : number = 0;

        private selectVersion : string = '';
        private options : string[] = [];

        private deployVersion : any = null;

        private wait : boolean = false;


        async mounted() {
            this.$store.commit('pageName', this.$t('projectDeploy.toolbarTitle'));

            const project = this.$store.getters.project( this.projectId );
            const versions = this.$store.getters.versionList( this.projectId );

            if( project.deploy_version_id ) {
                const deployVersion = _.find( versions, v => v.id === project.deploy_version_id );
                this.version = deployVersion.version;
                this.number = deployVersion.number;
                this.deployVersion = deployVersion;
                // console.log( this.deployVersion );
            }

            const passedList = versions.filter( ( version )=>{
                return version.state === 'passed';
            } );

            this.options = passedList.map( version => version.version );
        }

        async cancelDeploy() {
            if( this.wait ) {
                return;
            }
            this.wait = true;

            this.$store.commit('ajaxBar', true);
            this.$q.loading.show({
                message: this.$t('waiting').toString()
            });

            const result = await this.$http.updateProject( {
                id : this.projectId,
                deploy_version_id : '0',
            } );

            this.$store.commit('ajaxBar', false);
            this.$q.loading.hide();
            this.wait = false;

            if( !result || result.error ) {
                Notify.create({
                    message : this.$t('commonError').toString(),
                    position : 'top',
                    color : 'negative',
                    timeout: 2000
                });
                console.error( result && result.error || 'error' );
            }
            else {

                if( this.deployVersion ) {
                    const versions = this.$store.getters.versions( this.projectId );
                    const preVersion = _.find( versions, v => v.number === this.deployVersion.number );
                    preVersion.state = 'passed';
                    const project = this.$store.getters.project( this.projectId );
                    project.deploy_version_id = null;
                }

                Notify.create({
                    message : this.$t('projectDeploy.success.undeploy').toString(),
                    position : 'top',
                    color : 'primary',
                    timeout: 2000
                });

                await this.$router.replace( `/project/${this.projectId}` );
            }
        }

        async deploy() {
            if( !this.selectVersion || this.wait) {
                return;
            }

            this.wait = true;

            const versions = this.$store.getters.versions( this.projectId );
            const version = _.find( versions, v => v.version === this.selectVersion );
            const deploy_version_id = version.id;


            this.$store.commit('ajaxBar', true);
            this.$q.loading.show({
                message: this.$t('waiting').toString()
            });

            const result = await this.$http.updateProject( {
                id : this.projectId,
                deploy_version_id,
            } );
            
            this.$store.commit('ajaxBar', false);
            this.$q.loading.hide();
            this.wait = false;


            if( !result || result.error ) {
                Notify.create({
                    message : this.$t('projectDeploy.error.deployFail').toString(),
                    position : 'top',
                    color : 'negative',
                    timeout: 2000
                });
                console.error( result && result.error || 'error' );
            }
            else {
         
                version.state = 'deploy';
                if( this.deployVersion ) {
                    const preVersion = _.find( versions, v => v.number === this.deployVersion.number );
                    preVersion.state = 'passed';
                    const project = this.$store.getters.project( this.projectId );
                    project.deploy_version_id = version.id;
                    if( project.update_version_id === version.id ) {
                        project.update_version_id = null;
                    }
                }
                Notify.create({
                    message : this.$t('projectDeploy.success.deploy').toString(),
                    position : 'top',
                    color : 'primary',
                    timeout: 2000
                });

                await this.$router.replace( `/project/${this.projectId}` );
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