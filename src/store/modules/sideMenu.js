import routerConsts from '@/router/routerConsts';

export default {
  namespaced: true,
  state: {
    isOpen: false,
    menuItems: [
      {
        name: routerConsts.learningPage.name,
        route: routerConsts.learningPage.path,
        icon: {
          name: 'Audiobook',
          viewBox: '0 0 64 64',
        },
      },
      {
        name: routerConsts.dictionaryPage.name,
        route: routerConsts.dictionaryPage.path,
        icon: {
          name: 'Dictionary',
          viewBox: '0 0 512 512',
        },
      },
      {
        name: routerConsts.miniGamesPage.name,
        route: routerConsts.miniGamesPage.path,
        icon: {
          name: 'Joystick',
          viewBox: '0 0 64 64',
        },
      },
      {
        name: routerConsts.statisticPage.name,
        route: routerConsts.statisticPage.path,
        icon: {
          name: 'BarChart',
          viewBox: '0 0 480 480',
        },
      },
      {
        name: routerConsts.ourTeamPage.name,
        route: routerConsts.ourTeamPage.path,
        icon: {
          name: 'GroupOfMen',
          viewBox: '0 0 151 151',
        },
      },
      {
        name: routerConsts.settings.name,
        route: routerConsts.settings.path,
        icon: {
          name: 'Settings',
          viewBox: '0 0 480 480',
        },
      },
    ],
  },
  mutations: {
    setIsOpen(state, payload) {
      state.isOpen = payload;
    },
  },
};
