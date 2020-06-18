<template>
  <div class="setting">
    <div class="setting__wrap setting__main">
      <h1 class="setting__h1">Main setting</h1>
      <div class="setting__menu">
        <div class="setting__submenu">
          <h3>Voice Setting</h3>
          <b-form-checkbox name="check-button" switch v-model="isAutoVoice" size="lg">
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
            <div class="counter__input">{{ wordCountDay }}</div>
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
            <div class="counter__input">{{ maxCardDay }}</div>
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

    <div class="setting__wrap setting__card">
      <h1 class="setting__h1">Cards view settings</h1>
      <div class="setting__menu">
        <div class="setting__submenu setting__display">
          <h3>Button display settings</h3>
          <b-form-checkbox class="setting__checkbox" name="checkbox-say" v-model="isSayVisible">
            «Say out loud» button
          </b-form-checkbox>
          <b-form-checkbox
            class="setting__checkbox"
            name="checkbox-difficult"
            v-model="isDificultVisible"
          >
            «Difficult» button
          </b-form-checkbox>
          <b-form-checkbox
            class="setting__checkbox"
            name="checkbox-repeat"
            v-model="isRepeatVisible"
          >
            «Repeat» button
          </b-form-checkbox>
          <b-form-checkbox class="setting__checkbox" name="checkbox-easy" v-model="isEasyVisible">
            «Easy» button
          </b-form-checkbox>
          <b-form-checkbox
            class="setting__checkbox"
            name="checkbox-delete"
            v-model="isDeleteVisible"
          >
            «Delete» button
          </b-form-checkbox>
          <b-form-checkbox class="setting__checkbox" name="checkbox-good" v-model="isGoodVisible">
            «Good» button
          </b-form-checkbox>
        </div>
        <div class="setting__submenu">
          <h3>display settings</h3>
          <b-form-checkbox
            class="setting__checkbox"
            name="checkbox-translation"
            v-model="isWordVisible"
          >
            Word translation
          </b-form-checkbox>
          <b-form-checkbox
            class="setting__checkbox"
            name="checkbox-meaining"
            v-model="isMeaningVisible"
          >
            Meaning of the word
          </b-form-checkbox>
          <b-form-checkbox
            class="setting__checkbox"
            name="checkbox-example"
            v-model="isExampleVisible"
          >
            An example of using the word
          </b-form-checkbox>
          <b-form-checkbox
            class="setting__checkbox"
            name="checkbox-transcription"
            v-model="isTranscriptionVisible"
          >
            Word transcription
          </b-form-checkbox>
          <b-form-checkbox
            class="setting__checkbox"
            name="checkbox-association"
            v-model="isAssociationVisible"
          >
            Picture association
          </b-form-checkbox>
        </div>
      </div>
    </div>
    <b-button class="setting__save" variant="primary" @click="saveSettings">Save Setting</b-button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'SettingPage',
  data() {
    return {
      isAutoVoice: true,
      wordCountDay: 5,
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
    };
  },
  methods: {
    ...mapMutations('Settings', ['setSettings']),

    plusWordCount() {
      this.wordCountDay += 1;
    },
    plusCardCount() {
      this.maxCardDay += 1;
    },
    minusWordCount() {
      if (this.wordCountDay === 0) return;
      this.wordCountDay -= 1;
    },
    minusCardCount() {
      if (this.maxCardDay === 0) return;
      this.maxCardDay -= 1;
    },
    saveSettings() {
      this.setSettings({
        isAutoVoice: this.isAutoVoice,
        wordCountDay: this.wordCountDay,
        maxCardDay: this.maxCardDay,
        isSayVisible: this.isSayVisible,
        isDificultVisible: this.isDificultVisible,
        isRepeatVisible: this.isRepeatVisible,
        isEasyVisible: this.isEasyVisible,
        isDeleteVisible: this.isDeleteVisible,
        isGoodVisible: this.isGoodVisible,
        isWordVisible: this.isWordVisible,
        isMeaningVisible: this.isMeaningVisible,
        isExampleVisible: this.isExampleVisible,
        isTranscriptionVisible: this.isTranscriptionVisible,
        isAssociationVisible: this.isAssociationVisible,
      });
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
  height: 100%;
  background-color: $color-catskill-white;

  &__wrap {
    padding: 55px 47px 70px;
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
    margin-right: 112px;
    color: $color-pickled-bluewood;
  }

  &__counter {
    display: flex;
    justify-content: space-between;
    width: 140px;
    margin-top: 12px;

    button {
      padding: 0;
      padding-bottom: 4px;
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
    margin-right: 227px;
  }

  &__checkbox {
    margin-bottom: 12px;
  }

  &__save {
    position: fixed;
    right: 5vw;
    bottom: 8vh;
  }
}
</style>
