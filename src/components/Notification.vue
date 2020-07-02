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
        <router-link :to="routerConsts.learningPage.path" style="color: white;">
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
  z-index: 10;
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
}

.buttons-wrapper {
  display: flex;
  flex-wrap: wrap;
  margin-top: 17px;
}

.close-button {
  position: absolute;
  top: 15px;
  right: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 21px;
  height: 22px;
  color: $color-white;
  background: $color-manatee;
  border: 1px solid $color-manatee;
  border-radius: 50%;
}

.Primary-1 {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 55px;
  padding: 18px 40px;
  color: $color-dodger-blue;
  background: $color-white;
  border: 1px solid $color-dodger-blue;
  border-radius: 20px;
  outline: none;
}

.Primary-2 {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 55px;
  padding: 18px 40px;
  margin-left: 8px;
  color: $color-white;
  background: $color-dodger-blue;
  border: 1px solid $color-dodger-blue;
  border-radius: 20px;
  outline: none;
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
