<template functional>
  <div class="start-screen">
    <h1 class="start-screen__title">audiocall</h1>
    <h3 class="start-screen__description">
      The “Audiocall” mini-game is a training that develops speech and translation skills.
    </h3>
    <p>
      You hear the word and see 5 translation options. You can choose the right answer in two ways:
    </p>
    <p>1. Click on it with the mouse;</p>
    <p>2. Use the keys 1, 2, 3, 4, 5.</p>
    <button
      class="start-screen__button"
      @click="listeners.startGame"
      :disabled="props.isStartLoading || props.isWordsEmpty"
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
  name: 'AudiocallStartScreen',
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
    url('~@/assets/img/audiocall/start-screen.jpg');
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
