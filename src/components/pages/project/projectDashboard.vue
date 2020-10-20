<template>
    <q-page class="flex flex-center">
        <img alt="Quasar logo" src="../../../assets/logo.png">
    </q-page>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component({
    components: {}
})
export default class ProjectDashboard extends Vue {
    @Prop() private projectId!: number;

    mounted() {
        this.$store.commit('pageName', '대시 보드');
    }
}
</script>

<style scoped lang="scss">
</style>