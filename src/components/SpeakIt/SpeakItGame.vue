<template functional>
  <div class="game__wrapper">
    <component :is="props.components.SpeakItGameMenu"></component>
    <component :is="props.components.SpeakItGameMain"></component>
    <component :is="props.components.SpeakItGameControls"></component>
  </div>
</template>

<script>
import SpeakItGameMenu from '@/components/SpeakIt/SpeakItGameMenu.vue';
import SpeakItGameMain from '@/components/SpeakIt/SpeakItGameMain.vue';
import SpeakItGameControls from '@/components/SpeakIt/SpeakItGameControls.vue';

export default {
  name: 'EnglishPuzzleGame',
  props: {
    components: {
      type: Object,
      default() {
        return {
          SpeakItGameMenu,
          SpeakItGameMain,
          SpeakItGameControls,
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
    padding: 40px 5px;
  }
}
</style>
