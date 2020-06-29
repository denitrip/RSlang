<template>
  <div class="statistic">
    <div class="statistic__wrapper">
      <canvas ref="canvas"></canvas>
    </div>
  </div>
</template>

<script>
import { Line } from 'vue-chartjs';
import { mapState } from 'vuex';

export default {
  name: 'statisticPage',
  computed: {
    ...mapState('Statistic', ['longTermStatistic']),
  },
  extends: Line,
  mounted() {
    this.renderChart(
      {
        labels: this.longTermStatistic.map((el) => el.label),
        datasets: [
          {
            label: `Total: ${this.longTermStatistic.reduce((sum, el) => sum + el.value, 0)}`,
            data: this.longTermStatistic.map((el) => el.value),
            backgroundColor: [
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 99, 132, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',
            ],
            borderWidth: 2,
          },
        ],
      },
      {
        responsive: true,
        maintainAspectRatio: false,
      },
    );
  },
};
</script>

<style lang="scss" scoped>
.statistic {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin: auto 0;
  background-color: $color-ghost;

  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 80%;
    height: 50%;
  }
}
</style>
