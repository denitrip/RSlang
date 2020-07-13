import { shuffle } from '@/helpers/englishPuzzle.helper';
import getRandomWord from '@/helpers/savannah.helper';

export default {
  namespaced: true,
  state: {
    isStartScreen: true,
    isSound: true,
    wordNumber: 0,
    wordsArray: [],
    statsArray: [],
    isGameEnd: false,
    words: [],
  },
  mutations: {
    setIsStartScreen(state, payload) {
      state.isStartScreen = payload;
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
    resetGame(state) {
      state.isStartScreen = true;
      state.wordNumber = 0;
      state.wordsArray = [];
      state.statsArray = [];
      state.isGameEnd = false;
    },
  },
  actions: {
    async startGame({ state, commit }) {
      const { words } = state;
      const { default: book1 } = await import('@/data/book1.js');
      const { default: book2 } = await import('@/data/book2.js');
      const { default: book3 } = await import('@/data/book3.js');
      const { default: book4 } = await import('@/data/book4.js');
      const wordsArray = words.map((item) => {
        const randomWord1 = getRandomWord(item, book1);
        const randomWord2 = getRandomWord(item, book2);
        const randomWord3 = getRandomWord(item, book3);
        const randomWord4 = getRandomWord(item, book4);
        return shuffle([item, randomWord1, randomWord2, randomWord3, randomWord4]);
      });
      commit('setWordsArray', wordsArray);
    },
  },
};
