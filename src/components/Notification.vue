<template>
  <div>
    <div class="notification" @click="close"></div>
    <div class="window">
      <button class="close-button" @click="close" :title="$t('notify.closeButtonText')">
        &times;
      </button>
      <h2 class="title">{{ $t('notify.title1') }}</h2>
      <h2 class="title">{{ $t('notify.title2') }}</h2>
      <p class="text">
        {{ $t('notify.text1') }}<br />
        {{ $t('notify.text2') }}
        <router-link :to="routerConsts.settings.path">{{ $t('notify.linkSettings') }}</router-link>
        {{ $t('notify.text3') }}<br />
        {{ $t('notify.text4') }}
        <span @click="close">
          <router-link :to="routerConsts.learningPage.path">
            {{ $t('notify.linkLearning') }}
          </router-link>
        </span>
      </p>
      <div class="buttons-wrapper">
        <router-link :to="routerConsts.settings.path">
          <button class="Primary-1">{{ $t('notify.settingsButtonText') }}</button>
        </router-link>
        <router-link :to="routerConsts.learningPage.path">
          <button class="Primary-2" @click="close">{{ $t('notify.learningButtonText') }}</button>
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
  z-index: 99;
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
  outline: none;
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
    top: 90px;
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
