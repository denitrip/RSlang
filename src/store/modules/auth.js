import User from '@/helpers/auth.helper';
import { application, apiAddress } from '@/helpers/constants.helper';
import { setLocalStorageUserData, clearStorage } from '@/helpers/localStorage.helper';

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
        try {
          dispatch('Settings/receiveSettings', null, { root: true });
        } catch (error) {
          this.setError(error.message);
        }
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
