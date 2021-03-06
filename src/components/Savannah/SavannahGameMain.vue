<template>
  <div class="game__main">
    <div class="game__image" :style="[{ backgroundImage, backgroundPositionY }]"></div>
    <div class="game__words" v-if="!isGameEnd">
      <div
        class="question"
        :class="[{ question_correct: isCheck && isCorrect }]"
        :key="words[wordNumber].word"
        @animationend="onAnimationEnd"
      >
        {{ isModeEnRu ? words[wordNumber].word : words[wordNumber].wordTranslate }}
      </div>
      <div class="attempt-words">
        <span class="attempt-words__word" v-for="(item, i) in wordsArray[wordNumber]" :key="i">
          <button
            class="answer"
            :class="[
              { answer_correct: item && isCheck && item.word === words[wordNumber].word },
              { answer_incorrect: item && isCheck && item.word !== words[wordNumber].word },
            ]"
            :disabled="isCheck"
            @click="checkAnswer(i)"
          >
            {{ i + 1 }}. {{ isModeEnRu ? item && item.wordTranslate : item && item.word }}
          </button>
        </span>
      </div>
      <b-progress height="16px" :max="wordsLength" class="game__progress-bar mb-3">
        <b-progress-bar
          height="16px"
          show-value
          variant="success"
          :value="correctAnswersCount"
        ></b-progress-bar>
        <b-progress-bar
          height="16px"
          show-value
          variant="danger"
          :value="incorrectAnswersCount"
        ></b-progress-bar>
      </b-progress>
    </div>
    <SavannahStatistic v-else />
    <IconBase iconName="Savannah sun" :width="sunSize" :height="sunSize" viewBox="0 0 220 220">
      <IconSun />
    </IconBase>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import IconBase from '@/components/IconBase.vue';
import IconSun from '@/components/icons/IconSun.vue';
import SavannahStatistic from '@/components/Savannah/SavannahStatistic.vue';
import { correctSound, errorSound, keys } from '@/helpers/constants.helper';

export default {
  name: 'SavannahGameMain',
  components: {
    IconBase,
    IconSun,
    SavannahStatistic,
  },
  data() {
    return {
      isCheck: false,
      isCorrect: false,
    };
  },
  computed: {
    ...mapState('Savannah', [
      'wordNumber',
      'wordsArray',
      'words',
      'isGameEnd',
      'statsArray',
      'lives',
      'lost',
      'isSound',
      'wallpaperSrc',
      'isModeEnRu',
    ]),
    wordsLength() {
      return this.words.length;
    },
    correctAnswersCount() {
      return this.statsArray.filter((item) => item.correct).length || 0;
    },
    incorrectAnswersCount() {
      return this.statsArray.filter((item) => !item.correct).length || 0;
    },
    backgroundStep() {
      return 100 / this.wordsLength;
    },
    backgroundPositionY() {
      return `${100 - this.correctAnswersCount * this.backgroundStep}%`;
    },
    backgroundImage() {
      return `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${this.wallpaperSrc}')`;
    },
    sunStep() {
      return 200 / this.wordsLength;
    },
    sunSize() {
      return `${50 + this.correctAnswersCount * this.sunStep}px`;
    },
  },
  created() {
    window.addEventListener('keydown', this.onKeyDown);
  },
  destroyed() {
    window.removeEventListener('keydown', this.onKeyDown);
  },
  methods: {
    ...mapMutations('Savannah', [
      'setWordNumber',
      'setStatsArray',
      'setLost',
      'setLives',
      'setIsGameEnd',
    ]),
    ...mapActions('Learning', ['changeDateUserWord']),

    checkAnswer(index) {
      const question = this.words[this.wordNumber].word;
      const answer = this.wordsArray[this.wordNumber][index].word;
      if (answer === question) {
        this.onCorrectAnswer();
      } else {
        this.onIncorrectAnswer();
      }
    },
    onCorrectAnswer() {
      const nextDate = Date.now() + 24 * 60 * 60 * 1000;
      this.changeDateUserWord({ word: this.words[this.wordNumber], nextDate });
      this.onPlaySound(correctSound);
      this.setStatsArray([...this.statsArray, { ...this.words[this.wordNumber], correct: true }]);
      this.isCheck = true;
      this.isCorrect = true;
      setTimeout(() => {
        this.isCorrect = false;
        this.isCheck = false;
        this.onCheckGameOver();
      }, 1500);
    },
    onIncorrectAnswer() {
      const nextDate = Date.now() + 22 * 60 * 60 * 1000;
      this.changeDateUserWord({ word: this.words[this.wordNumber], nextDate });
      this.onPlaySound(errorSound);
      this.setStatsArray([...this.statsArray, { ...this.words[this.wordNumber], correct: false }]);
      this.setLost([...this.lost, this.lives.pop()]);
      this.setLives(this.lives);
      this.isCheck = true;
      setTimeout(() => {
        this.isCheck = false;
        this.onCheckGameOver();
      }, 1500);
    },
    onCheckGameOver() {
      if (this.lives.length === 0 || this.wordNumber === this.wordsLength - 1) {
        this.setIsGameEnd(true);
      } else {
        this.setWordNumber(this.wordNumber + 1);
      }
    },
    onAnimationEnd() {
      if (!this.isCheck) {
        this.onIncorrectAnswer();
      }
    },
    onPlaySound(src) {
      if (this.isSound) {
        const audio = new Audio(src);
        audio.play();
      }
    },
    onKeyDown(event) {
      if (!event.repeat && !this.isCheck && !this.isGameEnd) {
        switch (event.key) {
          case keys.one:
            this.checkAnswer(0);
            break;
          case keys.two:
            this.checkAnswer(1);
            break;
          case keys.three:
            this.checkAnswer(2);
            break;
          case keys.four:
            this.checkAnswer(3);
            break;
          default:
            break;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.game__image {
  position: absolute;
  top: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position-x: left;
  background-position-y: 100%;
  transition: background 1.5s;
}

.game__main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: calc(100% - 80px);
  padding: 20px;
}

.game__words {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.attempt-words {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 40px 0;
}

.attempt-words__word {
  margin-bottom: 20px;
  word-break: break-all;
}

.attempt-words__word + .attempt-words__word {
  margin-left: 10px;
}

.answer {
  padding: 5px 10px;
  font-size: 20px;
  color: $color-white;
  background-color: transparent;
  border: 1px solid transparent;
  border-radius: 10px;
  outline: none;
  transition: border-color 0.4s, background-color 0.4s;

  &_correct {
    background-color: $color-apple;
  }

  &_incorrect {
    background-color: $color-chestnut;
  }
}

.question {
  position: absolute;
  top: 0;
  z-index: 5;
  font-size: 20px;
  transition: width 0.3s;
  animation: fall 5s linear;

  &_correct {
    animation: fallEnd 1s linear;
  }
}

.game__progress-bar {
  width: 100%;
  max-width: 320px;
  margin-top: 40px;
}

@keyframes fall {
  from {
    transform: translateY(-100%);
  }

  to {
    transform: translateY(1000%);
  }
}

@keyframes fallEnd {
  to {
    transform: translateY(2500%);
  }
}

@media (hover: hover) {
  .answer:hover {
    border-color: $color-ghost;
  }
}

@media screen and (max-width: $mobile-big-width) {
  .game__main {
    height: calc(100% - 114px);
  }
}
</style>
