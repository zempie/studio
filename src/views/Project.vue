<template>
    <q-layout view="lHh Lpr lFf" class="no-drag">
        <q-header elevated class="bg-color-3">
            <q-toolbar >
                <q-btn
                    flat
                    dense
                    round
                    @click="leftDrawerOpen = !leftDrawerOpen"
                    aria-label="Menu"
                    icon="menu"
                />
                <q-toolbar-title>
                    {{ title + " - " + $store.getters.pageName }}
                </q-toolbar-title>
                <!--                <div>Quasar v{{ $q.version }}</div>-->
                <!--                <q-btn flat round>-->
                <!--                    <q-icon name="notifications" />-->
                <!--                </q-btn>-->
                <!--                <q-btn flat round class="q-mx-sm">-->
                <!--                    <q-icon name="help" />-->
                <!--                </q-btn>-->
                <q-avatar
                    class="cursorPoint mailIcon"
                    v-if="$store.getters.isLogin"
                    size="30px"
                    @click="openMailPopup"
                >
                    <q-icon name="fas fa-bullhorn" class="self-center"></q-icon>
                    <mail-popup-desktop
                        v-if="$q.platform.is.desktop"
                    ></mail-popup-desktop>
                    <mail-popup-mobile
                        v-if="$q.platform.is.mobile"
                    ></mail-popup-mobile>
                </q-avatar>
                <q-btn round class="q-ml-md">
                    <q-avatar>
                        <q-img
                            :src="
                                ($store.getters.user &&
                                    $store.getters.user.picture) ||
                                'img/icon_pic_empty_01.png'
                            "
                        ></q-img>
                    </q-avatar>
                    <account-popup-desktop></account-popup-desktop>
                </q-btn>
            </q-toolbar>
        </q-header>

        <q-drawer
            v-model="leftDrawerOpen"
            show-if-above
            bordered
            content-class=""
        >
            <q-list>
                <q-toolbar>
                    <!--                    <q-avatar>-->
                    <!--                        <img src="favicon.ico" style="width: 34px; height: 34px;">-->
                    <!--                    </q-avatar>-->
                    <a :href="$store.getters.zempieUrl">
                        <q-img
                            src="img/zempie-logo.png"
                            width="130px"
                            class="cursor-pointer"
                        ></q-img>
                    </a>
                </q-toolbar>
                <q-separator />
                <q-item clickable tag="router-link" to="/studio">
                    <q-item-section avatar>
                        <q-icon name="keyboard_backspace" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>
                            {{ $t("studioMenu.allGames") }}</q-item-label
                        >
                        <!--                        <q-item-label caption>quasar.dev</q-item-label>-->
                    </q-item-section>
                </q-item>
                <q-separator />
                <q-item
                    :active="$route.name === 'ProjectDashboard'"
                    active-class="activeItem"
                    clickable
                    tag="router-link"
                    :to="'/project/' + projectId"
                >
                    <q-item-section avatar>
                        <q-icon name="dashboard" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>{{
                            $t("studioMenu.subMenu.projectDashboard")
                        }}</q-item-label>
                        <!--                        <q-item-label caption>quasar.dev</q-item-label>-->
                    </q-item-section>
                </q-item>
                <q-item
                    :active="$route.name === 'ProjectSetting'"
                    active-class="activeItem"
                    clickable
                    tag="router-link"
                    :to="'/project/setting/' + projectId"
                >
                    <q-item-section avatar>
                        <q-icon name="settings_ethernet" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>{{
                            $t("studioMenu.subMenu.projectSetting")
                        }}</q-item-label>
                        <!--                        <q-item-label caption>quasar.dev</q-item-label>-->
                    </q-item-section>
                </q-item>
                <q-item
                    :active="$route.name === 'ProjectAddVersion'"
                    active-class="activeItem"
                    clickable
                    tag="router-link"
                    :to="'/project/addVersion/' + projectId"
                >
                    <q-item-section avatar>
                        <q-icon name="launch" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>{{
                            $t("studioMenu.subMenu.ProjectAddVersion")
                        }}</q-item-label>
                        <!--                        <q-item-label caption>github.com/quasarframework</q-item-label>-->
                    </q-item-section>
                </q-item>
                <q-item
                    :active="$route.name === 'ProjectVersion'"
                    active-class="activeItem"
                    clickable
                    tag="router-link"
                    :to="'/project/version/' + projectId"
                >
                    <q-item-section avatar>
                        <q-icon name="launch" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>{{
                            $t("studioMenu.subMenu.ProjectVersion")
                        }}</q-item-label>
                        <!--                        <q-item-label caption>github.com/quasarframework</q-item-label>-->
                    </q-item-section>
                </q-item>
                <q-item
                    :active="$route.name === 'ProjectDeploy'"
                    active-class="activeItem"
                    clickable
                    tag="router-link"
                    :to="'/project/deploy/' + projectId"
                >
                    <q-item-section avatar>
                        <q-icon name="language" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>{{
                            $t("studioMenu.subMenu.ProjectDeploy")
                        }}</q-item-label>
                        <!--                        <q-item-label caption>chat.quasar.dev</q-item-label>-->
                    </q-item-section>
                </q-item>
            </q-list>
        </q-drawer>

        <q-page-container>
            <router-view v-if="isLoad"></router-view>
        </q-page-container>
    </q-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { LoginState } from "@/store/modules/user";
import AccountPopupDesktop from "@/components/accountPopupDesktop.vue";
import MailPopupMobile from "@/components/menu/mailPopupMobile.vue";
import MailPopupDesktop from "@/components/menu/mailPopupDesktop.vue";

@Component({
    components: { AccountPopupDesktop, MailPopupDesktop, MailPopupMobile },
})
export default class Project extends Vue {
    private leftDrawerOpen: boolean = false;
    @Prop() private projectId!: number;

    private title: string = "";
    private isLoad: boolean = false;

    async mounted() {
        this.isLoad = false;

        const loginState = await this.$store.dispatch("loginState");
        // console.log( loginState );

        let project = await this.$store.dispatch("project", this.projectId);
        this.title = project.name;
        this.isLoad = true;

        // const state = await this.$store.dispatch('loginState');
        // if( state === LoginState.logout ) {
        //     await this.$router.replace('/login').catch(()=>{});
        // }
        // else if( state === LoginState.login ) {
        //     await this.$router.replace('/studio').catch(()=>{});
        // }
    }
    async openMailPopup() {
        await this.$store.dispatch("loadMails");
        this.$store.commit("mailPopupMobile", true);
    }
}
</script>

<style scope lang="scss" >
.no-drag {
    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    user-select: none;
}

.q-page-container {
    //background-color: #f1f1f1;
}

.activeItem {
    color: inherit;
    background-color: #60676b;
}
// 알람
.mailIcon {
    position: relative;
    text-align: center;
    width: 30px;
    height: 30px;
    i {
        margin: 0 auto;
    }
    &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        border: 2px solid white;
        left: 0;
        top: 0;
        border-radius: 50%;
        z-index: -1;
    }
}
</style>