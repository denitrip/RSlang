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
import { mapState } from 'vuex';

export default {
  name: 'App',
  components: {
    AppError: () => import(/* webpackChunkName: "error" */ '@/components/AppError.vue'),
  },
  computed: {
    ...mapState('Error', ['error']),
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
