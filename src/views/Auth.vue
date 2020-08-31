<template>
    <div class="auth">
        <div class="card">
            Zempie Studio Console
            <h6>
                새 Play Console 서비스 약관
            </h6>
            <div>
                사용자 데이터 수집 및 사용 방식을 포함하여 Play Console의 사용 환경을 구체적으로 명시하기 위해 Play Console 서비스 약관이 새로 변경되었습니다.
            </div>

            <div>
                계속해서 Play Console 및 모든 관련 제품을 사용하려면 2020년 5월 30일까지 약관을 읽고 수락해야 합니다.
            </div>
            <a href="#" @click.stop="agree">수락</a>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import store from "@/store";

    @Component({components: {}})
    export default class Auth extends Vue {
        async agree() {
            const result = await this.$rpc.createDev();
            store.commit( 'developer', result );

            console.log( result );
            this.$router.push('/studio');
            console.log(result);
        }
    }
</script>

<style scoped lang="scss">
    .auth {
        margin: 0 auto;
        max-width: 450px;
        height: 100vh;

        display: flex;
        flex-direction: column;

        justify-content: center;
        text-align: center;

        .card {
            padding: 20px;
            border-radius: 10px;
            border: solid 1px #dadce0;

        }
    }
</style>