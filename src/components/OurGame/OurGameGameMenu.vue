<template>
  <div class="game__menu">
    <div class="game__settings">
      <div class="setting__sound" @click="soundToggle">
        <IconBase :iconName="$t('sound')" width="36px" height="24px" v-if="isSound">
          <IconVolume />
        </IconBase>
        <IconBase :iconName="$t('sound')" width="36px" height="24px" v-else>
          <IconVolumeOff />
        </IconBase>
      </div>
      <p class="level">{{ $t('ourGame.level') }}: {{ group + 1 }}</p>
      <p class="score">{{ $t('ourGame.score') }}: {{ score }}</p>
    </div>
    <div class="game__lives">
      <span class="hearth__lost" v-for="(item, i) in lost" :key="`${i}-lost`">
        <IconBase :iconName="$t('ourGame.live')" width="24px" height="24px">
          <IconHearthLost />
        </IconBase>
      </span>
      <span class="hearth" v-for="(item, i) in lives" :key="`${i}-live`">
        <IconBase :iconName="$t('ourGame.live')" width="24px" height="24px">
          <IconHearth />
        </IconBase>
      </span>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import IconBase from '@/components/IconBase.vue';
import IconVolume from '@/components/icons/IconVolume.vue';
import IconVolumeOff from '@/components/icons/IconVolumeOff.vue';
import IconHearthLost from '@/components/icons/IconHearthLost.vue';
import IconHearth from '@/components/icons/IconHearth.vue';

export default {
  name: 'OurGameGameMenu',
  components: {
    IconBase,
    IconVolume,
    IconVolumeOff,
    IconHearthLost,
    IconHearth,
  },
  computed: {
    ...mapState('OurGame', ['lives', 'lost', 'isSound', 'group', 'score']),
  },
  methods: {
    ...mapMutations('OurGame', ['setIsSound']),

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
  width: 36px;
  height: 24px;
  margin-right: 5px;
  cursor: pointer;
  transition: color 0.3s;
}

.level {
  margin-right: 10px;
}

@media (hover: hover) {
  .setting__sound:hover {
    color: $color-dodger-blue;
  }
}

@media screen and (max-width: $puzzle-mobile-size) {
  .game__menu {
    padding: 40px 10px 0 10px;
  }
}

@media screen and (max-width: $mobile-big-width) {
  .game__menu {
    flex-direction: column;
  }

  .game__settings {
    margin-bottom: 10px;
  }
}
</style>
