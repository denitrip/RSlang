import { apiAddress, application, wordGroups } from '@/helpers/constants.helper';

export default {
  namespaced: true,
  state: {
    words: [],
    userWords: [],
    index: 0,
    isMainPage: true,
    isNewWords: false,
    isDifficultWords: false,
    isLearnedWords: false,
    isStartState: true,
    isCompleteState: false,
    isTranslate: true,
    todayLearnedNewWord: 0,
    learnedWordsCount: 0,
    difficultWordsCount: 0,
  },
  mutations: {
    setWords(state, payload) {
      state.words = payload;
    },
    setUserWords(state, payload) {
      state.userWords = payload;
    },
    setIndex(state, payload) {
      state.index = payload;
    },
    setIsMainPage(state, payload) {
      state.isMainPage = payload;
    },
    setIsNewWords(state, payload) {
      state.isNewWords = payload;
    },
    setIsDifficultWords(state, payload) {
      state.isDifficultWords = payload;
    },
    setIsLearnedWords(state, payload) {
      state.isLearnedWords = payload;
    },
    setTodayLearnedNewWord(state, payload) {
      state.todayLearnedNewWord = payload;
    },
    setIsTranslate(state, payload) {
      state.isTranslate = payload;
    },
    setLearnedWordsCount(state, payload) {
      state.learnedWordsCount = payload;
    },
    setDifficultWordsCount(state, payload) {
      state.difficultWordsCount = payload;
    },
    setStartState(state) {
      state.isStartState = true;
      state.isCompleteState = false;
    },
    setCompleteState(state) {
      state.isStartState = false;
      state.isCompleteState = true;
    },
    setNewWordsGame(state) {
      state.isNewWords = true;
      state.isDifficultWords = false;
      state.isLearnedWords = false;
      state.index = 0;
      state.isMainPage = false;
    },
    setDifficultWordsGame(state) {
      state.isNewWords = false;
      state.isDifficultWords = true;
      state.isLearnedWords = false;
      state.index = 0;
      state.isMainPage = false;
    },
    setLearnedWordsGame(state) {
      state.isNewWords = false;
      state.isDifficultWords = false;
      state.isLearnedWords = true;
      state.index = 0;
      state.isMainPage = false;
    },
  },
  actions: {
    async createUserWord({ rootState }, { difficulty, word }) {
      const { userId, token } = rootState.Auth.user;
      const date = Date.now();
      const nextDate = date + 24 * 60 * 60 * 1000;
      const payload = {
        difficulty,
        optional: {
          firstLearnedDate: date,
          lastLearnedDate: date,
          nextLearnedDate: nextDate,
          learnedCount: 1,
        },
      };
      // eslint-disable-next-line no-underscore-dangle
      await fetch(`${apiAddress}users/${userId}/words/${word._id}`, {
        method: 'POST',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: application,
          'Content-Type': application,
        },
        body: JSON.stringify(payload),
      });
    },
    async changeUserWordDifficulty({ rootState }, { difficulty, word }) {
      const { userId, token } = rootState.Auth.user;
      const payload = {
        difficulty,
        optional: { ...word.userWord.optional },
      };
      // eslint-disable-next-line no-underscore-dangle
      await fetch(`${apiAddress}users/${userId}/words/${word._id}`, {
        method: 'PUT',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: application,
          'Content-Type': application,
        },
        body: JSON.stringify(payload),
      });
    },
    async learnUserWord({ rootState }, { word }) {
      const { userId, token } = rootState.Auth.user;
      const date = Date.now();
      const nextDate = date + 24 * 60 * 60 * 1000;
      const payload = {
        difficulty: word.userWord.difficulty,
        optional: {
          ...word.userWord.optional,
          lastLearnedDate: date,
          nextLearnedDate: nextDate,
          learnedCount: word.userWord.optional.learnedCount + 1,
        },
      };
      // eslint-disable-next-line no-underscore-dangle
      await fetch(`${apiAddress}users/${userId}/words/${word._id}`, {
        method: 'PUT',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: application,
          'Content-Type': application,
        },
        body: JSON.stringify(payload),
      });
    },
    async getNewWords({ state, rootState, commit }) {
      const { userId, token } = rootState.Auth.user;
      const { wordsPerDay } = rootState.Settings.settings;
      const { todayLearnedNewWord } = state;
      const newWordsCount = wordsPerDay - todayLearnedNewWord;
      const response = await fetch(
        `${apiAddress}users/${userId}/aggregatedWords?wordsPerPage=${newWordsCount}&filter={"userWord":null}`,
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
      const newWords = await response.json();
      commit('setWords', newWords[0].paginatedResults);
    },
    async getAllUserWords({ rootState, commit }) {
      const { userId, token } = rootState.Auth.user;
      const response = await fetch(
        `${apiAddress}users/${userId}/aggregatedWords?wordsPerPage=3600&filter={"userWord":{"$exists": true}}`,
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
      const allWords = await response.json();
      const userWords = allWords[0].paginatedResults.map((item) => ({ ...item, selected: false }));
      commit('setUserWords', userWords);
    },
    learnedCount({ state, commit }) {
      const { userWords } = state;
      const today = new Date();
      const todayString = today.toLocaleDateString();

      let todayLearnedNewWord = 0;
      let learnedWordsCount = 0;
      let difficultWordsCount = 0;
      userWords.forEach((item) => {
        const { firstLearnedDate } = item.userWord.optional;
        const { difficulty } = item.userWord;

        const firstDate = new Date(firstLearnedDate);
        const firstDateString = firstDate.toLocaleDateString();

        if (todayString === firstDateString) {
          todayLearnedNewWord += 1;
        }

        if (difficulty === wordGroups.learned) {
          learnedWordsCount += 1;
        }

        if (difficulty === wordGroups.difficult) {
          difficultWordsCount += 1;
        }
      });
      commit('setTodayLearnedNewWord', todayLearnedNewWord);
      commit('setLearnedWordsCount', learnedWordsCount);
      commit('setDifficultWordsCount', difficultWordsCount);
    },
    async getDifficultWords({ state, commit, dispatch, rootState, rootGetters }) {
      await dispatch('getAllUserWords');
      const { userWords } = state;
      const todayLearned = rootGetters['Statistic/todayLearned'];
      const { maxCardDay } = rootState.Settings.settings;
      const cardsCount = maxCardDay - todayLearned;

      const difficultArray = userWords.filter(
        (item) => item.userWord.difficulty === wordGroups.difficult,
      );

      difficultArray.sort(
        (a, b) => a.userWord.optional.nextLearnedDate - b.userWord.optional.nextLearnedDate,
      );

      commit('setWords', difficultArray.slice(0, cardsCount));
    },
    async getLearnedWords({ state, commit, dispatch, rootState, rootGetters }) {
      await dispatch('getAllUserWords');
      const { userWords } = state;
      const todayLearned = rootGetters['Statistic/todayLearned'];
      const { maxCardDay } = rootState.Settings.settings;
      const cardsCount = maxCardDay - todayLearned;

      const learnedArray = userWords.filter(
        (item) => item.userWord.difficulty === wordGroups.learned,
      );

      learnedArray.sort(
        (a, b) => a.userWord.optional.nextLearnedDate - b.userWord.optional.nextLearnedDate,
      );

      commit('setWords', learnedArray.slice(0, cardsCount));
    },
  },
};
