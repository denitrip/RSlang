<template>
  <header class="header-container">
    <div class="container-label" :title="currentRoute">
      {{ currentRoute }}
    </div>
    <div class="user-section">
      <router-link :to="routerConsts.settings.path">
        <img src="@/assets/img/header/settings_image.png" alt="#" class="rot" title="Settings" />
      </router-link>
      <div class="user-details">
        <div class="user-name" :title="email">
          {{ email }}
        </div>
      </div>
      <div class="logout" @click="onLogout">
        <IconBase iconName="Log Out" width="34px" height="34px" viewBox="0 0 36 26">
          <IconLogOut />
        </IconBase>
      </div>
    </div>
  </header>
</template>

<script>
import IconBase from '@/components/IconBase.vue';
import IconLogOut from '@/components/icons/IconLogOut.vue';
import routerConsts from '@/router/routerConsts';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'MainHeader',
  components: {
    IconBase,
    IconLogOut,
  },
  data() {
    return {
      currentRoute: this.$router.currentRoute.name,
      routerConsts,
    };
  },
  computed: {
    ...mapState('Auth', ['email']),
  },
  watch: {
    $route(to) {
      this.currentRoute = to.name;
    },
  },
  methods: {
    ...mapActions('Auth', ['logoutUser']),
    onLogout() {
      this.logoutUser();
      this.$router.push(routerConsts.welcomePage.path);
    },
  },
};
</script>

<style scoped lang="scss">
.header-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  height: 86px;
  padding: 0 60px 0 75px;
  background-color: $color-white;
  box-shadow: 1px 5px 14px $box-shadow-one-color;

  @include media-tablet {
    justify-content: center;
    padding: 0 20px;
  }
}

.rot {
  width: 20px;
  height: 20px;
}

@keyframes rot {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.logout {
  margin-left: 5px;
  color: $color-black;
  transition: color 0.3s;
}

.container-label {
  display: inline-block;
  padding: 0;
  margin: 0;
  overflow: hidden;
  font-size: 36px;
  font-weight: 900;
  font-weight: bold;
  line-height: 44px;
  color: $color-gigas;
  text-overflow: ellipsis;
  text-transform: capitalize;
  white-space: nowrap;

  @include media-tablet {
    font-size: 24px;
    line-height: 44px;
  }
}

.user-section {
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.user-details {
  display: block;
  align-items: center;
  width: max-content;
  margin-left: 10px;

  @include media-mobile {
    display: none;
  }
}

.user-level {
  font-size: 12px;
  opacity: 50%;
}

.user-name {
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (hover: hover) {
  .logout:hover {
    color: $color-dodger-blue;
    cursor: pointer;
  }

  .rot:hover {
    animation: 1s linear 0s normal none infinite running rot;
  }
}

@media screen and (max-width: $mobile-big-width) {
  .header-container {
    padding-left: 70px;
    margin: 0;
  }

  .container-label h2 {
    font-size: 1.75rem;
  }
}
</style>
