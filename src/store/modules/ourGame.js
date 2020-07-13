import { shuffle } from '@/helpers/englishPuzzle.helper';
import getRandomWord from '@/helpers/savannah.helper';
import { apiAddress, application, maxRoundStatsCount } from '@/helpers/constants.helper';

export default {
  namespaced: true,
  state: {
    isStartScreen: true,
    lives: new Array(5),
    lost: [],
    isSound: true,
    wordNumber: 0,
    wordsArray: [],
    statsArray: [],
    isGameEnd: false,
    words: [],
    group: 0,
    score: 0,
    correctAnswerCountInGroup: 0,
  },
  mutations: {
    setIsStartScreen(state, payload) {
      state.isStartScreen = payload;
    },
    setLives(state, payload) {
      state.lives = payload;
    },
    setLost(state, payload) {
      state.lost = payload;
    },
    setIsSound(state, payload) {
      state.isSound = payload;
    },
    setWordNumber(state, payload) {
      state.wordNumber = payload;
    },
    setWordsArray(state, payload) {
      state.wordsArray = payload;
    },
    setStatsArray(state, payload) {
      state.statsArray = payload;
    },
    setIsGameEnd(state, payload) {
      state.isGameEnd = payload;
    },
    setWords(state, payload) {
      state.words = payload;
    },
    setGroup(state, payload) {
      state.group = payload;
    },
    setScore(state, payload) {
      state.score = payload;
    },
    setCorrectAnswerCountInGroup(state, payload) {
      state.correctAnswerCountInGroup = payload;
    },
    resetGame(state) {
      state.isStartScreen = true;
      state.lives = new Array(5);
      state.lost = [];
      state.wordNumber = 0;
      state.wordsArray = [];
      state.statsArray = [];
      state.isGameEnd = false;
      state.group = 0;
      state.score = 0;
      state.correctAnswerCountInGroup = 0;
    },
  },
  actions: {
    async startGame({ state, commit }) {
      const { words } = state;
      const { default: book1 } = await import('@/data/book1.js');
      const { default: book2 } = await import('@/data/book2.js');
      const { default: book3 } = await import('@/data/book3.js');
      const wordsArray = words.map((item) => {
        const randomWord1 = getRandomWord(item, book1);
        const randomWord2 = getRandomWord(item, book2);
        const randomWord3 = getRandomWord(item, book3);
        return shuffle([item, randomWord1, randomWord2, randomWord3]);
      });
      commit('setWordsArray', wordsArray);
    },
    async getWordsByGroup({ state, rootState }) {
      const { userId, token } = rootState.Auth.user;
      const { group } = state;
      const response = await fetch(
        `${apiAddress}users/${userId}/aggregatedWords?group=${group}&wordsPerPage=600`,
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
      const groupWords = await response.json();
      return groupWords[0].paginatedResults;
    },
    async saveStats({ state, commit, dispatch, rootState }) {
      const { score } = state;
      const { statistics } = rootState.Statistic;
      const { ourGameStats } = statistics;

      ourGameStats.push({ score, date: Date.now() });
      ourGameStats.sort((a, b) => b.score - a.score);
      if (ourGameStats.length > maxRoundStatsCount) {
        ourGameStats.pop();
      }

      commit('Statistic/setStatistics', { ...statistics, ourGameStats }, { root: true });
      await dispatch('Statistic/sendStatistic', null, { root: true });
    },
  },
};
