<template>
  <div class="learning" v-if="isMainPage">
    <div class="learning__header">
      <h1><span>Hello.</span> Let’s start learning!</h1>
      <p>
        On this page, you can monitor your progress and select the desired set of words to learn,
        for example, <b>“New words”</b>, <b>“Repetition”</b> or <b>“All words”</b>. Good luck!
      </p>
    </div>
    <div class="learning__today card-wrap">
      <h3>Today learning</h3>
      <div class="learning__today__lerned">
        <div class="learning__today__lerned-text">
          Today lerned: <span>{{ index }}</span> from <span>{{ settings.maxCardDay }}</span>
        </div>
        <b-progress
          height="10px"
          :value="index"
          :max="settings.maxCardDay"
          class="mb-3"
        ></b-progress>
      </div>
      <button class="btn btn-primary btn-rs">Start learning</button>
    </div>
    <div class="learning__category">
      <div class="learning__category__card card-wrap">
        <h4>New words</h4>
        <p>Click here to learn new words for today.</p>
        <button class="btn btn-primary btn-rs" @click="trainNewWords" :disabled="isNewWordsLoading">
          Let’s train! <AppSpinner v-if="isNewWordsLoading"></AppSpinner>
        </button>
      </div>

      <div class="learning__category__card card-wrap">
        <h4>Repeat</h4>
        <p>Click here to repeat the learned words.</p>
        <button class="btn btn-primary btn-rs">Let’s train!</button>
      </div>

      <div class="learning__category__card card-wrap">
        <h4>All words</h4>
        <p>Here are all the words for today learning.</p>
        <button class="btn btn-primary btn-rs">Let’s train!</button>
      </div>
    </div>
  </div>
  <learning-words v-else></learning-words>
</template>

<script>
import AppSpinner from '@/components/AppSpinner.vue';
import LearningWords from '@/components/LearningWords.vue';
import { mapState, mapMutations, mapActions } from 'vuex';

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
  },
  computed: {
    ...mapState('Settings', ['settings']),
    ...mapState('Learning', ['isMainPage', 'index']),
  },
  methods: {
    ...mapActions('Learning', ['getNewWords']),
    ...mapActions('Error', ['setError']),
    ...mapMutations('Learning', ['setIsMainPage']),

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
};
</script>

<style scoped lang="scss">
.learning {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  padding: 25px 16px 0;
  color: $color-pickled-bluewood;
  background-color: $color-catskill-white;

  &__header {
    padding: 25px 53px 48px;

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
    background-color: white;
    border-radius: 24px;
    box-shadow: 1px 5px 14px rgba(55, 114, 227, 0.1);
  }

  .btn-rs {
    padding: 18px 60px;
    font-size: 20px;
    line-height: 24px;
    background: $color-dodger-blue;
    border: none;
    border-radius: 20px;
  }

  &__today {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 72px 77px;

    h3 {
      font-size: 32px;
      font-weight: bold;
      line-height: 39px;
    }

    &__lerned {
      font-size: 18px;
      line-height: 21px;

      .learning__today__lerned-text {
        margin-bottom: 16px;
      }

      .learning__today__lerned-text span {
        color: $color-dodger-blue;
      }
    }
  }

  &__category {
    display: flex;
    justify-content: space-between;
    margin-top: 48px;

    &__card {
      padding: 27px 60px 30px;
      text-align: center;

      h4 {
        margin-bottom: 14px;
        font-size: 24px;
        font-weight: bold;
        line-height: 29px;
      }

      p {
        max-width: 239px;
      }

      .btn-rs {
        margin-top: 30px;
      }
    }
  }
}
</style>
