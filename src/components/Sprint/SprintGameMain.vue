<template>
  <div class="wrapper">
    <div class="image"></div>

    <div class="game" v-if="!isGameEnd">
      <div class="game__timer">
        <circular-count-down-timer
          :initial-value="timerDuration"
          :steps="timerSteps"
          :size="timerSize"
          :align="'center'"
          :second-label="''"
          @finish="finished"
        ></circular-count-down-timer>
      </div>

      <div class="game__point">
        <p>{{ $t('sprint.points') }}: {{ score }}</p>
        <p v-if="showPlusPoints">+{{ price }}</p>
      </div>

      <div class="game__series">
        <b-icon
          v-for="i in attemptSeries"
          :key="i"
          icon="circle-fill"
          :variant="i <= series ? 'success' : 'secondary'"
          scale="1.3"
        ></b-icon>
      </div>

      <p class="game__word">{{ wordsArray[index].word }} - {{ wordsArray[index].option }}</p>
      <div class="game__answer">
        <b-button
          class="button"
          :class="{ button_active: isPressLeft }"
          :disabled="isCheck"
          variant="success"
          @click="correctBtn"
          @keyup.left="correctBtn"
        >
          <b-icon icon="arrow-left"></b-icon>
          {{ $t('sprint.correctButtonText') }}
        </b-button>
        <b-button
          class="button"
          :class="{ button_active: isPressRight }"
          :disabled="isCheck"
          variant="danger"
          @click="wrongBtn"
        >
          {{ $t('sprint.wrongButtonText') }}
          <b-icon icon="arrow-right"></b-icon>
        </b-button>
      </div>
    </div>

    <div class="statistic" v-else>
      <h1 class="statistic__title">{{ $t('shortStatistic.title') }}</h1>
      <h3 class="statistic__points" v-if="isTableShow">{{ $t('shortStatistic.resultTable') }}</h3>
      <h3 class="statistic__points" v-else>{{ $t('sprint.points') }}: {{ score }}</h3>
      <div class="statistic__table" v-if="isTableShow">
        <div class="table__item" v-for="(item, index) in statistics.sprintStats" :key="index">
          {{ index + 1 }}. {{ item.score }} - {{ item.date | toDate }}
          <hr />
        </div>
      </div>
      <div class="statistic__data" v-else>
        <div class="statistic__dont-know">
          <div class="statistic__category">
            <span class="statistic__name">{{ $t('shortStatistic.dontKnowTitle') }}</span>
            <span class="count">{{ dontKnowWords.length }}</span>
          </div>
          <div class="words" v-for="item in dontKnowWords" :key="item.word">
            <span @click="onPlayAudio(item.audio)">
              <icon-base
                :icon-name="$t('speechButtonTitle')"
                width="20px"
                height="20px"
                viewBox="0 0 576 512"
              >
                <icon-volume />
              </icon-base>
            </span>
            <p class="words__detail">{{ item.word }} - {{ item.wordTranslate }}</p>
          </div>
        </div>
        <div class="statistic__know">
          <div class="statistic__category">
            <span class="statistic__name">{{ $t('shortStatistic.knowTitle') }}</span>
            <span class="count">{{ knowWords.length }}</span>
          </div>
          <div class="words" v-for="item in knowWords" :key="item.word">
            <span @click="onPlayAudio(item.audio)">
              <icon-base
                :icon-name="$t('speechButtonTitle')"
                width="20px"
                height="20px"
                viewBox="0 0 576 512"
              >
                <icon-volume />
              </icon-base>
            </span>
            <p class="words__detail">{{ item.word }} - {{ item.wordTranslate }}</p>
          </div>
        </div>
      </div>

      <div class="detail-buttons">
        <button class="statistic__button-continue" @click="onContinue">
          {{ $t('shortStatistic.continueButtonText') }}
        </button>
        <button class="statistic__button-continue" v-if="!isTableShow" @click="onShowTable">
          {{ $t('shortStatistic.resultTable') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { dataSrc, keys, correctSound, errorSound } from '@/helpers/constants.helper';
import IconBase from '@/components/IconBase.vue';
import IconVolume from '@/components/icons/IconVolume.vue';

export default {
  name: 'SprintgameMain',
  data() {
    return {
      index: 0,
      price: 10,
      series: 0,

      showPlusPoints: false,
      isPressLeft: false,
      isPressRight: false,
      isTableShow: false,
      isCheck: false,
      knowWords: [],
      dontKnowWords: [],
    };
  },
  components: {
    IconBase,
    IconVolume,
  },
  computed: {
    ...mapState('Sprint', [
      'wordsArray',
      'isSound',
      'isGameEnd',
      'timerDuration',
      'timerSize',
      'timerSteps',
      'attemptSeries',
      'score',
    ]),
    ...mapState('Statistic', ['statistics']),
  },
  created() {
    window.addEventListener('keydown', this.onKeyDown);
  },
  destroyed() {
    this.isTableShow = false;
    window.removeEventListener('keydown', this.onKeyDown);
  },
  methods: {
    ...mapMutations('Sprint', ['resetGame', 'setIsGameEnd', 'setScore']),
    ...mapActions('Sprint', ['saveStats']),
    ...mapActions('Error', ['setError']),

    onShowTable() {
      this.isTableShow = true;
    },

    onPlayAudio(src) {
      const audio = new Audio(`${dataSrc}${src}`);
      audio.play();
    },

    onPlaySound(src) {
      if (this.isSound) {
        const audio = new Audio(src);
        audio.play();
      }
    },

    checkAnswer(answer) {
      const word = this.wordsArray[this.index];
      const check = word.wordTranslate === word.option;

      if (check === answer) {
        this.setScore(this.score + this.price);
        this.series += 1;
        this.knowWords.push(word);
        this.onPlaySound(correctSound);
        this.setShowPlusPoints();

        if (this.series > 3) {
          this.bonus();
          this.series = 0;
        }
      } else {
        this.dontKnowWords.push(word);
        this.price = 10;
        this.series = 0;
        this.onPlaySound(errorSound);
      }
      if (this.index + 1 < this.wordsArray.length) {
        this.index += 1;
        this.isCheck = false;
      } else {
        this.finished();
      }
    },
    bonus() {
      this.price *= 2;
    },
    async finished() {
      try {
        await this.saveStats();
        window.removeEventListener('keydown', this.onKeyDown);
        this.setIsGameEnd(true);
      } catch (error) {
        this.setError(error.message);
      }
    },
    correctBtn() {
      this.isCheck = true;
      this.isPressLeft = true;
      this.checkAnswer(true);
      setTimeout(() => {
        this.isPressLeft = false;
      }, 350);
    },
    wrongBtn() {
      this.isCheck = true;
      this.isPressRight = true;
      this.checkAnswer(false);
      setTimeout(() => {
        this.isPressRight = false;
      }, 350);
    },
    onContinue() {
      this.resetGame();
    },
    setShowPlusPoints() {
      this.showPlusPoints = !this.showPlusPoints;
      setTimeout(() => {
        this.showPlusPoints = !this.showPlusPoints;
      }, 1000);
    },

    onKeyDown(event) {
      if (!event.repeat && !this.isCheck) {
        switch (event.key) {
          case keys.left:
            this.correctBtn();
            break;
          case keys.right:
            this.wrongBtn();
            break;
          default:
            break;
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.image {
  position: absolute;
  top: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-image: linear-gradient($overlay-color, $overlay-color),
    url('~@/assets/img/sprint/sprint-start.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}

.statistic {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  padding: 20px 30px;
  margin: auto;
  font-size: 20px;
  font-weight: 500;
  background: $color-white;
  border: 1px solid $color-black;
  border-radius: 6px;

  &__data {
    width: 80%;
    max-height: 380px;
    overflow-y: scroll;
  }

  &__title {
    color: $color-dodger-blue;
    text-align: center;
  }

  &__points {
    margin-top: 12px;
  }

  &__category {
    display: flex;
    justify-content: center;
    margin-top: 12px;
  }

  &__name {
    margin-right: 12px;
    text-decoration: underline;
  }

  &__dont-know {
    .count {
      background-color: $color-chestnut;
    }
  }

  &__know {
    .count {
      background-color: $color-apple;
    }
  }

  &__button-continue {
    margin-top: 24px;

    @include english-puzzle-button(150px);
  }

  .count {
    height: max-content;
    padding: 2px 8px;
    margin-left: 5px;
    color: $color-white;
    border-radius: 10px;
  }

  .words {
    display: flex;
    justify-content: left;
    margin-top: 5px;

    &__detail {
      margin-left: 16px;
    }
  }
}

.button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  border: 1px solid transparent;
  transition: opacity 0.2s, border-color 0.2s;

  &_active {
    cursor: default !important;
    border: 1px solid $color-shuttle-gray;
    opacity: 0.5;
  }

  &:disabled {
    pointer-events: none;
    cursor: default !important;
    opacity: 0.5;
  }
}

.button + .button {
  margin-left: 10px;
}

.game {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  padding: 20px 30px;
  margin: auto;
  font-size: 20px;
  font-weight: 500;
  background: $color-white;
  border: 1px solid $color-black;
  border-radius: 6px;

  &__point {
    display: inline-flex;
    justify-content: space-between;
    width: max-content;
    font-size: 24px;
    color: $color-apple;
  }

  &__progress {
    display: flex;
    justify-content: space-between;
    width: 90%;
  }

  &__series {
    display: flex;
    justify-content: space-between;
    width: 200px;
    padding: 7px;
  }

  &__word {
    margin-top: 15px;
    text-align: center;
  }

  &__word,
  &__translation {
    padding-top: 5%;
    font-size: 30px;
  }

  &__answer {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 30px;
  }
}

.table__item {
  font-size: 20px;
  font-weight: 500;
  color: $color-dodger-blue;
  text-shadow: 1px 1px 1px $color-black;

  &:nth-child(1) {
    color: $color-golden-dream;
  }

  &:nth-child(2) {
    color: $color-ghost;
  }

  &:nth-child(3) {
    color: $color-dwarf-bronze;
  }
}

.detail-buttons {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  margin-top: 40px;
}

@media screen and (max-width: $tablet-width) {
  .statistic,
  .game {
    width: 95%;
    padding: 20px 10px;
  }
}
</style>
