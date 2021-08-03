<template>
    <div>
        <div class="grid">
            <div class="grid grid-3-3-3-3 centered">
                <div class="stats-box small stat-profile-views">
                    <div class="stats-box-value-wrap">
                        <p class="stats-box-value">87.365</p>

                        <div class="stats-box-diff">
                            <div class="stats-box-diff-icon positive">
                                <svg class="icon-plus-small">
                                    <use xlink:href="#svg-plus-small"></use>
                                </svg>
                            </div>

                            <p class="stats-box-diff-value">3.2%</p>
                        </div>
                    </div>

                    <p class="stats-box-title">플레이 수</p>

                    <p class="stats-box-text">전날 대비</p>
                </div>

                <div class="stats-box small stat-posts-created">
                    <div class="stats-box-value-wrap">
                        <p class="stats-box-value">294</p>

                        <div class="stats-box-diff">
                            <div class="stats-box-diff-icon positive">
                                <svg class="icon-plus-small">
                                    <use xlink:href="#svg-plus-small"></use>
                                </svg>
                            </div>

                            <p class="stats-box-diff-value">0.4%</p>
                        </div>
                    </div>

                    <p class="stats-box-title">플레이 수</p>

                    <p class="stats-box-text">지난 달 대비</p>
                </div>

                <div class="stats-box small stat-reactions-received">
                    <div class="stats-box-value-wrap">
                        <p class="stats-box-value">2.560</p>

                        <div class="stats-box-diff">
                            <div class="stats-box-diff-icon negative">
                                <svg class="icon-minus-small">
                                    <use xlink:href="#svg-minus-small"></use>
                                </svg>
                            </div>

                            <p class="stats-box-diff-value">1.8%</p>
                        </div>
                    </div>

                    <p class="stats-box-title">좋아요 수</p>

                    <p class="stats-box-text">모든 게임에서</p>
                </div>

                <div class="stats-box small stat-comments-received">
                    <div class="stats-box-value-wrap">
                        <p class="stats-box-value">947</p>

                        <div class="stats-box-diff">
                            <div class="stats-box-diff-icon positive">
                                <svg class="icon-plus-small">
                                    <use xlink:href="#svg-plus-small"></use>
                                </svg>
                            </div>

                            <p class="stats-box-diff-value">4.5%</p>
                        </div>
                    </div>

                    <p class="stats-box-title">게임 페이지 방문 수</p>

                    <p class="stats-box-text">In the last month</p>
                </div>
            </div>

            <div class="grid grid-layout-1">
                <div class="grid-sidebar">
                    <div class="profile-stats">
                        <div class="profile-stats-cover">
                            <p class="profile-stats-cover-title">Your Game!</p>

                            <p class="profile-stats-cover-text">
                                {{ project && project.name }}
                            </p>
                        </div>

                        <div class="profile-stats-info">
                            <div class="user-avatar medium">
                                <div class="user-avatar-border">
                                    <div class="hexagon-120-132"></div>
                                </div>

                                <div class="user-avatar-content">
                                    <div
                                        class="hexagon-image-82-90"
                                        :data-src="project && project.picture"
                                    ></div>
                                </div>

                                <div class="user-avatar-progress">
                                    <div class="hexagon-progress-100-110"></div>
                                </div>

                                <div class="user-avatar-progress-border">
                                    <div class="hexagon-border-100-110"></div>
                                </div>
                            </div>

                            <div class="featured-stat-list">
                                <div class="featured-stat">
                                    <svg class="featured-stat-icon icon-status">
                                        <use xlink:href="#svg-status"></use>
                                    </svg>

                                    <p class="featured-stat-title">28.4</p>

                                    <p class="featured-stat-subtitle">Posts</p>

                                    <p class="featured-stat-text">Avg Month</p>
                                </div>

                                <div class="featured-stat">
                                    <svg
                                        class="featured-stat-icon icon-comment"
                                    >
                                        <use xlink:href="#svg-comment"></use>
                                    </svg>

                                    <p class="featured-stat-title">69.7</p>

                                    <p class="featured-stat-subtitle">
                                        Comments
                                    </p>

                                    <p class="featured-stat-text">Avg Month</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="grid-content">
                    <div class="widget-box no-padding">
                        <p class="widget-box-title">Profile Activity</p>

                        <div
                            class="widget-box-content padded-for-scroll"
                            data-simplebar="init"
                        >
                            <div
                                class="simplebar-wrapper"
                                style="margin: 0px 0px -28px"
                            >
                                <div
                                    class="
                                        simplebar-height-auto-observer-wrapper
                                    "
                                >
                                    <div
                                        class="simplebar-height-auto-observer"
                                    ></div>
                                </div>
                                <div class="simplebar-mask">
                                    <div
                                        class="simplebar-offset"
                                        style="right: 0px; bottom: 0px"
                                    >
                                        <div
                                            class="simplebar-content-wrapper"
                                            style="
                                                height: 100%;
                                                overflow: hidden scroll;
                                            "
                                        >
                                            <div
                                                class="simplebar-content"
                                                style="padding: 0px 0px 28px"
                                            >
                                                <div
                                                    class="
                                                        user-status-list
                                                        scroll-content
                                                    "
                                                >
                                                    <div
                                                        class="
                                                            user-status
                                                            notification
                                                        "
                                                    >
                                                        <a
                                                            class="
                                                                user-status-avatar
                                                            "
                                                            href="profile-timeline.html"
                                                        >
                                                            <div
                                                                class="
                                                                    user-avatar
                                                                    small
                                                                    no-outline
                                                                "
                                                            >
                                                                <div
                                                                    class="
                                                                        user-avatar-content
                                                                    "
                                                                >
                                                                    <div
                                                                        class="
                                                                            hexagon-image-30-32
                                                                        "
                                                                        data-src="img/avatar/03.jpg"
                                                                        style="
                                                                            width: 30px;
                                                                            height: 32px;
                                                                            position: relative;
                                                                        "
                                                                    >
                                                                        <canvas
                                                                            width="30"
                                                                            height="32"
                                                                            style="
                                                                                position: absolute;
                                                                                top: 0px;
                                                                                left: 0px;
                                                                            "
                                                                        ></canvas>
                                                                    </div>
                                                                </div>

                                                                <div
                                                                    class="
                                                                        user-avatar-progress
                                                                    "
                                                                >
                                                                    <div
                                                                        class="
                                                                            hexagon-progress-40-44
                                                                        "
                                                                        style="
                                                                            width: 40px;
                                                                            height: 44px;
                                                                            position: relative;
                                                                        "
                                                                    >
                                                                        <canvas
                                                                            width="40"
                                                                            height="44"
                                                                            style="
                                                                                position: absolute;
                                                                                top: 0px;
                                                                                left: 0px;
                                                                            "
                                                                        ></canvas>
                                                                    </div>
                                                                </div>

                                                                <div
                                                                    class="
                                                                        user-avatar-progress-border
                                                                    "
                                                                >
                                                                    <div
                                                                        class="
                                                                            hexagon-border-40-44
                                                                        "
                                                                        style="
                                                                            width: 40px;
                                                                            height: 44px;
                                                                            position: relative;
                                                                        "
                                                                    >
                                                                        <canvas
                                                                            width="40"
                                                                            height="44"
                                                                            style="
                                                                                position: absolute;
                                                                                top: 0px;
                                                                                left: 0px;
                                                                            "
                                                                        ></canvas>
                                                                    </div>
                                                                </div>

                                                                <div
                                                                    class="
                                                                        user-avatar-badge
                                                                    "
                                                                >
                                                                    <div
                                                                        class="
                                                                            user-avatar-badge-border
                                                                        "
                                                                    >
                                                                        <div
                                                                            class="
                                                                                hexagon-22-24
                                                                            "
                                                                            style="
                                                                                width: 22px;
                                                                                height: 24px;
                                                                                position: relative;
                                                                            "
                                                                        >
                                                                            <canvas
                                                                                width="22"
                                                                                height="24"
                                                                                style="
                                                                                    position: absolute;
                                                                                    top: 0px;
                                                                                    left: 0px;
                                                                                "
                                                                            ></canvas>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        class="
                                                                            user-avatar-badge-content
                                                                        "
                                                                    >
                                                                        <div
                                                                            class="
                                                                                hexagon-dark-16-18
                                                                            "
                                                                            style="
                                                                                width: 16px;
                                                                                height: 18px;
                                                                                position: relative;
                                                                            "
                                                                        >
                                                                            <canvas
                                                                                width="16"
                                                                                height="18"
                                                                                style="
                                                                                    position: absolute;
                                                                                    top: 0px;
                                                                                    left: 0px;
                                                                                "
                                                                            ></canvas>
                                                                        </div>
                                                                    </div>

                                                                    <p
                                                                        class="
                                                                            user-avatar-badge-text
                                                                        "
                                                                    >
                                                                        16
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </a>

                                                        <p
                                                            class="
                                                                user-status-title
                                                            "
                                                        >
                                                            <a
                                                                class="bold"
                                                                href="profile-timeline.html"
                                                                >Nick Grissom</a
                                                            >
                                                            posted a comment on
                                                            your
                                                            <a
                                                                class="
                                                                    highlighted
                                                                "
                                                                href="profile-timeline.html"
                                                                >status
                                                                update</a
                                                            >
                                                        </p>

                                                        <p
                                                            class="
                                                                user-status-timestamp
                                                                small-space
                                                            "
                                                        >
                                                            2 minutes ago
                                                        </p>

                                                        <div
                                                            class="
                                                                user-status-icon
                                                            "
                                                        >
                                                            <svg
                                                                class="
                                                                    icon-comment
                                                                "
                                                            >
                                                                <use
                                                                    xlink:href="#svg-comment"
                                                                ></use>
                                                            </svg>
                                                        </div>
                                                    </div>

                                                    <div
                                                        class="
                                                            user-status
                                                            notification
                                                        "
                                                    >
                                                        <a
                                                            class="
                                                                user-status-avatar
                                                            "
                                                            href="profile-timeline.html"
                                                        >
                                                            <div
                                                                class="
                                                                    user-avatar
                                                                    small
                                                                    no-outline
                                                                "
                                                            >
                                                                <div
                                                                    class="
                                                                        user-avatar-content
                                                                    "
                                                                >
                                                                    <div
                                                                        class="
                                                                            hexagon-image-30-32
                                                                        "
                                                                        data-src="img/avatar/07.jpg"
                                                                        style="
                                                                            width: 30px;
                                                                            height: 32px;
                                                                            position: relative;
                                                                        "
                                                                    >
                                                                        <canvas
                                                                            width="30"
                                                                            height="32"
                                                                            style="
                                                                                position: absolute;
                                                                                top: 0px;
                                                                                left: 0px;
                                                                            "
                                                                        ></canvas>
                                                                    </div>
                                                                </div>

                                                                <div
                                                                    class="
                                                                        user-avatar-progress
                                                                    "
                                                                >
                                                                    <div
                                                                        class="
                                                                            hexagon-progress-40-44
                                                                        "
                                                                        style="
                                                                            width: 40px;
                                                                            height: 44px;
                                                                            position: relative;
                                                                        "
                                                                    >
                                                                        <canvas
                                                                            width="40"
                                                                            height="44"
                                                                            style="
                                                                                position: absolute;
                                                                                top: 0px;
                                                                                left: 0px;
                                                                            "
                                                                        ></canvas>
                                                                    </div>
                                                                </div>

                                                                <div
                                                                    class="
                                                                        user-avatar-progress-border
                                                                    "
                                                                >
                                                                    <div
                                                                        class="
                                                                            hexagon-border-40-44
                                                                        "
                                                                        style="
                                                                            width: 40px;
                                                                            height: 44px;
                                                                            position: relative;
                                                                        "
                                                                    >
                                                                        <canvas
                                                                            width="40"
                                                                            height="44"
                                                                            style="
                                                                                position: absolute;
                                                                                top: 0px;
                                                                                left: 0px;
                                                                            "
                                                                        ></canvas>
                                                                    </div>
                                                                </div>

                                                                <div
                                                                    class="
                                                                        user-avatar-badge
                                                                    "
                                                                >
                                                                    <div
                                                                        class="
                                                                            user-avatar-badge-border
                                                                        "
                                                                    >
                                                                        <div
                                                                            class="
                                                                                hexagon-22-24
                                                                            "
                                                                            style="
                                                                                width: 22px;
                                                                                height: 24px;
                                                                                position: relative;
                                                                            "
                                                                        >
                                                                            <canvas
                                                                                width="22"
                                                                                height="24"
                                                                                style="
                                                                                    position: absolute;
                                                                                    top: 0px;
                                                                                    left: 0px;
                                                                                "
                                                                            ></canvas>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        class="
                                                                            user-avatar-badge-content
                                                                        "
                                                                    >
                                                                        <div
                                                                            class="
                                                                                hexagon-dark-16-18
                                                                            "
                                                                            style="
                                                                                width: 16px;
                                                                                height: 18px;
                                                                                position: relative;
                                                                            "
                                                                        >
                                                                            <canvas
                                                                                width="16"
                                                                                height="18"
                                                                                style="
                                                                                    position: absolute;
                                                                                    top: 0px;
                                                                                    left: 0px;
                                                                                "
                                                                            ></canvas>
                                                                        </div>
                                                                    </div>

                                                                    <p
                                                                        class="
                                                                            user-avatar-badge-text
                                                                        "
                                                                    >
                                                                        26
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </a>

                                                        <p
                                                            class="
                                                                user-status-title
                                                            "
                                                        >
                                                            <a
                                                                class="bold"
                                                                href="profile-timeline.html"
                                                                >Sarah
                                                                Diamond</a
                                                            >
                                                            left a like
                                                            <img
                                                                class="reaction"
                                                                src="img/reaction/like.png"
                                                                alt="reaction-like"
                                                            />
                                                            reaction on your
                                                            <a
                                                                class="
                                                                    highlighted
                                                                "
                                                                href="profile-timeline.html"
                                                                >status
                                                                update</a
                                                            >
                                                        </p>

                                                        <p
                                                            class="
                                                                user-status-timestamp
                                                                small-space
                                                            "
                                                        >
                                                            17 minutes ago
                                                        </p>

                                                        <div
                                                            class="
                                                                user-status-icon
                                                            "
                                                        >
                                                            <svg
                                                                class="
                                                                    icon-thumbs-up
                                                                "
                                                            >
                                                                <use
                                                                    xlink:href="#svg-thumbs-up"
                                                                ></use>
                                                            </svg>
                                                        </div>
                                                    </div>

                                                    <div
                                                        class="
                                                            user-status
                                                            notification
                                                        "
                                                    >
                                                        <a
                                                            class="
                                                                user-status-avatar
                                                            "
                                                            href="profile-timeline.html"
                                                        >
                                                            <div
                                                                class="
                                                                    user-avatar
                                                                    small
                                                                    no-outline
                                                                "
                                                            >
                                                                <div
                                                                    class="
                                                                        user-avatar-content
                                                                    "
                                                                >
                                                                    <div
                                                                        class="
                                                                            hexagon-image-30-32
                                                                        "
                                                                        data-src="img/avatar/02.jpg"
                                                                        style="
                                                                            width: 30px;
                                                                            height: 32px;
                                                                            position: relative;
                                                                        "
                                                                    >
                                                                        <canvas
                                                                            width="30"
                                                                            height="32"
                                                                            style="
                                                                                position: absolute;
                                                                                top: 0px;
                                                                                left: 0px;
                                                                            "
                                                                        ></canvas>
                                                                    </div>
                                                                </div>

                                                                <div
                                                                    class="
                                                                        user-avatar-progress
                                                                    "
                                                                >
                                                                    <div
                                                                        class="
                                                                            hexagon-progress-40-44
                                                                        "
                                                                        style="
                                                                            width: 40px;
                                                                            height: 44px;
                                                                            position: relative;
                                                                        "
                                                                    >
                                                                        <canvas
                                                                            width="40"
                                                                            height="44"
                                                                            style="
                                                                                position: absolute;
                                                                                top: 0px;
                                                                                left: 0px;
                                                                            "
                                                                        ></canvas>
                                                                    </div>
                                                                </div>

                                                                <div
                                                                    class="
                                                                        user-avatar-progress-border
                                                                    "
                                                                >
                                                                    <div
                                                                        class="
                                                                            hexagon-border-40-44
                                                                        "
                                                                        style="
                                                                            width: 40px;
                                                                            height: 44px;
                                                                            position: relative;
                                                                        "
                                                                    >
                                                                        <canvas
                                                                            width="40"
                                                                            height="44"
                                                                            style="
                                                                                position: absolute;
                                                                                top: 0px;
                                                                                left: 0px;
                                                                            "
                                                                        ></canvas>
                                                                    </div>
                                                                </div>

                                                                <div
                                                                    class="
                                                                        user-avatar-badge
                                                                    "
                                                                >
                                                                    <div
                                                                        class="
                                                                            user-avatar-badge-border
                                                                        "
                                                                    >
                                                                        <div
                                                                            class="
                                                                                hexagon-22-24
                                                                            "
                                                                            style="
                                                                                width: 22px;
                                                                                height: 24px;
                                                                                position: relative;
                                                                            "
                                                                        >
                                                                            <canvas
                                                                                width="22"
                                                                                height="24"
                                                                                style="
                                                                                    position: absolute;
                                                                                    top: 0px;
                                                                                    left: 0px;
                                                                                "
                                                                            ></canvas>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        class="
                                                                            user-avatar-badge-content
                                                                        "
                                                                    >
                                                                        <div
                                                                            class="
                                                                                hexagon-dark-16-18
                                                                            "
                                                                            style="
                                                                                width: 16px;
                                                                                height: 18px;
                                                                                position: relative;
                                                                            "
                                                                        >
                                                                            <canvas
                                                                                width="16"
                                                                                height="18"
                                                                                style="
                                                                                    position: absolute;
                                                                                    top: 0px;
                                                                                    left: 0px;
                                                                                "
                                                                            ></canvas>
                                                                        </div>
                                                                    </div>

                                                                    <p
                                                                        class="
                                                                            user-avatar-badge-text
                                                                        "
                                                                    >
                                                                        13
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </a>

                                                        <p
                                                            class="
                                                                user-status-title
                                                            "
                                                        >
                                                            <a
                                                                class="bold"
                                                                href="profile-timeline.html"
                                                                >Destroy Dex</a
                                                            >
                                                            posted a comment on
                                                            your
                                                            <a
                                                                class="
                                                                    highlighted
                                                                "
                                                                href="profile-photos.html"
                                                                >photo</a
                                                            >
                                                        </p>

                                                        <p
                                                            class="
                                                                user-status-timestamp
                                                                small-space
                                                            "
                                                        >
                                                            31 minutes ago
                                                        </p>

                                                        <div
                                                            class="
                                                                user-status-icon
                                                            "
                                                        >
                                                            <svg
                                                                class="
                                                                    icon-comment
                                                                "
                                                            >
                                                                <use
                                                                    xlink:href="#svg-comment"
                                                                ></use>
                                                            </svg>
                                                        </div>
                                                    </div>

                                                    <div
                                                        class="
                                                            user-status
                                                            notification
                                                        "
                                                    >
                                                        <a
                                                            class="
                                                                user-status-avatar
                                                            "
                                                            href="profile-timeline.html"
                                                        >
                                                            <div
                                                                class="
                                                                    user-avatar
                                                                    small
                                                                    no-outline
                                                                "
                                                            >
                                                                <div
                                                                    class="
                                                                        user-avatar-content
                                                                    "
                                                                >
                                                                    <div
                                                                        class="
                                                                            hexagon-image-30-32
                                                                        "
                                                                        data-src="img/avatar/03.jpg"
                                                                        style="
                                                                            width: 30px;
                                                                            height: 32px;
                                                                            position: relative;
                                                                        "
                                                                    >
                                                                        <canvas
                                                                            width="30"
                                                                            height="32"
                                                                            style="
                                                                                position: absolute;
                                                                                top: 0px;
                                                                                left: 0px;
                                                                            "
                                                                        ></canvas>
                                                                    </div>
                                                                </div>

                                                                <div
                                                                    class="
                                                                        user-avatar-progress
                                                                    "
                                                                >
                                                                    <div
                                                                        class="
                                                                            hexagon-progress-40-44
                                                                        "
                                                                        style="
                                                                            width: 40px;
                                                                            height: 44px;
                                                                            position: relative;
                                                                        "
                                                                    >
                                                                        <canvas
                                                                            width="40"
                                                                            height="44"
                                                                            style="
                                                                                position: absolute;
                                                                                top: 0px;
                                                                                left: 0px;
                                                                            "
                                                                        ></canvas>
                                                                    </div>
                                                                </div>

                                                                <div
                                                                    class="
                                                                        user-avatar-progress-border
                                                                    "
                                                                >
                                                                    <div
                                                                        class="
                                                                            hexagon-border-40-44
                                                                        "
                                                                        style="
                                                                            width: 40px;
                                                                            height: 44px;
                                                                            position: relative;
                                                                        "
                                                                    >
                                                                        <canvas
                                                                            width="40"
                                                                            height="44"
                                                                            style="
                                                                                position: absolute;
                                                                                top: 0px;
                                                                                left: 0px;
                                                                            "
                                                                        ></canvas>
                                                                    </div>
                                                                </div>

                                                                <div
                                                                    class="
                                                                        user-avatar-badge
                                                                    "
                                                                >
                                                                    <div
                                                                        class="
                                                                            user-avatar-badge-border
                                                                        "
                                                                    >
                                                                        <div
                                                                            class="
                                                                                hexagon-22-24
                                                                            "
                                                                            style="
                                                                                width: 22px;
                                                                                height: 24px;
                                                                                position: relative;
                                                                            "
                                                                        >
                                                                            <canvas
                                                                                width="22"
                                                                                height="24"
                                                                                style="
                                                                                    position: absolute;
                                                                                    top: 0px;
                                                                                    left: 0px;
                                                                                "
                                                                            ></canvas>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        class="
                                                                            user-avatar-badge-content
                                                                        "
                                                                    >
                                                                        <div
                                                                            class="
                                                                                hexagon-dark-16-18
                                                                            "
                                                                            style="
                                                                                width: 16px;
                                                                                height: 18px;
                                                                                position: relative;
                                                                            "
                                                                        >
                                                                            <canvas
                                                                                width="16"
                                                                                height="18"
                                                                                style="
                                                                                    position: absolute;
                                                                                    top: 0px;
                                                                                    left: 0px;
                                                                                "
                                                                            ></canvas>
                                                                        </div>
                                                                    </div>

                                                                    <p
                                                                        class="
                                                                            user-avatar-badge-text
                                                                        "
                                                                    >
                                                                        16
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </a>

                                                        <p
                                                            class="
                                                                user-status-title
                                                            "
                                                        >
                                                            <a
                                                                class="bold"
                                                                href="profile-timeline.html"
                                                                >Nick Grissom</a
                                                            >
                                                            shared your
                                                            <a
                                                                class="
                                                                    highlighted
                                                                "
                                                                href="profile-timeline.html"
                                                                >status
                                                                update</a
                                                            >
                                                        </p>

                                                        <p
                                                            class="
                                                                user-status-timestamp
                                                                small-space
                                                            "
                                                        >
                                                            39 minutes ago
                                                        </p>

                                                        <div
                                                            class="
                                                                user-status-icon
                                                            "
                                                        >
                                                            <svg
                                                                class="
                                                                    icon-share
                                                                "
                                                            >
                                                                <use
                                                                    xlink:href="#svg-share"
                                                                ></use>
                                                            </svg>
                                                        </div>
                                                    </div>

                                                    <div
                                                        class="
                                                            user-status
                                                            notification
                                                        "
                                                    >
                                                        <a
                                                            class="
                                                                user-status-avatar
                                                            "
                                                            href="profile-timeline.html"
                                                        >
                                                            <div
                                                                class="
                                                                    user-avatar
                                                                    small
                                                                    no-outline
                                                                "
                                                            >
                                                                <div
                                                                    class="
                                                                        user-avatar-content
                                                                    "
                                                                >
                                                                    <div
                                                                        class="
                                                                            hexagon-image-30-32
                                                                        "
                                                                        data-src="img/avatar/10.jpg"
                                                                        style="
                                                                            width: 30px;
                                                                            height: 32px;
                                                                            position: relative;
                                                                        "
                                                                    >
                                                                        <canvas
                                                                            width="30"
                                                                            height="32"
                                                                            style="
                                                                                position: absolute;
                                                                                top: 0px;
                                                                                left: 0px;
                                                                            "
                                                                        ></canvas>
                                                                    </div>
                                                                </div>

                                                                <div
                                                                    class="
                                                                        user-avatar-progress
                                                                    "
                                                                >
                                                                    <div
                                                                        class="
                                                                            hexagon-progress-40-44
                                                                        "
                                                                        style="
                                                                            width: 40px;
                                                                            height: 44px;
                                                                            position: relative;
                                                                        "
                                                                    >
                                                                        <canvas
                                                                            width="40"
                                                                            height="44"
                                                                            style="
                                                                                position: absolute;
                                                                                top: 0px;
                                                                                left: 0px;
                                                                            "
                                                                        ></canvas>
                                                                    </div>
                                                                </div>

                                                                <div
                                                                    class="
                                                                        user-avatar-progress-border
                                                                    "
                                                                >
                                                                    <div
                                                                        class="
                                                                            hexagon-border-40-44
                                                                        "
                                                                        style="
                                                                            width: 40px;
                                                                            height: 44px;
                                                                            position: relative;
                                                                        "
                                                                    >
                                                                        <canvas
                                                                            width="40"
                                                                            height="44"
                                                                            style="
                                                                                position: absolute;
                                                                                top: 0px;
                                                                                left: 0px;
                                                                            "
                                                                        ></canvas>
                                                                    </div>
                                                                </div>

                                                                <div
                                                                    class="
                                                                        user-avatar-badge
                                                                    "
                                                                >
                                                                    <div
                                                                        class="
                                                                            user-avatar-badge-border
                                                                        "
                                                                    >
                                                                        <div
                                                                            class="
                                                                                hexagon-22-24
                                                                            "
                                                                            style="
                                                                                width: 22px;
                                                                                height: 24px;
                                                                                position: relative;
                                                                            "
                                                                        >
                                                                            <canvas
                                                                                width="22"
                                                                                height="24"
                                                                                style="
                                                                                    position: absolute;
                                                                                    top: 0px;
                                                                                    left: 0px;
                                                                                "
                                                                            ></canvas>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        class="
                                                                            user-avatar-badge-content
                                                                        "
                                                                    >
                                                                        <div
                                                                            class="
                                                                                hexagon-dark-16-18
                                                                            "
                                                                            style="
                                                                                width: 16px;
                                                                                height: 18px;
                                                                                position: relative;
                                                                            "
                                                                        >
                                                                            <canvas
                                                                                width="16"
                                                                                height="18"
                                                                                style="
                                                                                    position: absolute;
                                                                                    top: 0px;
                                                                                    left: 0px;
                                                                                "
                                                                            ></canvas>
                                                                        </div>
                                                                    </div>

                                                                    <p
                                                                        class="
                                                                            user-avatar-badge-text
                                                                        "
                                                                    >
                                                                        5
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </a>

                                                        <p
                                                            class="
                                                                user-status-title
                                                            "
                                                        >
                                                            <a
                                                                class="bold"
                                                                href="profile-timeline.html"
                                                                >The Green
                                                                Goo</a
                                                            >
                                                            left a love
                                                            <img
                                                                class="reaction"
                                                                src="img/reaction/love.png"
                                                                alt="reaction-love"
                                                            />
                                                            reaction on your
                                                            <a
                                                                class="
                                                                    highlighted
                                                                "
                                                                href="profile-timeline.html"
                                                                >status
                                                                update</a
                                                            >
                                                        </p>

                                                        <p
                                                            class="
                                                                user-status-timestamp
                                                                small-space
                                                            "
                                                        >
                                                            2 hours ago
                                                        </p>

                                                        <div
                                                            class="
                                                                user-status-icon
                                                            "
                                                        >
                                                            <svg
                                                                class="
                                                                    icon-thumbs-up
                                                                "
                                                            >
                                                                <use
                                                                    xlink:href="#svg-thumbs-up"
                                                                ></use>
                                                            </svg>
                                                        </div>
                                                    </div>

                                                    <div
                                                        class="
                                                            user-status
                                                            notification
                                                        "
                                                    >
                                                        <a
                                                            class="
                                                                user-status-avatar
                                                            "
                                                            href="profile-timeline.html"
                                                        >
                                                            <div
                                                                class="
                                                                    user-avatar
                                                                    small
                                                                    no-outline
                                                                "
                                                            >
                                                                <div
                                                                    class="
                                                                        user-avatar-content
                                                                    "
                                                                >
                                                                    <div
                                                                        class="
                                                                            hexagon-image-30-32
                                                                        "
                                                                        data-src="img/avatar/05.jpg"
                                                                        style="
                                                                            width: 30px;
                                                                            height: 32px;
                                                                            position: relative;
                                                                        "
                                                                    >
                                                                        <canvas
                                                                            width="30"
                                                                            height="32"
                                                                            style="
                                                                                position: absolute;
                                                                                top: 0px;
                                                                                left: 0px;
                                                                            "
                                                                        ></canvas>
                                                                    </div>
                                                                </div>

                                                                <div
                                                                    class="
                                                                        user-avatar-progress
                                                                    "
                                                                >
                                                                    <div
                                                                        class="
                                                                            hexagon-progress-40-44
                                                                        "
                                                                        style="
                                                                            width: 40px;
                                                                            height: 44px;
                                                                            position: relative;
                                                                        "
                                                                    >
                                                                        <canvas
                                                                            width="40"
                                                                            height="44"
                                                                            style="
                                                                                position: absolute;
                                                                                top: 0px;
                                                                                left: 0px;
                                                                            "
                                                                        ></canvas>
                                                                    </div>
                                                                </div>

                                                                <div
                                                                    class="
                                                                        user-avatar-progress-border
                                                                    "
                                                                >
                                                                    <div
                                                                        class="
                                                                            hexagon-border-40-44
                                                                        "
                                                                        style="
                                                                            width: 40px;
                                                                            height: 44px;
                                                                            position: relative;
                                                                        "
                                                                    >
                                                                        <canvas
                                                                            width="40"
                                                                            height="44"
                                                                            style="
                                                                                position: absolute;
                                                                                top: 0px;
                                                                                left: 0px;
                                                                            "
                                                                        ></canvas>
                                                                    </div>
                                                                </div>

                                                                <div
                                                                    class="
                                                                        user-avatar-badge
                                                                    "
                                                                >
                                                                    <div
                                                                        class="
                                                                            user-avatar-badge-border
                                                                        "
                                                                    >
                                                                        <div
                                                                            class="
                                                                                hexagon-22-24
                                                                            "
                                                                            style="
                                                                                width: 22px;
                                                                                height: 24px;
                                                                                position: relative;
                                                                            "
                                                                        >
                                                                            <canvas
                                                                                width="22"
                                                                                height="24"
                                                                                style="
                                                                                    position: absolute;
                                                                                    top: 0px;
                                                                                    left: 0px;
                                                                                "
                                                                            ></canvas>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        class="
                                                                            user-avatar-badge-content
                                                                        "
                                                                    >
                                                                        <div
                                                                            class="
                                                                                hexagon-dark-16-18
                                                                            "
                                                                            style="
                                                                                width: 16px;
                                                                                height: 18px;
                                                                                position: relative;
                                                                            "
                                                                        >
                                                                            <canvas
                                                                                width="16"
                                                                                height="18"
                                                                                style="
                                                                                    position: absolute;
                                                                                    top: 0px;
                                                                                    left: 0px;
                                                                                "
                                                                            ></canvas>
                                                                        </div>
                                                                    </div>

                                                                    <p
                                                                        class="
                                                                            user-avatar-badge-text
                                                                        "
                                                                    >
                                                                        12
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </a>

                                                        <p
                                                            class="
                                                                user-status-title
                                                            "
                                                        >
                                                            <a
                                                                class="bold"
                                                                href="profile-timeline.html"
                                                                >Neko Bebop</a
                                                            >
                                                            posted a comment on
                                                            your
                                                            <a
                                                                class="
                                                                    highlighted
                                                                "
                                                                href="profile-timeline.html"
                                                                >status
                                                                update</a
                                                            >
                                                        </p>

                                                        <p
                                                            class="
                                                                user-status-timestamp
                                                                small-space
                                                            "
                                                        >
                                                            3 hours ago
                                                        </p>

                                                        <div
                                                            class="
                                                                user-status-icon
                                                            "
                                                        >
                                                            <svg
                                                                class="
                                                                    icon-comment
                                                                "
                                                            >
                                                                <use
                                                                    xlink:href="#svg-comment"
                                                                ></use>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    class="simplebar-placeholder"
                                    style="width: auto; height: 402px"
                                ></div>
                            </div>
                            <div
                                class="simplebar-track simplebar-horizontal"
                                style="visibility: hidden"
                            >
                                <div
                                    class="simplebar-scrollbar"
                                    style="width: 0px; display: none"
                                ></div>
                            </div>
                            <div
                                class="simplebar-track simplebar-vertical"
                                style="visibility: visible"
                            >
                                <div
                                    class="simplebar-scrollbar"
                                    style="
                                        height: 318px;
                                        transform: translate3d(0px, 0px, 0px);
                                        display: block;
                                    "
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="grid-column grid-content-sidebar">
                    <div
                        class="stats-decoration v2 big secondary"
                        v-if="version && version.state === 'deploy'"
                    >
                        <p class="stats-decoration-title">
                            {{ version.version }}
                        </p>

                        <p class="stats-decoration-subtitle">배포 버전</p>

                        <router-link
                              :to="`/project/${projectId}/deploy`"
                            class="stats-decoration-text"
                            >다른 버전 배포하기</router-link
                        >
                    </div>
                    <div class="stats-decoration v2 big secondary" v-else>
                        <p class="stats-decoration-title">0.0.0</p>

                        <p class="stats-decoration-subtitle">
                            배포 중인 버전이 없습니다.
                        </p>

                        <router-link
                            :to="`/project/${projectId}/deploy`"
                            class="stats-decoration-text"
                            >배포하러 가기</router-link
                        >
                    </div>

                    <div class="stats-decoration v2 big primary">
                        <p class="stats-decoration-title">126</p>

                        <p class="stats-decoration-subtitle">Profile Views</p>

                        <p class="stats-decoration-text">Today</p>

                        <div class="percentage-diff">
                            <div class="percentage-diff-icon-wrap negative">
                                <svg
                                    class="
                                        percentage-diff-icon
                                        icon-minus-small
                                    "
                                >
                                    <use xlink:href="#svg-minus-small"></use>
                                </svg>
                            </div>

                            <p class="percentage-diff-text">4.7%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="section-header">
            <div class="section-header-info">
                <p class="section-pretitle"></p>

                <h2 class="section-title">Game Analytics</h2>
            </div>
        </div>

        <div class="grid">
            <div class="grid grid-3-3-3-3 centered">
                <div class="account-stat-box account-stat-active-users">
                    <div class="account-stat-box-icon-wrap">
                        <svg class="account-stat-box-icon icon-friend">
                            <use xlink:href="#svg-friend"></use>
                        </svg>
                    </div>

                    <p class="account-stat-box-title">71</p>

                    <p class="account-stat-box-subtitle">Active Users</p>

                    <p class="account-stat-box-text">
                        Amount of active users visiting your account at this
                        moment
                    </p>
                </div>

                <div class="account-stat-box account-stat-visits">
                    <div class="percentage-diff">
                        <div class="percentage-diff-icon-wrap positive">
                            <svg class="percentage-diff-icon icon-plus-small">
                                <use xlink:href="#svg-plus-small"></use>
                            </svg>
                        </div>

                        <p class="percentage-diff-text">3.6%</p>
                    </div>

                    <div class="account-stat-box-icon-wrap">
                        <svg class="account-stat-box-icon icon-members">
                            <use xlink:href="#svg-members"></use>
                        </svg>
                    </div>

                    <p class="account-stat-box-title">262</p>

                    <p class="account-stat-box-subtitle">Account Visits</p>

                    <p class="account-stat-box-text">
                        Times old or new members visited any of your acount
                        pages this month
                    </p>
                </div>

                <div class="account-stat-box account-stat-session-duration">
                    <div class="percentage-diff">
                        <div class="percentage-diff-icon-wrap negative">
                            <svg class="percentage-diff-icon icon-minus-small">
                                <use xlink:href="#svg-minus-small"></use>
                            </svg>
                        </div>

                        <p class="percentage-diff-text">2.4%</p>
                    </div>

                    <div class="account-stat-box-icon-wrap">
                        <svg class="account-stat-box-icon icon-clock">
                            <use xlink:href="#svg-clock"></use>
                        </svg>
                    </div>

                    <p class="account-stat-box-title">4:39</p>

                    <p class="account-stat-box-subtitle">Session Duration</p>

                    <p class="account-stat-box-text">
                        Average time in minutes of how much people spend on your
                        pages
                    </p>
                </div>

                <div class="account-stat-box account-stat-returning-visitors">
                    <div class="percentage-diff">
                        <div class="percentage-diff-icon-wrap positive">
                            <svg class="percentage-diff-icon icon-plus-small">
                                <use xlink:href="#svg-plus-small"></use>
                            </svg>
                        </div>

                        <p class="percentage-diff-text">8.2%</p>
                    </div>

                    <div class="account-stat-box-icon-wrap">
                        <svg class="account-stat-box-icon icon-return">
                            <use xlink:href="#svg-return"></use>
                        </svg>
                    </div>

                    <p class="account-stat-box-title">80%</p>

                    <p class="account-stat-box-subtitle">Returning Visitors</p>

                    <p class="account-stat-box-text">
                        Percentage of visitors that visited your account more
                        than once
                    </p>
                </div>
            </div>

            <div class="widget-box">
                <div class="widget-box-actions">
                    <div class="widget-box-action">
                        <p class="widget-box-title">Monthly Report</p>
                    </div>

                    <div class="widget-box-action">
                        <div class="reference-item-list">
                            <div class="reference-item">
                                <div class="reference-bullet primary"></div>

                                <p class="reference-item-text">Visits</p>
                            </div>

                            <div class="reference-item">
                                <div class="reference-bullet secondary"></div>

                                <p class="reference-item-text">Engagements</p>
                            </div>
                        </div>

                        <div class="form-select v2">
                            <select
                                id="ve-monthly-report-date"
                                name="ve_monthly_report_date"
                            >
                                <option value="0">September 2019</option>
                                <option value="1">November 2019</option>
                            </select>

                            <svg class="form-select-icon icon-small-arrow">
                                <use xlink:href="#svg-small-arrow"></use>
                            </svg>
                        </div>
                    </div>
                </div>

                <line-chart />

                <div class="widget-box-footer">
                    <div class="chart-info">
                        <div class="progress-arc-wrap tiny">
                            <div class="progress-arc">
                                <canvas
                                    id="ve-monthly-report-ratio-chart"
                                ></canvas>
                            </div>

                            <div class="progress-arc-info">
                                <p class="progress-arc-title">Ratio</p>
                            </div>
                        </div>

                        <div class="user-stats">
                            <div class="user-stat big">
                                <p class="user-stat-title">1.067</p>

                                <p class="user-stat-text">t. visits</p>
                            </div>

                            <div class="user-stat big">
                                <p class="user-stat-title">298</p>

                                <p class="user-stat-text">t. engagements</p>
                            </div>

                            <div class="user-stat big">
                                <p class="user-stat-title">34.4</p>

                                <p class="user-stat-text">avg visits</p>
                            </div>

                            <div class="user-stat big">
                                <p class="user-stat-title">9.6</p>

                                <p class="user-stat-text">avg engagements</p>
                            </div>

                            <div class="user-stat big">
                                <p class="user-stat-title">
                                    <svg
                                        class="
                                            user-stat-title-icon
                                            positive
                                            icon-plus-small
                                        "
                                    >
                                        <use xlink:href="#svg-plus-small"></use>
                                    </svg>

                                    26.3%
                                </p>

                                <p class="user-stat-text">visits / jul 2019</p>
                            </div>

                            <div class="user-stat big">
                                <p class="user-stat-title">
                                    <svg
                                        class="
                                            user-stat-title-icon
                                            negative
                                            icon-minus-small
                                        "
                                    >
                                        <use
                                            xlink:href="#svg-minus-small"
                                        ></use>
                                    </svg>

                                    4.9%
                                </p>

                                <p class="user-stat-text">
                                    engagements / jul 2019
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid grid-3-9 stretched">
                <div class="grid-column">
                    <div class="widget-box">
                        <p class="widget-box-title">Visits Top Countries</p>

                        <div class="widget-box-content">
                            <div class="country-stat-list">
                                <div class="country-stat with-progress">
                                    <img
                                        class="country-stat-image"
                                        src="img/flag/usa.png"
                                        alt="flag-usa"
                                    />

                                    <div class="progress-stat small">
                                        <div class="bar-progress-wrap">
                                            <p
                                                class="
                                                    bar-progress-info
                                                    medium
                                                    negative
                                                    regular
                                                "
                                            >
                                                United States<span
                                                    class="
                                                        bar-progress-text
                                                        no-space
                                                    "
                                                ></span>
                                            </p>
                                        </div>

                                        <div
                                            id="top-country-1"
                                            class="progress-stat-bar"
                                        ></div>
                                    </div>
                                </div>

                                <div class="country-stat with-progress">
                                    <img
                                        class="country-stat-image"
                                        src="img/flag/india.png"
                                        alt="flag-india"
                                    />

                                    <div class="progress-stat small">
                                        <div class="bar-progress-wrap">
                                            <p
                                                class="
                                                    bar-progress-info
                                                    medium
                                                    negative
                                                    regular
                                                "
                                            >
                                                India<span
                                                    class="
                                                        bar-progress-text
                                                        no-space
                                                    "
                                                ></span>
                                            </p>
                                        </div>

                                        <div
                                            id="top-country-2"
                                            class="progress-stat-bar"
                                        ></div>
                                    </div>
                                </div>

                                <div class="country-stat with-progress">
                                    <img
                                        class="country-stat-image"
                                        src="img/flag/brazil.png"
                                        alt="flag-brazil"
                                    />

                                    <div class="progress-stat small">
                                        <div class="bar-progress-wrap">
                                            <p
                                                class="
                                                    bar-progress-info
                                                    medium
                                                    negative
                                                    regular
                                                "
                                            >
                                                Brazil<span
                                                    class="
                                                        bar-progress-text
                                                        no-space
                                                    "
                                                ></span>
                                            </p>
                                        </div>

                                        <div
                                            id="top-country-3"
                                            class="progress-stat-bar"
                                        ></div>
                                    </div>
                                </div>

                                <div class="country-stat">
                                    <img
                                        class="country-stat-image"
                                        src="img/flag/canada.png"
                                        alt="flag-canada"
                                    />

                                    <p class="country-stat-title">Canada</p>

                                    <p class="country-stat-text">8.922</p>
                                </div>

                                <div class="country-stat">
                                    <img
                                        class="country-stat-image"
                                        src="img/flag/russia.png"
                                        alt="flag-russia"
                                    />

                                    <p class="country-stat-title">Russia</p>

                                    <p class="country-stat-text">6.303</p>
                                </div>

                                <div class="country-stat">
                                    <img
                                        class="country-stat-image"
                                        src="img/flag/turkey.png"
                                        alt="flag-turkey"
                                    />

                                    <p class="country-stat-title">Turkey</p>

                                    <p class="country-stat-text">6.278</p>
                                </div>

                                <div class="country-stat">
                                    <img
                                        class="country-stat-image"
                                        src="img/flag/france.png"
                                        alt="flag-france"
                                    />

                                    <p class="country-stat-title">France</p>

                                    <p class="country-stat-text">4.520</p>
                                </div>

                                <div class="country-stat">
                                    <img
                                        class="country-stat-image"
                                        src="img/flag/germany.png"
                                        alt="flag-germany"
                                    />

                                    <p class="country-stat-title">Germany</p>

                                    <p class="country-stat-text">3.225</p>
                                </div>

                                <div class="country-stat">
                                    <img
                                        class="country-stat-image"
                                        src="img/flag/argentina.png"
                                        alt="flag-argentina"
                                    />

                                    <p class="country-stat-title">Argentina</p>

                                    <p class="country-stat-text">1.744</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="grid-column">
                    <div class="widget-box">
                        <div class="widget-box-actions">
                            <div class="widget-box-action">
                                <p class="widget-box-title">Visits World Map</p>
                            </div>

                            <div class="widget-box-action">
                                <div class="form-select v2">
                                    <select
                                        id="visits-map-date"
                                        name="visits_map_date"
                                    >
                                        <option value="0">
                                            September 2019
                                        </option>
                                        <option value="1">November 2019</option>
                                    </select>

                                    <svg
                                        class="
                                            form-select-icon
                                            icon-small-arrow
                                        "
                                    >
                                        <use
                                            xlink:href="#svg-small-arrow"
                                        ></use>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div class="widget-box-content">
                            <img
                                class="full-width-image"
                                src="img/flag/map.png"
                                alt="map"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { GChart } from "vue-google-charts";
