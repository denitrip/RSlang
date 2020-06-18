export default {
  namespaced: true,
  state: {
    error: null,
    isError: true,
  },
  mutations: {
    setError(state, payload) {
      state.error = payload;
    },
    setIsError(state, payload) {
      state.isError = payload;
    },
  },
  actions: {
    setError({ commit }, payload) {
      commit('setIsError', true);
      commit('setError', payload);
    },
    setInfo({ commit }, payload) {
      commit('setIsError', false);
      commit('setError', payload);
    },
  },
};
