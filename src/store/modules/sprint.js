import { shuffle } from '@/helpers/englishPuzzle.helper';
import getRandomWord from '@/helpers/sprint.helper';

export default {
  namespaced: true,
  state: {
    isStartScreen: true,
    wordsArray: [],
    isSound: true,
    isGameEnd: false,
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
    },
    setIsSound(state, payload) {
      state.isSound = payload;
    },
  },
  methods: {},
  actions: {
    async startGame({ commit, rootState }) {
      const { userWords } = rootState.Learning;

      let wordsArray = shuffle([...userWords]);
      wordsArray = wordsArray.map((item) => getRandomWord(item, userWords));

      commit('setWordsArray', wordsArray);
    },
  },
};
