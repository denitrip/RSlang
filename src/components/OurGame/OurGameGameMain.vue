<template>
  <div class="game__main">
    <div class="game__image"></div>
    <div class="game__words" v-if="!isGameEnd">
      <div class="question__word">
        {{ words[wordNumber].word }}
      </div>
      <p class="question__text-example">{{ words[wordNumber].textExample | deleteBold }}</p>
      <p
        class="score__change"
        :class="[{ score__change_correct: isCorrect }, { score__change_incorrect: isIncorrect }]"
      >
        {{ changeScoreValue }}
      </p>
      <div class="attempt-words">
        <div class="loading" v-if="isStartLoading">
          <h2>Level: {{ group + 1 }}</h2>
          <AppSpinner size="lds-spinner_large" colorName="color-dodger-blue" />
        </div>
        <span
          class="attempt-words__word"
          v-for="(item, i) in wordsArray[wordNumber]"
          :key="i"
          :class="[{ 'attempt-words__word_disabled': isStartLoading }]"
        >
          <img
            class="answer"
            :class="[
              { answer_correct: item && isCheck && item.word === words[wordNumber].word },
              { answer_incorrect: item && isCheck && item.word !== words[wordNumber].word },
            ]"
            :src="`${dataSrc}${item.image}`"
            :alt="words[wordNumber].word"
            @click="checkAnswer(i)"
          />
        </span>
      </div>
      <b-progress height="16px" :max="statsArrayLength" class="game__progress-bar">
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
    <OurGameStatistic v-else />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import OurGameStatistic from '@/components/OurGame/OurGameStatistic.vue';
import { correctSound, errorSound, keys, dataSrc } from '@/helpers/constants.helper';
import getRandomWordsArray from '@/helpers/arrays.helper';
import AppSpinner from '@/components/AppSpinner.vue';

