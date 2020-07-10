<template>
  <div>
    <div class="notification" @click="close"></div>
    <div class="window">
      <button class="close-button" @click="close">&times;</button>
      <h2 class="title">Well done!</h2>
      <h2 class="title">It´s enough for today</h2>
      <p class="text">
        You still have new cards, but the daily limit has been reached.<br />
        You can increase your daily limit in the application
        <router-link :to="routerConsts.settings.path">settings.</router-link> But don’t forget that
        the more new cards you see, the more words to repeat.<br />
        If you want to continue training, click to
        <span @click="close"
          ><router-link :to="routerConsts.learningPage.path">learn more.</router-link></span
        >
      </p>
      <div class="buttons-wrapper">
        <router-link :to="routerConsts.settings.path">
          <button class="Primary-1">
            Settings
          </button>
        </router-link>
        <router-link :to="routerConsts.learningPage.path">
          <button class="Primary-2" @click="close">
            Learn more
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import routerConsts from '@/router/routerConsts';

export default {
  name: 'Notification',
  components: {},
  data() {
    return {
      routerConsts,
    };
  },
  methods: {
    ...mapMutations('Notification', ['setIsNotificationShow']),
    ...mapMutations('Learning', ['setIsMainPage']),
    close() {
      this.setIsNotificationShow(false);
      this.setIsMainPage(true);
    },
  },
};
</script>

<style scoped lang="scss">
.window {
  position: fixed;
  top: calc(50% - 200px);
  left: calc(50% - 217px);
  z-index: 100;
  display: flex;
  flex-direction: column;
  max-width: 434px;
  padding: 40px;
  background: $color-white;
  border: 1px solid $color-black;
  border-radius: 24px;
  box-shadow: 1px 5px 14px $box-shadow-one-color;
}

.notification {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-color: $overlay-color;
}

.window a {
  color: $color-dodger-blue;
  text-decoration: none;
}

.title {
  font-size: 24px;
  font-weight: 900;
  line-height: 30px;
  color: $color-dodger-blue;
  text-align: center;
}

.text {
  margin-top: 13px;
  font-size: 16px;
  font-weight: normal;
  line-height: 24px;
  color: $color-pickled-bluewood;
  text-align: justify;
}

.buttons-wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin-top: 17px;
}

.close-button {
  position: absolute;
  top: 15px;
  right: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  font-size: 30px;
  color: $color-manatee;
  background-color: transparent;
  border: 1px solid transparent;
  border-radius: 50%;
  transition: background-color 0.3s, color 0.3s;
}

.Primary-1,
.Primary-2 {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 55px;
  padding: 18px 40px;
  border: 1px solid $color-dodger-blue;
  border-radius: 20px;
  outline: none;
}

.Primary-1 {
  color: $color-dodger-blue;
  background-color: $color-white;
  transition: color 0.3s, border-color 0.3s;
}

.Primary-2 {
  margin-left: 8px;
  color: $color-white;
  background-color: $color-dodger-blue;
  transition: background-color 0.3s, border-color 0.3s;
}

@media (hover: hover) {
  .text {
    a:hover {
      text-decoration: underline;
    }
  }

  .Primary-1:hover {
    color: $color-malibu;
    border-color: $color-malibu;
  }

  .Primary-2:hover {
    background-color: $color-malibu;
    border-color: $color-malibu;
  }

  .close-button:hover {
    color: $color-white;
    background-color: $color-manatee;
  }
}

@media screen and (max-width: $puzzle-mobile-size) {
  .window {
    top: 0;
    left: 0;
    margin: 10px;
  }

  .buttons-wrapper {
    flex-direction: column;
  }

  .Primary-2 {
    margin-top: 10px;
    margin-left: 0;
  }
}
</style>
