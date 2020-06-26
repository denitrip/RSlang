<template functional>
  <div class="game__wrapper">
    <component :is="props.components.AudiocallGameMenu"></component>
    <component :is="props.components.AudiocallGameMain"></component>
  </div>
</template>

<script>
import AudiocallGameMenu from '@/components/Audiocall/AudiocallGameMenu.vue';
import AudiocallGameMain from '@/components/Audiocall/AudiocallGameMain.vue';

export default {
  name: 'AudiocallGame',
  props: {
    components: {
      type: Object,
      default() {
        return {
          AudiocallGameMenu,
          AudiocallGameMain,
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
