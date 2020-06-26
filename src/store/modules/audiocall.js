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
    words: [
      {
        word: 'agree',
        audio: 'files/01_0001.mp3',
        image: 'files/01_0001.jpg',
        wordTranslate: 'согласна',
      },
      {
        word: 'alcohol',
        audio: 'files/01_0002.mp3',
        image: 'files/01_0002.jpg',
        wordTranslate: 'алкоголь',
      },
      {
        word: 'arrive',
        audio: 'files/01_0003.mp3',
        image: 'files/01_0003.jpg',
        wordTranslate: 'прибыть',
      },
      {
        word: 'August',
        audio: 'files/01_0004.mp3',
        image: 'files/01_0004.jpg',
        wordTranslate: 'август',
      },
      {
        word: 'boat',
        audio: 'files/01_0005.mp3',
        image: 'files/01_0005.jpg',
        wordTranslate: 'лодка',
      },
      {
        word: 'breakfast',
        audio: 'files/01_0006.mp3',
        image: 'files/01_0006.jpg',
        wordTranslate: 'завтрак',
      },
      {
        word: 'camera',
        audio: 'files/01_0007.mp3',
        image: 'files/01_0007.jpg',
        wordTranslate: 'камера',
      },
      {
        word: 'capital',
        audio: 'files/01_0008.mp3',
        image: 'files/01_0008.jpg',
        wordTranslate: 'столица',
      },
      {
        word: 'catch',
        audio: 'files/01_0009.mp3',
        image: 'files/01_0009.jpg',
        wordTranslate: 'поймать',
      },
      {
        word: 'duck',
        audio: 'files/01_0010.mp3',
        image: 'files/01_0010.jpg',
        wordTranslate: 'утка',
      },
      {
        word: 'enjoy',
        audio: 'files/01_0011.mp3',
        image: 'files/01_0011.jpg',
        wordTranslate: 'наслаждаться',
      },
      {
        word: 'invite',
        audio: 'files/01_0012.mp3',
        image: 'files/01_0012.jpg',
        wordTranslate: 'пригласить',
      },
    ],
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
    resetGame(state) {
      state.isStartScreen = true;
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
