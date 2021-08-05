<template>
    <div style="display: inline">
        <nav
            id="navigation-widget-small"
            class="
                navigation-widget navigation-widget-desktop
                closed
                sidebar
                left
                delayed
            "
        >
            <ul class="menu small">
                <li
                    class="menu-item text-center"
                    :class="$route.name === 'DashBoard' ? 'active' : ''"
                >
                    <router-link
                        to="/dashBoard"
                        class="menu-item-link text-tooltip-tfr"
                        data-title="대시보드"
                    >
                        <svg class="menu-item-link-icon icon-overview">
                            <use xlink:href="#svg-overview"></use>
                        </svg>
                    </router-link>
                </li>
                <li
                    class="menu-item text-center"
                    :class="$route.name === 'Games' ? 'active' : ''"
                >
                    <router-link
                        to="/games"
                        class="menu-item-link text-tooltip-tfr"
                        data-title="모든게임"
                    >
                        <svg class="menu-item-link-icon icon-list-grid-view">
                            <use xlink:href="#svg-list-grid-view"></use>
                        </svg>
                    </router-link>
                </li>
                <li
                    class="menu-item text-center"
                    :class="
                        $route.name === 'SelectStage' ||
                        $route.meta.parentRouterName === 'UploadGame'
                            ? 'active'
                            : ''
                    "
                >
                    <router-link
                        to="/selectStage"
                        class="menu-item-link text-tooltip-tfr"
                        data-title="게임 업로드"
                    >
                        <svg class="menu-item-link-icon icon-plus">
                            <use xlink:href="#svg-plus"></use>
                        </svg>
                    </router-link>
                </li>
            </ul>
        </nav>

        <nav
            id="navigation-widget"
            class="
                navigation-widget navigation-widget-desktop
                sidebar
                left
                hidden
            "
        >
            <ul class="menu">
                <li
                    class="menu-item"
                    :class="$route.name === 'DashBoard' ? 'active' : ''"
                >
                    <a class="menu-item-link">
                        <svg class="menu-item-link-icon icon-overview">
                            <use xlink:href="#svg-overview"></use>
                        </svg>
                        <router-link to="/dashBoard"> 대시보드 </router-link>
                    </a>
                </li>

                <li
                    class="menu-item"
                    :class="$route.name === 'Games' ? 'active' : ''"
                >
                    <a class="menu-item-link">
                        <svg class="menu-item-link-icon icon-list-grid-view">
                            <use xlink:href="#svg-list-grid-view"></use>
                        </svg>
                        <!-- <svg class="icon-list-grid-view">
                            <use xlink:href="#svg-list-grid-view"></use>
                        </svg> -->
                        <router-link to="/games"> 모든 게임 </router-link>
                    </a>
                </li>

                <li
                    class="menu-item"
                    :class="
                        $route.name === 'SelectStage' ||
                        $route.meta.parentRouterName === 'UploadGame'
                            ? 'active'
                            : ''
                    "
                >
                    <a class="menu-item-link">
                        <svg class="menu-item-link-icon icon-plus">
                            <use xlink:href="#svg-plus"></use>
                        </svg>

                        <router-link to="/selectStage">
                            게임 업로드
                        </router-link>
                    </a>
                </li>
            </ul>
        </nav>

        <nav
            id="navigation-widget-mobile"
            class="
                navigation-widget navigation-widget-mobile
                sidebar
                left
                hidden
            "
        >
            <div class="navigation-widget-close-button">
                <svg
                    class="navigation-widget-close-button-icon icon-back-arrow"
                >
                    <use xlink:href="#svg-back-arrow"></use>
                </svg>
            </div>

            <div class="navigation-widget-info-wrap">
                <div class="navigation-widget-info">
                    <a
                        class="user-avatar small no-outline"
                        :href="`${$store.getters.zempieUrl}/channel/${
                            user && user.channel_id
                        }`"
                    >
                        <div class="user-avatar-content">
                            <div
                                class="hexagon-image-30-32"
                                :data-src="user && user.picture"
                            ></div>
                        </div>

                        <div class="user-avatar-progress">
                            <div class="hexagon-progress-40-44"></div>
                        </div>

                        <div class="user-avatar-progress-border">
                            <div class="hexagon-border-40-44"></div>
                        </div>
                    </a>

                    <p class="navigation-widget-info-title">
                        <a
                            :href="`${$store.getters.zempieUrl}/channel/${user && user.channel_id}`"
                            >{{ user && user.name }}</a
                        >
                    </p>

                    <p class="navigation-widget-info-text">Welcome Back!</p>
                </div>

                <p
                    class="navigation-widget-info-button button small secondary"
                    @click="logout"
                >
                    Logout
                </p>
            </div>

            <ul class="menu">
                <li class="menu-item">
                    <a
                        class="menu-item-link"
                        :href="`${$store.getters.zempieUrl}/list`"
                    >
                        <svg class="menu-item-link-icon icon-overview">
                            <use xlink:href="#svg-overview"></use>
                        </svg>

                        Community
                    </a>
                </li>
            </ul>

            <p class="navigation-widget-section-title">My Profile</p>

            <a
                class="navigation-widget-section-link"
                :href="`${$store.getters.zempieUrl}/channel/${user && user.channel_id}`"
                >Profile Info</a
            >

            <router-link class="navigation-widget-section-link" to="/dashBoard"
                >Game Studio</router-link
            >

            <p class="navigation-widget-section-title">Account</p>

            <a
                class="navigation-widget-section-link"
                :href="`${$store.getters.zempieUrl}/user/${user && user.uid}/settings`"
                >General Settings</a
            >

            <a
                class="navigation-widget-section-link"
                :href="`${$store.getters.zempieUrl}/user/${user &&user.uid}/changePassword`"
                >Change Password</a
            >

            <p class="navigation-widget-section-title">Groups</p>

            <a
                class="navigation-widget-section-link"
                :href="`${$store.getters.zempieUrl}/user/${user &&user.uid}/manageJoinedGroup`"
                >Manage Groups</a
            >
        </nav>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Tooltip from "@/plugins/tooltip";

import Login from "@/scripts/login";
import { User } from "firebase";
@Component({
    components: {},
})
export default class navigationWidget extends Vue {
    @Prop() user!: User;
    private tooltip: Tooltip = new Tooltip();

    async logout() {
        this.$store.state.pathName = "logout";
        await Login.logout();

        location.href = process.env.VUE_APP_ZEMPIE_URL;
    }

    async mounted() {
        this.tooltip.init();
    }
}
</script>

<style lang="scss" scoped>
.navigation-widget {
    .menu-item.active {
        .menu-item-link {
            background-color: #7750f8;
            box-shadow: 4px 7px 12px 0 rgb(119 80 248 / 20%);
        }
        .menu-item-link:hover {
            background-color: #8a7cb8;
            box-shadow: 4px 7px 12px 0 rgb(138 124 184 / 20%);
        }
    }
    .menu-item {
        cursor: pointer;
    }
}
.navigation-widget-desktop.closed {
    padding-top: 0px !important;
}
.hidden {
    visibility: hidden !important;
    opacity: 0 !important;
    display: block !important;
}
.icon-plus {
    fill: #616a82;
}
</style>
