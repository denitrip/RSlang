<template>
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
      <div class="language-changer">
        <input
          class="language__unit"
          type="radio"
          v-model="language"
          id="langEN-RU"
          :value="true"
        />
        <label class="language__label" for="langEN-RU" title="EN->RU">EN</label>
        <input
          class="language__unit"
          type="radio"
          v-model="language"
          id="langRU-EN"
          :value="false"
        />
        <label class="language__label" for="langRU-EN" title="RU->EN">RU</label>
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
  name: 'SavannahGameMenu',
  components: {
    IconBase,
    IconVolume,
    IconVolumeOff,
  },
  computed: {
    ...mapState('Savannah', ['lives', 'lost', 'isSound', 'wallpaperIndex', 'isModeEnRu']),

    language: {
      get() {
        return this.isModeEnRu;
      },
      set(value) {
        this.setIsModeEnRu(value);
      },
    },
  },
  methods: {
    ...mapMutations('Savannah', [
      'setIsSound',
      'setWallpaperSrc',
      'setWallpaperIndex',
      'setIsModeEnRu',
    ]),
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

.language__label {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  font-size: 20px;
  line-height: 20px;
  color: $color-white;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.3s;

  &:nth-child(2) {
    border-radius: 5px 0 0 5px;
  }

  &:nth-child(4) {
    border-radius: 0 5px 5px 0;
  }
}

.language__unit {
  display: none;

  &:checked + .language__label {
    cursor: auto;
    background-color: $color-dodger-blue;
  }

  &:not(:checked) + .language__label {
    background-color: $color-manatee;
  }
}

@media (hover: hover) {
  .setting__sound:hover {
    color: $color-dodger-blue;
  }

  .language__unit {
    &:not(:checked) + .language__label {
      &:hover {
        color: $color-white;
        background-color: $color-shuttle-gray;
      }
    }
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
