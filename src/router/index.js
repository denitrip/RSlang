import Vue from 'vue';
import VueRouter from 'vue-router';
import routerConsts from '@/router/routerConsts';
import HomePage from '@/views/HomePage.vue';
import LoginPage from '@/views/LoginPage.vue';
import MiniGamesPage from '@/views/MiniGamesPage.vue';
import OurTeamPage from '@/views/OurTeamPage.vue';
import DictionaryPage from '@/views/DictionaryPage.vue';
import SettingPage from '@/views/SettingPage.vue';
import LearningPage from '@/views/LearningPage.vue';
import EnglishPuzzlePage from '@/views/EnglishPuzzle/EnglishPuzzlePage.vue';
import EnglishPuzzleStatisticPage from '@/views/EnglishPuzzle/EnglishPuzzleStatisticPage.vue';
import EnglishPuzzleStats from '@/components/EnglishPuzzle/EnglishPuzzleStatistic.vue';
import EnglishPuzzleStatsDetail from '@/components/EnglishPuzzle/EnglishPuzzleStatisticDetail.vue';

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
      {
        path: routerConsts.dictionaryPage.path,
        name: routerConsts.dictionaryPage.name,
        component: DictionaryPage,
      },
      {
        path: routerConsts.learningPage.path,
        name: routerConsts.learningPage.name,
        component: LearningPage,
      },
      {
        path: routerConsts.settings.path,
        name: routerConsts.settings.name,
        component: SettingPage,
      },
      {
        path: routerConsts.englishPuzzlePage.path,
        name: routerConsts.englishPuzzlePage.name,
        component: EnglishPuzzlePage,
      },
      {
        path: routerConsts.EnglishPuzzleStatisticPage.path,
        component: EnglishPuzzleStatisticPage,
        children: [
          {
            path: routerConsts.englishPuzzleStats.path,
            name: routerConsts.englishPuzzleStats.name,
            component: EnglishPuzzleStats,
          },
          {
            path: routerConsts.englishPuzzleStatsDetailed.path,
            name: routerConsts.englishPuzzleStatsDetailed.name,
            component: EnglishPuzzleStatsDetail,
          },
        ],
      },
    ],
  },
  {
    path: routerConsts.loginPage.path,
    name: routerConsts.loginPage.name,
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
