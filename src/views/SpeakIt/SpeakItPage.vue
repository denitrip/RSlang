<template>
  <div class="speakIt">
    <transition name="fade" mode="out-in">
      <SpeakitStartScreen
        v-if="isStartScreen"
        @startGame="onStartGame"
        :isStartLoading="isStartLoading"
      />
      <SpeakitGame v-else />
    </transition>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import SpeakitStartScreen from '@/components/SpeakIt/SpeakItStartScreen.vue';
import SpeakitGame from '@/components/SpeakIt/SpeakItGame.vue';

export default {
  name: 'SpeakitPage',
  components: {
    SpeakitStartScreen,
    SpeakitGame,
  },
  data() {
    return {
      isStartLoading: false,
    };
  },
  computed: {
    ...mapState('Speakit', ['isStartScreen', 'words']),
  },
  destroyed() {
    this.setIsStartScreen(true);
  },
  methods: {
    ...mapActions('Error', ['setError']),
    ...mapActions('Speakit', ['getWords']),
    ...mapMutations('Speakit', ['setIsStartScreen', 'setIncorrectAnswer', 'resetGame']),

    async onStartGame() {
      this.isStartLoading = true;
      try {
        await this.getWords();
        this.resetGame();
        this.setIncorrectAnswer([...this.words]);
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
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
