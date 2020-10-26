<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated class="bg-color-3">
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
                    {{$store.getters.pageName}}
                </q-toolbar-title>
                <!--                <div>Quasar v{{ $q.version }}</div>-->

                <q-input v-model="searchText" dark dense class="q-mr-xl" placeholder="앱 검색">
                    <template v-slot:append>
                        <q-icon v-if="!searchText" name="search" />
                        <q-icon v-else name="clear" class="cursor-pointer" @click="searchText = ''"></q-icon>
                    </template>
                </q-input>

                <q-btn flat round>
                    <q-icon name="notifications" />
                </q-btn>
                <q-btn flat round class="q-mx-sm">
                    <q-icon name="help" />
                </q-btn>
                <q-btn round class="q-ml-lg">
                    <q-avatar>
                        <img :src="$store.getters.developer.picture || $store.getters.user.picture || ''">
                    </q-avatar>
                </q-btn>
            </q-toolbar>
        </q-header>

        <q-drawer
                v-model="leftDrawerOpen"
                show-if-above
                content-class="bg-color-2 no-border"
        >
            <q-list>
                <q-item-label header>Zempie Studio Console</q-item-label>
                <q-item :active="$route.name==='Games'" active-class="activeItem" clickable tag="router-link" to="/studio">
                    <q-item-section avatar>
                        <q-icon name="sports_esports" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>모든 게임</q-item-label>
                            <!--                        <q-item-label caption>quasar.dev</q-item-label>-->
                    </q-item-section>
                </q-item>

                <q-item :active="$route.name==='AddGame'" active-class="activeItem" clickable tag="router-link" to="/addGame">
                    <q-item-section avatar>
                        <q-icon name="games" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>게임 추가</q-item-label>
                        <!--                        <q-item-label caption>github.com/quasarframework</q-item-label>-->
                    </q-item-section>
                </q-item>
<!--                <q-item :active="$route.name==='Setting'" active-class="activeItem" clickable tag="router-link" to="/setting">-->
<!--                    <q-item-section avatar>-->
<!--                        <q-icon name="settings" />-->
<!--                    </q-item-section>-->
<!--                    <q-item-section>-->
<!--                        <q-item-label>설정</q-item-label>-->
<!--                        &lt;!&ndash;                        <q-item-label caption>chat.quasar.dev</q-item-label>&ndash;&gt;-->
<!--                    </q-item-section>-->
<!--                </q-item>-->

                <q-item :active="$route.name==='Admin'" active-class="activeItem" clickable tag="router-link" to="/admin">
                    <q-item-section avatar>
                        <q-icon name="admin_panel_settings" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>관라자 페이지</q-item-label>
                        <!--                        <q-item-label caption>chat.quasar.dev</q-item-label>-->
                    </q-item-section>
                </q-item>
            </q-list>
        </q-drawer>

        <q-page-container class="bg-color-1">
            <router-view></router-view>
        </q-page-container>

    </q-layout>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component({components: {}})
    export default class Studio extends Vue {
        private leftDrawerOpen : boolean = false;
        private searchText : string = '';

        mounted() {

            console.log( this.$store.getters.developer )

            console.log( this.$route )
        }

    }
</script>

<style scoped lang="scss">
    .q-page-container {
        //background-color: #f1f1f1;
    }

    .activeItem {
        color: inherit;
        background-color: #60676b;
    }
</style>