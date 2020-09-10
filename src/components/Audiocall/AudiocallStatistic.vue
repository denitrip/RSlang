<template>
  <section class="statistic__wrapper">
    <h1 class="statistic__title">{{ $t('shortStatistic.title') }}</h1>
    <div class="statistic__detail">
      <div class="details" :class="[{ details_deleting: isDeleting }]">
        <div class="detail__dont-know">
          <span>{{ $t('shortStatistic.dontKnowTitle') }}</span>
          <span class="detail__dont-know-count">{{ dontKnowArray.length }}</span>
          <div class="detail__sentence" v-for="item in dontKnowArray" :key="item.word">
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
            <span
              class="detail__delete"
              @click="onDeleteWord(item)"
              v-if="item.userWord.difficulty !== wordGroups.deleted"
            >
              <icon-base
                :icon-name="$t('shortStatistic.deleteButtonTitle')"
                width="20px"
                height="20px"
                viewBox="0 0 24 30"
              >
                <icon-bucket />
              </icon-base>
            </span>
          </div>
        </div>
        <div class="detail__know">
          <span>{{ $t('shortStatistic.knowTitle') }}</span>
          <span class="detail__know-count">{{ knowArray.length }}</span>
          <div class="detail__sentence" v-for="item in knowArray" :key="`${item.word}`">
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
            <span
              class="detail__delete"
              @click="onDeleteWord(item)"
              v-if="item.userWord.difficulty !== wordGroups.deleted"
            >
              <icon-base
                :icon-name="$t('shortStatistic.deleteButtonTitle')"
                width="20px"
                height="20px"
                viewBox="0 0 24 30"
              >
                <icon-bucket />
              </icon-base>
            </span>
          </div>
        </div>
      </div>
      <div class="detail__buttons">
        <button class="detail__button-continue" @click="onContinue">
          {{ $t('shortStatistic.continueButtonText') }}
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { dataSrc, wordGroups, wordDeletedMessage } from '@/helpers/constants.helper';
import IconBase from '@/components/IconBase.vue';
import IconVolume from '@/components/icons/IconVolume.vue';
import IconBucket from '@/components/icons/IconBucket.vue';

export default {
  name: 'AudiocallStatistic',
  components: {
    IconBase,
    IconVolume,
    IconBucket,
  },
  data() {
    return {
      wordGroups,
      isDeleting: false,
    };
  },
  computed: {
    ...mapState('Audiocall', ['statsArray']),

    knowArray() {
      return this.statsArray.filter((item) => item.correct);
    },

    dontKnowArray() {
      return this.statsArray.filter((item) => !item.correct);
    },
  },
  methods: {
    ...mapMutations('Audiocall', ['resetGame', 'setStatsArray']),
    ...mapActions('Learning', ['changeUserWordDifficulty']),
    ...mapActions('Error', ['setError', 'setInfo']),

    onPlayAudio(src) {
      const audio = new Audio(`${dataSrc}${src}`);
      audio.play();
    },
    onContinue() {
      this.resetGame();
    },
    async onDeleteWord(word) {
      this.isDeleting = true;
      try {
        await this.changeUserWordDifficulty({ difficulty: wordGroups.deleted, word });
        this.changeStatsArray(word);
        this.setInfo(wordDeletedMessage);
      } catch (error) {
        this.setError(error.message);
      } finally {
        this.isDeleting = false;
      }
    },
    changeStatsArray(word) {
      const newStatsArray = this.statsArray.map((item) => {
        if (item.word === word.word) {
          return {
            ...item,
            userWord: { ...item.userWord.optional, difficulty: wordGroups.deleted },
          };
        }
        return item;
      });
      this.setStatsArray(newStatsArray);
    },
  },
};
</script>

<style lang="scss" scoped>
.statistic__wrapper {
  width: 100%;
  max-width: 600px;
  padding: 20px 30px;
  margin-top: 10px;
  text-align: center;
  background-color: $color-wild-sand;
  border-radius: 10px;
  box-shadow: 0 0 10px $overlay-color;
}

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

  &_deleting {
    pointer-events: none;
    opacity: 0.5;
  }
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

.detail__wrap {
  display: flex;
}

.detail__delete {
  display: none;
  margin-right: 10px;
}

.detail__speech,
.detail__delete {
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
  justify-content: center;
  margin-top: 40px;
}

.detail__button-continue {
  @include english-puzzle-button(150px);

  margin-bottom: 10px;
}

@media (hover: hover) {
  .detail__speech:hover,
  .detail__delete:hover {
    color: $color-dodger-blue;
    background: transparent;
  }

  .detail__sentence:hover {
    .detail__delete {
      display: block;
    }
  }
}

@media screen and (max-width: $puzzle-mobile-size) {
  .statistic__detail {
    padding: 0;
  }

  .statistic__wrapper {
    padding: 20px 10px;
  }
}
</style>
