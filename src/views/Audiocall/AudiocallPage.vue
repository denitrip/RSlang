<template>
  <div class="audiocall">
    <transition name="fade" mode="out-in">
      <AudiocallStartScreen
        v-if="isStartScreen"
        @startGame="onStartGame"
        :isStartLoading="isStartLoading"
      />
    </transition>
    <transition name="fade" mode="out-in">
      <AudiocallGame v-if="!isStartScreen" />
    </transition>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import AudiocallStartScreen from '@/components/Audiocall/AudiocallStartScreen.vue';
import AudiocallGame from '@/components/Audiocall/AudiocallGame.vue';

export default {
  name: 'AudiocallHomePage',
  components: {
    AudiocallStartScreen,
    AudiocallGame,
  },
  data() {
    return {
      isStartLoading: false,
    };
  },
  computed: {
    ...mapState('Audiocall', ['isStartScreen']),
  },
  destroyed() {
    this.resetGame();
  },
  methods: {
    ...mapActions('Error', ['setError']),
    ...mapActions('Audiocall', ['startGame']),
    ...mapMutations('Audiocall', ['setIsStartScreen', 'resetGame']),

    async onStartGame() {
      this.isStartLoading = true;
      try {
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
.audiocall {
  width: 100%;
  height: 100%;
}
</style>
