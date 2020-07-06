<template>
  <div class="wrapper">
    <div class="image"></div>
    <div class="game">
      <div class="game__timer">
        <circular-count-down-timer
          :initial-value="60"
          :steps="60"
          :size="120"
          :align="'center'"
          :second-label="''"
        ></circular-count-down-timer>
      </div>

      <div class="game__progress">
        <p class="game__point">801</p>
        <div class="game__series">
          <b-icon icon="check-circle-fill" variant="success" scale="1.3"></b-icon>
          <b-icon icon="dash-circle-fill" variant="danger" scale="1.3"></b-icon>
          <b-icon icon="circle-fill" variant="secondary" scale="1.3"></b-icon>
          <b-icon icon="circle-fill" variant="secondary" scale="1.3"></b-icon>
        </div>
      </div>
      <p class="game__word">Ball - Мяч</p>
      <div class="game__answer">
        <b-button variant="success" @click="testData">
          <b-icon icon="arrow-left"></b-icon>
          Correct</b-button
        >
        <b-button variant="danger">
          Wrong
          <b-icon icon="arrow-right"></b-icon>
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'SprintgameMain',
  components: {},
  computed: {
    ...mapState('Sprint', ['wordsArray']),
  },
  methods: {
    testData() {
      console.log(this.wordsArray);
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
