export default {
  namespaced: true,
  state: {
    isStartScreen: true,
    wordsArray: [],
    words: [
      {
        word: 'peace',
        translate: 'мир',
      },
      {
        word: 'door',
        translate: 'дверь',
      },
      {
        word: 'ball',
        translate: 'мяч',
      },
      {
        word: 'sea',
        translate: 'море',
      },
    ],
  },
  mutations: {
    setIsStartScreen(state, payload) {
      state.isStartScreen = payload;
    },
    setWordsArray(state, payload) {
      state.wordsArray = payload;
    },
  },

  actions: {
    async startGame({ state, commit }) {
      //   const { words } = state;
      //   const { default: book1 } = await import('@/data/book1.js');
      //   const wordsArray = words.map((item) => {
      //     const randomWord1 = getRandomWord(item, book1);
      //     return shuffle([item, randomWord1, randomWord2, randomWord3]);
      //   });
      commit('setWordsArray', state.words);
    },
  },
};
