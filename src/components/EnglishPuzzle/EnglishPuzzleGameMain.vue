<template>
  <div class="game__main">
    <p class="sentence-count" v-if="isMobile">
      {{ sentenceNumber + 1 }} {{ $t('englishPuzzle.sentence') }}
    </p>
    <div class="game__board">
      <div class="board__numbers" v-if="!isMobile">
        <div class="number" v-for="i in 10" :key="`${i}number`">
          {{ i }}
        </div>
      </div>
      <transition name="fade" mode="out-in">
        <div
          v-if="isEndRound && isSentenceComplete && !isPictureOff"
          class="board__picture"
          key="board__picture_img"
        >
          <img class="board__picture_img" :src="picture.imageSrc" :alt="picture.description" />
        </div>
        <div class="board__picture" v-else-if="isMobile" key="board__picture_mobile">
          <div class="attempt__sentence">
            <div
              class="attempt__word"
              :class="[
                {
                  attempt__word_error:
                    correctAnswer[sentenceNumber][i] &&
                    item.word !== correctAnswer[sentenceNumber][i].word &&
                    isCheck,
                },
                {
                  attempt__word_success:
                    (correctAnswer[sentenceNumber][i] &&
                      item.word === correctAnswer[sentenceNumber][i].word &&
                      isCheck) ||
                    isSentenceComplete,
                },
                {
                  attempt__word_puzzle: !isPictureOff,
                },
              ]"
              v-for="(item, i) in attemptWordsArray[sentenceNumber]"
              :key="`${i}-${sentenceNumber}word-attempt_mobile`"
              :draggable="!!item.word"
              :data-index="i"
              :data-row="sentenceNumber"
              @click="onClickAttemptWord"
              @dragstart="dragStart"
              @drop="drop"
              @dragover="allowDrop"
            >
              {{ item.word }}
            </div>
          </div>
        </div>
        <div v-else class="board__picture" key="board__picture">
          <div class="attempt__sentence" v-for="num in getSentenceNumber" :key="num">
            <div
              class="attempt__word"
              :class="[
                {
                  attempt__word_error:
                    correctAnswer[num - 1][i] &&
                    item.word !== correctAnswer[num - 1][i].word &&
                    isCheck,
                },
                {
                  attempt__word_success:
                    (correctAnswer[num - 1][i] &&
                      item.word === correctAnswer[num - 1][i].word &&
                      isCheck &&
                      num - 1 === sentenceNumber) ||
                    (isSentenceComplete && num - 1 === sentenceNumber),
                },
                {
                  attempt__word_puzzle: !isPictureOff,
                },
              ]"
              :style="[
                item.word
                  ? { backgroundImage, backgroundPosition: backgroundPosition[num - 1][item.index] }
                  : {},
              ]"
              v-for="(item, i) in attemptWordsArray[num - 1]"
              :key="`${i}-${num}word-attempt`"
              :draggable="num - 1 === sentenceNumber && !!item.word"
              :data-index="i"
              :data-row="num - 1"
              @click="onClickAttemptWord"
              @dragstart="dragStart"
              @drop="drop"
              @dragover="allowDrop"
            >
              {{ item.word }}
            </div>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade" mode="out-in">
      <div
        v-if="isEndRound && isSentenceComplete && !isPictureOff"
        key="game__puzzle_description"
        class="game__puzzle game__puzzle_description"
      >
        {{ picture.description }}
      </div>
      <div v-else class="game__puzzle" key="game__puzzle">
        <div
          class="word"
          :class="[
            {
              word_puzzle: !isPictureOff,
            },
          ]"
          :style="[
            item.word
              ? {
                  backgroundImage,
                  backgroundPosition: backgroundPosition[sentenceNumber][item.index],
                }
              : {},
          ]"
          v-for="(item, i) in wordsArray[sentenceNumber]"
          :key="`${i}word`"
          :draggable="!!item.word"
          :data-index="i"
          :data-row="sentenceNumber"
          @click="onClickShuffleWord"
          @dragstart="dragStart"
          @drop="drop"
          @dragover="allowDrop"
        >
          {{ item.word }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { getPicture } from '@/helpers/englishPuzzle.helper';

export default {
  name: 'EnglishPuzzleGameMain',
  data() {
    return {
      attemptWordsArray: [],
      wordsArray: [],
      draggedWord: '',
    };
  },
  created() {
    this.wordsArray = this.shuffleWords;
    this.attemptWordsArray = this.attemptWords;
  },
  updated() {
    this.wordsArray = this.shuffleWords;
    this.attemptWordsArray = this.attemptWords;
  },
  computed: {
    ...mapState('EnglishPuzzle', [
      'selectedLevel',
      'selectedRound',
      'shuffleWords',
      'correctAnswer',
      'sentenceNumber',
      'attemptWords',
      'isCheck',
      'isSentenceComplete',
      'isImage',
      'isPictureOff',
      'isMobile',
    ]),
    ...mapGetters('EnglishPuzzle', ['isEndRound']),

    isWordsArrayEmpty() {
      return this.shuffleWords[this.sentenceNumber].every((item) => item.word === '');
    },
    getSentenceNumber() {
      return this.sentenceNumber + 1;
    },
    picture() {
      return getPicture(this.selectedLevel, this.selectedRound);
    },
    backgroundImage() {
      if (this.isImage) {
        return `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${this.picture.cutSrc})`;
      }
      return '';
    },
    backgroundPosition() {
      return this.correctAnswer.map((sentence, index) => {
        const wordWidth = 10;
        const marginWidth = 5;
        const wrapperWidth = 885;
        const sentenceWordCount = sentence.reduce((sum, item) => sum + item.word.length, 0);
        const wordsCount = sentence.length;
        const sentenceWidth = wordWidth * sentenceWordCount + (wordsCount - 1) * marginWidth;
        const emptyWidth = wrapperWidth - sentenceWidth;
        const emptyRatio = emptyWidth / wordsCount;
        // eslint-disable-next-line no-unused-vars
        let coordX = 0;

        return sentence.map((item, i) => {
          let positionX = '';
          const symbolCount = sentence[i].word.length;
          if (i === 0) {
            positionX = '0px';
            coordX = symbolCount * wordWidth + emptyRatio;
          } else {
            positionX = `${coordX}px`;
            coordX = symbolCount * wordWidth + emptyRatio + coordX;
          }
          const positionY = `${index * 50}px`;
          return `-${positionX} -${positionY}`;
        });
      });
    },
  },
  methods: {
    ...mapMutations('EnglishPuzzle', [
      'setStartState',
      'setCheckState',
      'setShuffleWords',
      'setAttemptWords',
    ]),

    findIndexEmptyElement(array) {
      return array[this.sentenceNumber].findIndex((item) => item.word === '');
    },

    getArray(className) {
      let result = [];
      if (className === 'word') {
        result = this.wordsArray;
      } else {
        result = this.attemptWordsArray;
      }
      return result;
    },

    onClickShuffleWord(event) {
      const word = event.target.textContent.trim();

      if (word) {
        const firstArray = this.wordsArray;
        const firstIndex = event.target.dataset.index;
        const secondArray = this.attemptWordsArray;
        const secondIndex = this.findIndexEmptyElement(this.attemptWordsArray);
        this.onSwapWords({ firstArray, firstIndex, secondArray, secondIndex });
      }
    },
    onClickAttemptWord(event) {
      const word = event.target.textContent.trim();
      const { row } = event.target.dataset;

      if (word && Number(row) === this.sentenceNumber) {
        const firstArray = this.attemptWordsArray;
        const firstIndex = event.target.dataset.index;
        const secondArray = this.wordsArray;
        const secondIndex = this.findIndexEmptyElement(this.wordsArray);
        this.onSwapWords({ firstArray, firstIndex, secondArray, secondIndex });
      }
    },
    onSwapWords(payload) {
      const { firstArray, firstIndex, secondArray, secondIndex } = payload;
      const firstWord = firstArray[this.sentenceNumber][firstIndex];
      const secondWord = secondArray[this.sentenceNumber][secondIndex];
      this.$set(firstArray[this.sentenceNumber], firstIndex, secondWord);
      this.$set(secondArray[this.sentenceNumber], secondIndex, firstWord);
      this.setShuffleWords(this.wordsArray);
      this.setAttemptWords(this.attemptWordsArray);

      if (this.isWordsArrayEmpty) {
        this.setCheckState();
      } else {
        this.setStartState();
      }
    },
    onDragSwapWords(target) {
      const firstArray = this.getArray(this.draggedWord.classList[0]);
      const firstIndex = this.draggedWord.dataset.index;
      const secondArray = this.getArray(target.classList[0]);
      const secondIndex = target.dataset.index;
      this.onSwapWords({ firstArray, firstIndex, secondArray, secondIndex });
    },
    dragStart(event) {
      this.draggedWord = event.target;
    },
    drop(event) {
      event.preventDefault();
      const { row } = event.target.dataset;
      if (row && Number(row) === this.sentenceNumber) {
        this.onDragSwapWords(event.target);
      }
    },
    allowDrop(event) {
      event.preventDefault();
    },
  },
};
</script>

<style lang="scss" scoped>
.game__main {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 925px;
  margin: 20px auto 0 auto;
}

.game__board {
  display: flex;
  width: 100%;
  height: 500px;
}

.board__numbers {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 40px;
}

.board__picture {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: $color-ghost;
  border: 2px solid $color-ghost;

  &_img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.attempt__sentence {
  display: flex;
  height: 50px;
}

.number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border: 1px solid $color-ghost;
  border-radius: 50%;
}

.game__puzzle {
  display: flex;
  align-items: center;
  width: calc(100% - 40px);
  height: 50px;
  margin-top: 20px;
  margin-left: 40px;
  background-color: $color-ghost;
  border-radius: 5px;
  box-shadow: 0 0 5px $overlay-color;

  &_description {
    justify-content: center;
  }
}

.attempt__word {
  color: $color-white;
  transition: background-color 0.3s;

  &_error {
    background-color: $color-chestnut !important;
    border-color: $color-chestnut !important;
  }

  &_success {
    background-color: $color-apple !important;
    border-color: $color-apple !important;
  }
}

.sentence-count {
  font-size: 26px;
}

.attempt__word,
.word {
  position: relative;
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-family: 'Roboto Mono', monospace;
  color: $color-white;
  text-shadow: 2px 2px 2px $color-black;
  cursor: pointer;
  user-select: none;
  background-color: $color-manatee;
  border: 2px solid $color-white;

  &_puzzle {
    clip-path: polygon(
      0% 0%,
      90% 0,
      90% 33%,
      100% 33%,
      100% 66%,
      90% 66%,
      90% 100%,
      0% 100%,
      0% 66%,
      10% 66%,
      10% 33%,
      0% 33%
    );

    &:first-child {
      clip-path: polygon(0% 0%, 90% 0, 90% 33%, 100% 33%, 100% 66%, 90% 66%, 90% 100%, 0% 100%);
    }

    &:last-child {
      clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 66%, 10% 66%, 10% 33%, 0% 33%);
    }

    &:not(:first-child) {
      margin-left: -10px;
    }
  }
}

@media screen and (max-width: $puzzle-mobile-size) {
  .game__board {
    height: auto;
  }

  .game__main {
    align-items: flex-start;
  }

  .game__puzzle {
    flex-direction: column;
    width: 100%;
    height: 100%;
    margin-left: 0;
  }

  .attempt__word,
  .word {
    width: 100%;
    height: 50px;
    font-size: 36px;
  }

  .attempt__sentence {
    flex-direction: column;
    height: 100%;
  }

  .attempt__word_error,
  .attempt__word_success {
    border-color: $color-ghost !important;
  }
}
</style>
