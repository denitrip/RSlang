<template>
  <div>
    <transition name="fade">
      <app-error v-if="error" />
    </transition>
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import getLocalStorageData from '@/helpers/localStorage.helper';

export default {
  name: 'App',
  components: {
    AppError: () => import(/* webpackChunkName: "error" */ '@/components/AppError.vue'),
  },
  computed: {
    ...mapState('Error', ['error']),
  },
  created() {
    const { user, email } = getLocalStorageData();
    if (user) {
      this.setUser(user);
    }
    if (email) {
      this.setEmail(email);
    }
  },
  methods: {
    ...mapMutations('Auth', ['setUser', 'setEmail']),
  },
};
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
