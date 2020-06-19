<template>
  <div class="">
    Learning Page
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

<style>
</style>
