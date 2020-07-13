<template>
  <div class="savannah">
    <transition name="fade" mode="out-in">
      <SavannahStartScreen
        v-if="isStartScreen"
        @startGame="onStartGame"
        :isStartLoading="isStartLoading"
        :isWordsEmpty="isWordsEmpty"
        :link="routerConsts.learningPage.path"
      />
      <SavannahGame v-else />
    </transition>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import SavannahStartScreen from '@/components/Savannah/SavannahStartScreen.vue';
import SavannahGame from '@/components/Savannah/SavannahGame.vue';
import routerConsts from '@/router/routerConsts';

export default {
  name: 'SavannahHomePage',
  components: {
    SavannahStartScreen,
    SavannahGame,
  },
  data() {
    return {
      isStartLoading: false,
      isWordsEmpty: false,
      routerConsts,
    };
  },
  computed: {
    ...mapState('Savannah', ['isStartScreen']),
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
    ...mapActions('Savannah', ['startGame']),
    ...mapActions('Learning', ['loadLearnedUserWords']),
    ...mapMutations('Savannah', ['setIsStartScreen', 'resetGame', 'setWords']),

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
.savannah {
  width: 100%;
  height: 100%;
}
</style>
