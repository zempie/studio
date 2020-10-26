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
        async mounted() {
            this.$store.state.pathName = 'logout';
            // await this.$http.signOut()
            await firebase.auth().signOut();

            this.$store.commit('idToken', null);
            this.$store.commit( 'user', null );
            this.$store.commit( 'developer', null );
            this.$store.commit( 'clear', null );

            await this.$router.replace('/login');
        }
    }
</script>

<style scoped>

</style>