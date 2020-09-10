<template>
  <div class="game__controls">
    <button
      class="controls__button"
      v-if="isSentenceError"
      :title="$t('englishPuzzle.dontKnowButton')"
      key="I don't know"
      @click="onDiscoverAnswer"
    >
      {{ $t('englishPuzzle.dontKnowButton') }}
    </button>
    <button
      class="controls__button"
      v-if="isSentenceOver"
      :title="$t('englishPuzzle.checkButton')"
      key="Check"
      @click="onCheck"
    >
      {{ $t('englishPuzzle.checkButton') }}
    </button>
    <button
      class="controls__button"
      v-if="isSentenceComplete"
      :title="$t('englishPuzzle.continueButton')"
      key="Continue"
      :disabled="isStartLoading"
      @click="onContinue"
    >
      <app-spinner v-if="isStartLoading"></app-spinner>
      {{ $t('englishPuzzle.continueButton') }}
    </button>
    <button
      class="controls__button"
      v-if="isRoundComplete"
      :title="$t('englishPuzzle.resultsButton')"
      key="Results"
      @click="onResults"
    >
      {{ $t('englishPuzzle.resultsButton') }}
    </button>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';
import AppSpinner from '@/components/AppSpinner.vue';
import routerConsts from '@/router/routerConsts';

export default {
  name: 'EnglishPuzzleGameControls',
  components: {
    AppSpinner,
  },
  data() {
    return {
      isStartLoading: false,
    };
  },
  computed: {
    ...mapState('EnglishPuzzle', [
      'isSentenceOver',
      'isSentenceComplete',
      'isRoundComplete',
      'isSentenceError',
      'selectedLevel',
      'selectedRound',
      'sentenceNumber',
      'isAutoSpeech',
      'words',
    ]),
    ...mapGetters('EnglishPuzzle', ['isCorrectAnswer', 'isEndRound', 'isLastRound']),
  },
  methods: {
    ...mapMutations('EnglishPuzzle', [
      'setIsCheck',
      'setSelectedLevel',
      'setSelectedRound',
      'setSentenceNumber',
      'setStartState',
      'setCheckState',
      'setSuccessState',
      'setErrorState',
      'setEndRoundState',
      'setWordsStats',
    ]),
    ...mapActions('EnglishPuzzle', [
      'resetGame',
      'discoverAnswer',
      'onPlayAudio',
      'addInSentenceArray',
      'saveStats',
      'onSetCompleteRounds',
      'saveSettings',
    ]),
    ...mapActions('Error', ['setError']),

    async onDiscoverAnswer() {
      this.isStartLoading = true;
      try {
        this.onAutoSpeech();
        this.discoverAnswer();

        if (this.isEndRound) {
          this.onSetCompleteRounds();
          await this.saveStats();
          await this.saveSettings();
          this.setEndRoundState();
        }
      } catch (error) {
        this.setError(error.message);
      } finally {
        this.isStartLoading = false;
      }
    },

    async onCheck() {
      try {
        if (this.isCorrectAnswer && this.isEndRound) {
          this.onAutoSpeech();
          this.addInSentenceArray(true);
          this.onSetCompleteRounds();
          await this.saveStats();
          await this.saveSettings();
          this.setEndRoundState();
        } else if (this.isCorrectAnswer) {
          this.onAutoSpeech();
          this.addInSentenceArray(true);
          this.setSuccessState();
        } else {
          this.setErrorState();
          this.setIsCheck(true);
        }
      } catch (error) {
        this.setError(error.message);
      }
    },

    async onContinue() {
      this.isStartLoading = true;
      try {
        if (this.isEndRound && this.isLastRound) {
          this.setSelectedLevel(Number(this.selectedLevel) + 1);
          this.setSelectedRound(1);
          await this.resetGame();
        } else if (this.isEndRound) {
          this.setSelectedRound(Number(this.selectedRound) + 1);
          await this.resetGame();
        } else {
          this.setSentenceNumber(Number(this.sentenceNumber) + 1);
          this.setStartState();
        }
      } catch (error) {
        this.setError(error.message);
      } finally {
        this.isStartLoading = false;
      }
    },

    onAutoSpeech() {
      if (this.isAutoSpeech) {
        this.onPlayAudio();
      }
    },

    onResults() {
      this.setWordsStats(this.words);
      this.$router.push(routerConsts.englishPuzzleStatsDetailed.path);
    },
  },
};
</script>

<style lang="scss" scoped>
.game__controls {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.controls__button {
  @include english-puzzle-button(150px);
}

.controls__button + .controls__button {
  margin-left: 10px;
}
</style>
