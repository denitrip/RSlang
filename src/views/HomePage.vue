<template>
  <div class="">
    Home Page
    <SideMenu />
    <transition name="component-fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import SideMenu from '../components/SideMenu.vue';

export default {
  name: 'HomePage',
  components: {
    SideMenu,
  },
};
</script>

<style></style>
