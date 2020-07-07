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
    ...mapActions('OurGame', ['startGame']),
    ...mapActions('Learning', ['loadLearnedUserWords']),
    ...mapMutations('OurGame', ['setIsStartScreen', 'resetGame', 'setWords']),

    async onStartGame() {
      this.isStartLoading = true;
      try {
        const words = await this.loadLearnedUserWords();
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
