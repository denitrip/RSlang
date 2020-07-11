<template>
  <div class="learning-wrapper">
    <form
      class="learning-card"
      @submit.prevent="submitCard"
      :class="[{ 'learning-card_error': isError }, { 'learning-card_correct': isCorrect }]"
    >
      <img :src="`${dataSrc}${word.image}`" class="img" v-if="settings.isAssociationVisible" />
      <div class="word-with-speak-it" v-if="isCompleteState">
        <div class="word word_english">{{ word.word }}</div>
        <span
          @click="onPlaySound"
          class="icon icon__speak-it "
          :class="{ 'icon__speak-it_played': isAudioPlay }"
        >
          <IconBase width="22" height="20" viewBox="0 0 18 16">
            <IconSmallSpeakIt />
          </IconBase>
        </span>
      </div>
      <div
        class="word word_transcription"
        v-if="isCompleteState && settings.isTranscriptionVisible"
      >
        {{ word.transcription }}
      </div>
      <div class="word word_russian" v-if="settings.isWordVisible">{{ word.wordTranslate }}</div>
      <div class="text-meaning" v-if="isCompleteState && settings.isMeaningVisible">
        {{ word.textMeaning | deleteItalic }}
      </div>
      <div class="text-meaning" v-else-if="settings.isMeaningVisible">
        {{ word.textMeaning | deleteWord }}
      </div>
      <div
        class="text-translate"
        v-if="isCompleteState && settings.isMeaningVisible && isTranslate"
      >
        {{ word.textMeaningTranslate }}
      </div>
      <div class="text-example" v-if="isCompleteState && settings.isExampleVisible">
        {{ word.textExample | deleteBold }}
      </div>
      <div class="text-example" v-else-if="settings.isExampleVisible">
        {{ word.textExample | deleteWord }}
      </div>
      <div
        class="text-translate"
        v-if="isCompleteState && settings.isExampleVisible && isTranslate"
      >
        {{ word.textExampleTranslate }}
      </div>
      <div class="text">
        <input
          type="text"
          class="text-input"
          :class="[{ 'text-input_error': isError }, { 'text-input_correct': isCorrect }]"
          :style="[{ width: `${word.word.length * 18}px` }]"
          v-model="answer"
          v-focus
        />
        <div
          class="text-error"
          :style="[{ width: `${word.word.length * 18}px` }]"
          v-html="charsError"
          v-if="isError"
          @click="hideError"
        ></div>
      </div>
      <button type="submit" class="button" :disabled="isWordLoading" v-if="isCompleteState">
        Next
        <AppSpinner v-if="isWordLoading"></AppSpinner>
        <span class="btn-arrow" v-else></span>
      </button>
      <button type="submit" class="button" v-else :disabled="!answer">
        Check
        <span class="btn-arrow"></span>
      </button>
      <div class="show-answer" @click="showAnswer" v-if="settings.isShowAnswerVisible">
        Show answer
      </div>
    </form>
    <transition name="fade" mode="out-in">
      <div class="buttons-wrapper" v-if="isCompleteState">
        <button
          class="learning__button learning__button_easy"
          v-if="settings.isEasyVisible"
          :disabled="isWordLoading"
          @click="onEasyClick"
        >
          Easy
        </button>
        <button
          class="learning__button learning__button_good"
          v-if="settings.isGoodVisible"
          :disabled="isWordLoading"
          @click="onGoodClick"
        >
          Good
        </button>
        <button
          class="learning__button learning__button_repeat"
          v-if="settings.isRepeatVisible"
          :disabled="isWordLoading"
          @click="onRepeatClick"
        >
          Repeat
        </button>
        <button
          class="learning__button learning__button_difficult"
          v-if="settings.isDifficultVisible"
          @click="controlsNextCard(wordGroups.difficult)"
          :disabled="isWordLoading"
        >
          Difficult
        </button>
        <button
          class="learning__button learning__button_delete"
          v-if="settings.isDeleteVisible"
          @click="controlsNextCard(wordGroups.deleted)"
          :disabled="isWordLoading"
        >
          Delete
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
import AppSpinner from '@/components/AppSpinner.vue';
import IconBase from '@/components/IconBase.vue';
import IconSmallSpeakIt from '@/components/icons/IconSmallSpeakIt.vue';
import { mapState, mapActions, mapMutations } from 'vuex';
import { wordGroups, dataSrc } from '@/helpers/constants.helper';

