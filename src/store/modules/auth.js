import User from '@/helpers/auth.helper';
import { application, apiAddress } from '@/helpers/constants.helper';

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
        dispatch('Error/setInfo', 'Success! Your account has been created.', { root: true });
      } else {
        throw new Error('Incorrect e-mail or password');
      }
    },
    async loginUser({ commit }, { email, password }) {
      const response = await fetch(`${apiAddress}signin`, {
        method: 'POST',
        headers: { Accept: application, 'Content-Type': application },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const user = await response.json();
        commit('setUser', new User(user.userId, user.token));
        commit('setEmail', email);
      } else {
        throw new Error('Incorrect e-mail or password');
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
        dispatch('Error/setInfo', 'Success! The user has been deleted.', { root: true });
      } else {
        throw new Error('Access token is missing or invalid');
      }
    },
    logoutUser({ commit }) {
      commit('setUser', null);
      commit('setEmail', '');
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
