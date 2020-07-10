<template>
  <div class="audiocall">
    <transition name="fade" mode="out-in">
      <AudiocallStartScreen
        v-if="isStartScreen"
        @startGame="onStartGame"
        :isStartLoading="isStartLoading"
        :isWordsEmpty="isWordsEmpty"
        :link="routerConsts.learningPage.path"
      />
      <AudiocallGame v-else />
    </transition>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import AudiocallStartScreen from '@/components/Audiocall/AudiocallStartScreen.vue';
import AudiocallGame from '@/components/Audiocall/AudiocallGame.vue';
import routerConsts from '@/router/routerConsts';

export default {
  name: 'AudiocallHomePage',
  components: {
    AudiocallStartScreen,
    AudiocallGame,
  },
  data() {
    return {
      isStartLoading: false,
      isWordsEmpty: false,
      routerConsts,
    };
  },
  computed: {
    ...mapState('Audiocall', ['isStartScreen']),
  },
  async created() {
    this.isStartLoading = true;
    try {
      const words = await this.loadLearnedUserWords();
      if (words.length) {
        this.setWords(words);
      } else {
        this.isWordsEmpty = true;
      }
    } catch (error) {
      this.setError(error.message);
    } finally {
      this.isStartLoading = false;
    }
  },
  destroyed() {
    this.resetGame();
  },
  methods: {
    ...mapActions('Error', ['setError']),
    ...mapActions('Audiocall', ['startGame']),
    ...mapActions('Learning', ['loadLearnedUserWords']),
    ...mapMutations('Audiocall', ['setIsStartScreen', 'resetGame', 'setWords']),

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
