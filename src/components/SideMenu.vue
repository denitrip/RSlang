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
      <router-link
        class="menu__link"
        v-for="item of menuItems"
        :key="item.name"
        :to="item.route"
        active-class="active-link"
      >
        <IconBase
          :iconName="item.icon.name"
          width="34px"
          height="34px"
          :viewBox="item.icon.viewbox"
        >
          <component :is="`Icon${item.icon.name}`" />
        </IconBase>
        <p v-if="isOpen">{{ item.name }}</p>
      </router-link>
    </nav>
    <div class="menu__switch" @click="closeMenu" v-if="isOpen">
      <img class="menu__arrowHide" src="../assets/img/sideMenu/arrowHide.svg" alt="" />
    </div>
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
import IconDictionary from '@/components/icons/IconDictionary.vue';
import IconJoystick from '@/components/icons/IconJoystick.vue';
import IconBarChart from '@/components/icons/IconBarChart.vue';
import IconGroupOfMen from '@/components/icons/IconGroupOfMen.vue';
import IconSettings from '@/components/icons/IconSettings.vue';
import IconAudiobook from '@/components/icons/IconAudiobook.vue';
import routerConsts from '@/router/routerConsts';

export default {
  name: 'SideMenu',
  components: {
    IconBase,
    IconLogOut,
    IconBurger,
    IconDictionary,
    IconJoystick,
    IconBarChart,
    IconGroupOfMen,
    IconSettings,
    IconAudiobook,
  },
  data() {
    return {
      isOpen: true,
      menuItems: [
        {
          name: 'Learning',
          route: routerConsts.learning.path,
          icon: {
            name: 'Audiobook',
            viewbox: '0 0 64 64',
          },
        },
        {
          name: 'Dictionary',
          route: routerConsts.dictionary.path,
          icon: {
            name: 'Dictionary',
            viewbox: '0 0 512 512',
          },
        },
        {
          name: 'Mini games',
          route: routerConsts.miniGamesPage.path,
          icon: {
            name: 'Joystick',
            viewbox: '0 0 64 64',
          },
        },
        {
          name: 'Statistic',
          route: routerConsts.statistic.path,
          icon: {
            name: 'BarChart',
            viewbox: '0 0 480 480',
          },
        },
        {
          name: 'Our team',
          route: routerConsts.ourTeamPage.path,
          icon: {
            name: 'GroupOfMen',
            viewbox: '0 0 151 151',
          },
        },
        {
          name: 'Settings',
          route: routerConsts.settings.path,
          icon: {
            name: 'Settings',
            viewbox: '0 0 480 480',
          },
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
.menu__arrowHide {
  transition: 0.5s;
}

.menu {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  color: $color-white;
  text-align: center;
  background: $color-nile-blue;
  transition: 0.5s;

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
    color: $color-white;
    cursor: pointer;
    background: $color-prussian-blue;

    &:hover {
      color: $color-golden-dream;
    }
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
    color: $color-white;
    text-decoration: none;
    cursor: pointer;
    border-radius: 50px 0 0 50px;
    transition: 0.25s;

    p {
      margin-left: 10px;
    }

    &:hover {
      margin-left: 15px;
      color: $color-golden-dream;
      background: $color-prussian-blue;
    }
  }

  &__switch {
    display: flex;
    align-items: center;
    align-self: flex-end;
    justify-content: center;
    width: 25px;
    height: 50px;
    cursor: pointer;
    background: $color-prussian-blue no-repeat center; // url('../assets/img/sideMenu/arrowHide.svg')
    border: 1px solid $color-white;
    border-radius: 50px 0 0 50px;
    transition: 0.5s;

    &:hover {
      background-color: $color-portica;

      .menu__arrowHide {
        filter: invert(1);
      }
    }
  }

  &__logout {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 86px;
    font-size: 24px;
    font-weight: 500;
    color: $color-white;
    cursor: pointer;
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

.active-link {
  color: $color-golden-dream;
  background: $color-prussian-blue;
}
</style>
