import Vue from 'vue';
import Vuex from 'vuex';
import Auth from '@/store/modules/auth';
import Data from '@/store/modules/data';
import Error from '@/store/modules/error';
import Settings from '@/store/modules/settings';
import EnglishPuzzle from '@/store/modules/englishPuzzle';
import Savannah from '@/store/modules/savannah';
import LongTermStatistic from '@/store/modules/longTermStatistic';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Auth,
    Data,
    Error,
    Settings,
    EnglishPuzzle,
    Savannah,
    LongTermStatistic,
  },
});
