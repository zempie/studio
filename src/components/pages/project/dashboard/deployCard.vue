<template>
    <q-card class="versionCard" bordered>
        <q-card-section class="head" >
            <div class="text-h6">배포 버전</div>
        </q-card-section>
        <q-separator />
        <q-card-actions class="body">

             <div class="full-width" v-if="version && version.state === 'deploy'">
                <div class="text-body1 text-center q-mb-lg">
                    {{ `${ version.version }` }}
                </div>
                <div class="text-body1 text-center q-mb-lg">
                    배포 중입니다.
                </div>
            </div>
             <div class="full-width" v-else>
                <div class="text-body1 text-center q-mb-lg">
                    배포 중인 버전이 없습니다.
                </div>
            </div>

            <!--            <div class="full-width" v-else-if="version && version.state === 'process'">-->
            <!--                <div class="text-body1 text-center q-mb-md">-->
            <!--                    1.0.3 (4)-->
            <!--                </div>-->
            <!--                <div class="text-body1 text-center q-mb-md">-->
            <!--                    배포가 예약 되었습니다.-->
            <!--                </div>-->
            <!--                <div class="text-body1 text-center q-mb-md">-->
            <!--                    공개 시간 : 2020-10-22 15:00-->
            <!--                </div>-->
            <!--            </div>-->





        </q-card-actions>
    </q-card>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component({
    components: {}
})
export default class DeployCard extends Vue {
    @Prop() private projectId!: number;

    private version : any = null;

    async mounted() {
        this.version = this.$store.getters.deployVersion( this.projectId );
    }
}
</script>

<style scoped lang="scss">
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