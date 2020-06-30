<template>
  <div class="learning" v-if="isMainPage">
    <div class="learning__header">
      <h1><span>Hello.</span> Let’s start learning!</h1>
      <p>
        On this page, you can monitor your progress and select the desired set of words to learn,
        for example, <b>“New words”</b>, <b>“Repetition”</b> or <b>“All words”</b>. Good luck!
      </p>
    </div>
    <div class="learning-today card-wrap">
      <h3>Today learning</h3>
      <div class="learning-today__lerned">
        <div class="learning-today__lerned-text">
          Today lerned: <span>{{ index }}</span> from <span>{{ settings.maxCardDay }}</span> words
        </div>
        <b-progress
          height="10px"
          :value="index"
          :max="settings.maxCardDay"
          class="learning-today__progress"
        ></b-progress>
      </div>
      <button class="btn-rs">Start learning</button>
    </div>
    <div class="learning-category">
      <div class="learning-category__card card-wrap">
        <h4>New words</h4>
        <p>Click here to learn new words for today.</p>
        <button class="btn-rs" @click="trainNewWords" :disabled="isNewWordsLoading">
          Let’s train! <AppSpinner v-if="isNewWordsLoading"></AppSpinner>
        </button>
      </div>

      <div class="learning-category__card card-wrap">
        <h4>Repeat</h4>
        <p>Click here to repeat the learned words.</p>
        <button class="btn-rs">Let’s train!</button>
      </div>

      <div class="learning-category__card card-wrap">
        <h4>All words</h4>
        <p>Here are all the words for today learning.</p>
        <button class="btn-rs">Let’s train!</button>
      </div>
    </div>
    <div class="show-statistic">
      <ShortTermStatistic v-if="isShortTermStatisticShow" />
      <button @click="showStatistic">ShortTermStatistic</button>
    </div>
  </div>
  <learning-words v-else></learning-words>
</template>

<script>
import AppSpinner from '@/components/AppSpinner.vue';
import LearningWords from '@/components/LearningWords.vue';
import { mapState, mapMutations, mapActions } from 'vuex';
import ShortTermStatistic from '../components/ShortTermStatistic.vue';

export default {
  name: 'LearningPage',
  data() {
    return {
      learnedCards: 4,
      isNewWordsLoading: false,
    };
  },
  components: {
    LearningWords,
    AppSpinner,
    ShortTermStatistic,
  },
  computed: {
    ...mapState('Settings', ['settings']),
    ...mapState('Learning', ['isMainPage', 'index']),
    ...mapState('Statistic', ['isShortTermStatisticShow']),
  },
  methods: {
    ...mapActions('Learning', ['getNewWords']),
    ...mapActions('Error', ['setError']),
    ...mapMutations('Learning', ['setIsMainPage']),
    ...mapMutations('Statistic', ['setIsShortTermStatisticShow']),

    showStatistic() {
      this.setIsShortTermStatisticShow(true);
    },
    async trainNewWords() {
      this.isNewWordsLoading = true;
      try {
        await this.getNewWords();
        this.setIsMainPage(false);
      } catch (error) {
        this.setError(error.message);
      } finally {
        this.isNewWordsLoading = false;
      }
    },
  },
  destroyed() {
    this.setIsShortTermStatisticShow(false);
  },
};
</script>

<style scoped lang="scss">
.learning {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 25px 16px;
  color: $color-pickled-bluewood;
  background-color: $color-catskill-white;

  &__header {
    padding: 0 53px;

    h1 {
      font-size: 56px;
      font-weight: 900;
      line-height: 63px;

      span {
        color: $color-golden-dream;
      }
    }

    p {
      margin-top: 15px;
      font-size: 20px;
      color: $color-shuttle-gray;
    }
  }

  .card-wrap {
    background-color: $color-white;
    border-radius: 24px;
    box-shadow: 1px 5px 14px rgba(55, 114, 227, 0.1);
  }

  .btn-rs {
    @include english-puzzle-button(200px);

    height: 60px;
    font-size: 20px;
    border-radius: 20px;
  }
}

.learning-today {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  min-height: 200px;
  padding: 20px;
  margin-top: 48px;
  text-align: center;

  h3 {
    font-size: 32px;
    font-weight: bold;
    line-height: 39px;
  }

  &__lerned {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    line-height: 21px;

    &-text {
      margin-bottom: 16px;
    }

    .learning-today__lerned-text span {
      color: $color-dodger-blue;
    }
  }

  &__progress {
    width: 100%;
  }
}

.learning-category {
  display: flex;
  margin-top: 48px;

  &__card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: calc(100% / 3);
    min-height: 240px;
    padding: 20px;
    text-align: center;

    h4 {
      font-size: 24px;
      font-weight: bold;
      line-height: 29px;
    }

    p {
      max-width: 200px;
      font-size: 18px;
    }

    &:not(:first-child) {
      margin-left: 16px;
    }
  }
}

.show-statistic {
  position: absolute;
  right: 30px;
  width: max-content;
}

@media (hover: hover) {
  .btn-rs:hover {
    background-color: $color-cornflower-blue;
  }
}

@media screen and (max-width: $learning-tablet-size) {
  .learning__header {
    padding: 0;
    text-align: center;
  }

  .learning-today,
  .learning-category {
    flex-direction: column;
    margin-top: 20px;
  }

  .learning-today__lerned {
    margin: 20px 0;
  }

  .learning-category__card {
    width: 100%;
    min-height: 165px;
    margin: 5px 0;

    &:not(:first-child) {
      margin-left: 0;
    }

    p {
      margin: 10px 0;
    }
  }
}
</style>
