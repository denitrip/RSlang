import Vue from 'vue';
import VueRouter from 'vue-router';
import routerConsts from '@/router/routerConsts';
import HomePage from '@/views/HomePage.vue';
import LoginPage from '@/views/LoginPage.vue';
import MiniGamesPage from '@/views/MiniGamesPage.vue';
import OurTeamPage from '@/views/OurTeamPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: routerConsts.homePage.path,
    name: routerConsts.homePage.name,
    component: HomePage,
    children: [
      {
        path: routerConsts.miniGamesPage.path,
        name: routerConsts.miniGamesPage.name,
        component: MiniGamesPage,
      },
      {
        path: routerConsts.ourTeamPage.path,
        name: routerConsts.ourTeamPage.name,
        component: OurTeamPage,
      },
    ],
  },
  {
    path: routerConsts.loginPage.path,
    name: routerConsts.loginPage.name,
    component: LoginPage,
  },
  {
    path: routerConsts.welcomePage.path,
    name: routerConsts.welcomePage.name,
    component: LoginPage,
  },
  {
    path: routerConsts.signUpPage.path,
    name: routerConsts.signUpPage.name,
    component: LoginPage,
  },
  { path: '*', redirect: '/' },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
