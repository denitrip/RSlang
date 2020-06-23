<template>
  <div class="learning">
    <div class="learning__header">
      <h1><span>Hello.</span> Let’s start learning!</h1>
      <p>
        On this page, you can monitor your progress and select the desired set of words to learn,
        for example, <b>“New words”</b>, <b>“Repetition”</b> or <b>“All words”</b>. Good luck!
      </p>
    </div>
    <div class="learning__today"></div>
    <div class="learning__category"></div>
  </div>
</template>

<script>
import LearningCard from '../components/LearningCard.vue';

export default {
  name: 'LearningPage',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    LearningCard,
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
  background-color: $color-catskill-white;

  &__header {
    padding: 25px 69px 48px;

    h1 {
      font-size: 56px;
      font-weight: 900;
      line-height: 63px;
      color: $color-pickled-bluewood;

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
}
</style>
