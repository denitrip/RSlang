import { shuffle } from '@/helpers/englishPuzzle.helper';
import getRandomWord from '@/helpers/sprint.helper';

export default {
  namespaced: true,
  state: {
    isStartScreen: true,
    wordsArray: [],
  },
  mutations: {
    setIsStartScreen(state, payload) {
      state.isStartScreen = payload;
    },
    setWordsArray(state, payload) {
      state.wordsArray = payload;
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
