<template>
  <div class="statistic__all">
    <a
      href="/english-puzzle-statistic/detail"
      class="statistic__link"
      v-for="(item, index) in statistics.puzzleStats"
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
import routerConsts from '@/router/routerConsts';

export default {
  name: 'EnglishPuzzleStatistic',
  computed: {
    ...mapState('Statistic', ['statistics']),
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
        this.$router.push(routerConsts.englishPuzzleStatsDetailed.path);
      } catch (error) {
        this.setError(error.message);
      }
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
  margin-top: 10px;
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
