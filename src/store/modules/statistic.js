import { application, apiAddress } from '@/helpers/constants.helper';
import { setLocalStorageUserStatistic } from '@/helpers/localStorage.helper';

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
    },
    longTermStatistic: [
      {
        label: 'Day 1',
        value: 6,
      },
      {
        label: 'Day 2',
        value: 19,
      },
      {
        label: 'Day 3',
        value: 3,
      },
      {
        label: 'Day 4',
        value: 5,
      },
      {
        label: 'Day 5',
        value: 7,
      },
      {
        label: 'Day 6',
        value: 3,
      },
      {
        label: 'Day 7',
        value: 6,
      },
      {
        label: 'Day 8',
        value: 8,
      },
    ],
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
      const { token } = rootState.Auth.user;
      const { userId } = rootState.Auth.user;
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
        setLocalStorageUserStatistic({
          learnedWords: answer.learnedWords,
          stats: JSON.parse(answer.optional.stats),
          puzzleStats: JSON.parse(answer.optional.puzzleStats),
        });
        commit('setStatistics', {
          learnedWords: answer.learnedWords,
          stats: JSON.parse(answer.optional.stats),
          puzzleStats: JSON.parse(answer.optional.puzzleStats),
        });
      } else if (response.status === 404) {
        await dispatch('sendStatistic');
      } else {
        throw new Error('Something went wrong, setting your local statistics to default');
      }
    },
    async sendStatistic({ state, rootState }) {
      const { token } = rootState.Auth.user;
      const { userId } = rootState.Auth.user;
      const { statistics } = state;
      const URL = `${apiAddress}users/${userId}/statistics`;
      const stats = JSON.stringify(statistics.stats);
      const puzzleStats = JSON.stringify(statistics.puzzleStats);
      const payload = JSON.stringify({
        learnedWords: statistics.learnedWords,
        optional: { stats, puzzleStats },
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
        throw new Error('Something went wrong, sorry :C');
      }
    },
    async updateStatistic({ state, commit, dispatch }) {
      const { statistics } = state;
      const { stats, puzzleStats } = statistics;
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

      commit('setStatistics', { learnedWords, stats, puzzleStats });
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
