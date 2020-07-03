import { application, apiAddress } from '@/helpers/constants.helper';
import { setLocalStorageUserSettings } from '@/helpers/localStorage.helper';

export default {
  namespaced: true,
  state: {
    settings: {
      isAutoVoice: true,
      wordsPerDay: 10,
      maxCardDay: 20,
      isRepeatVisible: true,
      isDifficultVisible: true,
      isGoodVisible: true,
      isEasyVisible: true,
      isDeleteVisible: true,
      isWordVisible: true,
      isMeaningVisible: true,
      isExampleVisible: true,
      isTranscriptionVisible: true,
      isAssociationVisible: true,
      isShowAnswerVisible: true,
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
        setLocalStorageUserSettings(answer.optional);
        commit('setSettings', answer.optional);
      } else if (response.status === 404) {
        await dispatch('sendSettings');
      } else {
        throw new Error('Something went wrong, setting your local settings to default');
      }
    },
    async sendSettings({ state, rootState }) {
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
      if (!response.ok) {
        throw new Error('Something went wrong, sorry :C');
      }
    },
  },

  getters: {
    getSettings(state) {
      return state.settings;
    },
  },
};
