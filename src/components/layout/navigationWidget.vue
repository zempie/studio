<template>
    <div style="display: inline">
        <nav
            id="navigation-widget-small"
            class="
                navigation-widget navigation-widget-desktop
                closed
                sidebar
                left
                delayed
            "
        >
            <ul class="menu small">
                <li
                    class="menu-item text-center"
                    :class="$route.name === 'DashBoard' ? 'active' : ''"
                >
                    <router-link to="/dashBoard" class="menu-item-link">
                        <svg class="menu-item-link-icon icon-overview">
                            <use xlink:href="#svg-overview"></use>
                        </svg>
                    </router-link>
                </li>
                <li
                    class="menu-item text-center"
                    :class="$route.name === 'Games' ? 'active' : ''"
                >
                    <router-link to="/games" class="menu-item-link">
                        <svg class="menu-item-link-icon icon-overview">
                            <use xlink:href="#svg-overview"></use>
                        </svg>
                    </router-link>
                </li>
                <li
                    class="menu-item text-center"
                    :class="
                        $route.name === 'SelectStage' ||
                        $route.meta.parentRouterName === 'UploadGame'
                            ? 'active'
                            : ''
                    "
                >
                    <router-link to="/selectStage" class="menu-item-link">
                        <svg class="menu-item-link-icon icon-group">
                            <use xlink:href="#svg-group"></use>
                        </svg>
                    </router-link>
                </li>
            </ul>
        </nav>

        <nav
            id="navigation-widget"
            class="
                navigation-widget navigation-widget-desktop
                sidebar
                left
                hidden
            "
        >
            <ul class="menu">
                <li
                    class="menu-item"
                    :class="$route.name === 'DashBoard' ? 'active' : ''"
                >
                    <a class="menu-item-link">
                        <svg class="menu-item-link-icon icon-overview">
                            <use xlink:href="#svg-overview"></use>
                        </svg>
                        <router-link to="/dashBoard"> 대시보드 </router-link>
                    </a>
                </li>

                <li
                    class="menu-item"
                    :class="$route.name === 'Games' ? 'active' : ''"
                >
                    <a class="menu-item-link">
                        <svg class="menu-item-link-icon icon-overview">
                            <use xlink:href="#svg-overview"></use>
                        </svg>
                        <router-link to="/games"> 모든 게임 </router-link>
                    </a>
                </li>

                <li class="menu-item">
                    <a
                        class="menu-item-link"
                        :class="
                            $route.name === 'SelectStage' ||
                            $route.meta.parentRouterName === 'UploadGame'
                                ? 'active'
                                : ''
                        "
                    >
                        <svg class="menu-item-link-icon icon-group">
                            <use xlink:href="#svg-group"></use>
                        </svg>
                        <router-link to="/selectStage">
                            게임 업로드
                        </router-link>
                    </a>
                </li>
            </ul>
        </nav>

        <nav
            id="navigation-widget-mobile"
            class="
                navigation-widget navigation-widget-mobile
                sidebar
                left
                hidden
            "
        >
            <div class="navigation-widget-close-button">
                <svg
                    class="navigation-widget-close-button-icon icon-back-arrow"
                >
                    <use xlink:href="#svg-back-arrow"></use>
                </svg>
            </div>

            <div class="navigation-widget-info-wrap">
                <div class="navigation-widget-info">
                    <a
                        class="user-avatar small no-outline"
                        href="profile-timeline.html"
                    >
                        <div class="user-avatar-content">
                            <div
                                class="hexagon-image-30-32"
                                data-src="img/avatar/01.jpg"
                            ></div>
                        </div>

                        <div class="user-avatar-progress">
                            <div class="hexagon-progress-40-44"></div>
                        </div>

                        <div class="user-avatar-progress-border">
                            <div class="hexagon-border-40-44"></div>
                        </div>

                        <div class="user-avatar-badge">
                            <div class="user-avatar-badge-border">
                                <div class="hexagon-22-24"></div>
                            </div>

                            <div class="user-avatar-badge-content">
                                <div class="hexagon-dark-16-18"></div>
                            </div>

                            <p class="user-avatar-badge-text">24</p>
                        </div>
                    </a>

                    <p class="navigation-widget-info-title">
                        <a href="profile-timeline.html">Marina Valentine</a>
                    </p>

                    <p class="navigation-widget-info-text">Welcome Back!</p>
                </div>

                <p class="navigation-widget-info-button button small secondary">
                    Logout
                </p>
            </div>

            <p class="navigation-widget-section-title">Sections</p>

            <ul class="menu">
                <li class="menu-item">
                    <a class="menu-item-link" href="newsfeed.html">
                        <svg class="menu-item-link-icon icon-newsfeed">
                            <use xlink:href="#svg-newsfeed"></use>
                        </svg>

                        Newsfeed
                    </a>
                </li>

                <li class="menu-item">
                    <a class="menu-item-link" href="overview.html">
                        <svg class="menu-item-link-icon icon-overview">
                            <use xlink:href="#svg-overview"></use>
                        </svg>

                        Overview
                    </a>
                </li>

                <li class="menu-item">
                    <a class="menu-item-link" href="groups.html">
                        <svg class="menu-item-link-icon icon-group">
                            <use xlink:href="#svg-group"></use>
                        </svg>

                        Groups
                    </a>
                </li>

                <li class="menu-item">
                    <a class="menu-item-link" href="members.html">
                        <svg class="menu-item-link-icon icon-members">
                            <use xlink:href="#svg-members"></use>
                        </svg>

                        Members
                    </a>
                </li>

                <li class="menu-item">
                    <a class="menu-item-link" href="badges.html">
                        <svg class="menu-item-link-icon icon-badges">
                            <use xlink:href="#svg-badges"></use>
                        </svg>

                        Badges
                    </a>
                </li>

                <li class="menu-item">
                    <a class="menu-item-link" href="quests.html">
                        <svg class="menu-item-link-icon icon-quests">
                            <use xlink:href="#svg-quests"></use>
                        </svg>

                        Quests
                    </a>
                </li>

                <li class="menu-item">
                    <a class="menu-item-link" href="streams.html">
                        <svg class="menu-item-link-icon icon-streams">
                            <use xlink:href="#svg-streams"></use>
                        </svg>

                        Streams
                    </a>
                </li>

                <li class="menu-item active">
                    <a class="menu-item-link" href="events.html">
                        <svg class="menu-item-link-icon icon-events">
                            <use xlink:href="#svg-events"></use>
                        </svg>

                        Events
                    </a>
                </li>

                <li class="menu-item">
                    <a class="menu-item-link" href="forums.html">
                        <svg class="menu-item-link-icon icon-forums">
                            <use xlink:href="#svg-forums"></use>
                        </svg>

                        Forums
                    </a>
                </li>

                <li class="menu-item">
                    <a class="menu-item-link" href="marketplace.html">
                        <svg class="menu-item-link-icon icon-marketplace">
                            <use xlink:href="#svg-marketplace"></use>
                        </svg>

                        Marketplace
                    </a>
                </li>
            </ul>

            <p class="navigation-widget-section-title">My Profile</p>

            <a
                class="navigation-widget-section-link"
                href="hub-profile-info.html"
                >Profile Info</a
            >

            <a
                class="navigation-widget-section-link"
                href="hub-profile-social.html"
                >Social &amp; Stream</a
            >

            <a
                class="navigation-widget-section-link"
                href="hub-profile-notifications.html"
                >Notifications</a
            >

            <a
                class="navigation-widget-section-link"
                href="hub-profile-messages.html"
                >Messages</a
            >

            <a
                class="navigation-widget-section-link"
                href="hub-profile-requests.html"
                >Friend Requests</a
            >

            <p class="navigation-widget-section-title">Account</p>

            <a
                class="navigation-widget-section-link"
                href="hub-account-info.html"
                >Account Info</a
            >

            <a
                class="navigation-widget-section-link"
                href="hub-account-password.html"
                >Change Password</a
            >

            <a
                class="navigation-widget-section-link"
                href="hub-account-settings.html"
                >General Settings</a
            >

            <p class="navigation-widget-section-title">Groups</p>

            <a
                class="navigation-widget-section-link"
                href="hub-group-management.html"
                >Manage Groups</a
            >

            <a
                class="navigation-widget-section-link"
                href="hub-group-invitations.html"
                >Invitations</a
            >

            <p class="navigation-widget-section-title">My Store</p>

            <a
                class="navigation-widget-section-link"
                href="hub-store-account.html"
                >My Account <span class="highlighted">$250,32</span></a
            >

            <a
                class="navigation-widget-section-link"
                href="hub-store-statement.html"
                >Sales Statement</a
            >

            <a
                class="navigation-widget-section-link"
                href="hub-store-items.html"
                >Manage Items</a
            >

            <a
                class="navigation-widget-section-link"
                href="hub-store-downloads.html"
                >Downloads</a
            >

            <p class="navigation-widget-section-title">Main Links</p>

            <a class="navigation-widget-section-link" href="#">Home</a>

            <a class="navigation-widget-section-link" href="#">Careers</a>

            <a class="navigation-widget-section-link" href="#">Faqs</a>

            <a class="navigation-widget-section-link" href="#">About Us</a>

            <a class="navigation-widget-section-link" href="#">Our Blog</a>

            <a class="navigation-widget-section-link" href="#">Contact Us</a>

            <a class="navigation-widget-section-link" href="#"
                >Privacy Policy</a
            >
        </nav>
    </div>
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
