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
        image: 'files/01_0001.jpg',
        audio: 'files/01_0001.mp3',
        audioMeaning: 'files/01_0001_meaning.mp3',
        audioExample: 'files/01_0001_example.mp3',
        textMeaning: 'To agree is to have the same opinion or belief as another person',
        textExample: 'The students agree they have too much homework',
        transcription: '[əgríː]',
        wordTranslate: 'согласна',
        textMeaningTranslate:
          'Согласиться - значит иметь то же мнение или убеждение, что и другой человек',
        textExampleTranslate: 'Студенты согласны, что у них слишком много домашней работы',
        id: 1,
      },
      {
        word: 'alcohol',
        image: 'files/01_0002.jpg',
        audio: 'files/01_0002.mp3',
        audioMeaning: 'files/01_0002_meaning.mp3',
        audioExample: 'files/01_0002_example.mp3',
        textMeaning: 'Alcohol is a type of drink that can make people drunk',
        textExample: 'A person should not drive a car after he or she has been drinking alcohol',
        transcription: '[ǽlkəhɔ̀ːl]',
        wordTranslate: 'алкоголь',
        textMeaningTranslate: 'Алкоголь - это тип напитка, который может сделать людей пьяными',
        textExampleTranslate: 'Человек не должен водить машину после того, как он выпил алкоголь',
        id: 2,
      },
      {
        word: 'arrive',
        image: 'files/01_0003.jpg',
        audio: 'files/01_0003.mp3',
        audioMeaning: 'files/01_0003_meaning.mp3',
        audioExample: 'files/01_0003_example.mp3',
        textMeaning: 'To arrive is to get somewhere',
        textExample: 'They arrived at school at 7 a.m',
        transcription: '[əráiv]',
        wordTranslate: 'прибыть',
        textMeaningTranslate: 'Приехать значит попасть куда-то',
        textExampleTranslate: 'Они прибыли в школу в 7 часов утра',
        id: 3,
      },
      {
        word: 'August',
        image: 'files/01_0004.jpg',
        audio: 'files/01_0004.mp3',
        audioMeaning: 'files/01_0004_meaning.mp3',
        audioExample: 'files/01_0004_example.mp3',
        textMeaning: 'August is the eighth month of the year',
        textExample: 'Is your birthday in August?',
        transcription: '[ɔ́ːgəst]',
        wordTranslate: 'август',
        textMeaningTranslate: 'Август - восьмой месяц года',
        textExampleTranslate: 'У тебя день рождения в августе?',
        id: 4,
      },
      {
        word: 'boat',
        image: 'files/01_0005.jpg',
        audio: 'files/01_0005.mp3',
        audioMeaning: 'files/01_0005_meaning.mp3',
        audioExample: 'files/01_0005_example.mp3',
        textMeaning: 'A boat is a vehicle that moves across water',
        textExample: 'There is a small boat on the lake',
        transcription: '[bout]',
        wordTranslate: 'лодка',
        textMeaningTranslate: 'Лодка - это транспортное средство, которое движется по воде',
        textExampleTranslate: 'На озере есть маленькая лодка',
        id: 5,
      },
      {
        word: 'breakfast',
        image: 'files/01_0006.jpg',
        audio: 'files/01_0006.mp3',
        audioMeaning: 'files/01_0006_meaning.mp3',
        audioExample: 'files/01_0006_example.mp3',
        textMeaning: 'Breakfast is the morning meal',
        textExample: 'I ate eggs for breakfast',
        transcription: '[brekfəst]',
        wordTranslate: 'завтрак',
        textMeaningTranslate: 'Завтрак - это утренняя трапеза',
        textExampleTranslate: 'Я ел яйца на завтрак',
        id: 6,
      },
      {
        word: 'camera',
        image: 'files/01_0007.jpg',
        audio: 'files/01_0007.mp3',
        audioMeaning: 'files/01_0007_meaning.mp3',
        audioExample: 'files/01_0007_example.mp3',
        textMeaning: 'A camera is a piece of equipment that takes pictures',
        textExample: 'I brought my camera on my vacation',
        transcription: '[kǽmərə]',
        wordTranslate: 'камера',
        textMeaningTranslate: 'Камера - это часть оборудования, которая делает снимки',
        textExampleTranslate: 'Я принес свою камеру в отпуск',
        id: 7,
      },
      {
        word: 'capital',
        image: 'files/01_0008.jpg',
        audio: 'files/01_0008.mp3',
        audioMeaning: 'files/01_0008_meaning.mp3',
        audioExample: 'files/01_0008_example.mp3',
        textMeaning: 'A capital is a city where a country’s government is based',
        textExample: 'The capital of the United States is Washington, D.C',
        transcription: '[kæpətl]',
        wordTranslate: 'столица',
        textMeaningTranslate: 'Столица - это город, в котором базируется правительство страны',
        textExampleTranslate: 'Столица Соединенных Штатов - Вашингтон, округ Колумбия',
        id: 8,
      },
      {
        word: 'catch',
        image: 'files/01_0009.jpg',
        audio: 'files/01_0009.mp3',
        audioMeaning: 'files/01_0009_meaning.mp3',
        audioExample: 'files/01_0009_example.mp3',
        textMeaning: 'To catch is to grab or get something',
        textExample: 'Did you catch the ball during the baseball game?',
        transcription: '[kætʃ]',
        wordTranslate: 'поймать',
        textMeaningTranslate: 'Поймать - значит схватить или получить что-то',
        textExampleTranslate: 'Вы поймали мяч во время игры в бейсбол?',
        id: 9,
      },
      {
        word: 'duck',
        image: 'files/01_0010.jpg',
        audio: 'files/01_0010.mp3',
        audioMeaning: 'files/01_0010_meaning.mp3',
        audioExample: 'files/01_0010_example.mp3',
        textMeaning: 'A duck is a small water bird',
        textExample: 'People feed ducks at the lake',
        transcription: '[dʌk]',
        wordTranslate: 'утка',
        textMeaningTranslate: 'Утка - маленькая водяная птица',
        textExampleTranslate: 'Люди кормят уток у озера',
        id: 10,
      },
      {
        word: 'enjoy',
        image: 'files/01_0011.jpg',
        audio: 'files/01_0011.mp3',
        audioMeaning: 'files/01_0011_meaning.mp3',
        audioExample: 'files/01_0011_example.mp3',
        textMeaning: 'To enjoy is to like something',
        textExample: 'The woman enjoys riding her bicycle',
        transcription: '[indʒɔ́i]',
        wordTranslate: 'наслаждаться',
        textMeaningTranslate: 'Наслаждаться значит любить что-то',
        textExampleTranslate: 'Женщина любит кататься на велосипеде',
        id: 11,
      },
      {
        word: 'invite',
        image: 'files/01_0012.jpg',
        audio: 'files/01_0012.mp3',
        audioMeaning: 'files/01_0012_meaning.mp3',
        audioExample: 'files/01_0012_example.mp3',
        textMeaning: 'To invite is to ask someone to come to a place or event',
        textExample: 'I will invite my friends to my birthday party',
        transcription: '[inváit]',
        wordTranslate: 'пригласить',
        textMeaningTranslate: 'Пригласить - это попросить кого-нибудь прийти на место или событие',
        textExampleTranslate: 'Я приглашаю своих друзей на мой день рождения',
        id: 12,
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
