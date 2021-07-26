<template>
    <nav
        id="navigation-widget-small"
        class="navigation-widget navigation-widget-desktop sidebar left delayed"
    >
        <!-- <a href="profile-timeline.html"> 뒤로가기 버튼이나 만들까 </a> -->
        <ul class="menu small">
            <li class="menu-item text-center" :class="$route.name === 'DashBoard' ? 'active' : ''">
                <router-link to="/dashBoard" class="menu-item-link">
                    대시 보드
                </router-link>
            </li>
            <li
                class="menu-item text-center"
                :class="$route.name === 'Games' ? 'active' : ''"
            >
                <router-link to="/games" class="menu-item-link">
                    모든 게임
                </router-link>
            </li>

            <li
                class="menu-item text-center"
                :class="$route.name === 'SelectStage' ? 'active' : ''"
            >
                <router-link to="/selectStage" class="menu-item-link">
                    게임 업로드
                </router-link>
            </li>
            <!-- <li class="menu-item text-center">
                <a class="menu-item-link">게임 만들기</a>
            </li> -->
        </ul>
    </nav>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
    components: {},
})
export default class navigationWidget extends Vue {}
</script>

<style lang="scss" scoped>
.navigation-widget {
    .menu-item.active {
        .menu-item-link {
            background-color: #7750f8;
            box-shadow: 4px 7px 12px 0 rgb(119 80 248 / 20%);
        }
        .menu-item-link:hover {
            background-color: #8a7cb8;
            box-shadow: 4px 7px 12px 0 rgb(138 124 184 / 20%);
        }
    }
    .menu-item {
        cursor: pointer;
    }
}
</style>
