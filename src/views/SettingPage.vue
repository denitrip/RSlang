<template>
  <div class="setting">
    <div class="setting__wrap setting__main">
      <h1 class="setting__h1">Main setting</h1>
      <div class="setting__menu">
        <div class="setting__submenu">
          <h3>Voice Setting</h3>
          <b-form-checkbox name="check-button" switch v-model="settingsData.isAutoVoice" size="lg">
            Automatic voice preview
          </b-form-checkbox>
        </div>
      </div>

      <div class="setting__menu">
        <div class="setting__submenu">
          <h3>day learning settings</h3>
          <div>Number of new words to learn per day</div>
          <div class="setting__counter">
            <b-button
              class="counter__control counter__minus"
              variant="outline-primary"
              @click="minusWordCount"
              >-</b-button
            >
            <div class="counter__input">{{ settingsData.wordsPerDay }}</div>
            <b-button
              class="counter__control counter__plus"
              variant="primary"
              @click="plusWordCount"
              >+</b-button
            >
          </div>
        </div>
        <div class="setting__submenu">
          <h3 class="align_opacity">opacity</h3>
          <div>Maximum number of cards to learn per day</div>
          <div class="setting__counter">
            <b-button
              class="counter__control counter__minus"
              variant="outline-primary"
              @click="minusCardCount"
              >-</b-button
            >
            <div class="counter__input">{{ settingsData.maxCardDay }}</div>
            <b-button
              class="counter__control counter__plus"
              variant="primary"
              @click="plusCardCount"
              >+</b-button
            >
          </div>
        </div>
      </div>
    </div>

    <div class="setting__wrap--checkboxes setting__card">
      <h1 class="setting__h1">Cards view settings</h1>
      <div class="setting__menu">
        <div class="setting__submenu setting__display">
          <h3>Button display settings</h3>
          <b-form-checkbox
            class="setting__checkbox"
            name="checkbox-say"
            v-model="settingsData.isSayVisible"
          >
            «Say out loud» button
          </b-form-checkbox>
          <b-form-checkbox
            class="setting__checkbox"
            name="checkbox-difficult"
            v-model="settingsData.isDificultVisible"
          >
            «Difficult» button
          </b-form-checkbox>
          <b-form-checkbox
            class="setting__checkbox"
            name="checkbox-repeat"
            v-model="settingsData.isRepeatVisible"
          >
            «Repeat» button
          </b-form-checkbox>
          <b-form-checkbox
            class="setting__checkbox"
            name="checkbox-easy"
            v-model="settingsData.isEasyVisible"
          >
            «Easy» button
          </b-form-checkbox>
          <b-form-checkbox
            class="setting__checkbox"
            name="checkbox-delete"
            v-model="settingsData.isDeleteVisible"
          >
            «Delete» button
          </b-form-checkbox>
          <b-form-checkbox
            class="setting__checkbox"
            name="checkbox-good"
            v-model="settingsData.isGoodVisible"
          >
            «Good» button
          </b-form-checkbox>
        </div>
        <div class="setting__submenu">
          <h3>display settings</h3>
          <b-form-checkbox
            class="setting__checkbox"
            name="checkbox-translation"
            v-model="settingsData.isWordVisible"
          >
            Word translation
          </b-form-checkbox>
          <b-form-checkbox
            class="setting__checkbox"
            name="checkbox-meaining"
            v-model="settingsData.isMeaningVisible"
          >
            Meaning of the word
          </b-form-checkbox>
          <b-form-checkbox
            class="setting__checkbox"
            name="checkbox-example"
            v-model="settingsData.isExampleVisible"
          >
            An example of using the word
          </b-form-checkbox>
          <b-form-checkbox
            class="setting__checkbox"
            name="checkbox-transcription"
            v-model="settingsData.isTranscriptionVisible"
          >
            Word transcription
          </b-form-checkbox>
          <b-form-checkbox
            class="setting__checkbox"
            name="checkbox-association"
            v-model="settingsData.isAssociationVisible"
          >
            Picture association
          </b-form-checkbox>
        </div>
      </div>
    </div>
    <div class="footer">
      <b-button
        class="setting__save footer__btn"
        variant="primary"
        @click="saveSettings"
        :disabled="isSaveLoading"
        >Save Setting <AppSpinner v-if="isSaveLoading"></AppSpinner
      ></b-button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex';
import AppSpinner from '@/components/AppSpinner.vue';

export default {
  name: 'SettingPage',
  components: { AppSpinner },
  data() {
    return {
      settingsData: {
        isAutoVoice: true,
        wordsPerDay: 5,
        maxCardDay: 5,
        isSayVisible: true,
        isDificultVisible: true,
        isRepeatVisible: false,
        isEasyVisible: false,
        isDeleteVisible: true,
        isGoodVisible: false,
        isWordVisible: false,
        isMeaningVisible: true,
        isExampleVisible: false,
        isTranscriptionVisible: true,
        isAssociationVisible: false,
      },
      isSaveLoading: false,
    };
  },
  computed: {
    ...mapState('Settings', ['settings']),
  },
  beforeMount() {
    this.settingsData = this.settings;
  },
  methods: {
    ...mapMutations('Settings', ['setSettings']),
    ...mapActions('Settings', ['sendSettings', 'receiveSettings']),

    plusWordCount() {
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
        this.settingsData.maxCardDay -= 1;
      }
    },
    async saveSettings() {
      this.isSaveLoading = true;
      try {
        this.setSettings(this.settingsData);
        await this.sendSettings();
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
    }

    .counter__control:hover {
      color: white;
      background-color: $color-dodger-blue;
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
  }
}

.footer {
  display: flex;
  justify-content: flex-end;

  &__btn {
    margin: 5px 60px 5px 0;
  }
}
</style>
