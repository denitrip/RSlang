export default {
  namespaced: true,
  state: {
    settings: {
      isAutoVoice: true,
      wordCountDay: 5,
      maxCardDay: 5,
      isSayVisible: true,
      isDificultVisible: true,
      isRepeatVisible: false,
      isEasyVisible: false,
      isDeleteVisible: true,
      isGoodVisible: false,
      isWordVisible: false,
      isMeaningVisible: true,
      isExampleVisible: false,
      isTranscriptionVisible: true,
      isAssociationVisible: false,
    },
  },
  mutations: {
    setSettings(state, payload) {
      state.settings = payload;
    },
  },
};
