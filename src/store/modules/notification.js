export default {
  namespaced: true,
  state: {
    isNotificationShow: false,
  },
  mutations: {
    setIsNotificationShow(state, payload) {
      state.isNotificationShow = payload;
    },
  },
};