import Hexagon from "@/plugins/hexagon";
import Slider from "@/plugins/slider";
import LineChart from "@/components/pages/studio/Chart.vue";
import Dropdown from "@/plugins/dropdown";
@Component({
    components: { GChart, LineChart },
    computed: { ...mapGetters(["user"]) },
})
export default class projectOverview extends Vue {
    private dropdown: Dropdown = new Dropdown();
    private hexagon: Hexagon = new Hexagon();
    private slider: Slider = new Slider();
    private projectId: number = parseInt(this.$route.params.projectId);
    private version: any = null;
    loaded = false;
    chartdata = null;
    chartData = [
        ["Year", "Sales", "Expenses", "Profit"],
        ["2014", 1000, 400, 200],
        ["2015", 1170, 460, 250],
        ["2016", 660, 1120, 300],
        ["2017", 1030, 540, 350],
    ];
    chartOptions = {
        chart: {
            title: "Company Performance",
            subtitle: "Sales, Expenses, and Profit: 2014-2017",
        },
    };
    private projects = [];
    private project = "";
    async mounted() {
        await this.$store.dispatch("loginState");
        await this.$store.dispatch("project", this.projectId);

        this.project = this.$store.getters.project(this.projectId);
        this.version = this.$store.getters.deployVersion(this.projectId);
        console.log("mounted", this.version);

        this.hexagon.init();
        this.slider.init();
        this.dropdown.init();
        this.loaded = false;
        try {
            const result = [
                {
                    id: 111,
                    type: "image",
                    size: 200,
                    url: "https://picsum.photos/1024/480/?image=52",
                    name: "qwe.png",
                },
                {
                    id: 22,
                    type: "image",
                    size: 300,
                    url: "https://picsum.photos/1024/480/?image=54",
                    name: "test.png",
                },
                {
                    id: 33,
                    type: "image",
                    size: 400,
                    url: "https://picsum.photos/1024/480/?image=53",
                    name: "test1.png",
                },
            ];
            this.projects = result;

            //   const { userlist } = await fetch('/api/userlist')
            this.chartdata = this.projects;
            this.loaded = true;
        } catch (e) {
            console.error(e);
        }
    }

    @Watch("project", { immediate: true })
    initHexa() {
        this.$nextTick(() => {
            this.hexagon.init();
        });
    }
}
</script>

<style lang="scss" scoped>
.featured-stat-list {
    margin-top: 0px;
    height: 324px;
    align-items: center;
}
.grid.grid-layout-1 {
    grid-template-areas: "sidebar content content contentsidebar";
}
.featured-stat-list {
    height: 180px;
}
.grid-sidebar {
    height: 442px;
}
.profile-stats {
    padding-bottom: 0px;
    height: 100%;
}
.account-stat-visits {
    height: 336px;
}
</style>

