import { shuffle } from '@/helpers/englishPuzzle.helper';
import getRandomWord from '@/helpers/sprint.helper';
import { maxRoundStatsCount } from '@/helpers/constants.helper';

export default {
  namespaced: true,
  state: {
    isStartScreen: true,
    wordsArray: [],
    isSound: true,
    isGameEnd: false,
    timerDuration: 60,
    timerSize: 120,
    timerSteps: 3,
    attemptSeries: 4,
    score: 0,
  },
  mutations: {
    setIsStartScreen(state, payload) {
      state.isStartScreen = payload;
    },
    setIsGameEnd(state, payload) {
      state.isGameEnd = payload;
    },
    setWordsArray(state, payload) {
      state.wordsArray = payload;
    },
    resetGame(state) {
      state.isStartScreen = true;
      state.isGameEnd = false;
      state.score = 0;
    },
    setIsSound(state, payload) {
      state.isSound = payload;
    },
    setScore(state, payload) {
      state.score = payload;
    },
  },
  actions: {
    startGame({ commit, rootState }) {
      const { userWords } = rootState.Learning;

      let wordsArray = shuffle([...userWords]);
      wordsArray = wordsArray.map((item) => getRandomWord(item, userWords));

      commit('setWordsArray', wordsArray);
    },
    async saveStats({ state, commit, dispatch, rootState }) {
      const { score } = state;
      const { statistics } = rootState.Statistic;
      const { sprintStats } = statistics;

      sprintStats.push({ score, date: Date.now() });
      sprintStats.sort((a, b) => b.score - a.score);
      if (sprintStats.length > maxRoundStatsCount) {
        sprintStats.pop();
      }

      commit('Statistic/setStatistics', { ...statistics, sprintStats }, { root: true });
      await dispatch('Statistic/sendStatistic', null, { root: true });
    },
  },
};
