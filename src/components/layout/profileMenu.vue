<template>
    <div class="header-actions">
        <!-- <div class="login" @click="logout">logout</div> -->
        <div class="lang-selector form-select dropbox-container">
            <select name="sub-manager" class="dropbox custom-select">
                <option v-for="lang in langList" :key="lang.id">
                    {{ lang }}
                </option>
            </select>
        </div>
        <div class="action-list dark">
            <!-- messages -->
            <messages></messages>

            <notification></notification>
        </div>

        <div class="action-item-wrap">
            <div
                class="action-item dark header-settings-dropdown-trigger"
                ref="dropdown"
            >
                <svg class="action-item-icon icon-settings">
                    <use xlink:href="#svg-settings"></use>
                </svg>
            </div>

            <div class="dropdown-navigation header-settings-dropdown">
                <div class="dropdown-navigation-header">
                    <div class="user-status">
                        <a
                            :href="`${$store.getters.zempieUrl}/channel/${user.channel_id}`"
                            class="user-status-avatar"
                        >
                            <div class="user-avatar small no-outline">
                                <div class="user-avatar-content">
                                    <div
                                        class="hexagon-image-30-32"
                                        :data-src="user.picture"
                                    ></div>
                                </div>

                                <div class="user-avatar-progress">
                                    <div class="hexagon-progress-40-44"></div>
                                </div>

                                <div class="user-avatar-progress-border">
                                    <div class="hexagon-border-40-44"></div>
                                </div>
                            </div>
                        </a>

                        <p class="user-status-title">
                            <span class="bold">Hi {{ user.name }}!</span>
                        </p>

                        <p class="user-status-text small">
                            <a   :href="`${$store.getters.zempieUrl}/channel/${user.channel_id}`"
                                >@{{ user.nickname }}</a
                            >
                        </p>
                    </div>
                </div>

                <p class="dropdown-navigation-category">My Profile</p>
                <a
                    class="dropdown-navigation-link"
                    :href="`${$store.getters.zempieUrl}/channel/${user.channel_id}`"
                    @click="routerClick"
                    >Profile Info</a
                >

                <!-- 
                    <a
                        class="dropdown-navigation-link"
                        href="hub-profile-notifications.html"
                        >Notifications</a
                    > -->

                <router-link class="dropdown-navigation-link" to="/dashBoard"
                    >Game Studio</router-link
                >

                <p class="dropdown-navigation-category">Account</p>

                <!-- <a
                        class="dropdown-navigation-link"
                        href="hub-account-info.html"
                        >Account Info</a
                    > -->
                <a
                    class="dropdown-navigation-link"
                    :href="`${$store.getters.zempieUrl}/user/${user.uid}/changePassword`"
                    @click="routerClick"
                    >Change Password</a
                >

                <a
                    class="dropdown-navigation-link"
                    :href="`${$store.getters.zempieUrl}/user/${user.uid}/settings`"
                    @click="routerClick"
                    >General Settings</a
                >

                <p class="dropdown-navigation-category">Groups</p>
                <a
                    class="dropdown-navigation-link"
                    :href="`${$store.getters.zempieUrl}/user/${user.uid}/manageJoinedGroup`"
                    @click="routerClick"
                    >Manage Groups</a
                >

                <p
                    class="dropdown-navigation-button button small secondary"
                    @click="logout"
                >
                    Logout
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Dropdown from "@/plugins/dropdown";
import Hexagon from "@/plugins/hexagon";
import Login from "@/scripts/login";

import Messages from "@/components/pages/user/Messages.vue";
import Notification from "@/components/pages/user/Notification.vue";
@Component({
    components: { Messages, Notification },
})
export default class ProfileMenu extends Vue {
    private dropdown: Dropdown = new Dropdown();

    private hexagon: Hexagon = new Hexagon();
    private user = this.$store.getters.user;
    private langList = ["한국어", "English"];
    mounted() {
        // await this.$store.dispatch('loginState');

        this.hexagon.init();
        this.dropdown.init();
    }
    async logout() {
        this.$store.state.pathName = "logout";
        await Login.logout();

          location.href = process.env.VUE_APP_ZEMPIE_URL;
    }

    routerClick() {
        (this.$refs.dropdown as HTMLElement).click();
    }
}
</script>

<style lang="scss" scoped>
.login {
    color: #fff;
    display: flex;
    margin-right: 26px;
    text-transform: uppercase;
    cursor: pointer;
}
.lang-selector {
    display: flex;
    margin-right: 26px;
    align-items: center;
    height: 80px;
    .custom-select {
        padding: 0.375rem 1.75rem 0.375rem 0.75rem;
        height: 38px;
        border: none !important;
        background: #7750f8
            url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5' viewBox='0 0 4 5'%3e%3cpath fill='white' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e")
            no-repeat right 0.75rem center/8px 10px !important;
    }
    .custom-select:focus {
        box-shadow: none !important;
    }
    .custom-select::after {
        color: #fff;
    }
}
</style>
