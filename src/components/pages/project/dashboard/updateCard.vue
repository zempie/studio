<template>
    <q-card class="versionCard" bordered>
        <q-card-section class="head">
            <div class="text-h6">업데이트 버전</div>
        </q-card-section>
        <q-separator />
        <q-card-actions class="body">

            <div class="full-width" v-if="!version">
                <div class="text-body1 text-center q-mb-lg">
                    업데이트 중인 버전이 없습니다.
                </div>
                <div class="full-width text-right">
                    <router-link :to="`/project/addVersion/${projectId}`">
                        <q-btn>새 버전 등록하기</q-btn>
                    </router-link>
                </div>
            </div>

            <div class="full-width" v-else-if="version && version.state === 'process'">
                <div class="text-body1 text-center q-mb-lg">
                    {{ `${version.version}` }}
                </div>
                <div class="text-body1 text-center">
                    심의가 진행중 입니다.
                </div>
            </div>

            <div class="full-width" v-else-if="version && version.state === 'passed'">
                <div class="text-body1 text-center q-mb-lg">
                    {{ `${version.version}` }}
                </div>
                <div class="text-body1 text-center q-mb-lg">
                    심의를 통과하였습니다.
                </div>
                <div class="full-width text-right">
                    <router-link :to="`/project/deploy/${projectId}`">
                        <q-btn>배포하러 가기</q-btn>
                    </router-link>
                </div>
            </div>

            <div class="full-width" v-else-if="version && version.state === 'fail'">
                <div class="text-body1 text-center q-mb-lg">
                    {{ `${version.version}` }}
                </div>
                <div class="text-body1 text-center q-mb-lg">
                    심의를 실패하였습니다.
                </div>
                <div class="full-width text-right">
                    <router-link :to="`/project/version/${projectId}`">
                        <q-btn>확인하러 가기</q-btn>
                    </router-link>
                </div>
            </div>




        </q-card-actions>
    </q-card>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component({
    components: {}
})
export default class UpdateCard extends Vue {
    @Prop() private projectId!: number;

    private version : any = null;

    async mounted() {
        this.version = this.$store.getters.updateVersion( this.projectId );
    }
}
</script>

<style scoped lang="scss">
a {
    color: inherit;
    text-decoration: none;
}

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