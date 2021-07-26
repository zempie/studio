<template>
    <div class="content-grid">
        <div class="section-banner">
            <img
                class="section-banner-icon"
                src="img/banner/overview-icon.png"
                alt="overview-icon"
            />

            <p class="section-banner-title">Overview</p>

            <p class="section-banner-text">
                Review your account, see stats and more!
            </p>
        </div>

        <div class="section-header">
            <div class="section-header-info">
                <p class="section-pretitle">Overview</p>

                <h2 class="section-title">My Profile</h2>
            </div>
        </div>

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

                    <p class="stats-box-title">Profile Views</p>

                    <p class="stats-box-text">In the last month</p>
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

                    <p class="stats-box-title">Posts Created</p>

                    <p class="stats-box-text">In the last month</p>
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

                    <p class="stats-box-title">Reactions Received</p>

                    <p class="stats-box-text">In the last month</p>
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

                    <p class="stats-box-title">Comments Received</p>

                    <p class="stats-box-text">In the last month</p>
                </div>
            </div>

            <div class="grid grid-layout-1">
                <div class="grid-sidebar">
                    <div class="profile-stats fixed-height">
                        <div class="profile-stats-cover">
                            <p class="profile-stats-cover-title">
                                Welcome Back!
                            </p>

                            <p class="profile-stats-cover-text">
                                {{ user.name }}
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
                                        :data-src="user.picture"
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

                            <div class="featured-stat-list">
                                <div class="featured-stat">
                                    <div class="progress-arc-wrap small">
                                        <div class="progress-arc">
                                            <canvas
                                                id="posts-engagement-chart"
                                            ></canvas>
                                        </div>

                                        <div class="progress-arc-info">
                                            <p class="progress-arc-title">
                                                87%
                                            </p>
                                        </div>
                                    </div>

                                    <p class="featured-stat-subtitle">Posts</p>

                                    <p class="featured-stat-text">Engagement</p>
                                </div>

                                <div class="featured-stat">
                                    <div class="progress-arc-wrap small">
                                        <div class="progress-arc">
                                            <canvas
                                                id="posts-shared-chart"
                                            ></canvas>
                                        </div>

                                        <div class="progress-arc-info">
                                            <p class="progress-arc-title">
                                                42%
                                            </p>
                                        </div>
                                    </div>

                                    <p class="featured-stat-subtitle">Posts</p>

                                    <p class="featured-stat-text">Shared</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="grid-header">
                    <div class="slider-line small">
                        <div
                            id="user-stats-slider-controls"
                            class="slider-controls"
                        >
                            <div class="slider-control left">
                                <svg
                                    class="slider-control-icon icon-small-arrow"
                                >
                                    <use xlink:href="#svg-small-arrow"></use>
                                </svg>
                            </div>

                            <div class="slider-control right">
                                <svg
                                    class="slider-control-icon icon-small-arrow"
                                >
                                    <use xlink:href="#svg-small-arrow"></use>
                                </svg>
                            </div>
                        </div>

                        <div
                            id="user-stats-slider"
                            class="slider-slides with-separator"
                        >
                            <div class="slider-slide">
                                <div class="user-stat big">
                                    <p class="user-stat-title">930</p>

                                    <p class="user-stat-text">posts</p>
                                </div>
                            </div>

                            <div class="slider-slide">
                                <div class="user-stat big">
                                    <p class="user-stat-title">82</p>

                                    <p class="user-stat-text">friends</p>
                                </div>
                            </div>

                            <div class="slider-slide">
                                <div class="user-stat big">
                                    <p class="user-stat-title">5.7k</p>

                                    <p class="user-stat-text">visits</p>
                                </div>
                            </div>

                            <div class="slider-slide">
                                <div class="user-stat big">
                                    <p class="user-stat-title">13</p>

                                    <p class="user-stat-text">badges</p>
                                </div>
                            </div>

                            <div class="slider-slide">
                                <div class="user-stat big">
                                    <p class="user-stat-title">74</p>

                                    <p class="user-stat-text">photos</p>
                                </div>
                            </div>

                            <div class="slider-slide">
                                <div class="user-stat big">
                                    <p class="user-stat-title">10.6k</p>

                                    <p class="user-stat-text">reactions (r)</p>
                                </div>
                            </div>

                            <div class="slider-slide">
                                <div class="user-stat big">
                                    <p class="user-stat-title">8.4k</p>

                                    <p class="user-stat-text">comments (r)</p>
                                </div>
                            </div>

                            <div class="slider-slide">
                                <div class="user-stat big">
                                    <p class="user-stat-title">2.3k</p>

                                    <p class="user-stat-text">shares (r)</p>
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
                            data-simplebar
                        >
                            <div class="user-status-list scroll-content">
                                <div class="user-status notification">
                                    <a
                                        class="user-status-avatar"
                                        href="profile-timeline.html"
                                    >
                                        <div
                                            class="user-avatar small no-outline"
                                        >
                                            <div class="user-avatar-content">
                                                <div
                                                    class="hexagon-image-30-32"
                                                    data-src="img/avatar/03.jpg"
                                                ></div>
                                            </div>

                                            <div class="user-avatar-progress">
                                                <div
                                                    class="
                                                        hexagon-progress-40-44
                                                    "
                                                ></div>
                                            </div>

                                            <div
                                                class="
                                                    user-avatar-progress-border
                                                "
                                            >
                                                <div
                                                    class="hexagon-border-40-44"
                                                ></div>
                                            </div>
                                        </div>
                                    </a>

                                    <p class="user-status-title">
                                        <a
                                            class="bold"
                                            href="profile-timeline.html"
                                            >Nick Grissom</a
                                        >
                                        posted a comment on your
                                        <a
                                            class="highlighted"
                                            href="profile-timeline.html"
                                            >status update</a
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

                                    <div class="user-status-icon">
                                        <svg class="icon-comment">
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

                <div class="grid-column grid-content-sidebar">
                    <div class="stats-decoration v2 big secondary">
                        <p class="stats-decoration-title">33</p>

                        <p class="stats-decoration-subtitle">
                            Post Engagements
                        </p>

                        <p class="stats-decoration-text">Today</p>

                        <div class="percentage-diff">
                            <div class="percentage-diff-icon-wrap positive">
                                <svg
                                    class="percentage-diff-icon icon-plus-small"
                                >
                                    <use xlink:href="#svg-plus-small"></use>
                                </svg>
                            </div>

                            <p class="percentage-diff-text">5.3%</p>
                        </div>
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

            <div class="slider-line medium">
                <div
                    id="reaction-stats-slider-controls"
                    class="slider-controls"
                >
                    <div class="slider-control left">
                        <svg class="slider-control-icon icon-small-arrow">
                            <use xlink:href="#svg-small-arrow"></use>
                        </svg>
                    </div>

                    <div class="slider-control right">
                        <svg class="slider-control-icon icon-small-arrow">
                            <use xlink:href="#svg-small-arrow"></use>
                        </svg>
                    </div>
                </div>

                <div
                    id="reaction-stats-slider"
                    class="slider-slides with-separator"
                >
                    <div class="slider-slide">
                        <div class="reaction-stat">
                            <img
                                class="reaction-stat-image"
                                src="img/reaction/like.png"
                                alt="reaction-like"
                            />

                            <p class="reaction-stat-title">12.642</p>

                            <p class="reaction-stat-text">Likes</p>
                        </div>
                    </div>

                    <div class="slider-slide">
                        <div class="reaction-stat">
                            <img
                                class="reaction-stat-image"
                                src="img/reaction/love.png"
                                alt="reaction-love"
                            />

                            <p class="reaction-stat-title">8.913</p>

                            <p class="reaction-stat-text">Loves</p>
                        </div>
                    </div>

                    <div class="slider-slide">
                        <div class="reaction-stat">
                            <img
                                class="reaction-stat-image"
                                src="img/reaction/dislike.png"
                                alt="reaction-dislike"
                            />

                            <p class="reaction-stat-title">945</p>

                            <p class="reaction-stat-text">Dislikes</p>
                        </div>
                    </div>

                    <div class="slider-slide">
                        <div class="reaction-stat">
                            <img
                                class="reaction-stat-image"
                                src="img/reaction/happy.png"
                                alt="reaction-happy"
                            />

                            <p class="reaction-stat-title">7.034</p>

                            <p class="reaction-stat-text">Happy</p>
                        </div>
                    </div>

                    <div class="slider-slide">
                        <div class="reaction-stat">
                            <img
                                class="reaction-stat-image"
                                src="img/reaction/funny.png"
                                alt="reaction-funny"
                            />

                            <p class="reaction-stat-title">2.356</p>

                            <p class="reaction-stat-text">Funny</p>
                        </div>
                    </div>

                    <div class="slider-slide">
                        <div class="reaction-stat">
                            <img
                                class="reaction-stat-image"
                                src="img/reaction/wow.png"
                                alt="reaction-wow"
                            />

                            <p class="reaction-stat-title">5.944</p>

                            <p class="reaction-stat-text">Wow</p>
                        </div>
                    </div>

                    <div class="slider-slide">
                        <div class="reaction-stat">
                            <img
                                class="reaction-stat-image"
                                src="img/reaction/angry.png"
                                alt="reaction-angry"
                            />

                            <p class="reaction-stat-title">1.706</p>

                            <p class="reaction-stat-text">Angry</p>
                        </div>
                    </div>

                    <div class="slider-slide">
                        <div class="reaction-stat">
                            <img
                                class="reaction-stat-image"
                                src="img/reaction/sad.png"
                                alt="reaction-sad"
                            />

                            <p class="reaction-stat-title">801</p>

                            <p class="reaction-stat-text">Sad</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid grid-3-3-3-3 centered">
                <div class="featured-stat-box reactioner">
                    <div class="featured-stat-box-cover">
                        <p class="featured-stat-box-cover-title">Top Reactor</p>

                        <p class="featured-stat-box-cover-text">
                            of last month
                        </p>
                    </div>

                    <div class="featured-stat-box-info">
                        <div class="user-avatar small">
                            <div class="user-avatar-border">
                                <div class="hexagon-50-56"></div>
                            </div>

                            <div class="user-avatar-content">
                                <div
                                    class="hexagon-image-30-32"
                                    data-src="img/avatar/02.jpg"
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

                                <p class="user-avatar-badge-text">13</p>
                            </div>
                        </div>

                        <p class="featured-stat-box-title">94</p>

                        <p class="featured-stat-box-subtitle">Reactions</p>

                        <p class="featured-stat-box-text">Destroy Dex</p>
                    </div>
                </div>

                <div class="featured-stat-box reactioner">
                    <div class="featured-stat-box-cover">
                        <p class="featured-stat-box-cover-title">Top Reactor</p>

                        <p class="featured-stat-box-cover-text">of all time</p>
                    </div>

                    <div class="featured-stat-box-info">
                        <div class="user-avatar small">
                            <div class="user-avatar-border">
                                <div class="hexagon-50-56"></div>
                            </div>

                            <div class="user-avatar-content">
                                <div
                                    class="hexagon-image-30-32"
                                    data-src="img/avatar/03.jpg"
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

                                <p class="user-avatar-badge-text">16</p>
                            </div>
                        </div>

                        <p class="featured-stat-box-title">1.569</p>

                        <p class="featured-stat-box-subtitle">Reactions</p>

                        <p class="featured-stat-box-text">Nick Grissom</p>
                    </div>
                </div>

                <div class="featured-stat-box commenter">
                    <div class="featured-stat-box-cover">
                        <p class="featured-stat-box-cover-title">
                            Top Commenter
                        </p>

                        <p class="featured-stat-box-cover-text">
                            of last month
                        </p>
                    </div>

                    <div class="featured-stat-box-info">
                        <div class="user-avatar small">
                            <div class="user-avatar-border">
                                <div class="hexagon-50-56"></div>
                            </div>

                            <div class="user-avatar-content">
                                <div
                                    class="hexagon-image-30-32"
                                    data-src="img/avatar/05.jpg"
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

                                <p class="user-avatar-badge-text">12</p>
                            </div>
                        </div>

                        <p class="featured-stat-box-title">47</p>

                        <p class="featured-stat-box-subtitle">Comments</p>

                        <p class="featured-stat-box-text">Neko Bebop</p>
                    </div>
                </div>

                <div class="featured-stat-box commenter">
                    <div class="featured-stat-box-cover">
                        <p class="featured-stat-box-cover-title">
                            Top Commenter
                        </p>

                        <p class="featured-stat-box-cover-text">of all time</p>
                    </div>

                    <div class="featured-stat-box-info">
                        <div class="user-avatar small">
                            <div class="user-avatar-border">
                                <div class="hexagon-50-56"></div>
                            </div>

                            <div class="user-avatar-content">
                                <div
                                    class="hexagon-image-30-32"
                                    data-src="img/avatar/02.jpg"
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

                                <p class="user-avatar-badge-text">13</p>
                            </div>
                        </div>

                        <p class="featured-stat-box-title">803</p>

                        <p class="featured-stat-box-subtitle">Comments</p>

                        <p class="featured-stat-box-text">Destroy Dex</p>
                    </div>
                </div>
            </div>

            <div class="grid grid-half change-on-desktop">
                <div class="widget-box no-padding">
                    <div class="widget-box-settings">
                        <div class="post-settings-wrap">
                            <div
                                class="
                                    post-settings
                                    widget-box-post-settings-dropdown-trigger
                                "
                            >
                                <svg class="post-settings-icon icon-more-dots">
                                    <use xlink:href="#svg-more-dots"></use>
                                </svg>
                            </div>

                            <div
                                class="
                                    simple-dropdown
                                    widget-box-post-settings-dropdown
                                "
                            >
                                <p class="simple-dropdown-link">Edit Post</p>

                                <p class="simple-dropdown-link">Delete Post</p>

                                <p class="simple-dropdown-link">
                                    Make it Featured
                                </p>

                                <p class="simple-dropdown-link">Report Post</p>

                                <p class="simple-dropdown-link">
                                    Report Author
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="widget-box-status">
                        <p class="text-sticker medium round">
                            <svg class="text-sticker-icon icon-trophy">
                                <use xlink:href="#svg-trophy"></use>
                            </svg>

                            <span class="text-sticker-content"
                                >Most Popular Post</span
                            >
                        </p>

                        <div class="widget-box-status-content">
                            <div class="user-status">
                                <a
                                    class="user-status-avatar"
                                    href="profile-timeline.html"
                                >
                                    <div class="user-avatar small no-outline">
                                        <div class="user-avatar-content">
                                            <div
                                                class="hexagon-image-30-32"
                                                data-src="img/avatar/01.jpg"
                                            ></div>
                                        </div>

                                        <div class="user-avatar-progress">
                                            <div
                                                class="hexagon-progress-40-44"
                                            ></div>
                                        </div>

                                        <div
                                            class="user-avatar-progress-border"
                                        >
                                            <div
                                                class="hexagon-border-40-44"
                                            ></div>
                                        </div>

                                        <div class="user-avatar-badge">
                                            <div
                                                class="user-avatar-badge-border"
                                            >
                                                <div
                                                    class="hexagon-22-24"
                                                ></div>
                                            </div>

                                            <div
                                                class="
                                                    user-avatar-badge-content
                                                "
                                            >
                                                <div
                                                    class="hexagon-dark-16-18"
                                                ></div>
                                            </div>

                                            <p class="user-avatar-badge-text">
                                                24
                                            </p>
                                        </div>
                                    </div>
                                </a>

                                <p class="user-status-title medium">
                                    <a class="bold" href="profile-timeline.html"
                                        >Marina Valentine</a
                                    >
                                </p>

                                <p class="user-status-text small">
                                    17 hours ago
                                </p>
                            </div>

                            <p class="widget-box-status-text">
                                Tomorow I'll be livestreaming along with
                                <a href="profile-timeline.html">@DestroyDex</a>
                                on my Youtube channel. We are gonna do a spedrun
                                of Super Mochi Bros 3!
                            </p>

                            <a
                                class="video-status"
                                href="https://www.youtube.com/"
                                target="_blank"
                            >
                                <img
                                    class="video-status-image"
                                    src="img/cover/50.jpg"
                                    alt="cover-50"
                                />

                                <div class="video-status-info">
                                    <p class="video-status-meta">youtube.com</p>

                                    <p class="video-status-title">
                                        <span class="bold">GameHuntress</span>
                                        on
                                        <span class="highlighted">Youtube</span>
                                    </p>

                                    <p class="video-status-text">
                                        Watch the GameHuntress play all the
                                        greatest games.
                                    </p>
                                </div>
                            </a>

                            <div class="tag-list">
                                <a
                                    class="tag-item secondary"
                                    href="newsfeed.html"
                                    >Stream</a
                                >

                                <a
                                    class="tag-item secondary"
                                    href="newsfeed.html"
                                    >Youtube</a
                                >

                                <a
                                    class="tag-item secondary"
                                    href="newsfeed.html"
                                    >Gaming</a
                                >

                                <a
                                    class="tag-item secondary"
                                    href="newsfeed.html"
                                    >Retro</a
                                >
                            </div>

                            <div class="content-actions">
                                <div class="content-action">
                                    <div class="meta-line">
                                        <div
                                            class="
                                                meta-line-list
                                                reaction-item-list
                                            "
                                        >
                                            <div class="reaction-item">
                                                <img
                                                    class="
                                                        reaction-image
                                                        reaction-item-dropdown-trigger
                                                    "
                                                    src="img/reaction/happy.png"
                                                    alt="reaction-happy"
                                                />

                                                <div
                                                    class="
                                                        simple-dropdown
                                                        padded
                                                        reaction-item-dropdown
                                                    "
                                                >
                                                    <p
                                                        class="
                                                            simple-dropdown-text
                                                        "
                                                    >
                                                        <img
                                                            class="reaction"
                                                            src="img/reaction/happy.png"
                                                            alt="reaction-happy"
                                                        />
                                                        <span class="bold"
                                                            >Happy</span
                                                        >
                                                    </p>

                                                    <p
                                                        class="
                                                            simple-dropdown-text
                                                        "
                                                    >
                                                        Matt Parker
                                                    </p>

                                                    <p
                                                        class="
                                                            simple-dropdown-text
                                                        "
                                                    >
                                                        Destroy Dex
                                                    </p>

                                                    <p
                                                        class="
                                                            simple-dropdown-text
                                                        "
                                                    >
                                                        The Green Goo
                                                    </p>
                                                </div>
                                            </div>

                                            <div class="reaction-item">
                                                <img
                                                    class="
                                                        reaction-image
                                                        reaction-item-dropdown-trigger
                                                    "
                                                    src="img/reaction/love.png"
                                                    alt="reaction-love"
                                                />

                                                <div
                                                    class="
                                                        simple-dropdown
                                                        padded
                                                        reaction-item-dropdown
                                                    "
                                                >
                                                    <p
                                                        class="
                                                            simple-dropdown-text
                                                        "
                                                    >
                                                        <img
                                                            class="reaction"
                                                            src="img/reaction/love.png"
                                                            alt="reaction-love"
                                                        />
                                                        <span class="bold"
                                                            >Love</span
                                                        >
                                                    </p>

                                                    <p
                                                        class="
                                                            simple-dropdown-text
                                                        "
                                                    >
                                                        Sandra Strange
                                                    </p>

                                                    <p
                                                        class="
                                                            simple-dropdown-text
                                                        "
                                                    >
                                                        Jane Rodgers
                                                    </p>
                                                </div>
                                            </div>

                                            <div class="reaction-item">
                                                <img
                                                    class="
                                                        reaction-image
                                                        reaction-item-dropdown-trigger
                                                    "
                                                    src="img/reaction/funny.png"
                                                    alt="reaction-funny"
                                                />

                                                <div
                                                    class="
                                                        simple-dropdown
                                                        padded
                                                        reaction-item-dropdown
                                                    "
                                                >
                                                    <p
                                                        class="
                                                            simple-dropdown-text
                                                        "
                                                    >
                                                        <img
                                                            class="reaction"
                                                            src="img/reaction/funny.png"
                                                            alt="reaction-funny"
                                                        />
                                                        <span class="bold"
                                                            >Funny</span
                                                        >
                                                    </p>

                                                    <p
                                                        class="
                                                            simple-dropdown-text
                                                        "
                                                    >
                                                        Neko Bebop
                                                    </p>

                                                    <p
                                                        class="
                                                            simple-dropdown-text
                                                        "
                                                    >
                                                        Nick Grissom
                                                    </p>

                                                    <p
                                                        class="
                                                            simple-dropdown-text
                                                        "
                                                    >
                                                        Sarah Diamond
                                                    </p>

                                                    <p
                                                        class="
                                                            simple-dropdown-text
                                                        "
                                                    >
                                                        Jett Spiegel
                                                    </p>

                                                    <p
                                                        class="
                                                            simple-dropdown-text
                                                        "
                                                    >
                                                        Marcus Jhonson
                                                    </p>

                                                    <p
                                                        class="
                                                            simple-dropdown-text
                                                        "
                                                    >
                                                        <span class="bold"
                                                            >and 12
                                                            more...</span
                                                        >
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <p class="meta-line-text">22</p>
                                    </div>

                                    <div class="meta-line">
                                        <div
                                            class="
                                                meta-line-list
                                                user-avatar-list
                                            "
                                        >
                                            <div
                                                class="
                                                    user-avatar
                                                    micro
                                                    no-stats
                                                "
                                            >
                                                <div class="user-avatar-border">
                                                    <div
                                                        class="hexagon-22-24"
                                                    ></div>
                                                </div>

                                                <div
                                                    class="user-avatar-content"
                                                >
                                                    <div
                                                        class="
                                                            hexagon-image-18-20
                                                        "
                                                        data-src="img/avatar/09.jpg"
                                                    ></div>
                                                </div>
                                            </div>

                                            <div
                                                class="
                                                    user-avatar
                                                    micro
                                                    no-stats
                                                "
                                            >
                                                <div class="user-avatar-border">
                                                    <div
                                                        class="hexagon-22-24"
                                                    ></div>
                                                </div>

                                                <div
                                                    class="user-avatar-content"
                                                >
                                                    <div
                                                        class="
                                                            hexagon-image-18-20
                                                        "
                                                        data-src="img/avatar/08.jpg"
                                                    ></div>
                                                </div>
                                            </div>

                                            <div
                                                class="
                                                    user-avatar
                                                    micro
                                                    no-stats
                                                "
                                            >
                                                <div class="user-avatar-border">
                                                    <div
                                                        class="hexagon-22-24"
                                                    ></div>
                                                </div>

                                                <div
                                                    class="user-avatar-content"
                                                >
                                                    <div
                                                        class="
                                                            hexagon-image-18-20
                                                        "
                                                        data-src="img/avatar/12.jpg"
                                                    ></div>
                                                </div>
                                            </div>

                                            <div
                                                class="
                                                    user-avatar
                                                    micro
                                                    no-stats
                                                "
                                            >
                                                <div class="user-avatar-border">
                                                    <div
                                                        class="hexagon-22-24"
                                                    ></div>
                                                </div>

                                                <div
                                                    class="user-avatar-content"
                                                >
                                                    <div
                                                        class="
                                                            hexagon-image-18-20
                                                        "
                                                        data-src="img/avatar/16.jpg"
                                                    ></div>
                                                </div>
                                            </div>

                                            <div
                                                class="
                                                    user-avatar
                                                    micro
                                                    no-stats
                                                "
                                            >
                                                <div class="user-avatar-border">
                                                    <div
                                                        class="hexagon-22-24"
                                                    ></div>
                                                </div>

                                                <div
                                                    class="user-avatar-content"
                                                >
                                                    <div
                                                        class="
                                                            hexagon-image-18-20
                                                        "
                                                        data-src="img/avatar/06.jpg"
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>

                                        <p class="meta-line-text">
                                            30 Participants
                                        </p>
                                    </div>
                                </div>

                                <div class="content-action">
                                    <div class="meta-line">
                                        <p class="meta-line-link">
                                            12 Comments
                                        </p>
                                    </div>

                                    <div class="meta-line">
                                        <p class="meta-line-text">0 Shares</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="post-options">
                        <div class="post-option-wrap">
                            <div
                                class="
                                    post-option
                                    reaction-options-dropdown-trigger
                                "
                            >
                                <svg class="post-option-icon icon-thumbs-up">
                                    <use xlink:href="#svg-thumbs-up"></use>
                                </svg>

                                <p class="post-option-text">React!</p>
                            </div>

                            <div
                                class="
                                    reaction-options reaction-options-dropdown
                                "
                            >
                                <div
                                    class="reaction-option text-tooltip-tft"
                                    data-title="Like"
                                >
                                    <img
                                        class="reaction-option-image"
                                        src="img/reaction/like.png"
                                        alt="reaction-like"
                                    />
                                </div>

                                <div
                                    class="reaction-option text-tooltip-tft"
                                    data-title="Love"
                                >
                                    <img
                                        class="reaction-option-image"
                                        src="img/reaction/love.png"
                                        alt="reaction-love"
                                    />
                                </div>

                                <div
                                    class="reaction-option text-tooltip-tft"
                                    data-title="Dislike"
                                >
                                    <img
                                        class="reaction-option-image"
                                        src="img/reaction/dislike.png"
                                        alt="reaction-dislike"
                                    />
                                </div>

                                <div
                                    class="reaction-option text-tooltip-tft"
                                    data-title="Happy"
                                >
                                    <img
                                        class="reaction-option-image"
                                        src="img/reaction/happy.png"
                                        alt="reaction-happy"
                                    />
                                </div>

                                <div
                                    class="reaction-option text-tooltip-tft"
                                    data-title="Funny"
                                >
                                    <img
                                        class="reaction-option-image"
                                        src="img/reaction/funny.png"
                                        alt="reaction-funny"
                                    />
                                </div>

                                <div
                                    class="reaction-option text-tooltip-tft"
                                    data-title="Wow"
                                >
                                    <img
                                        class="reaction-option-image"
                                        src="img/reaction/wow.png"
                                        alt="reaction-wow"
                                    />
                                </div>

                                <div
                                    class="reaction-option text-tooltip-tft"
                                    data-title="Angry"
                                >
                                    <img
                                        class="reaction-option-image"
                                        src="img/reaction/angry.png"
                                        alt="reaction-angry"
                                    />
                                </div>

                                <div
                                    class="reaction-option text-tooltip-tft"
                                    data-title="Sad"
                                >
                                    <img
                                        class="reaction-option-image"
                                        src="img/reaction/sad.png"
                                        alt="reaction-sad"
                                    />
                                </div>
                            </div>
                        </div>

                        <div class="post-option">
                            <svg class="post-option-icon icon-comment">
                                <use xlink:href="#svg-comment"></use>
                            </svg>

                            <p class="post-option-text">Comment</p>
                        </div>

                        <div class="post-option">
                            <svg class="post-option-icon icon-share">
                                <use xlink:href="#svg-share"></use>
                            </svg>

                            <p class="post-option-text">Share</p>
                        </div>
                    </div>
                </div>

                <div class="widget-box no-padding">
                    <p class="widget-box-title">Personal Activity</p>

                    <div
                        class="widget-box-content padded-for-scroll medium"
                        data-simplebar
                    >
                        <div class="user-status-list scroll-content">
                            <div class="user-status">
                                <div
                                    class="
                                        user-status-activity
                                        activity-reaction
                                    "
                                >
                                    <svg
                                        class="
                                            user-status-activity-icon
                                            icon-thumbs-up
                                        "
                                    >
                                        <use xlink:href="#svg-thumbs-up"></use>
                                    </svg>
                                </div>

                                <p class="user-status-title">
                                    <a class="bold" href="profile-timeline.html"
                                        >Marina Valentine</a
                                    >
                                    left a love
                                    <img
                                        class="reaction"
                                        src="img/reaction/love.png"
                                        alt="reaction-love"
                                    />
                                    reaction on
                                    <a
                                        class="highlighted"
                                        href="profile-timeline.html"
                                        >Destroy Dex</a
                                    >'s
                                    <a
                                        class="highlighted"
                                        href="profile-timeline.html"
                                        >status update</a
                                    >
                                </p>

                                <p class="user-status-timestamp small-space">
                                    3 minutes ago
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="slider-line">
                <div id="stat-block-slider-controls" class="slider-controls">
                    <div class="slider-control left">
                        <svg class="slider-control-icon icon-small-arrow">
                            <use xlink:href="#svg-small-arrow"></use>
                        </svg>
                    </div>

                    <div class="slider-control right">
                        <svg class="slider-control-icon icon-small-arrow">
                            <use xlink:href="#svg-small-arrow"></use>
                        </svg>
                    </div>
                </div>

                <div id="stat-block-slider" class="slider-slides">
                    <div class="slider-slide">
                        <div class="stat-block">
                            <div class="stat-block-decoration">
                                <svg
                                    class="
                                        stat-block-decoration-icon
                                        icon-friend
                                    "
                                >
                                    <use xlink:href="#svg-friend"></use>
                                </svg>
                            </div>

                            <div class="stat-block-info">
                                <p class="stat-block-title">
                                    Last friend added
                                </p>

                                <p class="stat-block-text">5 Days Ago</p>
                            </div>
                        </div>
                    </div>

                    <div class="slider-slide">
                        <div class="stat-block">
                            <div class="stat-block-decoration">
                                <svg
                                    class="
                                        stat-block-decoration-icon
                                        icon-status
                                    "
                                >
                                    <use xlink:href="#svg-status"></use>
                                </svg>
                            </div>

                            <div class="stat-block-info">
                                <p class="stat-block-title">Last post update</p>

                                <p class="stat-block-text">1 Day Ago</p>
                            </div>
                        </div>
                    </div>

                    <div class="slider-slide">
                        <div class="stat-block">
                            <div class="stat-block-decoration">
                                <svg
                                    class="
                                        stat-block-decoration-icon
                                        icon-comment
                                    "
                                >
                                    <use xlink:href="#svg-comment"></use>
                                </svg>
                            </div>

                            <div class="stat-block-info">
                                <p class="stat-block-title">
                                    Most commented post
                                </p>

                                <p class="stat-block-text">56 Comments</p>
                            </div>
                        </div>
                    </div>

                    <div class="slider-slide">
                        <div class="stat-block">
                            <div class="stat-block-decoration">
                                <svg
                                    class="
                                        stat-block-decoration-icon
                                        icon-thumbs-up
                                    "
                                >
                                    <use xlink:href="#svg-thumbs-up"></use>
                                </svg>
                            </div>

                            <div class="stat-block-info">
                                <p class="stat-block-title">Most liked post</p>

                                <p class="stat-block-text">904 Likes</p>
                            </div>
                        </div>
                    </div>

                    <div class="slider-slide">
                        <div class="stat-block">
                            <div class="stat-block-decoration">
                                <svg
                                    class="
                                        stat-block-decoration-icon
                                        icon-share
                                    "
                                >
                                    <use xlink:href="#svg-share"></use>
                                </svg>
                            </div>

                            <div class="stat-block-info">
                                <p class="stat-block-title">Most shared post</p>

                                <p class="stat-block-text">156 Shares</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="section-header">
            <div class="section-header-info">
                <p class="section-pretitle">Overview</p>

                <h2 class="section-title">Account Analytics</h2>
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

                <div class="widget-box-content">
                    <div class="chart-wrap">
                        <div class="chart">
                            <canvas id="ve-monthly-report-chart"></canvas>
                        </div>
                    </div>
                </div>

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

            <div class="grid grid-9-3 stretched">
                <div class="grid-column">
                    <div class="widget-box">
                        <p class="widget-box-title">Top Friends Activity</p>

                        <div class="widget-box-content no-margin-top">
                            <div class="table table-top-friends join-rows">
                                <div class="table-header">
                                    <div class="table-header-column">
                                        <p class="table-header-title">Friend</p>
                                    </div>

                                    <div
                                        class="
                                            table-header-column
                                            centered
                                            padded
                                        "
                                    >
                                        <p class="table-header-title">
                                            Reactions
                                        </p>
                                    </div>

                                    <div
                                        class="
                                            table-header-column
                                            centered
                                            padded
                                        "
                                    >
                                        <p class="table-header-title">
                                            Comments
                                        </p>
                                    </div>

                                    <div
                                        class="
                                            table-header-column
                                            centered
                                            padded
                                        "
                                    >
                                        <p class="table-header-title">Shares</p>
                                    </div>

                                    <div
                                        class="
                                            table-header-column
                                            centered
                                            padded
                                        "
                                    >
                                        <p class="table-header-title">
                                            Replies
                                        </p>
                                    </div>

                                    <div
                                        class="table-header-column padded-left"
                                    >
                                        <p class="table-header-title">
                                            Post Engagement
                                        </p>
                                    </div>
                                </div>

                                <div class="table-body">
                                    <div class="table-row tiny">
                                        <div class="table-column">
                                            <div class="user-status">
                                                <a
                                                    class="user-status-avatar"
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
                                                            ></div>
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
                                                            ></div>
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
                                                            ></div>
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
                                                                ></div>
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
                                                                ></div>
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

                                                <p class="user-status-title">
                                                    <a
                                                        class="bold"
                                                        href="profile-timeline.html"
                                                        >Nick Grissom</a
                                                    >
                                                </p>

                                                <p
                                                    class="
                                                        user-status-text
                                                        small
                                                    "
                                                >
                                                    Friended: Jan 14, 2017
                                                </p>
                                            </div>
                                        </div>

                                        <div
                                            class="table-column centered padded"
                                        >
                                            <p class="table-title">1569</p>
                                        </div>

                                        <div
                                            class="table-column centered padded"
                                        >
                                            <p class="table-title">750</p>
                                        </div>

                                        <div
                                            class="table-column centered padded"
                                        >
                                            <p class="table-title">109</p>
                                        </div>

                                        <div
                                            class="table-column centered padded"
                                        >
                                            <p class="table-title">223</p>
                                        </div>

                                        <div class="table-column padded-left">
                                            <div class="progress-stat-wrap">
                                                <div class="progress-stat">
                                                    <div
                                                        id="post-engagement-1"
                                                        class="
                                                            progress-stat-bar
                                                        "
                                                    ></div>

                                                    <div
                                                        class="
                                                            bar-progress-wrap
                                                        "
                                                    >
                                                        <p
                                                            class="
                                                                bar-progress-info
                                                                medium
                                                                negative
                                                            "
                                                        >
                                                            <span
                                                                class="
                                                                    bar-progress-text
                                                                    no-space
                                                                "
                                                            ></span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="table-row tiny">
                                        <div class="table-column">
                                            <div class="user-status">
                                                <a
                                                    class="user-status-avatar"
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
                                                            ></div>
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
                                                            ></div>
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
                                                            ></div>
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
                                                                ></div>
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
                                                                ></div>
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

                                                <p class="user-status-title">
                                                    <a
                                                        class="bold"
                                                        href="profile-timeline.html"
                                                        >Destroy Dex</a
                                                    >
                                                </p>

                                                <p
                                                    class="
                                                        user-status-text
                                                        small
                                                    "
                                                >
                                                    Friended: May 22, 2017
                                                </p>
                                            </div>
                                        </div>

                                        <div
                                            class="table-column centered padded"
                                        >
                                            <p class="table-title">1036</p>
                                        </div>

                                        <div
                                            class="table-column centered padded"
                                        >
                                            <p class="table-title">803</p>
                                        </div>

                                        <div
                                            class="table-column centered padded"
                                        >
                                            <p class="table-title">97</p>
                                        </div>

                                        <div
                                            class="table-column centered padded"
                                        >
                                            <p class="table-title">126</p>
                                        </div>

                                        <div class="table-column padded-left">
                                            <div class="progress-stat-wrap">
                                                <div class="progress-stat">
                                                    <div
                                                        id="post-engagement-2"
                                                        class="
                                                            progress-stat-bar
                                                        "
                                                    ></div>

                                                    <div
                                                        class="
                                                            bar-progress-wrap
                                                        "
                                                    >
                                                        <p
                                                            class="
                                                                bar-progress-info
                                                                medium
                                                                negative
                                                            "
                                                        >
                                                            <span
                                                                class="
                                                                    bar-progress-text
                                                                    no-space
                                                                "
                                                            ></span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="table-row tiny">
                                        <div class="table-column">
                                            <div class="user-status">
                                                <a
                                                    class="user-status-avatar"
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
                                                            ></div>
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
                                                            ></div>
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
                                                            ></div>
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
                                                                ></div>
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
                                                                ></div>
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

                                                <p class="user-status-title">
                                                    <a
                                                        class="bold"
                                                        href="profile-timeline.html"
                                                        >Neko Bebop</a
                                                    >
                                                </p>

                                                <p
                                                    class="
                                                        user-status-text
                                                        small
                                                    "
                                                >
                                                    Friended: Sep 19, 2018
                                                </p>
                                            </div>
                                        </div>

                                        <div
                                            class="table-column centered padded"
                                        >
                                            <p class="table-title">860</p>
                                        </div>

                                        <div
                                            class="table-column centered padded"
                                        >
                                            <p class="table-title">662</p>
                                        </div>

                                        <div
                                            class="table-column centered padded"
                                        >
                                            <p class="table-title">102</p>
                                        </div>

                                        <div
                                            class="table-column centered padded"
                                        >
                                            <p class="table-title">91</p>
                                        </div>

                                        <div class="table-column padded-left">
                                            <div class="progress-stat-wrap">
                                                <div class="progress-stat">
                                                    <div
                                                        id="post-engagement-3"
                                                        class="
                                                            progress-stat-bar
                                                        "
                                                    ></div>

                                                    <div
                                                        class="
                                                            bar-progress-wrap
                                                        "
                                                    >
                                                        <p
                                                            class="
                                                                bar-progress-info
                                                                medium
                                                                negative
                                                            "
                                                        >
                                                            <span
                                                                class="
                                                                    bar-progress-text
                                                                    no-space
                                                                "
                                                            ></span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="table-row tiny">
                                        <div class="table-column">
                                            <div class="user-status">
                                                <a
                                                    class="user-status-avatar"
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
                                                            ></div>
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
                                                            ></div>
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
                                                            ></div>
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
                                                                ></div>
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
                                                                ></div>
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

                                                <p class="user-status-title">
                                                    <a
                                                        class="bold"
                                                        href="profile-timeline.html"
                                                        >Sarah Diamond</a
                                                    >
                                                </p>

                                                <p
                                                    class="
                                                        user-status-text
                                                        small
                                                    "
                                                >
                                                    Friended: Aug 6, 2017
                                                </p>
                                            </div>
                                        </div>

                                        <div
                                            class="table-column centered padded"
                                        >
                                            <p class="table-title">742</p>
                                        </div>

                                        <div
                                            class="table-column centered padded"
                                        >
                                            <p class="table-title">401</p>
                                        </div>

                                        <div
                                            class="table-column centered padded"
                                        >
                                            <p class="table-title">77</p>
                                        </div>

                                        <div
                                            class="table-column centered padded"
                                        >
                                            <p class="table-title">64</p>
                                        </div>

                                        <div class="table-column padded-left">
                                            <div class="progress-stat-wrap">
                                                <div class="progress-stat">
                                                    <div
                                                        id="post-engagement-4"
                                                        class="
                                                            progress-stat-bar
                                                        "
                                                    ></div>

                                                    <div
                                                        class="
                                                            bar-progress-wrap
                                                        "
                                                    >
                                                        <p
                                                            class="
                                                                bar-progress-info
                                                                medium
                                                                negative
                                                            "
                                                        >
                                                            <span
                                                                class="
                                                                    bar-progress-text
                                                                    no-space
                                                                "
                                                            ></span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="table-row tiny">
                                        <div class="table-column">
                                            <div class="user-status">
                                                <a
                                                    class="user-status-avatar"
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
                                                            ></div>
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
                                                            ></div>
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
                                                            ></div>
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
                                                                ></div>
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
                                                                ></div>
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

                                                <p class="user-status-title">
                                                    <a
                                                        class="bold"
                                                        href="profile-timeline.html"
                                                        >The Green Goo</a
                                                    >
                                                </p>

                                                <p
                                                    class="
                                                        user-status-text
                                                        small
                                                    "
                                                >
                                                    Friended: Dec 27, 2019
                                                </p>
                                            </div>
                                        </div>

                                        <div
                                            class="table-column centered padded"
                                        >
                                            <p class="table-title">421</p>
                                        </div>

                                        <div
                                            class="table-column centered padded"
                                        >
                                            <p class="table-title">200</p>
                                        </div>

                                        <div
                                            class="table-column centered padded"
                                        >
                                            <p class="table-title">34</p>
                                        </div>

                                        <div
                                            class="table-column centered padded"
                                        >
                                            <p class="table-title">22</p>
                                        </div>

                                        <div class="table-column padded-left">
                                            <div class="progress-stat-wrap">
                                                <div class="progress-stat">
                                                    <div
                                                        id="post-engagement-5"
                                                        class="
                                                            progress-stat-bar
                                                        "
                                                    ></div>

                                                    <div
                                                        class="
                                                            bar-progress-wrap
                                                        "
                                                    >
                                                        <p
                                                            class="
                                                                bar-progress-info
                                                                medium
                                                                negative
                                                            "
                                                        >
                                                            <span
                                                                class="
                                                                    bar-progress-text
                                                                    no-space
                                                                "
                                                            ></span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="grid-column">
                    <div class="widget-box">
                        <div class="widget-box-actions">
                            <div class="widget-box-action">
                                <p class="widget-box-title">Engagements</p>
                            </div>
                        </div>

                        <div class="widget-box-content">
                            <div class="progress-arc-wrap">
                                <div class="progress-arc">
                                    <canvas id="engagements-chart"></canvas>
                                </div>

                                <div class="progress-arc-info">
                                    <p class="progress-arc-title">28.8K</p>

                                    <p class="progress-arc-text">Engagements</p>
                                </div>
                            </div>

                            <div class="user-stats reference">
                                <div class="user-stat big">
                                    <div
                                        class="reference-bullet secondary"
                                    ></div>

                                    <p class="user-stat-title">18.3K</p>

                                    <p class="user-stat-text">reactions</p>
                                </div>

                                <div class="user-stat big">
                                    <div class="reference-bullet primary"></div>

                                    <p class="user-stat-title">5.2K</p>

                                    <p class="user-stat-text">comments</p>
                                </div>
                            </div>

                            <div class="user-stats reference">
                                <div class="user-stat big">
                                    <div class="reference-bullet blue"></div>

                                    <p class="user-stat-title">1.4K</p>

                                    <p class="user-stat-text">shares</p>
                                </div>

                                <div class="user-stat big">
                                    <div
                                        class="reference-bullet light-blue"
                                    ></div>

                                    <p class="user-stat-title">3.9K</p>

                                    <p class="user-stat-text">replies</p>
                                </div>
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

            <div class="widget-box">
                <div class="widget-box-actions">
                    <div class="widget-box-action">
                        <p class="widget-box-title">Yearly Report</p>
                    </div>

                    <div class="widget-box-action">
                        <div class="reference-item-list">
                            <div class="reference-item">
                                <div class="reference-bullet primary"></div>

                                <p class="reference-item-text">Reactions</p>
                            </div>

                            <div class="reference-item">
                                <div class="reference-bullet blue"></div>

                                <p class="reference-item-text">Comments</p>
                            </div>
                        </div>

                        <div class="form-select v2">
                            <select
                                id="rc-yearly-report-date"
                                name="rc_yearly_report_date"
                            >
                                <option value="0">Jan - Dec 2018</option>
                                <option value="1">Jan - Dec 2019</option>
                            </select>

                            <svg class="form-select-icon icon-small-arrow">
                                <use xlink:href="#svg-small-arrow"></use>
                            </svg>
                        </div>
                    </div>
                </div>

                <div class="widget-box-content">
                    <div class="chart-wrap">
                        <div class="chart">
                            <canvas id="rc-yearly-report-chart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";

import Hexagon from "@/plugins/hexagon";
import Slider from "@/plugins/slider";
import Chart from "@/plugins/chart";
import Dropdown from "@/plugins/dropdown";

@Component({
    components: {},
    computed: { ...mapGetters(["user"]) },
})
export default class dashBoard extends Vue {
    private dropdown: Dropdown = new Dropdown();
    private hexagon: Hexagon = new Hexagon();
    private slider: Slider = new Slider();
    private chart: Chart = new Chart();

    mounted() {
        this.hexagon.init();
        this.slider.init();
        this.dropdown.init();
        this.chart.init();
    }
}
</script>

<style scoped>
</style>
