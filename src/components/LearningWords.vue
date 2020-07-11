<template>
  <div class="learning">
    <div class="game__settings">
      <div class="settings-wrapper">
        <div class="setting__sound" @click="soundToggle">
          <IconBase iconName="sound" width="36px" height="24px" v-if="settings.isAutoVoice">
            <IconVolume />
          </IconBase>
          <IconBase iconName="sound" width="36px" height="24px" v-else>
            <IconVolumeOff />
          </IconBase>
        </div>
        <input
          class="setting__translate"
          type="checkbox"
          id="isTranslate"
          :checked="isTranslate"
          @input="onSetIsTranslate"
        />
        <label class="setting__label" for="isTranslate" title="Translate">
          <icon-base icon-name="Translate" width="30px" height="20px" viewBox="0 0 640 512">
            <icon-translate />
          </icon-base>
        </label>
      </div>
      <button class="close-button" @click="closeTraining" title="Close training">&times;</button>
    </div>
    <div class="learning__progress">
      <b-progress
        :value="index"
        :max="wordsCount"
        height="20px"
        class="learning__progress-bar"
        show-value
      ></b-progress>
      <span class="learning__progress-max">{{ wordsCount }}</span>
    </div>
    <learning-card :word="words[index]"></learning-card>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import LearningCard from '@/components/LearningCard.vue';
import IconBase from '@/components/IconBase.vue';
import IconVolume from '@/components/icons/IconVolume.vue';
import IconVolumeOff from '@/components/icons/IconVolumeOff.vue';
import IconTranslate from '@/components/icons/IconTranslate.vue';

export default {
  name: 'LearningWords',
  components: {
    LearningCard,
    IconBase,
    IconVolume,
    IconVolumeOff,
    IconTranslate,
  },
  computed: {
    ...mapState('Learning', [
      'words',
      'index',
      'todayLearnedNewWord',
      'isTranslate',
      'difficultWordsCount',
      'learnedWordsCount',
    ]),
    ...mapState('Settings', ['settings']),

    wordsCount() {
      return this.words.length;
    },
  },
  async destroyed() {
    try {
      await this.getAllUserWords();
      this.learnedCount();
    } catch (error) {
      this.setError(error.message);
    }
  },
  methods: {
    ...mapMutations('Learning', ['setIsMainPage', 'setIsTranslate']),
    ...mapMutations('Settings', ['setSettings']),
    ...mapActions('Error', ['setError']),
    ...mapActions('Settings', ['sendSettings']),
    ...mapActions('Learning', ['getAllUserWords', 'learnedCount']),

    closeTraining() {
      this.setIsMainPage(true);
    },

    onSetIsTranslate(event) {
      this.setIsTranslate(event.target.checked);
    },

    async soundToggle() {
      try {
        this.setSettings({ ...this.settings, isAutoVoice: !this.settings.isAutoVoice });
        await this.sendSettings();
      } catch (error) {
        this.setError(error.message);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.learning {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;

  &__progress {
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 400px;
    margin: 20px 0;

    &-bar {
      width: 100%;
    }

    &-max {
      margin-left: 10px;
      color: $color-dodger-blue;
    }
  }
}

.close-button {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  line-height: 1;
  color: $color-malibu;
  background-color: transparent;
  border: none;
  outline: none;
  transition: color 0.3s;
}

.game__settings {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.settings-wrapper {
  display: flex;
  align-items: center;
}

.setting__sound {
  width: 36px;
  height: 24px;
  margin-right: 5px;
  color: $color-malibu;
  cursor: pointer;
  transition: color 0.3s;
}

.setting__label {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-left: 10px;
  color: $color-white;
  cursor: pointer;
  background-color: $color-malibu;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.setting__translate {
  display: none;

  &:checked + .setting__label {
    background: $color-dodger-blue;
  }
}

@media (hover: hover) {
  .close-button:hover,
  .setting__sound:hover {
    color: $color-dodger-blue;
  }
}
</style>
