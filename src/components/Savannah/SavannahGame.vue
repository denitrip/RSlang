<template functional>
  <div class="game__wrapper">
    <component :is="props.components.SavannahGameMenu"></component>
    <component :is="props.components.SavannahGameMain"></component>
  </div>
</template>

<script>
import SavannahGameMenu from '@/components/Savannah/SavannahGameMenu.vue';
import SavannahGameMain from '@/components/Savannah/SavannahGameMain.vue';

export default {
  name: 'SavannahGame',
  props: {
    components: {
      type: Object,
      default() {
        return {
          SavannahGameMenu,
          SavannahGameMain,
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
