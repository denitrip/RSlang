<template functional>
  <div class="wrapper">
    <component :is="props.components.SprintGameMenu"></component>
    <component :is="props.components.SprintGameMain"></component>
  </div>
</template>

<script>
import SprintGameMain from '@/components/Sprint/SprintGameMain.vue';
import SprintGameMenu from '@/components/Sprint/SprintGameMenu.vue';

export default {
  name: 'SprintGame',
  props: {
    components: {
      type: Object,
      default() {
        return {
          SprintGameMenu,
          SprintGameMain,
        };
      },
    },
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  height: calc(100% - 80px);
}
</style>
