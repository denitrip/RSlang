<template functional>
  <div class="game__wrapper" key="englishPuzzle-game">
    <component :is="props.components.EnglishPuzzleGameMenu"></component>
    <component :is="props.components.EnglishPuzzleGameTooltips"></component>
    <component :is="props.components.EnglishPuzzleGameMain"></component>
    <component :is="props.components.EnglishPuzzleGameControls"></component>
  </div>
</template>

<script>
import EnglishPuzzleGameMenu from '@/components/EnglishPuzzle/EnglishPuzzleGameMenu.vue';
import EnglishPuzzleGameTooltips from '@/components/EnglishPuzzle/EnglishPuzzleGameTooltips.vue';
import EnglishPuzzleGameMain from '@/components/EnglishPuzzle/EnglishPuzzleGameMain.vue';
import EnglishPuzzleGameControls from '@/components/EnglishPuzzle/EnglishPuzzleGameControls.vue';

export default {
  name: 'EnglishPuzzleGame',
  props: {
    components: {
      type: Object,
      default() {
        return {
          EnglishPuzzleGameMenu,
          EnglishPuzzleGameTooltips,
          EnglishPuzzleGameMain,
          EnglishPuzzleGameControls,
        };
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.game__wrapper {
  padding: 40px 0;
}

@media screen and (max-width: $puzzle-mobile-size) {
  .game__wrapper {
    padding: 40px 10px;
  }
}
</style>
