<template>
  <div class="menu" :class="{ 'menu-open': isOpen, 'menu-close': !isOpen }">
    <div class="menu__logo" v-if="isOpen">RSlang</div>
    <div class="menu__burger" v-if="!isOpen">
      <div class="menu__burger-wrapper" @click="openMenu">
        <IconBase iconName="Open menu" width="34px" height="34px" viewBox="0 0 32 28">
          <IconBurger />
        </IconBase>
      </div>
    </div>
    <div class="nav-wrapper">
      <nav class="menu__navigation">
        <router-link
          class="menu__link"
          v-for="item of menuItems"
          :key="item.name"
          :to="item.route"
          active-class="active-link"
        >
          <IconBase :iconName="item.name" width="34px" height="34px" :viewBox="item.icon.viewbox">
            <component :is="`Icon${item.icon.name}`" />
          </IconBase>
          <p v-if="isOpen">{{ item.name }}</p>
        </router-link>
      </nav>
      <div class="menu__switch" @click="closeMenu" v-if="isOpen" title="Hide menu">
        <img class="menu__arrowHide" src="../assets/img/sideMenu/arrowHide.svg" alt="" />
      </div>
      <div class="menu__logout" @click="onLogout">
        <IconBase iconName="Log Out" width="34px" height="34px" viewBox="0 0 36 26">
          <IconLogOut />
        </IconBase>
        <p v-if="isOpen">Log Out</p>
      </div>
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
import { mapActions } from 'vuex';

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
          name: routerConsts.learningPage.name,
          route: routerConsts.learningPage.path,
          icon: {
            name: 'Audiobook',
            viewbox: '0 0 64 64',
          },
        },
        {
          name: routerConsts.dictionaryPage.name,
          route: routerConsts.dictionaryPage.path,
          icon: {
            name: 'Dictionary',
            viewbox: '0 0 512 512',
          },
        },
        {
          name: routerConsts.miniGamesPage.name,
          route: routerConsts.miniGamesPage.path,
          icon: {
            name: 'Joystick',
            viewbox: '0 0 64 64',
          },
        },
        {
          name: routerConsts.statisticPage.name,
          route: routerConsts.statisticPage.path,
          icon: {
            name: 'BarChart',
            viewbox: '0 0 480 480',
          },
        },
        {
          name: routerConsts.ourTeamPage.name,
          route: routerConsts.ourTeamPage.path,
          icon: {
            name: 'GroupOfMen',
            viewbox: '0 0 151 151',
          },
        },
        {
          name: routerConsts.settings.name,
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
    ...mapActions('Auth', ['logoutUser']),

    closeMenu() {
      this.isOpen = false;
    },
    openMenu() {
      this.isOpen = true;
    },
    onLogout() {
      this.logoutUser();
      this.$router.push('/welcome');
    },
  },
};
</script>

<style scoped lang="scss">
.menu__arrowHide {
  transition: 0.5s;
}

.active-link {
  g {
    color: $color-golden-dream;
  }

  background: $color-prussian-blue;
}

.menu {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  min-height: 100vh;
  color: $color-white;
  text-align: center;
  background: $color-nile-blue;
  transition: width 0.5s;

  &__logo {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 86px;
    font-size: 36px;
    font-weight: 800;
    background: $color-prussian-blue;
  }

  &__burger {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 86px;
    color: $color-white;
    cursor: pointer;
    background: $color-prussian-blue;

    &:hover {
      color: $color-golden-dream;
    }
  }

  &__navigation {
    margin-top: 40px;
    font-size: 20px;
    font-weight: normal;
  }

  &__link {
    display: flex;
    align-items: center;
    padding: 15px;
    margin-bottom: 32px;
    margin-left: 60px;
    color: $color-white;
    text-decoration: none;
    cursor: pointer;
    border-radius: 50px 0 0 50px;
    transition: all 0.25s;

    p {
      margin-left: 10px;
    }

    &:hover {
      g {
        color: $color-golden-dream;
      }

      padding-left: 60px;
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
    background: $color-prussian-blue no-repeat center;
    border-radius: 50px 0 0 50px;
    transition: background-color 0.5s;

    &:hover {
      background-color: $color-rhino;
    }
  }

  &__logout {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 86px;
    font-size: 24px;
    font-weight: 500;
    color: $color-white;
    cursor: pointer;
    background: $color-prussian-blue;
    transition: color 0.5s;

    p {
      margin-left: 8px;
    }

    &:hover {
      color: $color-golden-dream;
    }
  }
}

.nav-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.menu-open {
  width: 300px;
}

.menu-close {
  width: 60px;

  .menu__link {
    margin-left: 0;
  }
}

@media screen and (max-width: $desktop-width) {
  .menu__navigation {
    margin-top: 12;
  }

  .menu__link {
    margin-bottom: 12px;
  }
}

@media screen and (max-width: $tablet-width) {
  .menu__navigation {
    margin-top: 10px;
  }

  .menu-open {
    position: fixed;
    left: 0;
    z-index: 2;
    width: 100vw;
  }
}

@media screen and (max-width: $mobile-big-width) {
  .menu__navigation {
    margin-top: 10px;
  }

  .menu__link {
    margin-bottom: 10px;
  }
}

@media screen and (max-width: $mobile-small-width) {
  .menu__navigation {
    margin-top: 0;
  }

  .menu__link {
    padding: 12px;
    margin-bottom: 0;
  }
}
</style>
