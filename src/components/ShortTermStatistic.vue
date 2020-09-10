<template>
  <div>
    <div class="bkg-shortTerm" @click="close"></div>
    <div class="shortTermStatistic">
      <button
        class="shortTermStatistic__btn-close"
        @click="close"
        :title="$t('shortTermStatistic.closeButtonText')"
      >
        &times;
      </button>
      <h3 class="shortTermStatistic__head">{{ $t('shortTermStatistic.title') }}</h3>
      <div class="shortTermStatistic__cards">
        <p>{{ $t('shortTermStatistic.completed') }}</p>
        <p>{{ cardsCount }}</p>
      </div>
      <div class="shortTermStatistic__correct-answer">
        <p>{{ $t('shortTermStatistic.correct') }}</p>
        <p>{{ correctAnswer }}</p>
      </div>
      <div class="shortTermStatistic__new-words">
        <p>{{ $t('shortTermStatistic.newWords') }}</p>
        <p>{{ newWords }}</p>
      </div>
      <div class="shortTermStatistic__longest-correct-series">
        <p>{{ $t('shortTermStatistic.longestSeries') }}</p>
        <p>{{ longestSeries }}</p>
      </div>
      <button class="shortTermStatistic__button" @click="close">
        {{ $t('shortTermStatistic.okButtonText') }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'ShortTermStatistic',
  computed: {
    ...mapState('Statistic', ['cardsCount', 'correctAnswer', 'newWords', 'longestSeries']),
  },
  methods: {
    ...mapMutations('Statistic', ['setIsShortTermStatisticShow']),
    ...mapMutations('Notification', ['setIsNotificationShow']),
    close() {
      this.setIsShortTermStatisticShow(false);
      this.setIsNotificationShow(true);
    },
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

  p + p {
    margin-left: 20px;
  }
}

.bkg-shortTerm {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  height: 100%;
  background-color: $overlay-color;
}

.shortTermStatistic {
  position: fixed;
  top: calc(50% - 200px);
  left: calc(50% - 217px);
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 450px;
  padding: 30px 40px;
  font-size: 20px;
  font-weight: 500;
  background: $color-white;
  border-radius: 24px;
  box-shadow: 1px 5px 14px $box-shadow-one-color;

  &__btn-close {
    position: absolute;
    top: 15px;
    right: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    font-size: 30px;
    color: $color-manatee;
    background-color: transparent;
    border: 1px solid transparent;
    border-radius: 50%;
    outline: none;
    transition: background-color 0.3s, color 0.3s;
  }

  &__head {
    margin-bottom: 4%;
    font-weight: 900;
    color: $color-dodger-blue;
    text-align: center;
  }

  &__cards {
    @include data($color-cornflower-blue);
  }

  &__correct-answer {
    @include data($color-lima);
  }

  &__new-words {
    @include data($color-web-orange);
  }

  &__longest-correct-series {
    @include data($color-dodger-blue);
  }

  &__button {
    @include english-puzzle-button(150px);

    margin-top: 20px;
  }
}

@media (hover: hover) {
  .shortTermStatistic__btn-close:hover {
    color: $color-white;
    background-color: $color-manatee;
  }
}

@media screen and (max-width: $puzzle-mobile-size) {
  .shortTermStatistic {
    top: 90px;
    left: 0;
    margin: 10px;
  }
}
</style>
