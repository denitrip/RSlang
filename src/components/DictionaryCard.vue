<template>
  <div class="dictionary-card" :class="{ 'dictionary-card_loading': isWordChanging }">
    <div class="dictionary-card__wrapper" v-if="isMainCard">
      <div class="left-column">
        <b-form-checkbox size="lg" :id="word.word" v-model="isSelected" name="checkbox-1">
        </b-form-checkbox>
        <img :src="`${dataSrc}${word.image}`" class="picture" :alt="word.word" />
        <span
          @click="onPlayAudio"
          class="icon icon__speak-it"
          :class="{ 'icon__speak-it_play': isSoundPlay }"
        >
          <IconBase iconName="sound" width="36" height="30" viewBox="0 0 36 30">
            <IconSpeakIt />
          </IconBase>
        </span>
        <div class="word">
          <div class="word_english">{{ word.word }}</div>
          <div class="word_russian">{{ word.wordTranslate }}</div>
        </div>
      </div>
      <AppSpinner v-if="isWordChanging" size="lds-spinner_medium" colorName="color-dodger-blue" />
      <div class="icons">
        <span
          @click="onPlayAudio"
          class="icon icon__speak-it--mobile"
          :class="{ 'icon__speak-it_play': isSoundPlay }"
        >
          <IconBase iconName="sound" width="36" height="30" viewBox="0 0 36 29">
            <IconSpeakIt />
          </IconBase>
        </span>
        <b-button class="icon__info" variant="success" @click="flipCard">i</b-button>
        <span
          v-show="isLearned || isDeleted"
          @click="changeWordDifficulty(wordGroups.difficult)"
          class="icon icon__do-you-know"
        >
          <IconBase iconName="to difficult" width="26" height="30" viewBox="0 0 26 30">
            <IconDoYouKnow />
          </IconBase>
        </span>
        <span
          v-show="isDifficult || isDeleted"
          @click="changeWordDifficulty(wordGroups.learned)"
          class="icon icon__backup"
        >
          <IconBase iconName="to learned" width="29" height="29" viewBox="0 0 29 29">
            <IconBackup />
          </IconBase>
        </span>
        <span
          v-show="isLearned || isDifficult"
          @click="changeWordDifficulty(wordGroups.deleted)"
          class="icon icon__bucket"
        >
          <IconBase iconName="delete" width="24" height="30" viewBox="0 0 24 30">
            <IconBucket />
          </IconBase>
        </span>
      </div>
    </div>
    <div class="dictionary-card__wrapper" v-else>
      <b-form-checkbox size="lg" :id="word.word" v-model="isSelected" name="checkbox-1">
      </b-form-checkbox>
      <img
        :src="`${dataSrc}${word.image}`"
        class="picture"
        :alt="word.word"
        v-if="settings.isAssociationVisible"
      />
      <div class="word_transcription" v-if="settings.isTranscriptionVisible">
        {{ word.transcription }}
      </div>
      <div class="meaning" v-if="settings.isMeaningVisible">
        <div class="text">{{ word.textMeaning | deleteItalic }}</div>
        <div class="text-translate">{{ word.textExampleTranslate }}</div>
      </div>
      <div class="example" v-if="settings.isExampleVisible">
        <div class="text">{{ word.textExample | deleteBold }}</div>
        <div class="text-translate">{{ word.textExampleTranslate }}</div>
      </div>
      <div class="progress-date">
        <div class="text-translate">
          First {{ new Date(word.userWord.optional.firstLearnedDate).toLocaleString() }}
        </div>
        <div class="text-translate">
          Last {{ new Date(word.userWord.optional.lastLearnedDate).toLocaleString() }}
        </div>
        <div class="text-translate">
          Next {{ new Date(word.userWord.optional.nextLearnedDate).toLocaleString() }}
        </div>
      </div>
      <div class="text">Repeated {{ word.userWord.optional.learnedCount }}</div>
      <b-button-close @click="flipCard" class="icon__close">×</b-button-close>
    </div>
  </div>
</template>

<script>
import IconBase from '@/components/IconBase.vue';
import IconDoYouKnow from '@/components/icons/IconDoYouKnow.vue';
import IconSpeakIt from '@/components/icons/IconSpeakIt.vue';
import IconBucket from '@/components/icons/IconBucket.vue';
import IconBackup from '@/components/icons/IconBackup.vue';
import { mapState, mapMutations, mapActions } from 'vuex';
import { dataSrc, wordGroups } from '@/helpers/constants.helper';
import AppSpinner from '@/components/AppSpinner.vue';

