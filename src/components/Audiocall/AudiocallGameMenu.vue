<template>
  <div class="game__menu">
    <div class="game__settings">
      <div class="setting__sound" @click="soundToggle">
        <IconBase iconName="sound" width="36px" height="24px" v-if="isSound">
          <IconVolume />
        </IconBase>
        <IconBase iconName="sound" width="36px" height="24px" v-else>
          <IconVolumeOff />
        </IconBase>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import IconBase from '@/components/IconBase.vue';
import IconVolume from '@/components/icons/IconVolume.vue';
import IconVolumeOff from '@/components/icons/IconVolumeOff.vue';

export default {
  name: 'AudiocallGameMenu',
  components: {
    IconBase,
    IconVolume,
    IconVolumeOff,
  },
  computed: {
    ...mapState('Audiocall', ['lives', 'lost', 'isSound']),
  },
  methods: {
    ...mapMutations('Audiocall', ['setIsSound']),

    soundToggle() {
      this.setIsSound(!this.isSound);
    },
  },
};
</script>

<style lang="scss" scoped>
.game__menu {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px 40px 0 40px;
}

.game__settings {
  display: flex;
}

.setting__sound {
  width: 36px;
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