export default {
  name: 'OurGameGameMain',
  components: {
    OurGameStatistic,
    AppSpinner,
  },
  data() {
    return {
      isCheck: false,
      isCorrect: false,
      isIncorrect: false,
      isStartLoading: false,
      changeScoreValue: '+10',
      dataSrc,
    };
  },
  computed: {
    ...mapState('OurGame', [
      'wordNumber',
      'wordsArray',
      'words',
      'isGameEnd',
      'statsArray',
      'lives',
      'lost',
      'isSound',
      'group',
      'score',
      'correctAnswerCountInGroup',
    ]),
    wordsLength() {
      return this.words.length;
    },
    statsArrayLength() {
      return this.statsArray.length;
    },
    correctAnswersCount() {
      return this.statsArray.filter((item) => item.correct).length || 0;
    },
    incorrectAnswersCount() {
      return this.statsArray.filter((item) => !item.correct).length || 0;
    },
  },
  created() {
    window.addEventListener('keydown', this.onKeyDown);
  },
  destroyed() {
    window.removeEventListener('keydown', this.onKeyDown);
  },
  methods: {
    ...mapMutations('OurGame', [
      'setWordNumber',
      'setStatsArray',
      'setLost',
      'setLives',
      'setIsGameEnd',
      'setGroup',
      'setScore',
      'setCorrectAnswerCountInGroup',
      'setWords',
    ]),
    ...mapActions('Error', ['setError']),
    ...mapActions('OurGame', ['startGame', 'getWordsByGroup', 'saveStats']),

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
      this.onPlaySound(correctSound);
      this.setStatsArray([...this.statsArray, { ...this.words[this.wordNumber], correct: true }]);
      this.isCheck = true;
      this.isCorrect = true;
      this.calculateScore();
      this.setCorrectAnswerCountInGroup(this.correctAnswerCountInGroup + 1);
      setTimeout(() => {
        this.isCorrect = false;
        this.onCheckGameOver();
      }, 1500);
    },
    onIncorrectAnswer() {
      this.onPlaySound(errorSound);
      this.setStatsArray([...this.statsArray, { ...this.words[this.wordNumber], correct: false }]);
      this.setLost([...this.lost, this.lives.pop()]);
      this.setLives(this.lives);
      this.isCheck = true;
      this.isIncorrect = true;
      this.minusScore();
      setTimeout(() => {
        this.isIncorrect = false;
        this.onCheckGameOver();
      }, 1500);
    },
    calculateScore() {
      const answerValue = 10;
      const levelCoefficient = this.group * answerValue;
      const scoreValue = answerValue + levelCoefficient;
      this.changeScoreValue = `+${scoreValue}`;
      this.setScore(this.score + scoreValue);
    },
    minusScore() {
      const scoreValue = -5;
      this.changeScoreValue = scoreValue;
      this.setScore(this.score + scoreValue);
    },
    onCheckGameOver() {
      const maxGroupCount = 5;
      const maxCorrectAnswer = 10;
      if (this.lives.length === 0 || this.wordNumber === this.wordsLength - 1) {
        this.gameOver();
      } else if (this.correctAnswerCountInGroup >= maxCorrectAnswer && this.group < maxGroupCount) {
        this.levelUp();
      } else {
        this.isCheck = false;
        this.setWordNumber(this.wordNumber + 1);
      }
    },
    async gameOver() {
      try {
        await this.saveStats();
        this.setIsGameEnd(true);
      } catch (error) {
        this.setError(error.message);
      }
    },
    async levelUp() {
      this.setGroup(this.group + 1);
      this.setCorrectAnswerCountInGroup(0);
      this.isStartLoading = true;
      try {
        const wordsCount = 15;
        const allWordsArray = await this.getWordsByGroup();
        const words = getRandomWordsArray(allWordsArray, wordsCount);
        this.setWords(words);
        await this.startGame();
        this.setWordNumber(0);
      } catch (error) {
        this.setError(error.message);
      } finally {
        this.isCheck = false;
        this.isStartLoading = false;
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
      if (!event.repeat) {
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
  background-image: linear-gradient($overlay-color, $overlay-color),
    url('~@/assets/img/ourGame/start-screen.jpg');
  background-repeat: no-repeat;
  background-size: cover;
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

.question__word {
  font-size: 40px;
  text-shadow: 3px 3px 2px $color-black;
}

.question__text-example {
  font-size: 20px;
  text-align: center;
  text-shadow: 3px 3px 2px $color-black;
}

.score__change {
  font-size: 30px;
  text-align: center;
  text-shadow: 3px 3px 2px $color-black;
  opacity: 0;

  &_correct {
    color: $color-apple;
    animation: emersion 2s linear;
  }

  &_incorrect {
    color: $color-red-orange;
    animation: emersion 2s linear;
  }
}

.attempt-words {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 40px 0;
  transition: opacity 0.3s;
}

.attempt-words__word {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  &_disabled {
    pointer-events: none;
    cursor: default;
    opacity: 0.5;
  }
}

.attempt-words__word + .attempt-words__word {
  margin-left: 20px;
}

.answer {
  width: 250px;
  height: 200px;
  object-fit: cover;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 10px;
  box-shadow: 0 0 15px $overlay-color;
  transition: border-color 0.4s;

  &_correct,
  &_incorrect {
    pointer-events: none;
    cursor: default;
  }

  &_correct {
    box-shadow: 0 0 15px $color-apple;
  }

  &_incorrect {
    box-shadow: 0 0 15px $color-chestnut;
  }
}

.game__progress-bar {
  width: 100%;
  max-width: 320px;
  overflow: visible;
  font-size: 16px;
  line-height: 1;
}

.loading {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

@keyframes emersion {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
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

@media screen and (max-width: $learning-tablet-size) {
  .attempt-words__word {
    width: 50%;
  }

  .attempt-words__word + .attempt-words__word {
    margin-left: 0;
  }
}

@media screen and (max-width: $puzzle-mobile-size) {
  .attempt-words__word {
    width: 100%;
  }
}
</style>
