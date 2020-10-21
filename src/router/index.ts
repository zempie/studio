import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from "@/views/Home.vue";


Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
      {
          path: '/',
          name: 'Home',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: Home,
      },
      {
          path: '/admin',
          name: 'Admin',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ "@/admin/Admin.vue"),
          children : [
              {
                  path: '/admin/processingVersion',
                  name: 'ProcessingVersion',
                  component: () => import(/* webpackChunkName: "about" */ "@/admin/components/processingVersion.vue"),
                  alias: '/admin'
              },
              {
                  path: '/admin/testGame/:versionId',
                  name: 'TestGame',
                  component: () => import(/* webpackChunkName: "about" */ "@/admin/components/testGame.vue"),
                  props: true,
              }
          ]
      },
      {
          path: '/studio',
          name: 'Studio',
          component: () => import(/* webpackChunkName: "about" */ "@/views/Studio.vue"),
          children : [
              {
                  path: '/games',
                  name: 'Games',
                  component: () => import(/* webpackChunkName: "about" */ "@/components/pages/studio/games.vue"),
                  alias: '/'
              },
              {
                  path: '/addGame',
                  name: 'AddGame',
                  component: () => import(/* webpackChunkName: "about" */ "@/components/pages/studio/addGame.vue"),
              },
              {
                  path: '/setting',
                  name: 'Setting',
                  component: () => import(/* webpackChunkName: "about" */ "@/components/pages/studio/setting.vue"),
              },
          ]
      },
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
      {
          path: '/logout',
          name: 'Logout',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ "@/views/Logout.vue")
      },
      {
          path: '/project/:projectId',
          name: 'Project',
          component: () => import(/* webpackChunkName: "about" */ "@/views/Project.vue"),
          props : true,
          children : [
              {
                  path: '/project/dashboard/:projectId',
                  name: 'ProjectDashboard',
                  component: () => import(/* webpackChunkName: "about" */ "@/components/pages/project/projectDashboard.vue"),
                  alias: '/project/:projectId',
                  props : true
              },
              {
                  path: '/project/deploy/:projectId',
                  name: 'ProjectDeploy',
                  component: () => import(/* webpackChunkName: "about" */ "@/components/pages/project/projectDeploy.vue"),
                  props : true
              },
              {
                  path: '/project/version/:projectId',
                  name: 'ProjectVersion',
                  component: () => import(/* webpackChunkName: "about" */ "@/components/pages/project/projectVersion.vue"),
                  props : true
              },
              {
                  path: '/project/setting/:projectId',
                  name: 'ProjectSetting',
                  component: () => import(/* webpackChunkName: "about" */ "@/components/pages/project/projectSetting.vue"),
                  props : true
              },
              {
                  path: '/project/addVersion/:projectId',
                  name: 'ProjectAddVersion',
                  component: () => import(/* webpackChunkName: "about" */ "@/components/pages/project/projectAddVersion.vue"),
                  props : true
              },
          ]
      }

]

const router = new VueRouter({
  routes
})

export default router
