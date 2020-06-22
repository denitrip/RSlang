<template>
  <div class="game__wrapper">
    <SavannahGameMenu />
    <SavannahGameMain />
  </div>
</template>

<script>
import SavannahGameMenu from '@/components/Savannah/SavannahGameMenu.vue';
import SavannahGameMain from '@/components/Savannah/SavannahGameMain.vue';

export default {
  name: 'SavannahGame',
  components: {
    SavannahGameMenu,
    SavannahGameMain,
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
