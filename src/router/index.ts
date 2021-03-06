import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from "@/views/Home.vue";


Vue.use(VueRouter)


// duplicate error
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    //@ts-ignore
    return originalPush.call(this, location).catch(err => {
        if (err.name !== 'NavigationDuplicated') throw err;
    });
};

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Home,
    },
    // {
    //     path: '/admin',
    //     name: 'Admin',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () => import(/* webpackChunkName: "about" */ "@/admin/Admin.vue"),
    //     children : [
    //         {
    //             path: '/admin/processingVersion',
    //             name: 'ProcessingVersion',
    //             component: () => import(/* webpackChunkName: "about" */ "@/admin/components/processingVersion.vue"),
    //             alias: '/admin'
    //         },
    //         {
    //             path: '/admin/testGame/:versionId',
    //             name: 'TestGame',
    //             component: () => import(/* webpackChunkName: "about" */ "@/admin/components/testGame.vue"),
    //             props: true,
    //         }
    //     ]
    // },
    {
        path: '/studio',
        name: 'Studio',
        component: () => import(/* webpackChunkName: "about" */ "@/views/Studio.vue"),
        redirect: '/DashBoard'
    },
    //     children: [
    {
        path: '/games',
        name: 'Games',
        component: () => import(/* webpackChunkName: "about" */ "@/components/pages/studio/games.vue"),
        alias: '/'
    },

    {
        path: '/setting',
        name: 'Setting',
        component: () => import(/* webpackChunkName: "about" */ "@/components/pages/studio/setting.vue"),
    },
    {
        path: '/sdk',
        name: 'SDK',
        component: () => import(/* webpackChunkName: "about" */ "@/components/pages/studio/sdk.vue"),
    },
    {
        path: '/createGame',
        name: 'CreateGame',
        component: () => import(/* webpackChunkName: "about" */ "@/components/pages/studio/createGame.vue"),

    },
    {
        path: '/uploadGame',
        name: 'UploadGame',
        component: () => import(/* webpackChunkName: "about" */ "@/views/UploadGame.vue"),
        props: true,
        children: [
            {
                path: '/addGame',
                name: 'AddGame',
                component: () => import(/* webpackChunkName: "about" */ "@/components/pages/studio/addGame.vue"),
                meta: { parentRouterName: 'UploadGame' }
            },
            {
                path: '/selectStage',
                name: 'SelectStage',
                component: () => import(/* webpackChunkName: "about" */ "@/components/pages/studio/selectStage.vue"),
                meta: { parentRouterName: 'UploadGame' }
            },
            {
                path: '/addGameFile',
                name: 'AddGameFile',
                component: () => import(/* webpackChunkName: "about" */ "@/components/pages/studio/addGameFile.vue"),
                meta: { parentRouterName: 'UploadGame' }
            },
            {
                path: '/addGameInfo',
                name: 'AddGameInfo',
                component: () => import(/* webpackChunkName: "about" */ "@/components/pages/studio/addGameInfo.vue"),
                meta: { parentRouterName: 'UploadGame' }
            },
            {
                path: '/addGameLog',
                name: 'AddGameLog',
                component: () => import(/* webpackChunkName: "about" */ "@/components/pages/studio/addGameLog.vue"),
                meta: { parentRouterName: 'UploadGame' }
            },
        ]
    },
    {
        path: '/dashBoard',
        name: 'DashBoard',
        component: () => import(/* webpackChunkName: "about" */ "@/components/pages/studio/dashBoard.vue"),
    },

    //     ]
    // },

    // {
    //     path: '/auth',
    //     name: 'Auth',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () => import(/* webpackChunkName: "about" */ "@/views/Auth.vue")
    // },
    {
        path: '/signup',
        name: 'Sign Up',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ "@/views/SignUp.vue"),
    },
    {
        path: '/login',
        name: 'Login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ "@/views/Login.vue")
    },
    // {
    //     path: '/logout',
    //     name: 'Logout',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () => import(/* webpackChunkName: "about" */ "@/views/Logout.vue")
    // },
    // {
    //     path: '/project/:projectId',
    //     name: 'Project',
    //     component: () => import(/* webpackChunkName: "about" */ "@/views/Project.vue"),
    //     props: true,
    //     children: [
    {
        path: '/project/:projectId',
        name: 'Project',
        component: () => import(/* webpackChunkName: "about" */ "@/views/GameDashboard.vue"),
        redirect:'/project/:projectId/dashboard',
        children: [
            {
                path: '/project/:projectId/dashboard',
                name: 'ProjectOverview',
                component: () => import(/* webpackChunkName: "about" */ "@/components/pages/project/projectOverview.vue"),
            },
            {
                path: '/project/:projectId/setting/',
                name: 'ProjectSetting',
                component: () => import(/* webpackChunkName: "about" */ "@/components/pages/project/projectSetting.vue"),
                props: true
            },
            {
                path: '/project/:projectId/version',
                name: 'ProjectVersion',
                component: () => import(/* webpackChunkName: "about" */ "@/components/pages/project/projectVersion.vue"),
                props: true
            },
            {
                path: '/project/:projectId/deploy',
                name: 'ProjectDeploy',
                component: () => import(/* webpackChunkName: "about" */ "@/components/pages/project/projectDeploy.vue"),
                props: true
            },
        ]
    },
    // {
    //     path: '/project/dashboard/:projectId',
    //     name: 'gameDashboard',
    //     component: () => import(/* webpackChunkName: "about" */ "@/components/pages/project/gameDashboard.vue"),
    //     // alias: '/project/:projectId',
    //     props: true
    // },

    {
        path: '/project/version/:projectId',
        name: 'projectVersion',
        component: () => import(/* webpackChunkName: "about" */ "@/components/pages/project/projectVersion.vue"),
        props: true
    },
    {
        path: '/project/setting/:projectId',
        name: 'ProjectSetting1',
        component: () => import(/* webpackChunkName: "about" */ "@/components/pages/project/projectSetting.vue"),
        props: true
    },
    {
        path: '/project/addVersion/:projectId',
        name: 'ProjectAddVersion',
        component: () => import(/* webpackChunkName: "about" */ "@/components/pages/project/projectAddVersion.vue"),
        props: true
    },
    //     ]
    // }

]

const router = new VueRouter({
    mode: process.env.VUE_APP_ROUTER_MODE as 'hash' | 'history',
    routes
})

export default router
