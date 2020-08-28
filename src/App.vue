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

    @Component({
        components: {
        }
    })
    export default class App extends Vue {

      private ready: boolean = false;

      async mounted() {
        const isLogin = await this.$store.dispatch('isLogin');
        if (isLogin) {
          this.$router.push('/studio').catch(() => {
          });
        } else {
          const isLoginNoAuth = this.$store.getters.isLoginNoAuth;
          if (isLoginNoAuth) {
            this.$router.push('/auth').catch(() => {
            });
          } else {
            this.$router.push('/login').catch(() => {
            });
          }
        }
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
    }
</script>

<style>
</style>
