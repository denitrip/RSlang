import { application, apiAddress, maxRoundStatsCount } from '@/helpers/constants.helper';
import { getWordsByLevelAndRound, CurrentRoundStats } from '@/helpers/englishPuzzle.helper';
import defaultPicture from '@/assets/img/speakIt/do_you_speak.jpg';
import i18n from '@/i18n';

export default {
  namespaced: true,
  state: {
    selectedLevel: 1,
    selectedRound: 1,
    roundCount: 25,
    completeRounds: [],
    isSound: true,
    isStartGame: false,
    isGameEnd: false,
    isCorrectWord: false,
    wordRecording: '',
    translation: '',
    words: null,
    wordsArray: [],
    wordsStats: null,
    correctAnswer: [],
    incorrectAnswer: [],
    speakitStats: [],
    isRoundComplete: false,
    currentRoundStats: null,
    isStartScreen: true,
    pictureSrc: defaultPicture,
    wallpaperIndex: 0,
    wallpaperSrc:
      'https://raw.githubusercontent.com/arcanar7/rslang-data/master/speakit/speakit-0.jpg',
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
    setCurrentRoundStats(state, payload) {
      state.currentRoundStats = payload;
    },
    setWords(state, payload) {
      state.words = payload;
    },
    setPictureSrc(state, payload) {
      state.pictureSrc = payload;
    },
    setWordsStats(state, payload) {
      state.wordsStats = payload;
    },
    setIncorrectAnswer(state, payload) {
      state.incorrectAnswer = payload;
    },
    setWordsArray(state, payload) {
      state.wordsArray = payload;
    },
    setWordRecording(state, payload) {
      state.wordRecording = payload;
    },
    setTranslation(state, payload) {
      state.translation = payload;
    },
    setSpeakitStats(state, payload) {
      state.speakitStats = payload;
    },
    setCorrectAnswer(state, payload) {
      state.correctAnswer = payload;
    },
    setIsEndGame(state, payload) {
      state.isGameEnd = payload;
    },
    setIsStartScreen(state, payload) {
      state.isStartScreen = payload;
    },
    setIsRoundComplete(state, payload) {
      state.isRoundComplete = payload;
    },
    setIsStartGame(state, payload) {
      state.isStartGame = payload;
    },
    setIsCorrectWord(state, payload) {
      state.isCorrectWord = payload;
    },
    setWallpaperIndex(state, payload) {
      state.wallpaperIndex = payload;
    },
    setWallpaperSrc(state, payload) {
      state.wallpaperSrc = payload;
    },
    resetGame(state) {
      state.incorrectAnswer = [...state.words];
      state.correctAnswer = [];
      state.pictureSrc = defaultPicture;
      state.wordRecording = '';
      state.translation = '';
      state.isStartGame = false;
      state.isCorrectWord = false;
      state.isEndGame = false;
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
        throw new Error(i18n.t('speakIt.responseError'));
      }
    },
    async resetGame({ dispatch }) {
      await dispatch('getWords');
    },
    async saveStats({ state, commit, dispatch, rootState }) {
      const { selectedLevel, selectedRound, wordsArray } = state;
      const { statistics } = rootState.Statistic;
      const { speakitStats } = statistics;
      const currentRoundStats = new CurrentRoundStats(selectedLevel, selectedRound, wordsArray);
      speakitStats.push(currentRoundStats);
      if (speakitStats.length > maxRoundStatsCount) {
        speakitStats.shift();
      }
      commit('setCurrentRoundStats', currentRoundStats);
      commit('Statistic/setStatistics', { ...statistics, speakitStats }, { root: true });
      await dispatch('Statistic/sendStatistic', null, { root: true });
    },
    getSettings({ state, commit, rootState }) {
      const { roundCount } = state;
      const { settings } = rootState.Settings;
      const { completeRounds, lastRound } = settings.speakitSettings;

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
        { ...settings, speakitSettings: { lastRound, completeRounds } },
        { root: true },
      );
      await dispatch('Settings/sendSettings', null, { root: true });
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
    isEndRound(state) {
      const { attemptWords, sentenceNumber } = state;
      return attemptWords.length - 1 === sentenceNumber;
    },
    isLastRound(state) {
      return state.selectedRound === state.roundCount;
    },
  },
};
