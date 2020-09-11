import { application, apiAddress, dataSrc, maxRoundStatsCount } from '@/helpers/constants.helper';
import {
  shuffle,
  checkIsSentenceInArray,
  CurrentRoundStats,
  getWordsByLevelAndRound,
} from '@/helpers/englishPuzzle.helper';
import i18n from '@/i18n';

export default {
  namespaced: true,
  state: {
    selectedLevel: 1,
    selectedRound: 1,
    roundCount: 25,
    completeRounds: [],
    isAutoSpeech: true,
    isTranslate: true,
    isSpeech: true,
    isImage: false,
    prevIsTranslate: true,
    prevIsSpeech: true,
    prevIsImage: false,
    words: null,
    wordsStats: null,
    sentenceNumber: 0,
    correctAnswer: [],
    shuffleWords: [],
    attemptWords: [],
    isSentenceOver: false,
    isSentenceComplete: false,
    isRoundComplete: false,
    isSentenceError: true,
    isCheck: false,
    isAudioPlay: false,
    puzzleStats: [],
    currentRoundStats: null,
    sentenceArray: [],
    isPictureOff: false,
    isStartScreen: true,
    isMobile: false,
  },
  mutations: {
    setSelectedLevel(state, payload) {
      state.selectedLevel = payload;
    },
    setSelectedRound(state, payload) {
      state.selectedRound = payload;
    },
    setRoundCount(state, payload) {
      state.roundCount = payload;
    },
    setCompleteRounds(state, payload) {
      state.completeRounds = payload;
    },
    setIsAutoSpeech(state, payload) {
      state.isAutoSpeech = payload;
    },
    setIsTranslate(state, payload) {
      state.isTranslate = payload;
      state.prevIsTranslate = payload;
    },
    setIsSpeech(state, payload) {
      state.isSpeech = payload;
      state.prevIsSpeech = payload;
    },
    setIsImage(state, payload) {
      state.isImage = payload;
      state.prevIsImage = payload;
    },
    setWords(state, payload) {
      state.words = payload;
    },
    setWordsStats(state, payload) {
      state.wordsStats = payload;
    },
    setSentenceNumber(state, payload) {
      state.sentenceNumber = payload;
    },
    setCorrectAnswer(state, payload) {
      state.correctAnswer = payload;
    },
    setShuffleWords(state, payload) {
      state.shuffleWords = payload;
    },
    setAttemptWords(state, payload) {
      state.attemptWords = payload;
    },
    setIsSentenceOver(state, payload) {
      state.isSentenceOver = payload;
    },
    setIsSentenceComplete(state, payload) {
      state.isSentenceComplete = payload;
    },
    setIsRoundComplete(state, payload) {
      state.isRoundComplete = payload;
    },
    setIsSentenceError(state, payload) {
      state.isSentenceError = payload;
    },
    setIsCheck(state, payload) {
      state.isCheck = payload;
    },
    setIsAudioPlay(state, payload) {
      state.isAudioPlay = payload;
    },
    setPuzzleStats(state, payload) {
      state.puzzleStats = payload;
    },
    setCurrentRoundStats(state, payload) {
      state.currentRoundStats = payload;
    },
    setSentenceArray(state, payload) {
      state.sentenceArray = payload;
    },
    setIsPictureOff(state, payload) {
      state.isPictureOff = payload;
    },
    setIsStartScreen(state, payload) {
      state.isStartScreen = payload;
    },
    setIsMobile(state, payload) {
      state.isMobile = payload;
    },
    setStartState(state) {
      state.isSentenceError = true;
      state.isSentenceOver = false;
      state.isSentenceComplete = false;
      state.isRoundComplete = false;
      state.isCheck = false;
      state.isTranslate = state.prevIsTranslate;
      state.isSpeech = state.prevIsSpeech;
      state.isImage = state.prevIsImage;
    },
    setCheckState(state) {
      state.isSentenceError = false;
      state.isSentenceOver = true;
      state.isSentenceComplete = false;
      state.isRoundComplete = false;
      state.isCheck = false;
    },
    setSuccessState(state) {
      state.isSentenceError = false;
      state.isSentenceOver = false;
      state.isSentenceComplete = true;
      state.isRoundComplete = false;
      state.prevIsTranslate = state.isTranslate;
      state.prevIsSpeech = state.isSpeech;
      state.prevIsImage = state.isImage;
      state.isCheck = false;
      state.isTranslate = true;
      state.isSpeech = true;
      if (!state.isPictureOff) {
        state.isImage = true;
      }
    },
    setErrorState(state) {
      state.isSentenceError = true;
      state.isSentenceOver = true;
      state.isSentenceComplete = false;
      state.isRoundComplete = false;
      state.isCheck = false;
    },
    setEndRoundState(state) {
      state.isSentenceError = false;
      state.isSentenceOver = false;
      state.isSentenceComplete = true;
      state.isRoundComplete = true;
      state.isCheck = false;
    },
    setDefaultGameStore(state) {
      state.selectedLevel = 1;
      state.selectedRound = 1;
      state.roundCount = 25;
      state.completeRounds = [];
      state.isAutoSpeech = true;
      state.isTranslate = true;
      state.isSpeech = true;
      state.isImage = false;
      state.prevIsTranslate = true;
      state.prevIsSpeech = true;
      state.prevIsImage = false;
      state.words = null;
      state.wordsStats = null;
      state.sentenceNumber = 0;
      state.correctAnswer = [];
      state.shuffleWords = [];
      state.attemptWords = [];
      state.isSentenceOver = false;
      state.isSentenceComplete = false;
      state.isRoundComplete = false;
      state.isSentenceError = true;
      state.isCheck = false;
      state.isAudioPlay = false;
      state.puzzleStats = [];
      state.currentRoundStats = null;
      state.sentenceArray = [];
      state.isPictureOff = false;
      state.isStartScreen = true;
      state.isMobile = false;
    },
  },
  actions: {
    async getWords({ state, commit }) {
      const { selectedLevel, selectedRound } = state;
      const words = await getWordsByLevelAndRound({
        level: selectedLevel,
        round: selectedRound,
      });
      commit('setWords', words);
    },
    async getRoundsCount({ state, commit }) {
      const { selectedLevel } = state;
      const group = selectedLevel - 1;
      const response = await fetch(
        `${apiAddress}words/count?group=${group}&wordsPerExampleSentenceLTE=10&wordsPerPage=10`,
        {
          method: 'GET',
          withCredentials: true,
          headers: { Accept: application, 'Content-Type': application },
        },
      );
      if (response.ok) {
        const roundCount = await response.json();
        commit('setRoundCount', roundCount.count);
      } else {
        throw new Error(i18n.t('englishPuzzle.responseError'));
      }
    },
    async resetGame({ commit, dispatch, state }) {
      await dispatch('getWords');
      commit('setSentenceNumber', 0);
      commit('setSentenceArray', []);
      commit('setStartState');
      const { words } = state;
      const result = [];
      const correctResult = [];
      const emptyResult = [];
      words.forEach((item) => {
        let wordsArray = item.textExample.replace(/<b>|<\/b>/g, '').split(' ');
        wordsArray = wordsArray.map((word, index) => ({ index, word }));
        const shuffledArray = shuffle(wordsArray);
        let emptyArray = new Array(wordsArray.length);
        emptyArray.fill('');
        emptyArray = emptyArray.map((word, index) => ({ index, word }));
        emptyResult.push(emptyArray);
        result.push(shuffledArray);
        correctResult.push(wordsArray);
      });
      commit('setAttemptWords', emptyResult);
      commit('setShuffleWords', result);
      commit('setCorrectAnswer', correctResult);
    },
    discoverAnswer({ state, commit, dispatch }) {
      const { shuffleWords, attemptWords, correctAnswer, sentenceNumber } = state;

      attemptWords[sentenceNumber] = [...correctAnswer[sentenceNumber]];
      shuffleWords[sentenceNumber].fill('');
      shuffleWords[sentenceNumber] = shuffleWords[sentenceNumber].map((word, index) => ({
        index,
        word,
      }));
      dispatch('addInSentenceArray', false);
      commit('setShuffleWords', [...shuffleWords]);
      commit('setAttemptWords', [...attemptWords]);
      commit('setSuccessState');
    },
    addInSentenceArray({ state, commit }, know) {
      const { sentenceNumber, sentenceArray } = state;

      if (!checkIsSentenceInArray(sentenceArray, sentenceNumber)) {
        sentenceArray.push({
          id: sentenceNumber,
          know,
        });
        commit('setSentenceArray', sentenceArray);
      }
    },
    async saveStats({ state, commit, dispatch, rootState }) {
      const { sentenceArray, selectedLevel, selectedRound } = state;
      const { statistics } = rootState.Statistic;
      const { puzzleStats } = statistics;
      const currentRoundStats = new CurrentRoundStats(selectedLevel, selectedRound, sentenceArray);
      puzzleStats.push(currentRoundStats);
      if (puzzleStats.length > maxRoundStatsCount) {
        puzzleStats.shift();
      }
      commit('setCurrentRoundStats', currentRoundStats);
      commit('Statistic/setStatistics', { ...statistics, puzzleStats }, { root: true });
      await dispatch('Statistic/sendStatistic', null, { root: true });
    },
    getSettings({ state, commit, rootState }) {
      const { roundCount } = state;
      const { settings } = rootState.Settings;
      const { completeRounds, lastRound } = settings.puzzleSettings;

      if (lastRound.page === roundCount) {
        commit('setSelectedLevel', Number(lastRound.lvl) + 1);
        commit('setSelectedRound', 1);
      } else {
        commit('setSelectedRound', Number(lastRound.page) + 1);
      }
      commit('setCompleteRounds', completeRounds);
    },
    async saveSettings({ state, commit, dispatch, rootState }) {
      const { completeRounds, selectedLevel, selectedRound } = state;
      const { settings } = rootState.Settings;
      const lastRound = { lvl: Number(selectedLevel), page: Number(selectedRound) };
      commit(
        'Settings/setSettings',
        { ...settings, puzzleSettings: { lastRound, completeRounds } },
        { root: true },
      );
      await dispatch('Settings/sendSettings', null, { root: true });
    },
    onPlayAudio({ getters, commit }) {
      const { getAudioExampleSrc } = getters;
      commit('setIsAudioPlay', true);
      const audio = new Audio(getAudioExampleSrc);
      audio.onended = () => {
        commit('setIsAudioPlay', false);
      };
      audio.play();
    },
    onSetCompleteRounds({ state, commit }) {
      const { completeRounds, selectedLevel, selectedRound } = state;
      const isNotComplete = !completeRounds.find(
        (item) => item.lvl === selectedLevel && item.page === selectedRound,
      );
      if (isNotComplete) {
        completeRounds.push({ lvl: selectedLevel, page: selectedRound });
        commit('setCompleteRounds', completeRounds);
      }
    },
  },
  getters: {
    getTextExample(state) {
      return state.words[state.sentenceNumber].textExample;
    },
    getTextExampleTranslate(state) {
      return state.words[state.sentenceNumber].textExampleTranslate;
    },
    getCorrectAnswer(state) {
      let result = '';
      state.correctAnswer[state.sentenceNumber].forEach((item) => {
        result = `${result} ${item.word}`;
      });
      return result;
    },
    isCorrectAnswer(state) {
      const { correctAnswer, attemptWords, sentenceNumber } = state;
      let result = true;
      correctAnswer[sentenceNumber].forEach((item, index) => {
        if (item.word !== attemptWords[sentenceNumber][index].word) {
          result = false;
        }
      });
      return result;
    },
    isEndRound(state) {
      const { attemptWords, sentenceNumber } = state;
      return attemptWords.length - 1 === sentenceNumber;
    },
    isLastRound(state) {
      return state.selectedRound === state.roundCount;
    },
    getAudioExampleSrc(state) {
      const file = state.words[state.sentenceNumber].audioExample;
      return `${dataSrc}${file}`;
    },
  },
};
