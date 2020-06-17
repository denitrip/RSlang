import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import LoginPage from '@/views/LoginPage.vue';
import OurTeamPage from '@/views/OurTeamPage.vue';
import routerConsts from '@/router/routerConsts';

Vue.use(VueRouter);

const routes = [
  {
    path: routerConsts.homePage.path,
    name: routerConsts.homePage.name,
    component: HomePage,
  },
  {
    path: routerConsts.loginPage.path,
    name: routerConsts.loginPage.name,
    component: LoginPage,
  },
  {
    path: routerConsts.ourTeamPage.path,
    name: routerConsts.ourTeamPage.name,
    component: OurTeamPage,
  },
  { path: '*', redirect: '/' },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
