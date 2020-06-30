<template>
  <div class="learning-card">
    <img :src="`${dataSrc}${word.image}`" class="img" />
    <div class="word-with-speak-it" v-if="isResualtCard">
      <div class="word word_english">{{ word.word }}</div>
      <span
        @click="onPlayAudio"
        class="icon icon__speak-it "
        :class="{ 'icon__speak-it_played': isAudioPlay }"
      >
        <IconBase width="18" height="16" viewBox="0 0 18 16">
          <IconSmallSpeakIt />
        </IconBase>
      </span>
    </div>
    <div class="word word_transcription" v-if="isResualtCard">{{ word.transcription }}</div>
    <div class="word word_russian">{{ word.wordTranslate }}</div>
    <div class="text-meaning" v-if="isResualtCard">{{ word.textMeaning | deleteItalic }}</div>
    <div class="text-meaning" v-else>{{ word.textMeaning | deleteWord }}</div>
    <div class="text-translate" v-if="isResualtCard">{{ word.textMeaningTranslate }}</div>
    <div class="text-example" v-if="isResualtCard">{{ word.textExample | deleteBold }}</div>
    <div class="text-example" v-else>{{ word.textExample | deleteWord }}</div>
    <div class="text-translate" v-if="isResualtCard">{{ word.textExampleTranslate }}</div>
    <input
      type="text"
      class="text-input"
      ref="userWord"
      :value="word.word"
      @keyup.enter="checkWord"
      autofocus
    />
    <button type="submit" class="button-next" @click="nextIndex" :disabled="isWordCreating">
      Next
      <AppSpinner v-if="isWordCreating"></AppSpinner>
      <span class="btn-arrow" v-else></span>
    </button>
    <div class="show-answer" @click="nextIndex" :disabled="isWordCreating">Show answer</div>
    <Notification v-if="isNotificationShow" />
  </div>
</template>

<script>
import AppSpinner from '@/components/AppSpinner.vue';
import IconBase from '@/components/IconBase.vue';
import IconSmallSpeakIt from '@/components/icons/IconSmallSpeakIt.vue';
import { mapState, mapActions, mapMutations } from 'vuex';
import { wordGroups, dataSrc } from '@/helpers/constants.helper';
import Notification from '@/components/Notification.vue';

export default {
  name: 'DictionaryCard',
  components: {
    IconBase,
    IconSmallSpeakIt,
    AppSpinner,
    Notification,
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
  data() {
    return {
      isSpeakItSelected: true,
      isWordCreating: false,
      isResualtCard: true,
      isAudioPlay: false,
      dataSrc,
    };
  },
  filters: {
    deleteBold(str) {
      return str.replace(/<b>|<\/b>/g, '');
    },
    deleteItalic(str) {
      return str.replace(/<i>|<\/i>/g, '');
    },
    deleteWord(str) {
      const start = str.indexOf('<');
      const finish = str.lastIndexOf('>') + 1;
      return `${str.slice(0, start)}[...]${str.slice(finish)}`;
    },
  },
  computed: {
    ...mapState('Learning', ['index', 'words']),
    ...mapState('Settings', ['settings']),
    ...mapState('Notification', ['isNotificationShow']),
  },
  methods: {
    ...mapMutations('Learning', ['setIndex']),
    ...mapActions('Learning', ['createUserWord']),
    ...mapActions('Error', ['setError']),
    ...mapMutations('Notification', ['setIsNotificationShow']),

    showNotification() {
      this.setIsNotificationShow(true);
    },
    changeSpeakItStatus() {
      this.isSpeakItSelected = !this.isSpeakItSelected;
    },
    async nextIndex() {
      if (this.index < this.settings.wordsPerDay) {
        this.isWordCreating = true;
        try {
          await this.createUserWord({
            difficulty: wordGroups.learned,
            word: this.words[this.index],
          });
        } catch (error) {
          this.setError(error.message);
        } finally {
          this.setIndex(this.index + 1);
          this.isWordCreating = false;
        }
      } else {
        this.showNotification();
      }
    },
    onPlayAudio() {
      this.isAudioPlay = true;
      const audio = new Audio(`${dataSrc}${this.word.audio}`);
      audio.onended = () => {
        this.isAudioPlay = false;
      };
      audio.play();
    },
    checkWord() {
      // continue in the next issue
      const userWord = this.$refs.userWord.value;
      if (userWord === this.englishWord) {
        console.log(true);
      } else {
        console.log(false);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.learning-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
  padding: 40px 10px;
  background-color: white;
  border-radius: 25px;
}

.img {
  width: 100%;
  max-width: 300px;
  height: 100%;
  max-height: 200px;
  border-radius: 20px;
}

.word-with-speak-it {
  display: flex;
  align-items: center;
  justify-content: center;
}

.word {
  @include font($size: 24px, $height: 20px, $weight: normal);

  margin-top: 8px;

  &_english {
    color: $color-dodger-blue;

    @include font($size: 24px, $height: 20px, $weight: 500);
  }

  &_transcription {
    color: $color-manatee;
  }
}

.icon {
  color: $color-ghost;
  transition: color 0.3s;

  &__speak-it {
    margin-left: 10px;
    cursor: pointer;

    &_played {
      color: $color-dodger-blue;
    }
  }
}

.text-meaning {
  margin-top: 16px;
  text-align: center;

  @include font($size: 16px, $height: 20px, $weight: normal);

  @include media-mobile {
    margin-top: 8px;
  }
}

.text-example {
  margin-top: 16px;
  color: $color-dodger-blue;
  text-align: center;

  @include font($size: 18px, $height: 21px, $weight: 500);

  @include media-mobile {
    margin-top: 8px;
  }
}

.text-translate {
  color: $color-manatee;
  text-align: center;

  @include font($size: 14px, $height: 20px, $weight: 500);
}

.text-input {
  width: 100%;
  font-family: 'Roboto Mono', monospace;
  font-size: 30px;
  border: none;
  border-bottom: 2px solid $color-dodger-blue;
  outline: none;
}

.show-answer {
  margin-top: 24px;
  color: $color-dodger-blue;
  cursor: pointer;
  text-decoration-line: underline;

  @include font($size: 16px, $height: 20px, $weight: 600);

  @include media-mobile {
    margin-top: 18px;
  }
}

.button-next {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 221px;
  padding: 17px;
  margin-top: 24px;
  color: $color-white;
  cursor: pointer;
  background: $color-dodger-blue;
  border: none;
  border-radius: 20px;
  outline: none;
  transition: background-color 0.3s;

  @include font($size: 14px, $height: 16px, $weight: normal);

  &:hover {
    background: $color-cornflower-blue
      radial-gradient(circle, transparent 1%, $color-cornflower-blue 1%) center/15000%;
  }

  &:active {
    background-color: $color-malibu;
    background-size: 100%;
    transition: background 0s;
  }

  &:disabled {
    pointer-events: none;
    cursor: default;
    opacity: 0.4;
  }
}

.btn-arrow {
  width: 18px;
  height: 24px;
  background-image: url('~@/assets/img/btn-arrow.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 13px 10px;
}

@media (hover: hover) {
  .icon__speak-it:hover {
    color: $color-dodger-blue;
  }
}
</style>
