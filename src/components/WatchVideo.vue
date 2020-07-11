<template>
  <div>
    <transition name="fade">
      <div class="video-overlay" @click="close" v-if="isVideoShow"></div>
    </transition>
    <div class="video" v-if="isVideoShow">
      <iframe
        src="https://www.youtube.com/embed/fFIW-p53gB8"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>

    <button @click="open" class=" button button--bordered">Watch video</button>
  </div>
</template>

<script>
import routerConsts from '@/router/routerConsts';

export default {
  name: 'WatchVideo',
  data() {
    return {
      routerConsts,
      isVideoShow: false,
    };
  },
  methods: {
    close() {
      this.isVideoShow = false;
    },
    open() {
      this.isVideoShow = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.video {
  position: fixed;
  top: calc(50% - 158px);
  left: calc(50% - 281px);
  z-index: 100;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 560px;
}

.video-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-color: $overlay-color;
}

iframe {
  width: 100%;
  height: 315px;
}

.button {
  box-sizing: border-box;
  width: 100%;
  height: 59px;
  font-size: 20px;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  background-color: $color-white;
  border-radius: 20px;

  @media screen and (max-width: $tablet-width) {
    font-size: 18px;
  }

  @media screen and (max-width: $mobile-big-width) {
    font-size: 14px;
  }
}

.button--bordered {
  color: $color-dodger-blue;
  border: 1px solid $color-dodger-blue;
}

@media (hover: hover) {
  .button--bordered:hover {
    color: $color-cornflower-blue;
    border: 1px solid $color-cornflower-blue;
  }
}

@media screen and (max-width: $puzzle-mobile-size) {
  .video {
    left: 0;
  }
}
</style>
