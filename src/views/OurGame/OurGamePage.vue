<template>
  <div class="our-game">
    <transition name="fade" mode="out-in">
      <OurGameStartScreen
        v-if="isStartScreen"
        @startGame="onStartGame"
        :isStartLoading="isStartLoading"
      />
    </transition>
    <transition name="fade" mode="out-in">
      <OurGameGame v-if="!isStartScreen" />
    </transition>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import OurGameStartScreen from '@/components/OurGame/OurGameStartScreen.vue';
import OurGameGame from '@/components/OurGame/OurGameGame.vue';
import getRandomWordsArray from '@/helpers/arrays.helper';

export default {
  name: 'OurGameHomePage',
  components: {
    OurGameStartScreen,
    OurGameGame,
  },
  data() {
    return {
      isStartLoading: false,
    };
  },
  computed: {
    ...mapState('OurGame', ['isStartScreen']),
  },
  destroyed() {
    this.resetGame();
  },
  methods: {
    ...mapActions('Error', ['setError']),
    ...mapActions('OurGame', ['startGame', 'getWordsByGroup']),
    ...mapMutations('OurGame', ['setIsStartScreen', 'resetGame', 'setWords']),

    async onStartGame() {
      this.isStartLoading = true;
      try {
        const wordsCount = 15;
        const allWordsArray = await this.getWordsByGroup();
        const words = getRandomWordsArray(allWordsArray, wordsCount);
        this.setWords(words);
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
.our-game {
  width: 100%;
  height: 100%;
}
</style>
