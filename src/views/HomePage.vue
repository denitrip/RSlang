<template>
  <div class="homePage">
    <div class="homePage__sideMenu">
      <SideMenu />
    </div>
    <div class="homePage__content">
      <div class="homePage__header">
        <main-header />
      </div>
      <div class="homePage__routerView">
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import MainHeader from '../components/MainHeader.vue';
import SideMenu from '../components/SideMenu.vue';

export default {
  name: 'HomePage',
  components: { SideMenu, MainHeader },
  computed: {
    currentRoute() {
      return this.$router.currentRoute.name;
    },
  },
};
</script>

<style lang="scss" scoped>
.homePage {
  display: flex;
  overflow: auto;

  &__content {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  &__routerView {
    height: 100%;
    min-height: calc(100vh - 86px);
    overflow-y: auto;
  }
}
</style>
