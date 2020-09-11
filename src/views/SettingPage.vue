<template>
  <div class="setting">
    <div class="setting__wrap setting__main">
      <h1 class="setting__h1">{{ $t('settings.mainTitle') }}</h1>
      <div class="setting__menu">
        <div class="setting__submenu">
          <h3>{{ $t('settings.appTitle') }}</h3>
          <div class="setting__lang">
            <p>{{ $t('settings.langText') }}</p>
            <language-select />
          </div>
          <h3>{{ $t('settings.voiceTitle') }}</h3>
          <b-form-checkbox name="check-button" switch v-model="settingsData.isAutoVoice" size="lg">
            {{ $t('settings.voiceText') }}
          </b-form-checkbox>
        </div>
      </div>
      <div class="setting__menu">
        <div class="setting__submenu">
          <h3>{{ $t('settings.learningTitle') }}</h3>
          <div>{{ $t('settings.newWordsText') }}</div>
          <div class="setting__counter">
            <b-button
              class="counter__control counter__minus"
              variant="outline-primary"
              @click="minusWordCount"
            >
              -
            </b-button>
            <div class="counter__input">{{ settingsData.wordsPerDay }}</div>
            <b-button
              class="counter__control counter__plus"
              variant="primary"
              @click="plusWordCount"
            >
              +
            </b-button>
          </div>
        </div>
        <div class="setting__submenu">
          <h3 class="align_opacity">opacity</h3>
          <div>{{ $t('settings.maxCardsText') }}</div>
          <div class="setting__counter">
            <b-button
              class="counter__control counter__minus"
              variant="outline-primary"
              @click="minusCardCount"
            >
              -
            </b-button>
            <div class="counter__input">{{ settingsData.maxCardDay }}</div>
            <b-button
              class="counter__control counter__plus"
              variant="primary"
              @click="plusCardCount"
            >
              +
            </b-button>
          </div>
        </div>
      </div>
    </div>
    <div class="setting__wrap--checkboxes setting__card">
      <h1 class="setting__h1">{{ $t('settings.cardsViewTitle') }}</h1>
      <div class="setting__menu">
        <div class="setting__submenu setting__display">
          <h3>{{ $t('settings.buttonDisplayTitle') }}</h3>
          <b-form-checkbox
            class="setting__checkbox"
            name="checkbox-repeat"
            v-model="settingsData.isRepeatVisible"
          >
            {{ $t('settings.repeatButtonText') }}
          </b-form-checkbox>
          <b-form-checkbox
            class="setting__checkbox"
            name="checkbox-difficult"
            v-model="settingsData.isDifficultVisible"
          >
            {{ $t('settings.difficultButtonText') }}
          </b-form-checkbox>
          <b-form-checkbox
            class="setting__checkbox"
            name="checkbox-good"
            v-model="settingsData.isGoodVisible"
          >
            {{ $t('settings.goodButtonText') }}
          </b-form-checkbox>
          <b-form-checkbox
            class="setting__checkbox"
            name="checkbox-easy"
            v-model="settingsData.isEasyVisible"
          >
            {{ $t('settings.easyButtonText') }}
          </b-form-checkbox>
          <b-form-checkbox
            class="setting__checkbox"
            name="checkbox-delete"
            v-model="settingsData.isDeleteVisible"
          >
            {{ $t('settings.deleteButtonText') }}
          </b-form-checkbox>
        </div>
        <div class="setting__submenu">
          <h3>{{ $t('settings.displayTitle') }}</h3>
          <b-form-checkbox
            class="setting__checkbox"
            :class="{ setting__checkbox_disable: isLastCheckbox && settingsData.isWordVisible }"
            name="checkbox-translation"
            v-model="settingsData.isWordVisible"
          >
            {{ $t('settings.wordTranslationText') }}
          </b-form-checkbox>
          <b-form-checkbox
            class="setting__checkbox"
            :class="{ setting__checkbox_disable: isLastCheckbox && settingsData.isMeaningVisible }"
            name="checkbox-meaining"
            v-model="settingsData.isMeaningVisible"
          >
            {{ $t('settings.meaningText') }}
          </b-form-checkbox>
          <b-form-checkbox
            class="setting__checkbox"
            :class="{ setting__checkbox_disable: isLastCheckbox && settingsData.isExampleVisible }"
            name="checkbox-example"
            v-model="settingsData.isExampleVisible"
          >
            {{ $t('settings.exampleText') }}
          </b-form-checkbox>
          <b-form-checkbox
            class="setting__checkbox"
            name="checkbox-transcription"
            v-model="settingsData.isTranscriptionVisible"
          >
            {{ $t('settings.wordTranscriptionText') }}
          </b-form-checkbox>
          <b-form-checkbox
            class="setting__checkbox"
            name="checkbox-association"
            v-model="settingsData.isAssociationVisible"
          >
            {{ $t('settings.pictureText') }}
          </b-form-checkbox>
          <b-form-checkbox
            class="setting__checkbox"
            name="checkbox-show-answer"
            v-model="settingsData.isShowAnswerVisible"
          >
            {{ $t('settings.showAnswerText') }}
          </b-form-checkbox>
        </div>
      </div>
    </div>
    <div class="footer">
      <b-button
        class="footer__btn"
        variant="primary"
        @click="saveSettings"
        :disabled="isSaveLoading"
      >
        {{ $t('settings.saveButtonText') }}
        <AppSpinner v-if="isSaveLoading" />
      </b-button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex';
