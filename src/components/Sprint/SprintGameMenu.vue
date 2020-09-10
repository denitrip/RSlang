<template>
  <div class="game__menu">
    <div class="game__settings">
      <div class="setting__sound" v-if="!isGameEnd" @click="soundToggle">
        <IconBase :iconName="$t('sound')" width="30px" height="24px" v-if="isSound">
          <IconVolume />
        </IconBase>
        <IconBase :iconName="$t('sound')" width="30px" height="24px" v-else>
          <IconVolumeOff />
        </IconBase>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import IconBase from '@/components/IconBase.vue';
import IconVolume from '@/components/icons/IconVolume.vue';
import IconVolumeOff from '@/components/icons/IconVolumeOff.vue';

export default {
  name: 'SprintGameMenu',
  components: {
    IconBase,
    IconVolume,
    IconVolumeOff,
  },
  computed: {
    ...mapState('Sprint', ['isSound', 'isGameEnd']),
  },
  methods: {
    ...mapMutations('Sprint', ['setIsSound']),
    ...mapActions('Error', ['setError']),

    soundToggle() {
      this.setIsSound(!this.isSound);
    },
  },
};
</script>

<style lang="scss" scoped>
.game__menu {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 40px 40px 0 40px;
}

.game__settings {
  display: flex;
  align-items: center;
}

.setting__sound {
  width: 30px;
  height: 24px;
  margin-right: 20px;
  color: $color-white;
  cursor: pointer;
  transition: color 0.3s;
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
