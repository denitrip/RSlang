import Vue from 'vue';
import router from '@/router';
import store from '@/store';
import App from '@/App.vue';
import filters from '@/helpers/filters.helper';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue/dist/bootstrap-vue.esm';
import CircularCountDownTimer from 'vue-circular-count-down-timer';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import i18n from './i18n';

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(CircularCountDownTimer);

Vue.config.productionTip = false;

Vue.mixin({ filters });

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
