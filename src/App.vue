<template>
    <div>
        <router-view v-if="ready"></router-view>
        <q-ajax-bar
            ref="bar"
            position="bottom"
            color="accent"
            size="10px"
            skip-hijack
        />
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
import * as firebase from "firebase";
import {LoginState} from "@/store/modules/user";
import {onAuthStateChanged} from "@/plugins/firebase";

@Component({
    components: {}
})
export default class App extends Vue {

    private ready: boolean = false;

    async mounted() {
        await this.waitLogin();
        this.ready = true;
    }

    @Watch('$store.getters.ajaxBar')
    onChangeAjaxBar() {
        if (this.$store.getters.ajaxBar) {
            //@ts-ignore
            this.$refs.bar.start();
        } else {
            //@ts-ignore
            this.$refs.bar.stop();
        }
    }

    async waitLogin() {
        const loginState = await this.$store.dispatch('loginState');
        switch (loginState) {
            case LoginState.login : {
                // this.$router.push('/studio').catch(() => {
                // });
                break;
            }
            case LoginState.logout : {
                this.$router.push('/login').catch(() => {
                });
                break;
            }
            case LoginState.no_user : {
                const result = await this.$rpc.getUserInfo();
                await onAuthStateChanged(null);
                await this.waitLogin();
                break;
            }
            case LoginState.login_noAuth : {
                this.$router.push('/auth').catch(() => {
                });
                break;
            }
        }
    }
}
</script>

<style>
</style>
