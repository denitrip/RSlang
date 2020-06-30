import { apiAddress, application } from '@/helpers/constants.helper';

export default {
  namespaced: true,
  state: {
    words: [],
    userWords: [],
    index: 0,
    isAudioPlay: false,
    isMainPage: true,
  },
  mutations: {
    setWords(state, payload) {
      state.words = payload;
    },
    setUserWords(state, payload) {
      state.userWords = payload;
    },
    setIndex(state, payload) {
      state.index = payload;
    },
    setIsAudioPlay(state, payload) {
      state.isAudioPlay = payload;
    },
    setIsMainPage(state, payload) {
      state.isMainPage = payload;
    },
  },
  actions: {
    async createUserWord({ rootState }, { difficulty, word }) {
      const { userId, token } = rootState.Auth.user;
      // eslint-disable-next-line no-underscore-dangle
      await fetch(`${apiAddress}users/${userId}/words/${word._id}`, {
        method: 'POST',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: application,
          'Content-Type': application,
        },
        body: JSON.stringify({ difficulty, optional: {} }),
      });
    },
    async changeUserWord({ rootState }, { difficulty, word }) {
      const { userId, token } = rootState.Auth.user;
      // eslint-disable-next-line no-underscore-dangle
      await fetch(`${apiAddress}users/${userId}/words/${word._id}`, {
        method: 'PUT',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: application,
          'Content-Type': application,
        },
        body: JSON.stringify({ difficulty, optional: {} }),
      });
    },
    async getNewWords({ rootState, commit }) {
      const { userId, token } = rootState.Auth.user;
      const { wordsPerDay } = rootState.Settings.settings;
      const response = await fetch(
        `${apiAddress}users/${userId}/aggregatedWords?group=0&wordsPerDay=${wordsPerDay}&filter={"userWord":null}`,
        {
          method: 'GET',
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: application,
            'Content-Type': application,
          },
        },
      );
      const newWords = await response.json();
      commit('setWords', newWords[0].paginatedResults);
    },
    async getAllUserWords({ rootState, commit }) {
      const { userId, token } = rootState.Auth.user;
      const response = await fetch(
        `${apiAddress}users/${userId}/aggregatedWords?wordsPerPage=3600&filter={"userWord":{"$exists": true}}`,
        {
          method: 'GET',
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: application,
            'Content-Type': application,
          },
        },
      );
      const allWords = await response.json();
      const userWords = allWords[0].paginatedResults.map((item) => ({ ...item, selected: false }));

      commit('setUserWords', userWords);
    },
  },
};
