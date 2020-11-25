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
// import {onAuthStateChanged} from "@/plugins/firebase";

@Component({
    components: {}
})
export default class App extends Vue {

    private ready: boolean = false;

    async mounted() {
        // await this.waitLogin();
        const state = await this.$store.dispatch('loginState');
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

    // async waitLogin( retryCount : number = 0 ) {
    //
    //     const loginState = await this.$store.dispatch('loginState');
    //
    //     switch (loginState) {
    //         case LoginState.login : {
    //             this.$router.push('/studio').catch(() => {
    //             });
    //             break;
    //         }
    //         case LoginState.logout : {
    //             this.$router.push('/login').catch(() => {
    //             });
    //             break;
    //         }
    //         case LoginState.no_user : {
    //             const result = await this.$http.getUserInfo();
    //
    //             if( retryCount < 3 ) {
    //                 await onAuthStateChanged(null );
    //                 await this.waitLogin( ++retryCount );
    //             }
    //
    //             break;
    //         }
    //         case LoginState.login_noAuth : {
    //             this.$router.push('/signup').catch(() => {
    //             });
    //             break;
    //         }
    //     }
    // }
}
</script>

<style lang="scss">

.MAB40 { margin-bottom: 40px; }
.MAB20 { margin-bottom: 20px; }
.MAB10 { margin-bottom: 10px; }
.MAT0 { margin-top: 0 !important; }

.MAL10 { margin-left: 10px;}
.MAL5 { margin-left: 5px; }

.MAR30 { margin-right: 30px;}
.MAR20 { margin-right: 20px; }
.MAR10 { margin-right: 10px;}
.MAR5 { margin-right: 5px; }

.BLINE { border-bottom: 1px solid rgb(218, 220, 224); }


.body--light {
    /* ... */
    .bg-color-0 { background-color: #000000; }
    .bg-color-1 { background-color: #181818; }
    .bg-color-2 { background-color: #202020; }
    .bg-color-3 { background-color: #212121; }
}

.body--dark {
    background-color: #181818;
    .bg-color-0 { background-color: #000000; }
    .bg-color-1 { background-color: #181818; }
    .bg-color-2 { background-color: #202020; }
    .bg-color-3 { background-color: #212121; }
    .bg-color-10 { background-color: #3b3b3b; }
    .no-border { border: none }
}

.bg-fade-70 {
    background-color: rgba(1, 1, 1, 0.7);
}

.center-container {
    max-width: 960px;
    width: 100%;
    margin: 0 auto;
}

.collapsible {
    transition: 1s height ease-in;
    &.hidden {
        height: 0;
    }
}

.hintText {
    padding: 16px 0 16px 0;
    color: #777;
    font-size: 13px;
}

</style>
