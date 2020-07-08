<template>
  <div class="wrapper">
    <div class="image"></div>

    <div class="game" v-if="!isGameEnd">
      <div class="game__timer">
        <circular-count-down-timer
          :initial-value="6"
          :steps="6"
          :size="120"
          :align="'center'"
          :second-label="''"
          @finish="finished"
        ></circular-count-down-timer>
      </div>

      <div class="game__progress">
        <p class="game__point">{{ points }}</p>
        <div class="game__series">
          <b-icon icon="check-circle-fill" variant="success" scale="1.3"></b-icon>
          <b-icon icon="dash-circle-fill" variant="danger" scale="1.3"></b-icon>
          <b-icon icon="circle-fill" variant="secondary" scale="1.3"></b-icon>
          <b-icon icon="circle-fill" variant="secondary" scale="1.3"></b-icon>
        </div>
      </div>
      <p class="game__word">{{ wordsArray[index].word }} - {{ wordsArray[index].option }}</p>
      <div class="game__answer">
        <b-button variant="success" @click="correctBtn">
          <b-icon icon="arrow-left"></b-icon>
          Correct</b-button
        >
        <b-button variant="danger" @click="wrongBtn">
          Wrong
          <b-icon icon="arrow-right"></b-icon>
        </b-button>
      </div>
    </div>

    <div class="statistic" v-else>
      <h1 class="statistic__title">Game statistic</h1>
      <div class="statistic__dont-know">
        <div class="statistic__category">
          <span>I don't know</span>
          <span class="count">5</span>
        </div>
        <div class="words">
          <icon-base icon-name="Speech" width="20px" height="20px" viewBox="0 0 576 512">
            <icon-volume />
          </icon-base>
          <p class="detail__words">{{ wordsArray[index].word }} - {{ wordsArray[index].option }}</p>
        </div>
      </div>
      <div class="statistic__know">
        <div class="statistic__category">
          <span>I know</span>
          <span class="count">6</span>
        </div>
        <div class="words">
          <icon-base icon-name="Speech" width="20px" height="20px" viewBox="0 0 576 512">
            <icon-volume />
          </icon-base>
          <p class="detail__words">{{ wordsArray[index].word }} - {{ wordsArray[index].option }}</p>
        </div>
      </div>
      <button class="statistic__button-continue" @click="onContinue">
        Continue
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import IconBase from '@/components/IconBase.vue';
import IconVolume from '@/components/icons/IconVolume.vue';

export default {
  name: 'SprintgameMain',
  data() {
    return {
      index: 0,
      points: 0,
      price: 10,
      isGameEnd: false,
    };
  },
  components: {
    IconBase,
    IconVolume,
  },
  computed: {
    ...mapState('Sprint', ['wordsArray']),
  },
  methods: {
    checkAnswer(answer) {
      const word = this.wordsArray[this.index];
      const check = word.wordTranslate === word.option;
      if (check === answer) {
        this.points += this.price;
      } else {
        this.price = 10;
      }

      this.index += 1;
      if (this.index === this.wordsArray.length) {
        this.finished();
      }
    },
    finished() {
      this.isGameEnd = true;
    },
    correctBtn() {
      this.checkAnswer(true);
    },
    wrongBtn() {
      this.checkAnswer(false);
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
  height: max-content;
  padding: 3%;
  margin: auto;
  font-size: 20px;
  font-weight: 500;
  background: $color-white;
  border: 1px solid $color-black;
  border-radius: 6px;

  &__title {
    color: $color-dodger-blue;
  }

  &__category {
    display: flex;
    justify-content: space-evenly;
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
    @include english-puzzle-button(150px);
  }

  .count {
    padding: 2px 8px;
    margin-left: 5px;
    color: $color-white;
    border-radius: 10px;
  }
}

.game {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  height: 50%;
  padding: 3%;
  margin: auto;
  font-size: 20px;
  font-weight: 500;
  background: $color-white;
  border: 1px solid $color-black;
  border-radius: 6px;

  &__timer {
    position: fixed;
  }

  &__point {
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
    width: 30%;
    padding: 7px;
  }

  &__word {
    margin-top: 80px;
  }

  &__word,
  &__translation {
    padding-top: 5%;
    text-decoration: underline;
  }

  &__answer {
    display: flex;
    justify-content: space-between;
    width: 210px;
    padding-top: 5%;
  }
}
</style>
