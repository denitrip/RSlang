<template>
  <div class="menu" :class="{ 'menu-open': isOpen, 'menu-close': !isOpen }">
    <div class="menu__logo" v-if="isOpen">RSlang</div>
    <div class="menu__burger" v-if="!isOpen">
      <div class="menu__burger-wrapper" @click="openMenu">
        <IconBase iconName="burger" width="34px" height="34px" viewBox="0 0 32 28">
          <IconBurger />
        </IconBase>
      </div>
    </div>
    <nav class="menu__navigation">
      <div class="menu__link" v-for="item of menuItems" :key="item.name">
        <img :src="item.image" alt="" />
        <p v-if="isOpen">{{ item.name }}</p>
      </div>
    </nav>
    <div class="menu__switch" @click="closeMenu" v-if="isOpen"></div>
    <div class="menu__logout">
      <IconBase iconName="log out" width="34px" height="34px" viewBox="0 0 36 26">
        <IconLogOut />
      </IconBase>
      <p v-if="isOpen">Log Out</p>
    </div>
  </div>
</template>

<script>
import IconBase from '@/components/IconBase.vue';
import IconLogOut from '@/components/icons/IconLogOut.vue';
import IconBurger from '@/components/icons/IconBurger.vue';

export default {
  name: 'SideMenu',
  components: {
    IconBase,
    IconLogOut,
    IconBurger,
  },
  data() {
    return {
      isOpen: true,
      menuItems: [
        {
          name: 'Learning',
          image: require('../assets/img/sideMenu/learning.png'),
          route: '/',
        },
        {
          name: 'Dictionary',
          image: require('../assets/img/sideMenu/dictionary.png'),
          route: '/',
        },
        {
          name: 'Joystick',
          image: require('../assets/img/sideMenu/joystick.png'),
          route: '/',
        },
        {
          name: 'Statistic',
          image: require('../assets/img/sideMenu/statistiс.png'),
          route: '/',
        },
        {
          name: 'Our team',
          image: require('../assets/img/sideMenu/our-team.png'),
          route: '/',
        },
        {
          name: 'Settings',
          image: require('../assets/img/sideMenu/settings.png'),
          route: '/',
        },
      ],
    };
  },
  methods: {
    closeMenu() {
      this.isOpen = false;
    },
    openMenu() {
      this.isOpen = true;
    },
  },
};
</script>

<style scoped lang="scss">
.menu {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  color: $color-white;
  text-align: center;
  background: $color-nile-blue;

  &__logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
    font-size: 36px;
    font-weight: 800;
    background: $color-prussian-blue;
  }

  &__burger {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
    background: $color-prussian-blue;
  }

  &__navigation {
    font-size: 20px;
    font-weight: normal;
  }

  &__link {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
    margin-top: 15px;
    border-radius: 50px 0 0 50px;
    transition: 0.25s;

    p {
      margin-left: 10px;
    }

    &:hover {
      color: $color-golden-dream;
      background: $color-prussian-blue;

      img {
        margin-left: 15px;
      }
    }
  }

  &__switch {
    align-self: flex-end;
    width: 25px;
    height: 50px;
    background: $color-prussian-blue url('../assets/img/sideMenu/arrowHide.svg') no-repeat center;
    border: 1px solid white;
    border-radius: 50px 0 0 50px;
  }

  &__logout {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 86px;
    font-size: 24px;
    font-weight: 500;
    color: white;
    background: $color-prussian-blue;

    &:hover {
      color: $color-golden-dream;
    }
  }
}

.menu-open {
  width: 300px;
}

.menu-close {
  width: 60px;
}
</style>
