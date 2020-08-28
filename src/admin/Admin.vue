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
                        <img src="https://lh3.googleusercontent.com/ogw/ADGmqu8kjHM72pB1aalCrIX4uE2HpMuVWjNsi1rV9Xjr=s32-c-mo">
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
                <q-item clickable tag="a" href="/#/studio">
                    <q-item-section avatar>
                        <q-icon name="keyboard_backspace" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>뒤로가기</q-item-label>
                        <!--                        <q-item-label caption>quasar.dev</q-item-label>-->
                    </q-item-section>
                </q-item>
                <q-separator />
                <q-item :active="$route.name==='Games'" clickable tag="a" href="/#/admin/processingVersion">
                    <q-item-section avatar>
                        <q-icon name="hourglass_top" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>심사 대기 버전</q-item-label>
                        <!--                        <q-item-label caption>quasar.dev</q-item-label>-->
                    </q-item-section>
                </q-item>
            </q-list>
        </q-drawer>

        <q-page-container class="page">
            <router-view></router-view>
        </q-page-container>

    </q-layout>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component({components: {}})
    export default class Admin extends Vue {
        private leftDrawerOpen : boolean = false;
        private searchText : string = '';

        mounted() {
        }

    }
</script>

<style scoped lang="scss">
    .q-page-container {
        background-color: #f1f1f1;
    }
</style>