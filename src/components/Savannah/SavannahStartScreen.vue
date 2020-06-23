<template functional>
  <div class="start-screen">
    <h1 class="start-screen__title">savannah</h1>
    <h3 class="start-screen__description">
      The “Savannah” mini-game is a simulator for translating your passive learned dictionary into
      the active stage.
    </h3>
    <p>
      You can choose the right answer in two ways:
    </p>
    <p>1. Click on it with the mouse;</p>
    <p>2. Use the keys 1, 2, 3, 4.</p>
    <button
      class="start-screen__button"
      @click="listeners.startGame"
      :disabled="props.isStartLoading"
    >
      <component :is="props.components.AppSpinner" v-if="props.isStartLoading"></component>
      Start
    </button>
  </div>
</template>

<script>
import AppSpinner from '@/components/AppSpinner.vue';

export default {
  name: 'SavannahStartScreen',
  props: {
    isStartLoading: {
      type: Boolean,
      default: false,
    },
    components: {
      type: Object,
      default() {
        return {
          AppSpinner,
        };
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.start-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 40px;
  color: $color-white;
  text-align: center;
  text-shadow: 3px 3px 2px $color-black;
  background-image: linear-gradient($overlay-color, $overlay-color),
    url('~@/assets/img/savannah/start-screen.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}

.start-screen__title {
  font-size: 80px;
  text-transform: uppercase;
}

.start-screen__description {
  margin: 10px 0;
  font-size: 26px;
}

.start-screen__button {
  @include english-puzzle-button(150px);

  margin-top: 20px;
}

@media screen and (max-width: $puzzle-mobile-size) {
  .start-screen {
    justify-content: flex-start;
  }

  .start-screen__title {
    font-size: 60px;
  }
}
</style>
