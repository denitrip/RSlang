<template functional>
  <div class="start-screen" key="sprint-start-screen">
    <h1 class="start-screen__title">sprint</h1>
    <h3 class="start-screen__description">
      The “Sprint” mini-game is a simulator for repetition of learned words from your dictionary.
    </h3>
    <p>
      After the start of the game, you will see word and translation. You need to choose is it right
      or wrong.
    </p>
    <p>1. Use mouse to choose.</p>
    <p>2. Use the keys Left and Right.</p>
    <button
      class="start-screen__button"
      @click="listeners.startGame"
      :disabled="props.isStartLoading"
    >
      <component :is="props.components.AppSpinner" v-if="props.isStartLoading"></component>
      Start
    </button>
    <div class="words-empty" v-if="props.isWordsEmpty">
      <p>You have not learned words yet.</p>
      <router-link class="words-empty__link" :to="props.link">Start learning</router-link>
    </div>
  </div>
</template>

<script>
import AppSpinner from '@/components/AppSpinner.vue';

export default {
  name: 'SprintStartScreen',
  props: {
    isStartLoading: {
      type: Boolean,
      default: false,
    },
    isWordsEmpty: {
      type: Boolean,
      default: false,
    },
    link: {
      type: String,
      default: '',
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
    url('~@/assets/img/sprint/sprint-start.jpg');
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

.words-empty {
  display: flex;
  margin-top: 20px;
}

.words-empty__link {
  margin-left: 10px;
}

@media screen and (max-width: $puzzle-mobile-size) {
  .start-screen {
    justify-content: flex-start;
    padding: 10px;
  }

  .start-screen__title {
    font-size: 40px;
  }
}
</style>
