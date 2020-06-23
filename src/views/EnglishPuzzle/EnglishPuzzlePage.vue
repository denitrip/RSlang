<template>
  <div class="english-puzzle">
    <transition name="fade" mode="out-in">
      <EnglishPuzzleStartScreen
        v-if="isStartScreen"
        @startGame="onStartGame"
        :isStartLoading="isStartLoading"
      />
    </transition>
    <transition name="fade" mode="out-in">
      <EnglishPuzzleGame v-if="!isStartScreen" />
    </transition>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import EnglishPuzzleStartScreen from '@/components/EnglishPuzzle/EnglishPuzzleStartScreen.vue';
import EnglishPuzzleGame from '@/components/EnglishPuzzle/EnglishPuzzleGame.vue';

export default {
  name: 'HomePage',
  components: {
    EnglishPuzzleStartScreen,
    EnglishPuzzleGame,
  },
  data() {
    return {
      isStartLoading: false,
    };
  },
  computed: {
    ...mapState('EnglishPuzzle', ['isStartScreen']),
    ...mapState('Auth', ['user']),
  },
  created() {
    this.updateWidth();
    window.addEventListener('resize', this.updateWidth);
    if (this.user) {
      this.onLoadStats();
    }
  },
  destroyed() {
    window.removeEventListener('resize', this.updateWidth);
  },
  methods: {
    ...mapActions('Error', ['setError']),
    ...mapActions('EnglishPuzzle', [
      'getStats',
      'getSettings',
      'resetGame',
      'getRoundsCount',
      'setIsStartScreen',
    ]),
    ...mapMutations('EnglishPuzzle', [
      'setIsStartScreen',
      'setIsPictureOff',
      'setIsImage',
      'setIsMobile',
    ]),

    async onStartGame() {
      this.isStartLoading = true;
      try {
        await this.getRoundsCount();
        await this.resetGame();
        this.setIsStartScreen(false);
      } catch (error) {
        this.setError(error.message);
      } finally {
        this.isStartLoading = false;
      }
    },
    async onLoadStats() {
      try {
        await this.getStats();
        await this.getSettings();
      } catch (error) {
        this.setError(error.message);
      }
    },
    updateWidth() {
      if (document.documentElement.clientWidth < 611) {
        this.setIsPictureOff(true);
        this.setIsImage(false);
        this.setIsMobile(true);
      } else if (document.documentElement.clientWidth < 945) {
        this.setIsPictureOff(true);
        this.setIsImage(false);
        this.setIsMobile(false);
      } else {
        this.setIsPictureOff(false);
        this.setIsMobile(false);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.english-puzzle {
  width: 100%;
  height: 100%;
}
</style>
