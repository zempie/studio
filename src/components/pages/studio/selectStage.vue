<template>
    <div style="width:80%">
        <div class="notification-box-list">
            <div class="notification-box" @click="clickStage(0)">
                <div class="user-status request">
                    <div
                        class="user-status-avatar user-avatar small no-outline"
                    >
                        <q-img src="img/develope_log.png" />
                    </div>

                    <div class="info-box">
                        <p class="user-status-title">개발 로그</p>

                        <p class="user-status-text small-space">
                            아직 게임을 플레이 할 수 없지만 여러분의 게임 개발
                            아이디어를 이미지, 게시물등으로 다른 사람들에게
                            공유해보세요.
                        </p>
                    </div>
                </div>
            </div>

            <div class="notification-box" @click="clickStage(1)">
                <div class="user-status request">
                    <div
                        class="user-status-avatar user-avatar small no-outline"
                    >
                        <q-img src="img/develope_early.png" />
                    </div>

                    <div class="info-box">
                        <p class="user-status-title">얼리 억세스</p>

                        <p class="user-status-text small-space">
                            게임을 실행할 수 있지만 아직 개발이 더 필요한
                            상태입니다.
                        </p>
                    </div>
                </div>
            </div>

            <div
                class="notification-box"
            
                @click="clickStage(2)"
            >
                <div class="user-status request">
                    <div
                        class="user-status-avatar user-avatar small no-outline"
                    >
                        <q-img src="img/develope_result.png" />
                    </div>

                    <div class="info-box">
                        <p class="user-status-title">결과물</p>

                        <p class="user-status-text small-space">
                            게임이 완성되었습니다. 젬파이 퍼블리싱 화면에 멋진
                            작품을 공개해주세요!
                        </p>
                    </div>
                </div>
            </div>

            <div class="notification-box" @click="clickStage()">
                <div class="user-status request">
                    <div
                        class="user-status-avatar user-avatar small no-outline"
                    >
                        <q-img src="img/develope_monetize.png" />
                    </div>

                    <div class="info-box">
                        <p class="user-status-title">수익화</p>

                        <p class="user-status-text small-space">
                            젬파이 SDK를 이용하여 완성한 게임을 통해 수익을
                            벌어보세요.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
    components: {},
})
export default class selectStage extends Vue {
    mounted() {
        this.$store.commit("gameStage", null);
    }
    clickStage(stage: number) {
        
        this.$store.commit("gameStage", stage);
        this.$store.commit("sendGameInfoDone", false);
        this.$store.commit("sendGameFileDone", false);
        console.log("getters", this.$store.getters.gameStage);
        this.$router.push("/addGameInfo")
    }
}
</script>

<style lang="scss" scoped>
.state-box {
    display: flex;
    width:100%;
    .stage-list {
        cursor: pointer;
        height: 112px;
        display: flex;
        justify-content: center;
        align-items: center;
        .sidebar-menu-header-title {
            font-weight: bold;
        }
    }
    .stage-list:hover {
        background-color: #293249;
    }
    .stage-list:first-child {
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
    }
    .account-hub-sidebar {
        width: 20%;
    }
    // .notification-box-list {
    //     width: 75%;
    // }
    .stage-list.active {
        background-color: #7750f8;
    }
}
.notification-box {
    display: flex;
    .user-status.request {
        padding-right: 0px !important;
    }
    .user-status {
        height: 100px;
    }
    .user-avatar {
        width: 100px;
        height: auto;
    }
    .user-status-title {
        font-weight: bold;
    }
    .info-box {
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: center;
        margin-left: 100px;
        .user-status-text {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
}
.notification-box:hover {
    cursor: pointer;
    background-color: #293249;
}
</style>
