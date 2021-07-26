<template>
    <div class="content-grid">
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
                        <div class="sidebar-menu-item">
                            <div class="stage-list active">
                                <p class="sidebar-menu-header-title">
                                    게임 단계 선택
                                </p>
                                <svg
                                    width="20"
                                    viewBox="0 0 286.054 286.054"
                                    style="margin-left: 5px; margin-top: 2px"
                                    xml:space="preserve"
                                >
                                    <g id="alert">
                                        <path
                                            style="fill: #e2574c"
                                            d="M143.027,0C64.04,0,0,64.04,0,143.027c0,78.996,64.04,143.027,143.027,143.027   c78.996,0,143.027-64.022,143.027-143.027C286.054,64.04,222.022,0,143.027,0z M143.027,259.236   c-64.183,0-116.209-52.026-116.209-116.209S78.844,26.818,143.027,26.818s116.209,52.026,116.209,116.209   S207.21,259.236,143.027,259.236z M143.036,62.726c-10.244,0-17.995,5.346-17.995,13.981v79.201c0,8.644,7.75,13.972,17.995,13.972   c9.994,0,17.995-5.551,17.995-13.972V76.707C161.03,68.277,153.03,62.726,143.036,62.726z M143.036,187.723   c-9.842,0-17.852,8.01-17.852,17.86c0,9.833,8.01,17.843,17.852,17.843s17.843-8.01,17.843-17.843   C160.878,195.732,152.878,187.723,143.036,187.723z"
                                        />
                                    </g>
                                </svg>
                            </div>
                        </div>

                        <div class="sidebar-menu-item selected">
                            <div class="stage-list">
                                <p class="sidebar-menu-header-title">
                                    페이지 정보
                                </p>
                                <svg
                                    width="20"
                                    viewBox="0 0 286.054 286.054"
                                    style="margin-left: 5px; margin-top: 2px"
                                    xml:space="preserve"
                                >
                                    <g id="alert">
                                        <path
                                            style="fill: #e2574c"
                                            d="M143.027,0C64.04,0,0,64.04,0,143.027c0,78.996,64.04,143.027,143.027,143.027   c78.996,0,143.027-64.022,143.027-143.027C286.054,64.04,222.022,0,143.027,0z M143.027,259.236   c-64.183,0-116.209-52.026-116.209-116.209S78.844,26.818,143.027,26.818s116.209,52.026,116.209,116.209   S207.21,259.236,143.027,259.236z M143.036,62.726c-10.244,0-17.995,5.346-17.995,13.981v79.201c0,8.644,7.75,13.972,17.995,13.972   c9.994,0,17.995-5.551,17.995-13.972V76.707C161.03,68.277,153.03,62.726,143.036,62.726z M143.036,187.723   c-9.842,0-17.852,8.01-17.852,17.86c0,9.833,8.01,17.843,17.852,17.843s17.843-8.01,17.843-17.843   C160.878,195.732,152.878,187.723,143.036,187.723z"
                                        />
                                    </g>
                                </svg>
                            </div>
                        </div>

                        <div class="sidebar-menu-item">
                            <div
                                class="stage-list"
                                :class="
                                    $route.name === 'addGame' ? 'active' : ''
                                "
                            >
                                <p class="sidebar-menu-header-title">
                                    게임 정보
                                </p>
                                <svg
                                    width="20"
                                    viewBox="0 0 286.054 286.054"
                                    style="margin-left: 5px; margin-top: 2px"
                                    xml:space="preserve"
                                >
                                    <g id="alert">
                                        <path
                                            style="fill: #e2574c"
                                            d="M143.027,0C64.04,0,0,64.04,0,143.027c0,78.996,64.04,143.027,143.027,143.027   c78.996,0,143.027-64.022,143.027-143.027C286.054,64.04,222.022,0,143.027,0z M143.027,259.236   c-64.183,0-116.209-52.026-116.209-116.209S78.844,26.818,143.027,26.818s116.209,52.026,116.209,116.209   S207.21,259.236,143.027,259.236z M143.036,62.726c-10.244,0-17.995,5.346-17.995,13.981v79.201c0,8.644,7.75,13.972,17.995,13.972   c9.994,0,17.995-5.551,17.995-13.972V76.707C161.03,68.277,153.03,62.726,143.036,62.726z M143.036,187.723   c-9.842,0-17.852,8.01-17.852,17.86c0,9.833,8.01,17.843,17.852,17.843s17.843-8.01,17.843-17.843   C160.878,195.732,152.878,187.723,143.036,187.723z"
                                        />
                                    </g>
                                </svg>
                            </div>
                        </div>

                        <div class="sidebar-menu-item">
                            <div class="stage-list">
                                <p class="sidebar-menu-header-title">
                                    게임 업로드
                                </p>
                                <svg
                                    width="20"
                                    viewBox="0 0 286.054 286.054"
                                    style="margin-left: 5px; margin-top: 2px"
                                    xml:space="preserve"
                                >
                                    <g id="alert">
                                        <path
                                            style="fill: #e2574c"
                                            d="M143.027,0C64.04,0,0,64.04,0,143.027c0,78.996,64.04,143.027,143.027,143.027   c78.996,0,143.027-64.022,143.027-143.027C286.054,64.04,222.022,0,143.027,0z M143.027,259.236   c-64.183,0-116.209-52.026-116.209-116.209S78.844,26.818,143.027,26.818s116.209,52.026,116.209,116.209   S207.21,259.236,143.027,259.236z M143.036,62.726c-10.244,0-17.995,5.346-17.995,13.981v79.201c0,8.644,7.75,13.972,17.995,13.972   c9.994,0,17.995-5.551,17.995-13.972V76.707C161.03,68.277,153.03,62.726,143.036,62.726z M143.036,187.723   c-9.842,0-17.852,8.01-17.852,17.86c0,9.833,8.01,17.843,17.852,17.843s17.843-8.01,17.843-17.843   C160.878,195.732,152.878,187.723,143.036,187.723z"
                                        />
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div class="sidebar-box-footer">
                        <p class="button primary">퍼블리싱</p>
                    </div>
                </div>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
    components: {},
})
export default class UploadGame extends Vue {
    clickStage() {}
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
    .stage-list:hover{
        border-top-left-radius: 0px !important;
        border-top-right-radius: 0px !important;
        background-color: #293249;
    }
    .stage-list:first-child {
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
    }
    .account-hub-sidebar {
        width: 25%;
    }
    .notification-box-list {
        width: 75%;
    }
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
