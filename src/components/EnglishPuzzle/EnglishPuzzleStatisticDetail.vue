<template>
  <div class="statistic__detail">
    <div class="detail__link">
      <a :href="picture.imageSrc" target="_blank">
        <img class="detail__picture" :src="picture.cutSrc" :alt="picture.description" />
      </a>
    </div>
    <p class="detail__description">{{ picture.description }}</p>
    <div class="details">
      <div class="detail__dont-know">
        <span>I don' know </span>
        <span class="detail__dont-know-count">{{ dontKnowArray.length }}</span>
        <div class="detail__sentence" v-for="item in dontKnowArray" :key="item.id">
          <span class="detail__speech" @click="() => onPlayAudio(wordsStats[item.id].audioExample)">
            <icon-base icon-name="Speech" width="20px" height="20px" viewBox="0 0 576 512">
              <icon-volume />
            </icon-base>
          </span>
          <p class="detail__words">{{ wordsStats[item.id].textExample | removeTags }}</p>
        </div>
      </div>
      <div class="detail__know">
        <span>I know </span>
        <span class="detail__know-count">{{ knowArray.length }}</span>
        <div class="detail__sentence" v-for="item in knowArray" :key="`${item.id}`">
          <span class="detail__speech" @click="() => onPlayAudio(wordsStats[item.id].audioExample)">
            <icon-base icon-name="Speech" width="20px" height="20px" viewBox="0 0 576 512">
              <icon-volume />
            </icon-base>
          </span>
          <p class="detail__words">{{ wordsStats[item.id].textExample | removeTags }}</p>
        </div>
      </div>
    </div>
    <div class="detail__buttons">
      <button class="detail__button-continue" @click="onContinue" :disabled="isStartLoading">
        <app-spinner v-if="isStartLoading"></app-spinner>
        Continue
      </button>
      <button class="detail__button-statistic" @click="onStatistic">Statistic</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import { getPicture } from '@/helpers/englishPuzzle.helper';
import { dataSrc } from '@/helpers/constants.helper';
import AppSpinner from '@/components/AppSpinner.vue';
import IconBase from '@/components/IconBase.vue';
import IconVolume from '@/components/icons/IconVolume.vue';

export default {
  name: 'EnglishPuzzleStatistic',
  components: {
    IconBase,
    IconVolume,
    AppSpinner,
  },
  data() {
    return {
      isStartLoading: false,
    };
  },
  computed: {
    ...mapState('EnglishPuzzle', [
      'currentRoundStats',
      'wordsStats',
      'selectedLevel',
      'selectedRound',
    ]),
    ...mapGetters('EnglishPuzzle', ['isLastRound']),

    picture() {
      return getPicture(this.currentRoundStats.lvl, this.currentRoundStats.page);
    },

    knowArray() {
      return this.currentRoundStats.arr.filter((item) => item.know);
    },

    dontKnowArray() {
      return this.currentRoundStats.arr.filter((item) => !item.know);
    },
  },
  methods: {
    ...mapMutations('EnglishPuzzle', ['setSelectedLevel', 'setSelectedRound', 'setIsStartScreen']),
    ...mapActions('EnglishPuzzle', ['resetGame']),
    ...mapActions('Error', ['setError']),

    onPlayAudio(src) {
      const audio = new Audio(`${dataSrc}${src}`);
      audio.play();
    },
    onStatistic() {
      this.$router.push('/english-puzzle-statistic');
    },
    onContinue() {
      if (this.isLastRound) {
        this.setSelectedLevel(Number(this.selectedLevel) + 1);
        this.setSelectedRound(1);
      } else {
        this.setSelectedRound(Number(this.selectedRound) + 1);
      }
      this.onResetGame();
    },
    async onResetGame() {
      this.isStartLoading = true;
      try {
        await this.resetGame();
        this.setIsStartScreen(false);
        this.$router.push('/english-puzzle');
      } catch (error) {
        this.setError(error.message);
      } finally {
        this.isStartLoading = false;
      }
    },
  },
  filters: {
    removeTags(value) {
      return value.replace(/<b>|<\/b>/g, '');
    },
  },
};
</script>

<style lang="scss" scoped>
.statistic__detail {
  display: flex;
  flex-direction: column;
  padding: 0 40px;
}

.detail__link {
  text-align: center;
}

.detail__picture {
  width: 100px;
  height: 60px;
  border-radius: 5px;
}

.detail__description {
  margin-top: 10px;
  text-align: center;
}

.details {
  max-height: 380px;
  overflow-y: scroll;
}

.detail__dont-know,
.detail__know {
  margin-top: 20px;
}

.detail__dont-know-count,
.detail__know-count {
  padding: 2px 8px;
  margin-left: 5px;
  color: $color-white;
  border-radius: 10px;
}

.detail__dont-know-count {
  background-color: $color-chestnut;
}

.detail__know-count {
  background-color: $color-apple;
}

.detail__sentence {
  display: flex;
  margin-top: 10px;
}

.detail__speech {
  cursor: pointer;
  background-color: transparent;
  border: none;
  transition: color 0.3s;

  &:hover {
    color: $color-dodger-blue;
    background: transparent;
  }

  &_playing {
    color: $color-dodger-blue;
  }
}

.detail__words {
  margin-left: 10px;
}

.detail__buttons {
  display: flex;
  flex-wrap: wrap;
  margin-top: 40px;
}

.detail__button-continue,
.detail__button-statistic {
  @include english-puzzle-button(150px);

  margin-bottom: 10px;
  margin-left: 10px;
}

@media screen and (max-width: $puzzle-mobile-size) {
  .statistic__detail {
    padding: 0;
  }

  .detail__buttons {
    justify-content: center;
  }
}
</style>
