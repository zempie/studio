<template>
    <div>
<!--        <img alt="Quasar logo" src="../../../assets/logo.png">-->
        <content-box>
            <div class="row q-my-md">
                <deploy-card :project-id="projectId"></deploy-card>
                <update-card :project-id="projectId"></update-card>

<!--                <q-card class="versionCard" bordered>-->
<!--                    <q-card-section class="head" >-->
<!--                        <div class="text-h6">배포 버전</div>-->
<!--                    </q-card-section>-->
<!--                    <q-separator />-->
<!--                    <q-card-actions class="body">-->
<!--                        <div class="full-width">-->
<!--                            <div class="text-body1 text-center q-mb-lg">-->
<!--                                배포 중인 버전이 없습니다.-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </q-card-actions>-->
<!--                </q-card>-->
<!--                <q-card class="versionCard" bordered>-->
<!--                    <q-card-section class="head">-->
<!--                        <div class="text-h6">업데이트 버전</div>-->
<!--                    </q-card-section>-->
<!--                    <q-separator />-->
<!--                    <q-card-actions class="body">-->
<!--                        <div class="full-width">-->
<!--                            <div class="text-body1 text-center q-mb-lg">-->
<!--                                업데이트 중인 버전이 없습니다.-->
<!--                            </div>-->
<!--                            <div class="full-width text-right">-->
<!--                                <q-btn>새 버전 등록하기</q-btn>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </q-card-actions>-->
<!--                </q-card>-->
<!--                <q-card class="versionCard" bordered>-->
<!--                    <q-card-section class="head">-->
<!--                        <div class="text-h6">업데이트 버전</div>-->
<!--                    </q-card-section>-->
<!--                    <q-separator />-->
<!--                    <q-card-actions class="body">-->
<!--                        <div class="full-width">-->
<!--                            <div class="text-body1 text-center q-mb-lg">-->
<!--                                1.0.0 (1)-->
<!--                            </div>-->
<!--                            <div class="text-body1 text-center">-->
<!--                                심의가 진행중 입니다.-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </q-card-actions>-->
<!--                </q-card>-->
<!--                <q-card class="versionCard" bordered>-->
<!--                    <q-card-section class="head">-->
<!--                        <div class="text-h6">업데이트 버전</div>-->
<!--                    </q-card-section>-->
<!--                    <q-separator />-->
<!--                    <q-card-actions class="body">-->
<!--                        <div class="full-width">-->
<!--                            <div class="text-body1 text-center q-mb-lg">-->
<!--                                1.0.0 (1)-->
<!--                            </div>-->
<!--                            <div class="text-body1 text-center q-mb-lg">-->
<!--                                심의를 통과하였습니다.-->
<!--                            </div>-->
<!--                            <div class="full-width text-right">-->
<!--                                <q-btn>배포하러 가기</q-btn>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </q-card-actions>-->
<!--                </q-card>-->
<!--                <q-card class="versionCard" bordered>-->
<!--                    <q-card-section class="head">-->
<!--                        <div class="text-h6">배포 버전</div>-->
<!--                    </q-card-section>-->
<!--                    <q-separator />-->
<!--                    <q-card-actions class="body">-->
<!--                        <div class="full-width">-->
<!--                            <div class="text-body1 text-center q-mb-lg">-->
<!--                                1.0.2 (3)-->
<!--                            </div>-->
<!--                            <div class="text-body1 text-center q-mb-lg">-->
<!--                               배포 중입니다.-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </q-card-actions>-->
<!--                </q-card>-->
<!--                <q-card class="versionCard" bordered>-->
<!--                    <q-card-section class="head">-->
<!--                        <div class="text-h6">배포 버전</div>-->
<!--                    </q-card-section>-->
<!--                    <q-separator />-->
<!--                    <q-card-actions class="body">-->
<!--                        <div class="full-width">-->
<!--                            <div class="text-body1 text-center q-mb-md">-->
<!--                                1.0.3 (4)-->
<!--                            </div>-->
<!--                            <div class="text-body1 text-center q-mb-md">-->
<!--                                배포가 예약 되었습니다.-->
<!--                            </div>-->
<!--                            <div class="text-body1 text-center q-mb-md">-->
<!--                                공개 시간 : 2020-10-22 15:00-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </q-card-actions>-->
<!--                </q-card>-->
<!--                <q-card class="versionCard" bordered>-->
<!--                    <q-card-section class="head">-->
<!--                        <div class="text-h6">업데이트 버전</div>-->
<!--                    </q-card-section>-->
<!--                    <q-separator />-->
<!--                    <q-card-actions class="body">-->
<!--                        <div class="full-width">-->
<!--                            <div class="text-body1 text-center q-mb-lg">-->
<!--                                1.0.4 (5)-->
<!--                            </div>-->
<!--                            <div class="text-body1 text-center q-mb-lg">-->
<!--                                심의를 실패하였습니다.-->
<!--                            </div>-->
<!--                            <div class="full-width text-right">-->
<!--                                <q-btn>확인하러 가기</q-btn>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </q-card-actions>-->
<!--                </q-card>-->
            </div>

        </content-box>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import ContentBox from "@/components/layout/contentBox.vue";
import DeployCard from "@/components/pages/project/dashboard/deployCard.vue";
import UpdateCard from "@/components/pages/project/dashboard/updateCard.vue";

@Component({
    components: {UpdateCard, DeployCard, ContentBox}
})
export default class ProjectDashboard extends Vue {
    @Prop() private projectId!: number;

    private deployVersion : any = null;
    private updateVersion : any = null;

    mounted() {
        this.$store.commit('pageName', this.$t('studioMenu.subMenu.projectDashboard'));
        this.deployVersion = this.$store.getters.deployVersion( this.projectId );
        this.updateVersion = this.$store.getters.updateVersion( this.projectId );
    }
}
</script>

<style scoped lang="scss">
    @import "src/styles/quasar";

    .versionCard {
        width: 300px;
        height: 240px;
        margin: 20px auto;
        //background-color: $grey-8;

        @media ( max-width: 350px ) {
            width: 100%;
        }

        .head {
            height: 64px;
        }

        .body {
            height: calc( 100% - 65px );
            //background-color: $grey-10;
        }
    }
</style>