export default {
  name: 'LearningCard',
  components: {
    IconBase,
    IconSmallSpeakIt,
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
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
  },
  data() {
    return {
      wordGroups,
      isWordLoading: false,
      isAudioPlay: false,
      isError: false,
      isCorrect: false,
      isErrorAnswer: false,
      answer: '',
      dataSrc,
      charsError: null,
    };
  },
  computed: {
    ...mapState('Learning', [
      'index',
      'words',
      'isStartState',
      'isCompleteState',
      'todayLearnedNewWord',
      'learnedWordsCount',
      'isTranslate',
      'isNewWords',
      'isDifficultWords',
      'isLearnedWords',
    ]),
    ...mapState('Settings', ['settings']),
    ...mapState('Statistic', [
      'cardsCount',
      'correctAnswer',
      'newWords',
      'series',
      'longestSeries',
    ]),
  },
  methods: {
    ...mapMutations('Learning', [
      'setIndex',
      'setStartState',
      'setCompleteState',
      'setTodayLearnedNewWord',
      'setLearnedWordsCount',
      'setIsMainPage',
      'setWords',
    ]),
    ...mapActions('Learning', ['createUserWord', 'learnUserWord']),
    ...mapActions('Error', ['setError']),
    ...mapActions('Statistic', ['updateStatistic']),
    ...mapMutations('Statistic', [
      'setIsShortTermStatisticShow',
      'setCardsCount',
      'setCorrectAnswer',
      'setNewWords',
      'setSeries',
      'setLongestSeries',
    ]),

    submitCard() {
      if (this.isCompleteState && !!this.answer) {
        this.nextCard();
      } else if (this.isStartState && !!this.answer) {
        this.checkCard();
      }
    },
    getDayTimestamp(n) {
      return Date.now() + n * 60 * 60 * 1000;
    },
    nextDateRepeat() {
      const twoHours = 2;
      return this.getDayTimestamp(twoHours);
    },
    nextDateNorm() {
      const oneDay = 24;
      return this.getDayTimestamp(oneDay);
    },
    nextDateGood() {
      const twoDays = 48;
      return this.getDayTimestamp(twoDays);
    },
    nextDateEasy() {
      const fiveDays = 120;
      return this.getDayTimestamp(fiveDays);
    },
    nextCard() {
      if (this.isNewWords) {
        this.nextNewWord(wordGroups.learned, this.nextDateNorm());
      } else if (this.isDifficultWords) {
        this.nextWord(wordGroups.difficult, this.nextDateNorm());
      } else if (this.isLearnedWords) {
        this.nextWord(wordGroups.learned, this.nextDateNorm());
      }
    },
    controlsNextCard(difficulty, nextDate = this.nextDateNorm()) {
      if (this.isNewWords) {
        this.nextNewWord(difficulty, nextDate);
      } else {
        this.nextWord(difficulty, nextDate);
      }
    },
    async nextNewWord(difficulty, nextDate) {
      this.isWordLoading = true;
      try {
        await this.createUserWord({
          difficulty,
          word: this.words[this.index],
          nextDate,
        });
        await this.updateStatistic();
      } catch (error) {
        this.setError(error.message);
      } finally {
        this.setNewWords(this.newWords + 1);
        this.nextRound();
        this.setLearnedWordsCount(this.learnedWordsCount + 1);
        this.setTodayLearnedNewWord(this.todayLearnedNewWord + 1);
      }
    },
    async nextWord(difficulty, nextDate) {
      this.isWordLoading = true;
      try {
        await this.learnUserWord({
          difficulty,
          word: this.words[this.index],
          nextDate,
        });
        await this.updateStatistic();
      } catch (error) {
        this.setError(error.message);
      } finally {
        this.nextRound();
      }
    },
    onGoodClick() {
      this.controlsNextCard(wordGroups.learned, this.nextDateGood());
    },
    onEasyClick() {
      this.controlsNextCard(wordGroups.learned, this.nextDateEasy());
    },
    onRepeatClick() {
      this.repeatWord();
      this.controlsNextCard(wordGroups.learned, this.nextDateRepeat());
    },
    repeatWord() {
      const newWordsArray = [...this.words];
      newWordsArray.push(this.word);
      this.setWords(newWordsArray);
    },
    checkCard() {
      if (this.answer.toLowerCase() === this.word.word.toLowerCase()) {
        this.isCorrect = true;
        this.setCompleteState();
        this.onPlayWord();
      } else {
        this.isError = true;
        this.isErrorAnswer = true;
        this.repaintWord();
        this.repeatWord();
      }
    },
    recordStatistic() {
      this.setCardsCount(this.cardsCount + 1);
      if (this.isErrorAnswer) {
        this.setSeries(0);
      } else {
        this.setCorrectAnswer(this.correctAnswer + 1);
        this.setSeries(this.series + 1);
        if (this.series >= this.longestSeries) {
          this.setLongestSeries(this.series);
        }
      }
    },
    showAnswer() {
      this.answer = this.word.word;
      this.checkCard();
    },
    repaintWord() {
      const result = [];
      // eslint-disable-next-line no-restricted-syntax
      for (let i = 0; i < this.answer.length; i += 1) {
        if (this.answer[i].toLowerCase() === this.word.word[i].toLowerCase()) {
          result.push(`<span style="color: #53b54a">${this.answer[i]}</span>`);
        } else {
          result.push(`<span style="color: #ff5267">${this.answer[i]}</span>`);
        }
      }
      this.charsError = result.join('');
    },
    hideError() {
      this.isError = false;
      this.charsError = null;
    },
    nextRound() {
      this.recordStatistic();
      if (this.index !== this.words.length - 1) {
        this.setIndex(this.index + 1);
      } else {
        this.setIsShortTermStatisticShow(true);
        this.setIsMainPage(true);
      }
      this.resetGame();
    },
    resetGame() {
      this.setStartState();
      this.isCorrect = false;
      this.isError = false;
      this.isErrorAnswer = false;
      this.isWordLoading = false;
      this.answer = '';
    },
    onPlaySound() {
      this.isAudioPlay = true;
      const audio = new Audio(`${dataSrc}${this.word.audio}`);
      audio.onended = () => {
        this.isAudioPlay = false;
      };
      audio.play();
    },
    onPlayWord() {
      if (this.settings.isAutoVoice) {
        const audio = new Audio(`${dataSrc}${this.word.audio}`);
        audio.onended = () => {
          if (this.settings.isMeaningVisible) {
            this.onPlayTextMeaning();
          } else if (this.settings.isExampleVisible) {
            this.onPlayTextExample();
          }
        };
        audio.play();
      }
    },
    onPlayTextMeaning() {
      const audio = new Audio(`${dataSrc}${this.word.audioMeaning}`);
      audio.onended = () => {
        if (this.settings.isExampleVisible) {
          this.onPlayTextExample();
        }
      };
      audio.play();
    },
    onPlayTextExample() {
      const audio = new Audio(`${dataSrc}${this.word.audioExample}`);
      audio.play();
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
  padding: 40px;
  background-color: white;
  border-radius: 25px;
  box-shadow: 0 0 20px $box-shadow-one-color;
  transition: box-shadow 0.3s;

  &_error {
    box-shadow: 0 0 20px $color-wild-watermelon;
  }

  &_correct {
    box-shadow: 0 0 20px $color-apple;
  }
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
  margin: 8px 0;
}

.word {
  @include font($size: 24px, $height: 20px, $weight: normal);

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
    line-height: 1;
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

.text {
  position: relative;
}

.text-input,
.text-error {
  margin-top: 16px;
  font-family: 'Roboto Mono', monospace;
  font-size: 30px;
  border: none;
  border-bottom: 2px solid $color-dodger-blue;
  outline: none;
  transition: color 0.3s;
}

.text-error {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 16px);
  user-select: none;
  background-color: $color-white;
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

.buttons-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 14px;
}

.learning__button {
  justify-content: center;
  max-width: 100px;
  padding: 17px;
}

.button {
  justify-content: space-between;
  max-width: 221px;
  padding: 17px;
}

.button,
.learning__button {
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 10px;
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

  &_delete {
    background-color: $color-wild-watermelon;

    &:hover {
      background: $color-geraldine radial-gradient(circle, transparent 1%, $color-geraldine 1%)
        center/15000%;
    }

    &:active {
      background-color: $color-sundown;
    }
  }

  &_good,
  &_easy,
  &_repeat {
    background-color: $color-shuttle-gray;

    &:hover {
      background: $color-manatee radial-gradient(circle, transparent 1%, $color-manatee 1%)
        center/15000%;
    }

    &:active {
      background-color: $color-ghost;
    }
  }

  &_difficult {
    color: $color-black;
    background-color: $color-golden-dream;

    &:hover {
      background: $color-portica radial-gradient(circle, transparent 1%, $color-portica 1%)
        center/15000%;
    }

    &:active {
      background-color: $color-texas;
    }
  }
}

.learning__button:not(:first-child) {
  margin-left: 10px;
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

@media screen and (max-width: $mobile-big-width) {
  .buttons-wrapper {
    flex-direction: column;
  }

  .learning__button {
    max-width: 100%;

    &:not(:first-child) {
      margin-top: 10px;
      margin-left: 0;
    }
  }
}
</style>
