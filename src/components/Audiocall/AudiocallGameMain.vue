<template>
  <div class="game__main">
    <div class="game__background"></div>
    <div class="game__words" v-if="!isGameEnd">
      <img class="game__image" :src="getImageSrc" :alt="words[wordNumber].word" v-if="isCheck" />
      <div class="question-wrapper">
        <div
          class="question"
          :class="[{ question_playing: isAudioPlay }, { question_check: isCheck }]"
          title="Play sound"
          @click="onPlayQuestion"
        >
          <IconBase
            iconName="Play sound"
            :width="isCheck ? '30px' : '120px'"
            :height="isCheck ? '24px' : '96px'"
          >
            <IconVolume />
          </IconBase>
        </div>
        <p class="game__word-text" v-if="isCheck">{{ words[wordNumber].word }}</p>
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
            {{ i + 1 }}. {{ item && item.wordTranslate }}
          </button>
        </span>
      </div>
      <div class="game__controls">
        <button class="controls__button" v-if="isCheck" title="Next" @click="onCheckGameOver">
          <span class="btn-arrow"></span>
        </button>
        <button class="controls__button" v-else @click="onIncorrectAnswer">Don't know</button>
      </div>
    </div>
    <AudiocallStatistic v-else />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import AudiocallStatistic from '@/components/Audiocall/AudiocallStatistic.vue';
import { dataSrc, correctSound, errorSound, keys } from '@/helpers/constants.helper';
import IconBase from '@/components/IconBase.vue';
import IconVolume from '@/components/icons/IconVolume.vue';

export default {
  name: 'AudiocallGameMain',
  components: {
    AudiocallStatistic,
    IconBase,
    IconVolume,
  },
  data() {
    return {
      isCheck: false,
      isAudioPlay: false,
    };
  },
  computed: {
    ...mapState('Audiocall', [
      'wordNumber',
      'wordsArray',
      'words',
      'isGameEnd',
      'statsArray',
      'isSound',
    ]),
    wordsLength() {
      return this.words.length;
    },
    getImageSrc() {
      return `${dataSrc}${this.words[this.wordNumber].image}`;
    },
  },
  created() {
    this.onPlayQuestion();
    window.addEventListener('keydown', this.onKeyDown);
  },
  destroyed() {
    window.removeEventListener('keydown', this.onKeyDown);
  },
  methods: {
    ...mapMutations('Audiocall', ['setWordNumber', 'setStatsArray', 'setIsGameEnd']),

    checkAnswer(index) {
      const question = this.words[this.wordNumber].word;
      const answer = this.wordsArray[this.wordNumber][index].word;
      if (answer === question) {
        this.onPlaySound(correctSound);
        this.onCorrectAnswer();
      } else {
        this.onPlaySound(errorSound);
        this.onIncorrectAnswer();
      }
    },
    onCorrectAnswer() {
      this.setStatsArray([...this.statsArray, { ...this.words[this.wordNumber], correct: true }]);
      this.isCheck = true;
    },
    onIncorrectAnswer() {
      this.setStatsArray([...this.statsArray, { ...this.words[this.wordNumber], correct: false }]);
      this.isCheck = true;
    },
    onCheckGameOver() {
      this.isCheck = false;
      if (this.wordNumber === this.wordsLength - 1) {
        this.setIsGameEnd(true);
      } else {
        this.setWordNumber(this.wordNumber + 1);
        this.onPlayQuestion();
      }
    },
    onPlaySound(src) {
      if (this.isSound) {
        const audio = new Audio(src);
        audio.play();
      }
    },
    onPlayQuestion() {
      const audio = new Audio(`${dataSrc}${this.words[this.wordNumber].audio}`);
      this.isAudioPlay = true;
      audio.onended = () => {
        this.isAudioPlay = false;
      };
      audio.play();
    },
    onKeyDown(event) {
      if (!event.repeat && !this.isCheck) {
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
          case keys.five:
            this.checkAnswer(4);
            break;
          default:
            break;
        }
      } else if (!event.repeat && this.isCheck && keys.enter) {
        this.onCheckGameOver();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.game__background {
  position: absolute;
  top: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-image: linear-gradient($overlay-color, $overlay-color),
    url('~@/assets/img/audiocall/start-screen.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}

.game__main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: calc(100% - 64px);
  padding: 20px;
}

.game__words {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
}

.question-wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.game__word-text {
  margin-left: 20px;
  font-size: 30px;
}

.game__image {
  width: 150px;
  height: 150px;
  margin-bottom: 20px;
  border: 3px solid $color-white;
  border-radius: 50%;
  object-fit: cover;
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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
  cursor: pointer;
  border-radius: 50%;
  transition: background-color 0.5s, color 0.3s;

  &_playing {
    color: $color-dodger-blue;
    background-color: $color-manatee;
  }

  &_check {
    width: 50px;
    height: 50px;
  }
}

.controls__button {
  @include english-puzzle-button(150px);

  margin-top: 20px;
}

.btn-arrow {
  width: 18px;
  height: 24px;
  background-image: url('~@/assets/img/btn-arrow.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 18px 14px;
}

@media (hover: hover) {
  .answer:hover {
    border-color: $color-ghost;
  }

  .question:hover {
    background-color: $color-shuttle-gray;
  }
}
</style>
