<template>
  <div class="game__menu">
    <div class="level">
      <label class="level__label">{{ $t('englishPuzzle.level') }}</label>
      <select :value="selectedLevel" @change="onSetSelectedLevel" class="level__select">
        <option v-for="i in 6" :value="i" :key="`${i}level`">
          {{ i }}
        </option>
      </select>
      <label class="round__label">{{ $t('englishPuzzle.round') }}</label>
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
    <div class="tooltip__buttons">
      <input
        class="tooltip__autospeech"
        type="checkbox"
        id="isAutoSpeech"
        :checked="isAutoSpeech"
        @input="onSetIsAutoSpeech"
      />
      <label class="tooltip__label" for="isAutoSpeech" :title="$t('englishPuzzle.autoSpeech')">
        <icon-base
          :icon-name="$t('englishPuzzle.autoSpeech')"
          width="20px"
          height="20px"
          viewBox="0 0 576 512"
        >
          <icon-volume />
        </icon-base>
      </label>
      <input
        class="tooltip__translate"
        type="checkbox"
        id="isTranslate"
        :checked="isTranslate"
        @input="onSetIsTranslate"
      />
      <label class="tooltip__label" for="isTranslate" :title="$t('englishPuzzle.translate')">
        <icon-base
          :icon-name="$t('englishPuzzle.translate')"
          width="30px"
          height="20px"
          viewBox="0 0 640 512"
        >
          <icon-translate />
        </icon-base>
      </label>
      <input
        class="tooltip__speech"
        type="checkbox"
        id="isSpeech"
        :checked="isSpeech"
        @input="onSetIsSpeech"
      />
      <label class="tooltip__label" for="isSpeech" :title="$t('englishPuzzle.audio')">
        <icon-base
          :icon-name="$t('englishPuzzle.audio')"
          width="20px"
          height="20px"
          viewBox="0 0 512 512"
        >
          <icon-speech />
        </icon-base>
      </label>
      <input
        class="tooltip__image"
        type="checkbox"
        id="isImage"
        :checked="isImage"
        @input="onSetIsImage"
        v-if="!isPictureOff"
      />
      <label
        class="tooltip__label"
        for="isImage"
        :title="$t('englishPuzzle.image')"
        v-if="!isPictureOff"
      >
        <icon-base
          :icon-name="$t('englishPuzzle.image')"
          width="20px"
          height="20px"
          viewBox="0 0 512 512"
        >
          <icon-image />
        </icon-base>
      </label>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import AppSpinner from '@/components/AppSpinner.vue';
import IconBase from '@/components/IconBase.vue';
import IconVolume from '@/components/icons/IconVolume.vue';
import IconTranslate from '@/components/icons/IconTranslate.vue';
import IconSpeech from '@/components/icons/IconSpeech.vue';
import IconImage from '@/components/icons/IconImage.vue';

export default {
  name: 'EnglishPuzzleGameMenu',
  components: {
    IconBase,
    IconVolume,
    IconTranslate,
    IconSpeech,
    IconImage,
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
  padding: 0 40px;
}

.level__label,
.round__label {
  margin-right: 10px;
}

.round__label {
  margin-left: 30px;
}

.level__select,
.round__select {
  width: 50px;
}

.tooltip__buttons {
  display: flex;
}

.tooltip__label {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-left: 10px;
  color: $color-white;
  cursor: pointer;
  background-color: $color-wild-sand;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.tooltip__autospeech,
.tooltip__translate,
.tooltip__speech,
.tooltip__image {
  display: none;

  &:checked + .tooltip__label {
    background: $color-dodger-blue;
  }
}

.round_complete {
  color: $color-white;
  background-color: $color-apple;
}

@media screen and (max-width: $puzzle-mobile-size) {
  .game__menu {
    flex-direction: column;
    padding: 0;
  }

  .tooltip__buttons {
    margin: 10px 0;
  }
}
</style>
