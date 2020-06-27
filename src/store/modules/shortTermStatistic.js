export default {
  namespaced: true,
  state: {
    isShortTermStatisticShow: false,
  },
  mutations: {
    setIsShortTermStatisticShow(state, payload) {
      state.isShortTermStatisticShow = payload;
    },
  },
};
