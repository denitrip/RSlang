<template functional>
  <div class="game__wrapper" key="ourGame-game">
    <component :is="props.components.OurGameGameMenu"></component>
    <component :is="props.components.OurGameGameMain"></component>
  </div>
</template>

<script>
import OurGameGameMenu from '@/components/OurGame/OurGameGameMenu.vue';
import OurGameGameMain from '@/components/OurGame/OurGameGameMain.vue';

export default {
  name: 'OurGameGame',
  props: {
    components: {
      type: Object,
      default() {
        return {
          OurGameGameMenu,
          OurGameGameMain,
        };
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.game__wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  color: $color-white;
}
</style>
