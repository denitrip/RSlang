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
  data() {
    return {
      isStartLoading: false,
    };
  },
  computed: {
    ...mapState('EnglishPuzzle', ['isStartScreen']),
    ...mapState('Auth', ['user']),
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
      'setSentencePerRound',
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
      if (document.documentElement.clientWidth < 551) {
        this.setIsPictureOff(true);
        this.setIsImage(false);
        this.setSentencePerRound(1);
      } else if (document.documentElement.clientWidth < 945) {
        this.setIsPictureOff(true);
        this.setIsImage(false);
        this.setSentencePerRound(10);
      } else {
        this.setIsPictureOff(false);
        this.setSentencePerRound(10);
      }
      this.setIsStartScreen(true);
    },
  },
};
</script>
