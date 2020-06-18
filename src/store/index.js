import Vue from 'vue';
import Vuex from 'vuex';
import Auth from '@/store/modules/auth';
import Data from '@/store/modules/data';
import Error from '@/store/modules/error';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Auth,
    Data,
    Error,
  },
});
