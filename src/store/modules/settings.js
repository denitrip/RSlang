import { application } from '@/helpers/constants.helper';

export default {
  namespaced: true,
  state: {
    settings: {
      isAutoVoice: true,
      wordsPerDay: 5,
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
  actions: {
    async sendSettings({ dispatch }) {
      const settingsGetter = 'Settings/getSettings';
      // testing userID and token this will be changed next
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZjEwMTI4YWEyNDVlMDAxN2E1NmYyMyIsImlhdCI6MTU5Mjk0MzY3NSwiZXhwIjoxNTkyOTU4MDc1fQ.hw4Z955__-r5pqQQThGRNp9P9tAI8ZF3G_iSuSPoz48';
      const userId = '5ef10128aa245e0017a56f23';
      const settingsURL = `https://afternoon-falls-25894.herokuapp.com/users/${userId}/settings`;
      const settings = { ...this.getters[settingsGetter] };
      const payload = JSON.stringify({
        wordsPerDay: { ...this.getters[settingsGetter] }.wordsPerDay,
        optional: settings,
      });
      const response = await fetch(settingsURL, {
        method: 'PUT',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: application,
          'Content-Type': application,
        },
        body: payload,
      });
      if (response.ok) {
        dispatch('Error/setInfo', 'Settings saved!', { root: true });
      } else {
        throw new Error('Incorrect e-mail or password');
      }
    },
  },

  getters: {
    getSettings(state) {
      return state.settings.settings;
    },
  },
};
