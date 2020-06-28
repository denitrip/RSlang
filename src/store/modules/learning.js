import { dataSrc, apiAddress, application } from '@/helpers/constants.helper';

export default {
  namespaced: true,
  state: {
    words: [],
    learnedWords: [],
    difficultWords: [],
    deletedWords: [],
    index: 0,
    isAudioPlay: false,
    isMainPage: true,
  },
  mutations: {
    setWords(state, payload) {
      state.words = payload;
    },
    setLearnedWords(state, payload) {
      state.learnedWords = payload;
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
    onPlayAudio({ getters, commit }) {
      const { getAudioExampleSrc } = getters;
      commit('setIsAudioPlay', true);
      const audio = new Audio(getAudioExampleSrc);
      audio.onended = () => {
        commit('setIsAudioPlay', false);
      };
      audio.play();
    },
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
    async getNewWords({ rootState, commit }) {
      const { userId, token } = rootState.Auth.user;
      const { wordsPerDay } = rootState.Settings.settings;
      const response = await fetch(`${apiAddress}users/${userId}/aggregatedWords?group=0&wordsPerDay=${wordsPerDay}&filter={"userWord":null}`, {
        method: 'GET',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: application,
          'Content-Type': application,
        },
      });
      const newWords = await response.json();
      commit('setWords', newWords[0].paginatedResults);
    },
  },
  getters: {
    getAudioExampleSrc(state) {
      const file = state.words[state.index].audio;
      return `${dataSrc}${file}`;
    },
  },
};
