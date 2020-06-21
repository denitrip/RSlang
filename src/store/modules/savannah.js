export default {
  namespaced: true,
  state: {
    isStartScreen: true,
  },
  mutations: {
    setIsStartScreen(state, payload) {
      state.isStartScreen = payload;
    },
  },
};
