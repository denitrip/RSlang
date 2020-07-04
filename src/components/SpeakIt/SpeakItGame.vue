<template functional>
  <div class="game__wrapper">
    <component :is="props.components.SpeakitGameMenu"></component>
    <component :is="props.components.SpeakitGameMain"></component>
    <component :is="props.components.SpeakitGameControls"></component>
  </div>
</template>

<script>
import SpeakitGameMenu from '@/components/SpeakIt/SpeakItGameMenu.vue';
import SpeakitGameMain from '@/components/SpeakIt/SpeakItGameMain.vue';
import SpeakitGameControls from '@/components/SpeakIt/SpeakItGameControls.vue';

export default {
  name: 'SpeakitGame',
  props: {
    components: {
      type: Object,
      default() {
        return {
          SpeakitGameMenu,
          SpeakitGameMain,
          SpeakitGameControls,
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
