<template>
    
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import {LoginState} from "@/store/modules/user";

    @Component({components: {}})
    export default class Home extends Vue {
        async mounted() {
            const state = await this.$store.dispatch('loginState');
            if( state === LoginState.login ) {
                if( this.$store.getters.user.is_developer ) {
                    await this.$router.replace('/studio');
                }
                else {
                    console.log( this.$store.getters.user.is_developer );
                }
            }
            else {
                await this.$router.replace('/login');
            }
        }
    }
</script>

<style scoped lang="scss">

</style>