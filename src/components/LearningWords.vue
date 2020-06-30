<template>
  <div class="learning">
    <learning-card :word="words[index]"></learning-card>
    <b-progress
      :value="index"
      :max="settings.wordsPerDay"
      height="20px"
      class="learning__progress"
    ></b-progress>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import LearningCard from '@/components/LearningCard.vue';

export default {
  components: {
    LearningCard,
  },
  computed: {
    ...mapState('Learning', ['words', 'index']),
    ...mapState('Settings', ['settings']),
  },
};
</script>

<style scoped lang="scss">
.learning {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  &__progress {
    width: 100%;
    max-width: 400px;
    margin-top: 40px;
  }
}
</style>
