export default {
  namespaced: true,
  state: {
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
    isShortTermStatisticShow: false,
  },
  mutations: {
    setIsShortTermStatisticShow(state, payload) {
      state.isShortTermStatisticShow = payload;
    },
  },
};
