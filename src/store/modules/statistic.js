import { application, apiAddress } from '@/helpers/constants.helper';
import { setLocalStorageUserStatistic } from '@/helpers/localStorage.helper';
import i18n from '@/i18n';

export default {
  namespaced: true,
  state: {
    isShortTermStatisticShow: false,
    cardsCount: 0,
    correctAnswer: 0,
    newWords: 0,
    series: 0,
    longestSeries: 0,
    statistics: {
      learnedWords: 0,
      stats: [],
      puzzleStats: [],
      ourGameStats: [],
      speakitStats: [],
      sprintStats: [],
    },
  },
  mutations: {
    setIsShortTermStatisticShow(state, payload) {
      state.isShortTermStatisticShow = payload;
    },
    setCardsCount(state, payload) {
      state.cardsCount = payload;
    },
    setCorrectAnswer(state, payload) {
      state.correctAnswer = payload;
    },
    setNewWords(state, payload) {
      state.newWords = payload;
    },
    setSeries(state, payload) {
      state.series = payload;
    },
    setLongestSeries(state, payload) {
      state.longestSeries = payload;
    },
    setStatistics(state, payload) {
      state.statistics = payload;
    },
  },
  actions: {
    async receiveStatistic({ rootState, commit, dispatch }) {
      const { token, userId } = rootState.Auth.user;
      const URL = `${apiAddress}users/${userId}/statistics`;
      const response = await fetch(URL, {
        method: 'GET',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: application,
          'Content-Type': application,
        },
      });
      if (response.ok) {
        const answer = await response.json();
        const statistic = {
          learnedWords: answer.learnedWords,
          stats: JSON.parse(answer.optional.stats),
          puzzleStats: JSON.parse(answer.optional.puzzleStats),
          ourGameStats: JSON.parse(answer.optional.ourGameStats),
          speakitStats: JSON.parse(answer.optional.speakitStats),
          sprintStats: JSON.parse(answer.optional.sprintStats),
        };
        setLocalStorageUserStatistic(statistic);
        commit('setStatistics', statistic);
      } else if (response.status === 404) {
        await dispatch('sendStatistic');
      } else {
        throw new Error(i18n.t('statistic.receiveError'));
      }
    },
    async sendStatistic({ state, rootState }) {
      const { token, userId } = rootState.Auth.user;
      const { statistics } = state;
      const URL = `${apiAddress}users/${userId}/statistics`;
      const stats = JSON.stringify(statistics.stats);
      const puzzleStats = JSON.stringify(statistics.puzzleStats);
      const speakitStats = JSON.stringify(statistics.speakitStats);
      const sprintStats = JSON.stringify(statistics.sprintStats);
      const ourGameStats = JSON.stringify(statistics.ourGameStats);
      const payload = JSON.stringify({
        learnedWords: statistics.learnedWords,
        optional: { stats, puzzleStats, speakitStats, ourGameStats, sprintStats },
      });
      const response = await fetch(URL, {
        method: 'PUT',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: application,
          'Content-Type': application,
        },
        body: payload,
      });
      if (!response.ok) {
        throw new Error(i18n.t('statistic.sendError'));
      }
    },
    async updateStatistic({ state, commit, dispatch }) {
      const { statistics } = state;
      const { stats } = statistics;
      let { learnedWords } = statistics;
      const today = new Date();
      const label = today.toLocaleDateString();
      const dayStatsIndex = stats.findIndex((item) => item.label === label);
      learnedWords += 1;
      if (dayStatsIndex !== -1) {
        stats[dayStatsIndex].value += 1;
      } else {
        stats.push({ label, value: 1 });
      }

      commit('setStatistics', { ...statistics, learnedWords, stats });
      await dispatch('sendStatistic');
    },
  },

  getters: {
    todayLearned(state) {
      const today = new Date();
      const label = today.toLocaleDateString();
      const { stats } = state.statistics;
      const todayStats = stats.find((item) => item.label === label);

      return todayStats?.value || 0;
    },
  },
};
