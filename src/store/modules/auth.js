import User from '@/helpers/auth.helper';
import { application, apiAddress } from '@/helpers/constants.helper';
import { setLocalStorageUserData, clearStorage } from '@/helpers/localStorage.helper';
import i18n from '@/i18n';

export default {
  namespaced: true,
  state: {
    user: null,
    email: '',
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setEmail(state, payload) {
      state.email = payload;
    },
  },
  actions: {
    async registerUser({ dispatch }, { email, password }) {
      const response = await fetch(`${apiAddress}users`, {
        method: 'POST',
        headers: { Accept: application, 'Content-Type': application },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        dispatch('Error/setInfo', i18n.t('auth.registerSuccess'), { root: true });
      } else {
        throw new Error(i18n.t('auth.authError'));
      }
    },
    async loginUser({ commit, dispatch }, { email, password }) {
      const response = await fetch(`${apiAddress}signin`, {
        method: 'POST',
        headers: { Accept: application, 'Content-Type': application },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const user = await response.json();
        const newUser = new User(user.userId, user.token);
        commit('setUser', newUser);
        commit('setEmail', email);
        setLocalStorageUserData(newUser, email);
        dispatch('Settings/receiveSettings', null, { root: true });
        dispatch('Statistic/receiveStatistic', null, { root: true });
      } else {
        throw new Error(i18n.t('auth.authError'));
      }
    },
    async deleteUser({ state, dispatch }) {
      const { user } = state;

      const response = await fetch(`${process.env.VUE_APP_api}users/${user.userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.token}`,
          Accept: application,
          'Content-Type': application,
        },
      });

      if (response.ok) {
        dispatch('Error/setInfo', i18n.t('auth.deleteSuccess'), { root: true });
      } else {
        throw new Error(i18n.t('auth.tokenError'));
      }
    },
    logoutUser({ commit }) {
      commit('setUser', null);
      commit('setEmail', '');
      clearStorage();
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
    expDate(state) {
      return state.user?.expDate;
    },
  },
};
