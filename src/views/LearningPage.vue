<template>
  <div class="learning__wrapper">
    <learning-card  englishWord="water" russianWord="вода" transcription="[ˈˈwɔtər]" leadingQuestion="Drink to quench your thirst" sentanceWithWord="I like to drink water"></learning-card>
  </div>
</template>

<script>
import LearningCard from '../components/LearningCard.vue';

export default {
  name: 'LearningPage',
  components: {
    LearningCard,
  },
};
</script>

<style scoped lang="scss">
.learning {
  &__wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    max-width: $content-width;
    padding: 20px 0 30px 0;
    margin: auto;
  }
}
</style>
