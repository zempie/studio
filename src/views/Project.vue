<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated class="">
            <q-toolbar>
                <q-btn
                        flat
                        dense
                        round
                        @click="leftDrawerOpen = !leftDrawerOpen"
                        aria-label="Menu"
                        icon="menu"
                />
                <q-toolbar-title>
                    {{title + ' - ' + $store.getters.pageName}}
                </q-toolbar-title>
                <!--                <div>Quasar v{{ $q.version }}</div>-->


                <q-btn flat round>
                    <q-icon name="notifications" />
                </q-btn>
                <q-btn flat round class="q-mx-sm">
                    <q-icon name="help" />
                </q-btn>
                <q-btn round class="q-ml-lg">
                    <q-avatar>
                        <img :src="$store.getters.developer.picture || $store.getters.developer.user.picture || ''">
                    </q-avatar>
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
                <q-item-label header>Zempie Studio Console</q-item-label>
                <q-separator />
                <q-item clickable tag="router-link" to="/studio">
                    <q-item-section avatar>
                        <q-icon name="keyboard_backspace" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>뒤로가기</q-item-label>
                        <!--                        <q-item-label caption>quasar.dev</q-item-label>-->
                    </q-item-section>
                </q-item>
                <q-separator />
                <q-item :active="$route.name==='ProjectDashboard'" clickable tag="router-link" :to="'/project/' + projectId">
                    <q-item-section avatar>
                        <q-icon name="dashboard" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>대시보드</q-item-label>
                        <!--                        <q-item-label caption>quasar.dev</q-item-label>-->
                    </q-item-section>
                </q-item>
                <q-item :active="$route.name==='ProjectSetting'" clickable tag="router-link" :to="'/project/setting/' + projectId">
                    <q-item-section avatar>
                        <q-icon name="settings_ethernet" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>기본설정</q-item-label>
                        <!--                        <q-item-label caption>quasar.dev</q-item-label>-->
                    </q-item-section>
                </q-item>
                <q-item :active="$route.name==='ProjectVersion'" clickable tag="router-link" :to="'/project/version/' + projectId">
                    <q-item-section avatar>
                        <q-icon name="launch" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>버전</q-item-label>
                        <!--                        <q-item-label caption>github.com/quasarframework</q-item-label>-->
                    </q-item-section>
                </q-item>
                <q-item :active="$route.name ==='ProjectDeploy'" clickable tag="router-link" :to="'/project/deploy/' + projectId">
                    <q-item-section avatar>
                        <q-icon name="language" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>배포</q-item-label>
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
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component({components: {}})
    export default class Project extends Vue {
        private leftDrawerOpen : boolean = false;
        @Prop() private projectId! : number;

        private title : string = '';
        private isLoad : boolean = false;


        async mounted() {


            let project = await this.$store.dispatch( 'project', this.projectId );
            this.title = project.name;
            this.isLoad = true;
        }


    }
</script>

<style scope lang="scss" d>
    .q-page-container {
        background-color: #f1f1f1;
    }
</style>