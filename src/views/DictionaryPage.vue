<template>
  <div class="">
    Dictionary Page
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

<style>
</style>
