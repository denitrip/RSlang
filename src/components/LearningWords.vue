<template>
  <div class="learning">
    <b-progress :value="index" :max="settings.wordsPerDay" height="20px" class="w-50 mb-3 learning__progress"></b-progress>
    <learning-card
      :englishWord="words[index].word"
      :russianWord="words[index].wordTranslate"
      :transcription="words[index].transcription"
      :textMeaning="words[index].textMeaning"
      :textMeaningTranslate="words[index].textMeaningTranslate"
      :textExample="words[index].textExample"
      :textExampleTranslate="words[index].textExampleTranslate"
      :image="getImageSrc"
    ></learning-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import LearningCard from '@/components/LearningCard.vue';
import { dataSrc } from '@/helpers/constants.helper';

export default {
  data() {
    return {
      dataSrc,
    };
  },
  components: {
    LearningCard,
  },
  computed: {
    ...mapState('Learning', ['words', 'index']),
    ...mapState('Settings', ['settings']),

    getImageSrc() {
      return `${this.dataSrc}${this.words[this.index].image}`;
    },
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
    margin-bottom: 40px;
  }
}

</style>
