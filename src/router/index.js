import Vue from 'vue';
import VueRouter from 'vue-router';
import AuthGuard from '@/router/auth-guard';
import routerConsts from '@/router/routerConsts';
import HomePage from '@/views/HomePage.vue';
import LoginPage from '@/views/LoginPage.vue';
import MiniGamesPage from '@/views/MiniGamesPage.vue';
import OurTeamPage from '@/views/OurTeamPage.vue';
import DictionaryPage from '@/views/DictionaryPage.vue';
import SettingPage from '@/views/SettingPage.vue';
import LearningPage from '@/views/LearningPage.vue';
import StatisticPage from '@/views/StatisticPage.vue';
import EnglishPuzzlePage from '@/views/EnglishPuzzle/EnglishPuzzlePage.vue';
import EnglishPuzzleStatisticPage from '@/views/EnglishPuzzle/EnglishPuzzleStatisticPage.vue';
import EnglishPuzzleStats from '@/components/EnglishPuzzle/EnglishPuzzleStatistic.vue';
import EnglishPuzzleStatsDetail from '@/components/EnglishPuzzle/EnglishPuzzleStatisticDetail.vue';
import SavannahPage from '@/views/Savannah/SavannahPage.vue';
import SpeakItPage from '@/views/SpeakIt/SpeakItPage.vue';
import AudiocallPage from '@/views/Audiocall/AudiocallPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: routerConsts.homePage.path,
    name: routerConsts.homePage.name,
    beforeEnter: AuthGuard,
    component: HomePage,
    redirect: '/learning',
    children: [
      {
        path: routerConsts.miniGamesPage.path,
        name: routerConsts.miniGamesPage.name,
        beforeEnter: AuthGuard,
        component: MiniGamesPage,
      },
      {
        path: routerConsts.ourTeamPage.path,
        name: routerConsts.ourTeamPage.name,
        beforeEnter: AuthGuard,
        component: OurTeamPage,
      },
      {
        path: routerConsts.dictionaryPage.path,
        name: routerConsts.dictionaryPage.name,
        beforeEnter: AuthGuard,
        component: DictionaryPage,
      },
      {
        path: routerConsts.learningPage.path,
        name: routerConsts.learningPage.name,
        beforeEnter: AuthGuard,
        component: LearningPage,
      },
      {
        path: routerConsts.settings.path,
        name: routerConsts.settings.name,
        beforeEnter: AuthGuard,
        component: SettingPage,
      },
      {
        path: routerConsts.englishPuzzlePage.path,
        name: routerConsts.englishPuzzlePage.name,
        beforeEnter: AuthGuard,
        component: EnglishPuzzlePage,
      },
      {
        path: routerConsts.statisticPage.path,
        name: routerConsts.statisticPage.name,
        beforeEnter: AuthGuard,
        component: StatisticPage,
      },
      {
        path: routerConsts.speakItPage.path,
        name: routerConsts.speakItPage.name,
        component: SpeakItPage,
      },
      {
        path: routerConsts.EnglishPuzzleStatisticPage.path,
        component: EnglishPuzzleStatisticPage,
        beforeEnter: AuthGuard,
        children: [
          {
            path: routerConsts.englishPuzzleStats.path,
            name: routerConsts.englishPuzzleStats.name,
            beforeEnter: AuthGuard,
            component: EnglishPuzzleStats,
          },
          {
            path: routerConsts.englishPuzzleStatsDetailed.path,
            name: routerConsts.englishPuzzleStatsDetailed.name,
            beforeEnter: AuthGuard,
            component: EnglishPuzzleStatsDetail,
          },
        ],
      },
      {
        path: routerConsts.savannahPage.path,
        name: routerConsts.savannahPage.name,
        component: SavannahPage,
      },
      {
        path: routerConsts.audiocallPage.path,
        name: routerConsts.audiocallPage.name,
        component: AudiocallPage,
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
  {
    path: '*',
    beforeEnter: AuthGuard,
    redirect: '/learning',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
