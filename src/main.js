import Vue from 'vue';
import router from '@/router';
import store from '@/store';
import App from '@/App.vue';
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);

Vue.config.productionTip = false;

Vue.mixin({
  filters: {
    deleteBold(str) {
      return str.replace(/<b>|<\/b>/g, '');
    },
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
