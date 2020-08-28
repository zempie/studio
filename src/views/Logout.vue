<template>
    <div>
        log out
    </div>
</template>

<script lang="ts">
    import * as firebase from 'firebase/app';
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component
    export default class Logout extends Vue {
        async created() {
            this.$store.state.pathName = 'logout';
            // await this.$http.signOut()
            await firebase.auth().signOut();

            // this.$store.commit('setToken', undefined);
            // this.$store.commit( 'setUserInfo', null );

            if( this.$route.path !== '/' ) {
                await this.$router.replace('/');
            }
        }
    }
</script>

<style scoped>

</style>