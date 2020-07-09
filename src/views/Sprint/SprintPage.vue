<template>
  <div class="sprint">
    <transition name="fade" mode="out-in">
      <SprintStartScreen
        v-if="isStartScreen"
        @startGame="onStartGame"
        :isStartLoading="isStartLoading"
      />
    </transition>
    <transition name="fade" mode="out-in">
      <SprintGame v-if="!isStartScreen" />
    </transition>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import SprintStartScreen from '@/components/Sprint/SprintStartScreen.vue';
import SprintGame from '@/components/Sprint/SprintGame.vue';

export default {
  name: 'SprintHomePage',
  components: {
    SprintStartScreen,
    SprintGame,
  },
  data() {
    return {
      isStartLoading: false,
    };
  },
  computed: {
    ...mapState('Sprint', ['isStartScreen']),
  },
  destroyed() {
    this.resetGame();
  },
  methods: {
    ...mapActions('Error', ['setError']),
    ...mapActions('Sprint', ['startGame']),
    ...mapActions('Learning', ['getAllUserWords']),
    ...mapMutations('Sprint', ['setIsStartScreen', 'resetGame']),

    async onStartGame() {
      this.isStartLoading = true;
      try {
        await this.getAllUserWords();
        await this.startGame();
        this.setIsStartScreen(false);
      } catch (error) {
        this.setError(error.message);
      } finally {
        this.isStartLoading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.sprint {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
