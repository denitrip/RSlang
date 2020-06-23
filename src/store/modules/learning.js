import getWordsByLevelAndRound from '@/helpers/learning.helper';
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
  },
  actions: {
    async getNewWords({ commit }) {
      const newWords = await getWordsByLevelAndRound(0, 0);
      commit('setWords', newWords);
    },
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
      await fetch(`${apiAddress}users/${userId}/words/${word.id}`, {
        method: 'POST',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: application,
          'Content-Type': application,
        },
        body: JSON.stringify({ difficulty, optional: { word } }),
      });
    },
  },
  getters: {
    getAudioExampleSrc(state) {
      const file = state.words[state.index].audio;
      return `${dataSrc}${file}`;
    },
  },
};
