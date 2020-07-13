<template>
  <div class="homePage">
    <div class="homePage__sideMenu">
      <SideMenu />
      <transition name="fade">
        <div class="menu__overlay" @click="close" v-if="isOpen"></div>
      </transition>
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
import MainHeader from '@/components/MainHeader.vue';
import SideMenu from '@/components/SideMenu.vue';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'HomePage',
  components: { SideMenu, MainHeader },
  computed: {
    ...mapState('SideMenu', ['menuItems', 'isOpen']),

    currentRoute() {
      return this.$router.currentRoute.name;
    },
  },
  methods: {
    ...mapMutations('SideMenu', ['setIsOpen']),

    close() {
      this.setIsOpen(false);
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
    width: calc(100% - 60px);
    margin-left: 60px;
  }

  &__routerView {
    height: 100%;
    min-height: calc(100vh - 86px);
    margin-top: 86px;
    overflow-y: auto;
  }

  &__header {
    position: fixed;
    z-index: 5;
    width: 100%;
    opacity: 0.99;
  }
}

.menu__overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: $overlay-color;
}

@media screen and (max-width: $mobile-big-width) {
  .homePage__content {
    width: 100%;
    margin-left: 0;
  }
}
</style>
