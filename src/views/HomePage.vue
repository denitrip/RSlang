<template>
  <div class="">
    Home Page <main-header />
    <SideMenu />
    <transition name="component-fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import MainHeader from '../components/MainHeader.vue';
import SideMenu from '../components/SideMenu.vue';

export default {
  name: 'HomePage',
  components: { SideMenu, MainHeader },
};
</script>
