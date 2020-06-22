<template>
  <div class="wrapper-statistic">
    <div class="statistic">
      <canvas ref="canvas"></canvas>
    </div>
  </div>
</template>

<script>
import { Line } from 'vue-chartjs';
import { mapState } from 'vuex';

export default {
  name: 'statistic',
  computed: {
    ...mapState('LongTermStatistic', ['longTermStatistic']),
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
  methods: {
    countWord() {
      console.log(this.longTermStatistic.reduce((sum, el) => sum + el.value, 0));
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper-statistic {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: $color-ghost;
}

.statistic {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 50%;
  margin: 0;
}
</style>
