<template>
  <section class="statistic__wrapper">
    <h1 class="statistic__title">Game statistic</h1>
    <h2 class="statistic__score" v-if="isTableShow">Result Table</h2>
    <h2 class="statistic__score" v-else>Score: {{ score }}</h2>
    <div class="statistic__detail">
      <div class="statistic__table" v-if="isTableShow">
        <div class="table__item" v-for="(item, index) in statistics.ourGameStats" :key="index">
          {{ index + 1 }}. {{ item.score }} - {{ item.date | toDate }}
          <hr />
        </div>
      </div>
      <div class="details" v-else>
        <div class="detail__dont-know">
          <span>I don' know </span>
          <span class="detail__dont-know-count">{{ dontKnowArray.length }}</span>
          <div class="detail__sentence" v-for="item in dontKnowArray" :key="item.word">
            <div class="detail__wrap">
              <span class="detail__speech" @click="onPlayAudio(item.audio)">
                <icon-base icon-name="Speech" width="20px" height="20px" viewBox="0 0 576 512">
                  <icon-volume />
                </icon-base>
              </span>
              <p class="detail__words">{{ item.word }} - {{ item.wordTranslate }}</p>
            </div>
          </div>
        </div>
        <div class="detail__know">
          <span>I know </span>
          <span class="detail__know-count">{{ knowArray.length }}</span>
          <div class="detail__sentence" v-for="item in knowArray" :key="`${item.word}`">
            <div class="detail__wrap">
              <span class="detail__speech" @click="onPlayAudio(item.audio)">
                <icon-base icon-name="Speech" width="20px" height="20px" viewBox="0 0 576 512">
                  <icon-volume />
                </icon-base>
              </span>
              <p class="detail__words">{{ item.word }} - {{ item.wordTranslate }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="detail__buttons">
        <button class="detail__button-continue" @click="onContinue">
          Continue
        </button>
        <button class="detail__button-table" @click="onShowTable" v-if="!isTableShow">
          Result table
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { dataSrc } from '@/helpers/constants.helper';
import IconBase from '@/components/IconBase.vue';
import IconVolume from '@/components/icons/IconVolume.vue';

export default {
  name: 'OurGameStatistic',
  components: {
    IconBase,
    IconVolume,
  },
  data() {
    return {
      isTableShow: false,
    };
  },
  computed: {
    ...mapState('OurGame', ['statsArray', 'score']),
    ...mapState('Statistic', ['statistics']),

    knowArray() {
      return this.statsArray.filter((item) => item.correct);
    },

    dontKnowArray() {
      return this.statsArray.filter((item) => !item.correct);
    },
  },
  destroyed() {
    this.isTableShow = false;
  },
  methods: {
    ...mapMutations('OurGame', ['resetGame', 'setStatsArray']),
    ...mapActions('Learning', ['changeUserWordDifficulty']),
    ...mapActions('Error', ['setError', 'setInfo']),

    onPlayAudio(src) {
      const audio = new Audio(`${dataSrc}${src}`);
      audio.play();
    },
    onContinue() {
      this.resetGame();
    },
    onShowTable() {
      this.isTableShow = true;
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

.statistic__title,
.statistic__score {
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
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 40px;
}

.detail__button-continue,
.detail__button-table {
  @include english-puzzle-button(150px);

  margin-bottom: 10px;
}

.table__item {
  font-size: 20px;
  font-weight: 500;
  color: $color-dodger-blue;
  text-shadow: 1px 1px 1px $color-black;

  &:nth-child(1) {
    color: $color-golden-dream;
  }

  &:nth-child(2) {
    color: $color-ghost;
  }

  &:nth-child(3) {
    color: $color-dwarf-bronze;
  }
}

@media (hover: hover) {
  .detail__speech:hover {
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
