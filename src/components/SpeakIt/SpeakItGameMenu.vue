<template>
  <div class="game__menu">
    <div class="game__levels">
      <button class="change-picture" title="Change wallpaper" @click="changePicture">
        <IconBase :iconName="$t('speakIt.changeWallpaper')" width="20px" height="20px">
          <IconChange />
        </IconBase>
      </button>
      <div class="level">
        <label class="level__label">{{ $t('speakIt.level') }}</label>
        <select :value="selectedLevel" @change="onSetSelectedLevel" class="level__select">
          <option v-for="i in 6" :value="i" :key="`${i}level`">
            {{ i }}
          </option>
        </select>
        <label class="round__label">{{ $t('speakIt.round') }}</label>
        <select :value="selectedRound" @change="onSetSelectedRound" class="round__select">
          <option
            :class="{ round_complete: i }"
            v-for="(i, index) in completeRoundsArray"
            :value="index + 1"
            :key="`${index + 1}round`"
          >
            {{ index + 1 }}
          </option>
        </select>
      </div>
    </div>
    <div class="score">
      <div
        class="score__star"
        :class="[{ item_startGame: isStartGame }]"
        :key="star.length"
        v-for="star in correctAnswer.length"
      ></div>
    </div>
    <app-spinner v-if="isGameLoading"></app-spinner>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { dataSrc } from '@/helpers/constants.helper';
import AppSpinner from '@/components/AppSpinner.vue';
import defaultPicture from '@/assets/img/speakIt/do_you_speak.jpg';
import IconChange from '@/components/icons/IconChange.vue';
import IconBase from '@/components/IconBase.vue';

export default {
  name: 'SpeakItGameMenu',
  components: {
    AppSpinner,
    IconBase,
    IconChange,
  },
  data() {
    return {
      completeArray: [],
      isGameLoading: false,
      defaultPicture,
    };
  },
  computed: {
    ...mapState('Speakit', [
      'selectedLevel',
      'selectedRound',
      'isStartGame',
      'roundCount',
      'completeRounds',
      'words',
      'pictureSrc',
      'correctAnswer',
      'wallpaperIndex',
    ]),

    completeRoundsArray() {
      const result = new Array(this.roundCount);
      result.fill(false);
      this.completeRounds.forEach((item) => {
        if (Number(item.lvl) === Number(this.selectedLevel)) {
          result[item.page - 1] = true;
        }
      });
      return result;
    },
  },
  methods: {
    ...mapMutations('Speakit', [
      'setSelectedLevel',
      'setSelectedRound',
      'setIncorrectAnswer',
      'setIsStartGame',
      'setPictureSrc',
      'setWallpaperSrc',
      'setWallpaperIndex',
    ]),
    ...mapActions('Speakit', ['getRoundsCount', 'resetGame']),
    ...mapActions('Error', ['setError']),

    async onSetSelectedLevel(event) {
      this.setError(null);
      this.isGameLoading = true;
      try {
        this.setSelectedLevel(event.target.value);
        this.setSelectedRound(1);
        await this.getRoundsCount();
        await this.resetGame();
        this.setIsStartGame(false);
        this.setIncorrectAnswer([...this.words]);
        this.setPictureSrc(defaultPicture);
      } catch (error) {
        this.setError(error.message);
      } finally {
        this.isGameLoading = false;
      }
    },
    async onSetSelectedRound(event) {
      this.setError(null);
      this.isGameLoading = true;
      try {
        this.setSelectedRound(event.target.value);
        await this.resetGame();
        this.setIsStartGame(false);
        this.setIncorrectAnswer([...this.words]);
        this.setPictureSrc(defaultPicture);
      } catch (error) {
        this.setError(error.message);
      } finally {
        this.isGameLoading = false;
      }
    },

    changePicture() {
      if (this.wallpaperIndex < 8) {
        this.setWallpaperIndex(this.wallpaperIndex + 1);
      } else {
        this.setWallpaperIndex(0);
      }
      const imageUrl = `${dataSrc}speakit/speakit-${this.wallpaperIndex}.jpg`;

      this.setWallpaperSrc(imageUrl);
    },
  },
};
</script>

<style lang="scss" scoped>
.game__menu {
  display: flex;
  align-items: center;
  padding: 5px 40px;

  @include media-tablet {
    flex-direction: column;
    justify-content: center;
  }
}

.game__levels {
  display: flex;
  align-items: center;
  padding: 5px 40px;

  @include media-tablet {
    justify-content: center;
    padding: 5px 0;
  }
}

.level {
  display: flex;
}

.change-picture {
  @include english-puzzle-button(40px);

  margin: 0 10px;
}

.level__label,
.round__label {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  font-size: 1.5em;
  color: $color-white;
  border-radius: 5px;

  @include media-tablet {
    margin: 0;
    font-size: 1em;
  }

  @include media-mobile {
    width: 60px;
    margin: 0;
  }
}

.round__label {
  margin-left: 30px;

  @include media-mobile {
    margin-left: 5px;
  }
}

.level__select,
.round__select {
  width: 50px;
  margin-left: 5px;
  font-size: 1.2rem;
}

.round_complete {
  color: $color-white;
  background-color: $color-apple;
}

.score {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 40px;

  @include media-tablet {
    justify-content: center;
  }

  &__star {
    width: 40px;
    height: 40px;
    background-image: url('~@/assets/img/speakIt/star.svg');
    background-size: 40px 40px;
  }
}

@media screen and (max-width: $puzzle-mobile-size) {
  .game__levels {
    display: flex;
    align-items: center;
    padding: 5px 0;
  }

  .game__menu {
    flex-direction: column;
    padding: 5px 0;
  }
}
</style>
