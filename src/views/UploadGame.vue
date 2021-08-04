<template>
    <div>
        <div class="section-banner">
            <img
                class="section-banner-icon"
                src="img/banner/accounthub-icon.png"
                alt="accounthub-icon"
            />

            <p class="section-banner-title">게임 단계 선택</p>

            <p class="section-banner-text">
                게임이 현재 진행 중인 개발 단계를 선택하세요. 개발 도중 언제든지
                개발 단계를 변경할 수 있습니다.
            </p>
        </div>

        <div class="grid medium-space state-box">
            <div class="account-hub-sidebar">
                <div class="sidebar-box no-padding">
                    <div class="sidebar-menu">
                        <router-link
                            to="/selectStage"
                            class="sidebar-menu-item"
                            :class="
                                $route.name === 'SelectStage' ? 'active' : ''
                            "
                        >
                            <div class="stage-list">
                                <p class="sidebar-menu-header-title">
                                    게임 단계 선택
                                </p>

                                <select-alert
                                    :isPass="$store.getters.gameStage"
                                ></select-alert>
                            </div>
                        </router-link>

                        <!-- <div
                            @click="clickSideBar"
                            class="sidebar-menu-item"
                            :class="
                                $route.name === 'SelectdStage' ? 'active' : ''
                            "
                        >
                            <div class="stage-list">
                                <p class="sidebar-menu-header-title">
                                    페이지 정보
                                </p>
                                <select-alert :key="$route.name"></select-alert>
                            </div>
                        </div> -->
                        <div
                            @click="clickSideBar('/addGameInfo')"
                            class="sidebar-menu-item"
                            :class="
                                $route.name === 'AddGameInfo' ? 'active' : ''
                            "
                        >
                            <div class="stage-list">
                                <p class="sidebar-menu-header-title">
                                    게임 정보
                                </p>
                                <select-alert
                                    :isPass="
                                        $store.getters.gameStage &&
                                        $store.getters.sendGameInfoDone
                                    "
                                ></select-alert>
                            </div>
                        </div>
                        <div
                            @click="clickSideBar('/addGameFile')"
                            class="sidebar-menu-item"
                            :class="
                                $route.name === 'AddGameFile' ? 'active' : ''
                            "
                        >
                            <div class="stage-list">
                                <p class="sidebar-menu-header-title">
                                    게임 업로드
                                </p>
                                <select-alert
                                    :isPass="
                                        $store.getters.gameStage &&
                                        $store.getters.sendGameFileDone
                                    "
                                ></select-alert>
                            </div>
                        </div>
                    </div>

                    <div class="sidebar-box-footer">
                        <p
                            @click="uplaodGame"
                            class="button primary"
                            :class="
                                $store.getters.gameStage &&
                                $store.getters.sendGameFileDone &&
                                $store.getters.sendGameInfoDone
                                    ? 'active '
                                    : 'disabled'
                            "
                        >
                            퍼블리싱
                        </p>
                    </div>
                </div>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import SelectAlert from "@/components/common/selectAlert.vue";

@Component({
    components: { SelectAlert },
})
export default class UploadGame extends Vue {
    mounted() {
        console.log(this.$route.meta.parentRouterName);
        console.log(
            this.$store.getters.gameStage &&
                this.$store.getters.sendGameFileDone &&
                this.$store.getters.sendGameInfoDone
        );
    }
    clickSideBar(to: string) {
        if (!this.$store.getters.gameStage) {
            alert("게임 단계를 먼저 선택해주세용");
            return;
        } else {
            this.$router.push(to);
        }

        console.log("side!");
    }
    async uplaodGame() {
        const gameInfo = this.$store.getters.gameInfoObj;
        const gameFileInfo = this.$store.getters.gameFileInfoObj;
        // console.log(gameInfo, gameFileInfo)

        const result = await this.$http.createProject(
            gameInfo,
            gameFileInfo,
            this.$store.getters.uploadGameFiles
        );
        console.log(result);
        if (!result || result.error) {
            if (result.error.code === 40101) {
                this.$toasted.show(this.$t("forbiddenString").toString(), {
                    fullWidth: true,
                    fitToScreen: true,
                    theme: "outline",
                    position: "top-center",
                    className: "toast-error",
                    duration: 3000,
                    type: "error",
                    action: {
                        text: "X",
                        onClick: (e, toastObject) => {
                            toastObject.goAway(0);
                        },
                    },
                });
            } else {
                this.$toasted.show(
                    this.$t("addGame.error.uploadGame").toString(),
                    {
                        fullWidth: true,
                        fitToScreen: true,
                        theme: "outline",
                        position: "top-center",
                        className: "toast-error",
                        duration: 3000,
                        type: "error",
                        action: {
                            text: "X",
                            onClick: (e, toastObject) => {
                                toastObject.goAway(0);
                            },
                        },
                    }
                );
            }
            console.error((result && result.error) || "error");
        } else {
            this.$toasted.show("게임업로드가 완료되었습니다. ", {
                fullWidth: true,
                fitToScreen: true,
                theme: "outline",
                position: "top-center",
                className: "toast-success",
                duration: 3000,
                type: "success",
                action: {
                    text: "X",
                    onClick: (e, toastObject) => {
                        toastObject.goAway(0);
                    },
                },
            });
            this.$router
                .push('/games')
                .catch(() => {});
        }
    }
}
</script>

<style lang="scss" scoped>
.state-box {
    display: flex;
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
    .sidebar-menu-item:first-child:hover {
        .stage-list {
            border-top-left-radius: 12px !important;
            border-top-right-radius: 12px !important;
        }
    }
    .sidebar-menu-item:hover {
        .stage-list {
            border-top-left-radius: 0px !important;
            border-top-right-radius: 0px !important;
            background-color: #293249;
        }
    }
    .sidebar-menu-item:first-child {
        .stage-list {
            border-top-left-radius: 12px;
            border-top-right-radius: 12px;
        }
    }

    .account-hub-sidebar {
        width: 200px;
    }
    .notification-box-list {
        // width: 75%;
    }
    .sidebar-menu-item.active {
        .stage-list {
            background-color: #7750f8;
        }
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
.disabled:hover {
    background-color: #40d04f;
}
</style>
