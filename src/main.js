import Vue from 'vue';
import router from '@/router';
import store from '@/store';
import App from '@/App.vue';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue/dist/bootstrap-vue.esm';
import CircularCountDownTimer from 'vue-circular-count-down-timer';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(CircularCountDownTimer);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
