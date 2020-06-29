<template>
  <header class="header-container">
    <div class="container-label">
      {{ currentRoute }}
    </div>
    <div class="user-section">
      <!-- <img src="../assets/img/header/notifications_image.png" alt="#" /> -->
      <router-link :to="routerConsts.settings.path"
        ><img src="../assets/img/header/settings_image.png" alt="#" class="rot"
      /></router-link>
      <div class="user-details">
        <div class="user-name" :title="email">
          {{ email }}
        </div>
        <!--<div class="user-level">
          Level 3
        </div>-->
      </div>
      <div class="user-avatar">
        <img src="../assets/img/header/user_image.png" alt="#" />
      </div>
    </div>
  </header>
</template>

<script>
import routerConsts from '@/router/routerConsts';
import { mapState } from 'vuex';

export default {
  name: 'MainHeader',
  components: {},
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
};
</script>

<style scoped lang="scss">
.header-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  height: 86px;
  margin: 0 60px 0 75px;

  @include media-tablet {
    justify-content: center;
    margin: 0;
  }
}

img.rot {
  width: 20px;
  height: 20px;
  margin-left: 16px;
}

img.rot:hover {
  animation: 1s linear 0s normal none infinite running rot;
}

@keyframes rot {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.container-label {
  display: inline-block;
  padding: 0;
  margin: 0;
  margin-left: 0;
  font-size: 36px;
  font-weight: 900;
  font-weight: bold;
  line-height: 44px;
  color: $color-gigas;

  @include media-tablet {
    justify-content: center;
    margin: 0;
    font-size: 24px;
    line-height: 44px;
  }
}

.user-section {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-left: 10px;
}

.user-details {
  display: block;
  align-items: center;
  width: max-content;
  margin-left: 16px;

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

.user-avatar img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

@media (max-width: 414px) {
  .header-container {
    justify-content: center;
    margin: 0;
  }

  .container-label h2 {
    font-size: 1.75rem;
  }

  .user-avatar img {
    width: 40px;
    height: 40px;
  }
}
</style>
