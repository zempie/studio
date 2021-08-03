<template>
    <div>
        <div class="section-banner">
            <img
                class="section-banner-icon"
                src="img/banner/overview-icon.png"
                alt="overview-icon"
            />

            <p class="section-banner-title">DashBoard</p>

            <p class="section-banner-text">
                {{ project && project.name }}
            </p>
        </div>
        <div class="simple-tab-items">
            <router-link
                :to="`/project/${projectId}/dashboard`"
                class="
                    simple-tab-item
                    router-link-exact-active router-link-active
                "
                :class="$route.name === 'ProjectOverview' ? 'active' : ''"
                >대시 보드</router-link
            ><router-link
                :to="`/project/${projectId}/setting`"
                class="simple-tab-item"
                :class="$route.name === 'ProjectSetting' ? 'active' : ''"
                >게임 정보 수정</router-link
            ><router-link
                :to="`/project/${projectId}/version`"
                :class="$route.name === 'ProjectVersion' ? 'active' : ''"
                class="simple-tab-item"
                >버전 관리</router-link
            >
            <router-link
                :to="`/project/${projectId}/deploy`"
                :class="$route.name === 'ProjectDeploy' ? 'active' : ''"
                class="simple-tab-item"
                >배포 관리</router-link
            >
        </div>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
    components: {},
})
export default class GameDashboard extends Vue {
    private projectId: number = parseInt(this.$route.params.projectId);
    private project = "";

    async mounted() {
        await this.$store.dispatch("loginState");
        await this.$store.dispatch("project", this.projectId);
        this.project = this.$store.getters.project(this.projectId);
        console.log(this.project);
    }
}
</script>

<style scoped lang="scss">
.simple-tab-items {
    margin-top: 32px;
}
</style>