export default {
  name: 'DictionaryCard',
  components: {
    IconBase,
    IconDoYouKnow,
    IconSpeakIt,
    IconBucket,
    IconBackup,
    AppSpinner,
  },
  props: {
    word: {
      type: [Object],
      default: () => ({
        word: 'agree',
        image: 'files/01_0001.jpg',
        audio: 'files/01_0001.mp3',
        audioMeaning: 'files/01_0001_meaning.mp3',
        audioExample: 'files/01_0001_example.mp3',
        selected: false,
        textMeaning: 'To agree is to have the same opinion or belief as another person',
        textExample: 'The students agree they have too much homework',
        transcription: '[əgríː]',
        wordTranslate: 'согласна',
        textMeaningTranslate:
          'Согласиться - значит иметь то же мнение или убеждение, что и другой человек',
        textExampleTranslate: 'Студенты согласны, что у них слишком много домашней работы',
        id: 1,
      }),
    },
  },
  filters: {
    deleteBold(str) {
      return str.replace(/<b>|<\/b>/g, '');
    },
    deleteItalic(str) {
      return str.replace(/<i>|<\/i>/g, '');
    },
  },
  data() {
    return {
      dataSrc,
      wordGroups,
      isSoundPlay: false,
      isWordChanging: false,
      isMainCard: true,
    };
  },
  computed: {
    ...mapState('Learning', ['userWords']),
    ...mapState('Settings', ['settings']),

    isSelected: {
      get() {
        return this.word.selected;
      },
      set(value) {
        const newUserWords = this.userWords.map((item) => {
          if (item.word === this.word.word) {
            return { ...item, selected: value };
          }
          return item;
        });
        this.setUserWords(newUserWords);
      },
    },
    isLearned() {
      return this.word.userWord.difficulty === wordGroups.learned;
    },
    isDifficult() {
      return this.word.userWord.difficulty === wordGroups.difficult;
    },
    isDeleted() {
      return this.word.userWord.difficulty === wordGroups.deleted;
    },
  },
  methods: {
    ...mapMutations('Learning', ['setUserWords']),
    ...mapActions('Learning', ['changeUserWordDifficulty']),
    ...mapActions('Error', ['setError']),

    async changeWordDifficulty(difficulty) {
      this.isWordChanging = true;
      try {
        await this.changeUserWordDifficulty({
          difficulty,
          word: this.word,
        });
        const newUserWords = this.userWords.map((item) => {
          if (item.word === this.word.word) {
            return {
              ...item,
              selected: false,
              userWord: { difficulty, optional: item.userWord.optional },
            };
          }
          return item;
        });
        this.setUserWords(newUserWords);
      } catch (error) {
        this.setError(error.message);
      } finally {
        this.isWordChanging = false;
      }
    },
    onPlayAudio() {
      const audio = new Audio(`${dataSrc}${this.word.audio}`);
      this.isSoundPlay = true;
      audio.onended = () => {
        this.isSoundPlay = false;
      };
      audio.play();
    },
    flipCard() {
      this.isMainCard = !this.isMainCard;
    },
  },
};
</script>

<style scoped lang="scss">
.icon {
  color: $color-ghost;
  cursor: pointer;
  transition: color 0.3s;

  &__info {
    width: 31px;
    height: 30px;
    font-weight: bold;
    line-height: 22px;
    background-color: $color-ghost;
    border: none;
    border-radius: 50%;

    @include media-tablet {
      margin-left: 14px;
      background-color: $color-apple;
    }

    &:hover {
      background: $color-apple;
    }
  }

  &__close {
    font-size: 50px;

    @include media-tablet {
      position: absolute;
      top: 8px;
      right: 10px;
    }
  }

  &__speak-it {
    margin-left: 25px;

    @include media-tablet {
      display: none;
    }

    &_play {
      color: $color-cornflower-blue;
    }

    &--mobile {
      display: none;
      color: $color-cornflower-blue;

      @include media-tablet {
        display: inline-block;
        margin-left: 0;
      }
    }
  }

  &__bucket {
    margin-left: 16px;

    @include media-tablet {
      color: $color-wild-watermelon;
    }
  }

  &__do-you-know {
    margin-left: 16px;

    @include media-tablet {
      color: $color-golden-dream;
    }
  }

  &__backup {
    margin-left: 16px;

    @include media-tablet {
      color: $color-dodger-blue;
    }
  }
}

.icons {
  @include media-tablet {
    margin-top: 10px;
    margin-bottom: 30px;
    margin-left: 26px;
  }
}

.dictionary-card {
  width: 100%;
  height: 106px;
  margin-top: 8px;
  background-color: $color-white;
  border-radius: 25px;
  transition: all 0.5s;

  &_loading {
    pointer-events: none;
    cursor: default;
    opacity: 0.6;
  }

  @include media-laptop {
    height: auto;
  }

  @include media-tablet {
    height: max-content;
  }

  &__wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 90%;
    height: inherit;
    margin: auto;

    @include media-tablet {
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      height: max-content;
      padding: 15px 0;
    }
  }
}

.left-column {
  display: flex;
  align-items: center;

  @include media-tablet {
    flex-wrap: wrap;
    justify-content: center;
  }
}

.picture {
  width: 60px;
  height: 60px;
  margin-left: 24px;
  border-radius: 50%;
  object-fit: cover;
}

.word {
  margin-left: 26px;

  @include media-tablet {
    flex-basis: 100%;
    text-align: center;
  }

  &_english {
    color: $color-dodger-blue;

    @include font($size: 18px, $height: 22px, $weight: bold);
  }

  &_transcription {
    font-size: 1.5rem;
    font-weight: 700;
    color: $color-manatee;

    @include media-tablet {
      flex-basis: 100%;
      margin-left: 24px;
      font-size: 1rem;
      text-align: center;
    }
  }
}

.custom-checkbox.b-custom-control-lg,
.input-group-lg .custom-checkbox {
  @include media-tablet {
    position: absolute;
    top: 16px;
    left: 16px;
  }
}

.text {
  color: $color-dodger-blue;
  text-align: center;

  @include media-tablet {
    flex-basis: 100%;
    text-align: center;
  }

  @include font($size: 16px, $height: 16px, $weight: 500);
}

.text-translate {
  color: $color-manatee;
  text-align: center;

  @include font($size: 14px, $height: 16px, $weight: 500);
}

@media (hover: hover) {
  .icon__speak-it:hover {
    color: $color-cornflower-blue;
  }

  .icon__bucket:hover {
    color: $color-wild-watermelon;
  }

  .icon__backup:hover {
    color: $color-dodger-blue;
  }

  .icon__do-you-know:hover {
    color: $color-golden-dream;
  }
}
</style>
