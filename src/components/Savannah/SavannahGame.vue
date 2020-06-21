<template>
  <div class="game__wrapper">
    <div class="game__image"></div>
    <div class="game__menu">
      <div class="game__settings">
        <div class="setting__sound" @click="soundToggle">
          <IconBase iconName="sound" width="30px" height="24px" v-if="isSound">
            <IconVolume />
          </IconBase>
          <IconBase iconName="sound" width="30px" height="24px" v-else>
            <IconVolumeOff />
          </IconBase>
        </div>
        <div class="setting__language">Lang</div>
      </div>
      <div class="game__lives">
        <span class="hearth__lost" v-for="(item, i) in lost" :key="i">
          <IconBase iconName="live" width="24px" height="24px">
            <IconHearthLost />
          </IconBase>
        </span>
        <span class="hearth" v-for="(item, i) in lives" :key="i">
          <IconBase iconName="live" width="24px" height="24px">
            <IconHearth />
          </IconBase>
        </span>
      </div>
    </div>
    <div class="game__main"></div>
  </div>
</template>

<script>
import IconBase from '@/components/IconBase.vue';
import IconHearthLost from '@/components/icons/IconHearthLost.vue';
import IconHearth from '@/components/icons/IconHearth.vue';
import IconVolume from '@/components/icons/IconVolume.vue';
import IconVolumeOff from '@/components/icons/IconVolumeOff.vue';

export default {
  name: 'SavannahGame',
  components: {
    IconBase,
    IconHearthLost,
    IconHearth,
    IconVolume,
    IconVolumeOff,
  },
  data() {
    return {
      lives: new Array(5),
      lost: [],
      isSound: false,
    };
  },
  methods: {
    soundToggle() {
      this.isSound = !this.isSound;
    },
  },
};
</script>

<style lang="scss" scoped>
.game__wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  color: $color-white;
}

.game__image {
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-image: linear-gradient($overlay-color, $overlay-color),
    url('~@/assets/img/savannah/start-screen.jpg');
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: 100%;
}

.game__menu {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px 40px 0 40px;
}

.game__settings {
  display: flex;
}

.game__main {
  display: flex;
  width: 100%;
  height: calc(100% - 64px);
}

.game__lives {
  display: flex;
}

.hearth,
.hearth__lost {
  width: 24px;
  height: 24px;
  margin-right: 5px;
}

.setting__sound {
  width: 30px;
  height: 24px;
  margin-right: 5px;
  cursor: pointer;
  transition: color 0.3s;
}

@media (hover: hover) {
  .setting__sound:hover {
    color: $color-dodger-blue;
  }
}
</style>
