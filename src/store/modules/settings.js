import { application, apiAddress } from '@/helpers/constants.helper';
import { setLocalStorageUserSettings } from '@/helpers/localStorage.helper';
import i18n from '@/i18n';

export default {
  namespaced: true,
  state: {
    settings: {
      lang: 'ru',
      langTitle: 'Русский',
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
      puzzleSettings: {
        lastRound: {
          lvl: 0,
          page: 0,
        },
        completeRounds: [],
      },
      speakitSettings: {
        lastRound: {
          lvl: 0,
          page: 0,
        },
        completeRounds: [],
      },
    },
  },
  mutations: {
    setSettings(state, payload) {
      state.settings = { ...state.settings, ...payload };
    },
    setLang(state, { val, title }) {
      state.settings = { ...state.settings, lang: val, langTitle: title };
      i18n.locale = val;
    },
    setLocale(state) {
      i18n.locale = state.settings.lang;
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
        commit('setLocale');
      } else if (response.status === 404) {
        await dispatch('sendSettings');
      } else {
        throw new Error(i18n.t('settings.receiveError'));
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
        throw new Error(i18n.t('settings.sendError'));
      }
    },
  },

  getters: {
    getSettings(state) {
      return state.settings;
    },
    getLangTitle(state) {
      return state.settings.langTitle;
    },
  },
};
