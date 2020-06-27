<template>
  <div>
    <div class="bkg-shortTerm" @click="close"></div>
    <div class="shortTermStatistic">
      <img
        class="shortTermStatistic__btn-close"
        src="../assets/img/btn-close.png"
        alt=""
        @click="close"
      />
      <h3 class="shortTermStatistic__head">Series is completed</h3>
      <div class="shortTermStatistic__cards">
        <p>Cards completed:</p>
        <p>{{ cardsCount }}</p>
      </div>
      <div class="shortTermStatistic__correct-answer">
        <p>Correct answer:</p>
        <p>{{ correctAnswer }}</p>
      </div>
      <div class="shortTermStatistic__new-words">
        <p>New words:</p>
        <p>{{ newWords }}</p>
      </div>
      <div class="shortTermStatistic__longest-correct-series">
        <p>Longest series of correct answers:</p>
        <p>{{ longestSeries }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'ShortTermStatistic',
  components: {},
  methods: {
    ...mapMutations('ShortTermStatistic', ['setIsShortTermStatisticShow']),
    close() {
      this.setIsShortTermStatisticShow(false);
    },
  },
  data() {
    return {
      cardsCount: 11,
      correctAnswer: 6,
      newWords: 4,
      longestSeries: 3,
    };
  },
};
</script>

<style scoped lang="scss">
@mixin data($color) {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 4%;
  color: $color;
}

.bkg-shortTerm {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: $overlay-color;
}

.shortTermStatistic {
  position: fixed;
  top: calc(50% - 200px);
  left: calc(50% - 217px);
  z-index: 11;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: max-content;
  height: max-content;
  padding: 4%;
  font-size: 20px;
  font-weight: 500;
  background: $color-white;
  border: 1px solid $color-black;
  border-radius: 5%;

  &__btn-close {
    position: absolute;
    top: 25px;
    right: 25px;
    cursor: pointer;
  }

  &__head {
    margin-bottom: 4%;
    font-weight: 900;
    color: $color-dodger-blue;
  }

  &__cards {
    @include data(#00c853);
  }

  &__correct-answer {
    @include data(#4caf50);
  }

  &__new-words {
    @include data(#76ff03);
  }

  &__longest-correct-series {
    @include data(#558b2f);
  }
}
</style>
