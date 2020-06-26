<template>
  <div class="game__menu">
    <div class="level">
      <label class="level__label">Level</label>
      <select :value="selectedLevel" @change="onSetSelectedLevel" class="level__select">
        <option v-for="i in 6" :value="i" :key="`${i}level`">
          {{ i }}
        </option>
      </select>
      <label class="round__label">Round</label>
      <select :value="selectedRound" @change="onSetSelectedRound" class="round__select">
        <option
          :class="{ round_complete: i }"
          v-for="(i, index) in completeRoundsArray"
          :value="index + 1"
          :key="`${index + 1}round`"
        >
          {{ index + 1 }}
        </option>
      </select>
    </div>
    <app-spinner v-if="isGameLoading"></app-spinner>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import AppSpinner from '@/components/AppSpinner.vue';

export default {
  name: 'SpeakItGameMenu',
  components: {
    AppSpinner,
  },
  data() {
    return {
      completeArray: [],
      isGameLoading: false,
    };
  },
  computed: {
    ...mapState('EnglishPuzzle', [
      'selectedLevel',
      'selectedRound',
      'roundCount',
      'isAutoSpeech',
      'isTranslate',
      'isSpeech',
      'isImage',
      'completeRounds',
      'isPictureOff',
    ]),

    completeRoundsArray() {
      const result = new Array(this.roundCount);
      result.fill(false);
      this.completeRounds.forEach((item) => {
        if (Number(item.lvl) === Number(this.selectedLevel)) {
          result[item.page - 1] = true;
        }
      });
      return result;
    },
  },
  methods: {
    ...mapMutations('EnglishPuzzle', [
      'setSelectedLevel',
      'setSelectedRound',
      'setIsAutoSpeech',
      'setIsTranslate',
      'setIsSpeech',
      'setIsImage',
    ]),
    ...mapActions('EnglishPuzzle', ['getRoundsCount', 'resetGame']),
    ...mapActions('Error', ['setError']),

    async onSetSelectedLevel(event) {
      this.setError(null);
      this.isGameLoading = true;
      try {
        this.setSelectedLevel(event.target.value);
        this.setSelectedRound(1);
        await this.getRoundsCount();
        await this.resetGame();
      } catch (error) {
        this.setError(error.message);
      } finally {
        this.isGameLoading = false;
      }
    },
    async onSetSelectedRound(event) {
      this.setError(null);
      this.isGameLoading = true;
      try {
        this.setSelectedRound(event.target.value);
        await this.resetGame();
      } catch (error) {
        this.setError(error.message);
      } finally {
        this.isGameLoading = false;
      }
    },
    onSetIsAutoSpeech(event) {
      this.setIsAutoSpeech(event.target.checked);
    },
    onSetIsTranslate(event) {
      this.setIsTranslate(event.target.checked);
    },
    onSetIsSpeech(event) {
      this.setIsSpeech(event.target.checked);
    },
    onSetIsImage(event) {
      this.setIsImage(event.target.checked);
    },
  },
};
</script>

<style lang="scss" scoped>
.game__menu {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 40px;
}

.level__label,
.round__label {
  margin-right: 10px;

  @include media-mobile {
    margin-right: 5px;
  }
}

.round__label {
  margin-left: 30px;

  @include media-mobile {
    margin-left: 15px;
  }
}

.level__select,
.round__select {
  width: 50px;
  margin-left: 5px;
}

.round_complete {
  color: $color-white;
  background-color: $color-apple;
}

@media screen and (max-width: $puzzle-mobile-size) {
  .game__menu {
    flex-direction: column;
    padding: 5px 0;
  }
}
</style>
