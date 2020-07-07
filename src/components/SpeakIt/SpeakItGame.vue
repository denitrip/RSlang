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

.game__image {
  position: absolute;
  top: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position-x: left;
  background-position-y: 100%;
  transition: background 1.5s;
}

// @media screen and (max-width: $puzzle-mobile-size) {
//   .game__wrapper {
//     padding: 40px 5px;
//   }
// }
</style>
