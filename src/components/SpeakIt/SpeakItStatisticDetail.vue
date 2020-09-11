<template>
  <div class="statistic__detail">
    <div class="details">
      <div class="detail__dont-know">
        <span>{{ $t('shortStatistic.dontKnowTitle') }}</span>
        <span class="detail__dont-know-count">{{ incorrectAnswer.length }}</span>
        <div class="detail__sentence" v-for="item in incorrectAnswer" :key="item.word">
          <div class="detail__wrap">
            <span class="detail__speech" @click="onPlayAudio(item.audio)">
              <icon-base
                :icon-name="$t('speechButtonTitle')"
                width="20px"
                height="20px"
                viewBox="0 0 576 512"
              >
                <icon-volume />
              </icon-base>
            </span>
            <p class="detail__words">{{ item.word }} - {{ item.wordTranslate }}</p>
          </div>
        </div>
      </div>
      <div class="detail__know">
        <span>{{ $t('shortStatistic.knowTitle') }}</span>
        <span class="detail__know-count">{{ correctAnswer.length }}</span>
        <div class="detail__sentence" v-for="item in correctAnswer" :key="`${item.word}`">
          <div class="detail__wrap">
            <span class="detail__speech" @click="onPlayAudio(item.audio)">
              <icon-base
                :icon-name="$t('speechButtonTitle')"
                width="20px"
                height="20px"
                viewBox="0 0 576 512"
              >
                <icon-volume />
              </icon-base>
            </span>
            <p class="detail__words">{{ item.word }} - {{ item.wordTranslate }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="detail__buttons">
      <button class="detail__button" @click="onResetGame" :disabled="isStartLoading">
        {{ $t('shortStatistic.restartButtonText') }}
      </button>
      <button
        class="detail__button button__next-button"
        @click="onNextRound"
        :disabled="isStartLoading"
      >
        {{ $t('shortStatistic.nextRoundButtonText') }}
      </button>
      <button class="detail__button" @click="onStatistic">
        {{ $t('shortStatistic.statisticButtonText') }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import { dataSrc } from '@/helpers/constants.helper';
import defaultPicture from '@/assets/img/speakIt/do_you_speak.jpg';
import IconBase from '@/components/IconBase.vue';
import IconVolume from '@/components/icons/IconVolume.vue';
import routerConsts from '@/router/routerConsts';

export default {
  name: 'SpeakitStatisticDetail',
  components: {
    IconBase,
    IconVolume,
  },
  data() {
    return {
      isStartLoading: false,
      defaultPicture,
    };
  },
  computed: {
    ...mapState('Speakit', [
      'correctAnswer',
      'incorrectAnswer',
      'selectedLevel',
      'selectedRound',
      'words',
    ]),
    ...mapGetters('Speakit', ['isLastRound']),
  },
  methods: {
    ...mapMutations('Speakit', [
      'resetGame',
      'setSelectedLevel',
      'setSelectedRound',
      'setIsStartScreen',
    ]),
    ...mapActions('Speakit', ['getWords']),
    ...mapActions('Error', ['setError']),

    onPlayAudio(audioSrc) {
      const audio = new Audio(`${dataSrc}${audioSrc}`);
      audio.play();
    },
    onStatistic() {
      this.$router.push(routerConsts.SpeakitStatisticPage.path);
    },
    onNextRound() {
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
        await this.getWords();
        this.setIsStartScreen(false);
        this.resetGame();
        this.$router.push(routerConsts.speakitPage.path);
      } catch (error) {
        this.setError(error.message);
      } finally {
        this.isStartLoading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.statistic__title {
  color: $color-dodger-blue;
}

.statistic__detail {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  color: $color-black;
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

.button__next-button {
  margin: 0 10px;

  @include media-tablet {
    margin: 0 5px;
  }

  @include media-mobile {
    margin: 0;
  }
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

.detail__wrap {
  display: flex;
}

.detail__speech {
  color: $color-ghost;
  cursor: pointer;
  background-color: transparent;
  border: none;
  transition: color 0.3s;

  &_playing {
    color: $color-dodger-blue;
  }
}

.detail__sentence {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.detail__words {
  margin-left: 10px;
  word-break: break-all;
}

.detail__buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 40px;

  @include media-mobile {
    flex-direction: column;
    align-items: center;
  }
}

.detail__button {
  @include english-puzzle-button(150px);

  margin-bottom: 10px;
}

@media (hover: hover) {
  .detail__speech:hover {
    color: $color-dodger-blue;
    background: transparent;
  }
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
