import Vue from 'vue';
import Vuex from 'vuex';
import Auth from '@/store/modules/auth';
import Data from '@/store/modules/data';
import Error from '@/store/modules/error';
import Settings from '@/store/modules/settings';
import EnglishPuzzle from '@/store/modules/englishPuzzle';
import Savannah from '@/store/modules/savannah';
import Statistic from '@/store/modules/statistic';
import Audiocall from '@/store/modules/audiocall';
import Learning from '@/store/modules/learning';
import Notification from '@/store/modules/notification';
import Sprint from '@/store/modules/sprint';
import Speakit from '@/store/modules/speakit';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Auth,
    Data,
    Error,
    Settings,
    EnglishPuzzle,
    Savannah,
    Statistic,
    Audiocall,
    Learning,
    Notification,
    Sprint,
    Speakit,
  },
});
