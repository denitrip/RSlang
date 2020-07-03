<template>
  <div class="speakIt">
    <transition name="fade" mode="out-in">
      <SpeakitStartScreen
        v-if="isStartScreen"
        @startGame="onStartGame"
        :isStartLoading="isStartLoading"
      />
    </transition>
    <transition name="fade" mode="out-in">
      <SpeakitGame v-if="!isStartScreen" />
    </transition>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import SpeakitStartScreen from '@/components/Speakit/SpeakitStartScreen.vue';
import SpeakitGame from '@/components/Speakit/SpeakitGame.vue';

export default {
  name: 'HomePage',
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
    this.resetGame();
  },
  methods: {
    ...mapActions('Error', ['setError']),
    ...mapActions('Speakit', ['getWords', 'resetGame']),
    ...mapMutations('Speakit', ['setIsStartScreen', 'setIncorrectAnswer']),

    async onStartGame() {
      this.isStartLoading = true;
      try {
        await this.getWords();
        await this.resetGame();
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
  width: 100%;
  height: 100%;
}
</style>
