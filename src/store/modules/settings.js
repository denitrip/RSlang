import { application, apiAddress } from '@/helpers/constants.helper';

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
    async receiveSettings({ rootState, commit, dispatch }) {
      const { token } = rootState.Auth.user;
      const { userId } = rootState.Auth.user;
      const URL = `${apiAddress}users/${userId}/settings`;
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
        commit('setSettings', answer.optional);
      } else if (response.status === 404) {
        dispatch('Error/setInfo', 'Unable to receive your settings, setting to default', {
          root: true,
        });
      } else {
        dispatch('Error/setError', 'Something went wrong, setting your local settings to default', {
          root: true,
        });
        throw new Error('Unable to set settings');
      }
    },
    async sendSettings({ state, dispatch, rootState }) {
      const { token } = rootState.Auth.user;
      const { userId } = rootState.Auth.user;
      const URL = `${apiAddress}users/${userId}/settings`;
      const { settings } = state;
      const payload = JSON.stringify({
        wordsPerDay: settings.wordsPerDay,
        optional: settings,
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
      if (response.ok) {
        dispatch('Error/setInfo', 'Settings saved!', { root: true });
      } else {
        dispatch('Error/setError', 'Something went wrong, sorry :C', { root: true });
        throw new Error('Unable to set settings');
      }
    },
  },

  getters: {
    getSettings(state) {
      return state.settings.settings;
    },
  },
};
