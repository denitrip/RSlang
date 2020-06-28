<template>
  <div>
    <div class="video-overlay" @click="close" v-if="isVideoShow"></div>
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
  components: {},
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
  top: calc(50% - 200px);
  left: calc(50% - 217px);
  z-index: 10;
  display: flex;
  flex-direction: column;
  background: $color-white;
  border: 1px solid $color-black;
  box-shadow: 1px 5px 14px $box-shadow-one-color;
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
  width: 560px;
  height: 315px;
}

.button {
  box-sizing: border-box;
  width: 100%;
  font-size: 20px;
  line-height: 54px;
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
  margin-left: 16px;
  color: $color-dodger-blue;
  border: 1px solid $color-dodger-blue;
}

.button--bordered:hover {
  color: $color-cornflower-blue;
  border: 1px solid $color-cornflower-blue;
}

@media screen and (max-width: $puzzle-mobile-size) {
  .video {
    left: 0;
    width: 100%;
  }

  iframe {
    width: 100%;
    max-width: '560px';
  }
}
</style>
