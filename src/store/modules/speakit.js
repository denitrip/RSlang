import { application, apiAddress } from '@/helpers/constants.helper';
import { getWordsByLevelAndRound } from '@/helpers/englishPuzzle.helper';
import defaultPicture from '@/assets/img/speakIt/do_you_speak.jpg';

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
    wordsStats: null,
    correctAnswer: [],
    incorrectAnswer: [],
    isRoundComplete: false,
    currentRoundStats: null,
    isStartScreen: true,
    pictureSrc: defaultPicture,
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
    setWordRecording(state, payload) {
      state.wordRecording = payload;
    },
    setTranslation(state, payload) {
      state.translation = payload;
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
        throw new Error('Something went wrong');
      }
    },
    async resetGame({ dispatch }) {
      await dispatch('getWords');
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
