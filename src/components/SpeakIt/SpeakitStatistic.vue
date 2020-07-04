<template>
  <div class="statistic__all">
    <a
      href="/english-puzzle-statistic/detail"
      class="statistic__link"
      v-for="(item, index) in puzzleStats"
      :key="item.date"
      @click.prevent="() => onSetRoundStats(item)"
    >
      <span class="statistic__date">{{ index + 1 }}. {{ item.date | toDate }} </span>
      <span class="statistic__level">Level: {{ item.lvl }} </span>
      <span class="statistic__round">Round: {{ item.page }} (</span>
      <span class="statistic__know">{{ item.arr | knowStats }}</span>
      /
      <span class="statistic__dont-know">{{ item.arr | dontKnowStats }}</span
      >)
    </a>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { getWordsByLevelAndRound } from '@/helpers/englishPuzzle.helper';

export default {
  name: 'SpeakitStatistic',
  computed: {
    ...mapState('EnglishPuzzle', ['puzzleStats']),
  },
  methods: {
    ...mapMutations('EnglishPuzzle', ['setCurrentRoundStats', 'setWordsStats']),
    ...mapActions('Error', ['setError']),

    async onSetRoundStats(round) {
      try {
        const words = await getWordsByLevelAndRound({
          level: round.lvl,
          round: round.page,
        });
        this.setWordsStats(words);
        this.setCurrentRoundStats(round);
        this.$router.push('/english-puzzle-statistic/detail');
      } catch (error) {
        this.setError(error.message);
      }
    },
  },
  filters: {
    toDate(value) {
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
      };
      return new Date(value).toLocaleString('en-US', options);
    },
    knowStats(array) {
      let know = 0;
      array.forEach((item) => {
        if (item.know) {
          know += 1;
        }
      });
      return know;
    },
    dontKnowStats(array) {
      let iDontKnow = 0;
      array.forEach((item) => {
        if (!item.know) {
          iDontKnow += 1;
        }
      });
      return iDontKnow;
    },
  },
};
</script>

<style lang="scss" scoped>
.statistic__all {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.statistic__link {
  margin-top: 11px;
  color: $color-dodger-blue;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s;
}

.statistic__know {
  color: $color-apple;
}

.statistic__dont-know {
  color: $color-chestnut;
}

@media (hover: hover) {
  .statistic__link:hover {
    color: $color-pickled-bluewood;
    text-decoration: underline;
  }
}

@media screen and (max-width: $puzzle-mobile-size) {
  .statistic__all {
    text-align: center;
  }
}
</style>
