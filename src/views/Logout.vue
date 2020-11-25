<template>
    <div>
        log out
    </div>
</template>

<script lang="ts">
    import * as firebase from 'firebase/app';
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import Login from "@/scripts/login";

    @Component
    export default class Logout extends Vue {
        async mounted() {
            this.$store.state.pathName = 'logout';
            await Login.logout();
            // this.$store.commit( 'clear', null );
        }
    }
</script>

<style scoped>

</style>