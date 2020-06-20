<template>
  <div class="dictionary__wrapper">
    <dictionary-card  englishWord="strawberry" russianWord="клубника"></dictionary-card>
      <dictionary-card  englishWord="strawberry" russianWord="клубника"></dictionary-card>

  </div>
</template>

<script>
import DictionaryCard from '../components/DictionaryCard.vue';

export default {
  name: 'DictionaryPage',
  components: {
    DictionaryCard,
  },
};
</script>

<style scoped lang="scss">
.dictionary {
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
