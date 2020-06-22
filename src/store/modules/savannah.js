import { shuffle } from '@/helpers/englishPuzzle.helper';

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
    words: [
      {
        word: 'agree',
        wordTranslate: 'согласна',
      },
      {
        word: 'alcohol',
        wordTranslate: 'алкоголь',
      },
      {
        word: 'arrive',
        wordTranslate: 'прибыть',
      },
      {
        word: 'August',
        wordTranslate: 'август',
      },
      {
        word: 'boat',
        wordTranslate: 'лодка',
      },
      {
        word: 'breakfast',
        wordTranslate: 'завтрак',
      },
      {
        word: 'camera',
        wordTranslate: 'камера',
      },
      {
        word: 'capital',
        wordTranslate: 'столица',
      },
      {
        word: 'catch',
        wordTranslate: 'поймать',
      },
      {
        word: 'duck',
        wordTranslate: 'утка',
      },
      {
        word: 'enjoy',
        wordTranslate: 'наслаждаться',
      },
      {
        word: 'invite',
        wordTranslate: 'пригласить',
      },
    ],
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
    resetGame(state) {
      state.isStartScreen = true;
      state.lives = new Array(5);
      state.lost = [];
      state.isSound = true;
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
      const wordsArray = words.map((item) => {
        const randomWord1 = book1[Math.floor(Math.random() * 101)];
        const randomWord2 = book2[Math.floor(Math.random() * 101)];
        const randomWord3 = book3[Math.floor(Math.random() * 101)];
        return shuffle([item, randomWord1, randomWord2, randomWord3]);
      });
      commit('setWordsArray', wordsArray);
    },
  },
};
