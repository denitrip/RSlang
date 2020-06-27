<template>
  <div class="speakIt">
    <transition name="fade" mode="out-in">
      <SpeakItStartScreen
        v-if="isStartScreen"
        @startGame="onStartGame"
        :isStartLoading="isStartLoading"
      />
    </transition>
    <transition name="fade" mode="out-in">
      <SpeakItGame v-if="!isStartScreen" />
    </transition>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import SpeakItStartScreen from '@/components/SpeakIt/SpeakItStartScreen.vue';
import SpeakItGame from '@/components/SpeakIt/SpeakItGame.vue';

export default {
  name: 'HomePage',
  components: {
    SpeakItStartScreen,
    SpeakItGame,
  },
  data() {
    return {
      isStartLoading: false,
    };
  },
  computed: {
    ...mapState('SpeakIt', ['isStartScreen']),
    ...mapState('Auth', ['user']),
  },
  destroyed() {
    this.resetGame();
  },
  methods: {
    ...mapActions('Error', ['setError']),
    ...mapActions('SpeakIt', ['startGame']),
    ...mapMutations('SpeakIt', ['setIsStartScreen', 'resetGame']),

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
.speakIt {
  width: 100%;
  height: 100%;
}
</style>
