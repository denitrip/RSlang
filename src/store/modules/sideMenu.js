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
          viewbox: '0 0 64 64',
        },
      },
      {
        name: routerConsts.dictionaryPage.name,
        route: routerConsts.dictionaryPage.path,
        icon: {
          name: 'Dictionary',
          viewbox: '0 0 512 512',
        },
      },
      {
        name: routerConsts.miniGamesPage.name,
        route: routerConsts.miniGamesPage.path,
        icon: {
          name: 'Joystick',
          viewbox: '0 0 64 64',
        },
      },
      {
        name: routerConsts.statisticPage.name,
        route: routerConsts.statisticPage.path,
        icon: {
          name: 'BarChart',
          viewbox: '0 0 480 480',
        },
      },
      {
        name: routerConsts.ourTeamPage.name,
        route: routerConsts.ourTeamPage.path,
        icon: {
          name: 'GroupOfMen',
          viewbox: '0 0 151 151',
        },
      },
      {
        name: routerConsts.settings.name,
        route: routerConsts.settings.path,
        icon: {
          name: 'Settings',
          viewbox: '0 0 480 480',
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
