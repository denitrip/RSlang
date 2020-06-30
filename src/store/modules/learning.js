import { apiAddress, application, wordGroups } from '@/helpers/constants.helper';

export default {
  namespaced: true,
  state: {
    words: [],
    userWords: [],
    index: 0,
    isMainPage: true,
    isNewWords: false,
    isStartState: true,
    isCompleteState: false,
    isTranslate: true,
    todayLearned: 0,
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
    setTodayLearned(state, payload) {
      state.todayLearned = payload;
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
  },
  actions: {
    async createUserWord({ rootState }, { difficulty, word }) {
      const { userId, token } = rootState.Auth.user;
      const date = Date.now();
      const nextDate = date + 24 * 60 * 60 * 1000;
      const payload = {
        difficulty,
        optional: { firstLearnedDate: date, lastLearnedDate: date, nextLearnedDate: nextDate },
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
    async changeUserWord({ rootState }, { difficulty, word }) {
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
    async getNewWords({ state, rootState, commit }) {
      const { userId, token } = rootState.Auth.user;
      const { wordsPerDay } = rootState.Settings.settings;
      const { todayLearnedNewWord } = state;
      const newWordsCount = wordsPerDay - todayLearnedNewWord;
      const response = await fetch(
        `${apiAddress}users/${userId}/aggregatedWords?group=0&wordsPerPage=${newWordsCount}&filter={"userWord":null}`,
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
        `${apiAddress}users/${userId}/aggregatedWords?group=0&wordsPerPage=3600&filter={"userWord":{"$exists": true}}`,
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
      const todayYear = today.getFullYear();
      const todayMonth = today.getMonth();
      const todayDay = today.getDate();
      let todayLearned = 0;
      let todayLearnedNewWord = 0;
      let learnedWordsCount = 0;
      let difficultWordsCount = 0;
      userWords.forEach((item) => {
        const { lastLearnedDate, firstLearnedDate } = item.userWord.optional;
        const { difficulty } = item.userWord;

        const lastDate = new Date(lastLearnedDate);
        const lastYear = lastDate.getFullYear();
        const lastMonth = lastDate.getMonth();
        const lastDay = lastDate.getDate();
        if (lastYear === todayYear && lastMonth === todayMonth && lastDay === todayDay) {
          todayLearned += 1;
        }

        const firstDate = new Date(firstLearnedDate);
        const firstYear = firstDate.getFullYear();
        const firstMonth = firstDate.getMonth();
        const firstDay = firstDate.getDate();
        if (firstYear === todayYear && firstMonth === todayMonth && firstDay === todayDay) {
          todayLearnedNewWord += 1;
        }

        if (difficulty === wordGroups.learned) {
          learnedWordsCount += 1;
        }

        if (difficulty === wordGroups.difficult) {
          difficultWordsCount += 1;
        }
      });
      commit('setTodayLearned', todayLearned);
      commit('setTodayLearnedNewWord', todayLearnedNewWord);
      commit('setLearnedWordsCount', learnedWordsCount);
      commit('setDifficultWordsCount', difficultWordsCount);
    },
    getDifficultWords({ state, commit }) {
      const { userWords } = state;
      const difficultArray = userWords.filter(
        (item) => item.userWord.difficulty === wordGroups.difficult,
      );
      commit('setWords', difficultArray);
    },
  },
};