import AppSpinner from '@/components/AppSpinner.vue';
import {
  setLocalStorageUserSettings,
  getLocalStorageUserSettings,
} from '@/helpers/localStorage.helper';
import LanguageSelect from '@/components/LanguageSelect.vue';

export default {
  name: 'SettingPage',
  components: { AppSpinner, LanguageSelect },
  data() {
    return {
      settingsData: {
        isAutoVoice: true,
        wordsPerDay: 10,
        maxCardDay: 20,
        isRepeatVisible: true,
        isDifficultVisible: true,
        isGoodVisible: true,
        isEasyVisible: true,
        isDeleteVisible: true,
        isWordVisible: true,
        isMeaningVisible: true,
        isExampleVisible: true,
        isTranscriptionVisible: true,
        isAssociationVisible: true,
        isShowAnswerVisible: true,
      },
      isSaveLoading: false,
    };
  },
  computed: {
    ...mapState('Settings', ['settings']),
    isLastCheckbox() {
      const isExampleVisible = Number(this.settingsData.isExampleVisible);
      const isMeaningVisible = Number(this.settingsData.isMeaningVisible);
      const isWordVisible = Number(this.settingsData.isWordVisible);
      const count = isExampleVisible + isMeaningVisible + isWordVisible;
      return count === 1;
    },
  },
  created() {
    const settings = getLocalStorageUserSettings();
    if (settings) {
      this.settingsData = settings;
    } else {
      this.settingsData = this.settings;
    }
  },
  methods: {
    ...mapMutations('Settings', ['setSettings']),
    ...mapActions('Settings', ['sendSettings']),
    ...mapActions('Error', ['setError', 'setInfo']),

    plusWordCount() {
      if (this.settingsData.maxCardDay === this.settingsData.wordsPerDay) {
        this.settingsData.maxCardDay += 1;
      }
      this.settingsData.wordsPerDay += 1;
    },
    plusCardCount() {
      this.settingsData.maxCardDay += 1;
    },
    minusWordCount() {
      if (this.settingsData.wordsPerDay > 1) {
        this.settingsData.wordsPerDay -= 1;
      }
    },
    minusCardCount() {
      if (this.settingsData.maxCardDay > 0) {
        if (this.settingsData.maxCardDay === this.settingsData.wordsPerDay) {
          this.settingsData.wordsPerDay -= 1;
        }
        this.settingsData.maxCardDay -= 1;
      }
    },
    async saveSettings() {
      this.isSaveLoading = true;
      try {
        this.setSettings(this.settingsData);
        setLocalStorageUserSettings(this.settingsData);
        await this.sendSettings();
        this.setInfo(this.$t('settings.savedInfoText'));
      } catch (error) {
        this.setError(error.message);
      } finally {
        this.isSaveLoading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.setting {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  min-height: 100%;
  background-color: $color-catskill-white;

  &__lang {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
  }

  &__wrap {
    padding: 55px 47px 70px;

    &--checkboxes {
      padding: 55px 47px 0 47px;
    }
  }

  &__main {
    border-bottom: 1px solid $color-ghost;
  }

  &__h1 {
    color: $color-pickled-bluewood;
    text-transform: uppercase;
  }

  &__menu {
    display: flex;
    flex-flow: row wrap;
    margin-top: 45px;
  }

  h3 {
    margin-bottom: 16px;
    font-size: 16px;
    color: $color-manatee;
    text-transform: uppercase;
  }

  .align_opacity {
    opacity: 0;
  }

  &__submenu {
    margin-right: 6vw;
    color: $color-pickled-bluewood;
  }

  &__counter {
    display: flex;
    justify-content: space-between;
    width: 140px;
    margin-top: 12px;

    button {
      padding: 0;
    }

    .counter__control {
      align-items: center;
      width: 36px;
      height: 36px;
      font-size: 1.25rem;
      font-weight: bold;
      color: $color-pickled-bluewood;
      text-align: center;
      background-color: $color-wild-sand;
      border: none;
      border-radius: 50%;
      transition: color 0.3s, background-color 0.3s;
    }

    .counter__input {
      font-size: 1.25rem;
      font-weight: bold;
      line-height: 36px;
      text-align: center;
    }
  }

  &__display {
    margin-right: 10vw;
  }

  &__checkbox {
    margin-bottom: 12px;

    &_disable {
      pointer-events: none;
      opacity: 0.5;
    }
  }
}

.footer {
  display: flex;
  justify-content: flex-end;
  padding: 5px 60px 20px 0;

  &__btn {
    @include english-puzzle-button(150px);
  }
}

@media (hover: hover) {
  .counter__control:hover {
    color: $color-white;
    background-color: $color-dodger-blue;
  }
}
</style>
