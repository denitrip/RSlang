<template>
  <div class="game__tooltips">
    <button
      class="tooltips__play"
      :class="{ tooltips__play_playing: isAudioPlay }"
      @click="onPlayAudio"
      :disabled="!isSpeech"
    >
      <icon-base icon-name="Speech" width="30px" height="30px" viewBox="0 0 576 512">
        <icon-volume />
      </icon-base>
    </button>
    <p class="tooltips__translate" v-if="isTranslate">{{ getTextExampleTranslate }}</p>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import IconBase from '@/components/IconBase.vue';
import IconVolume from '@/components/icons/IconVolume.vue';

export default {
  name: 'EnglishPuzzleGameTooltips',
  components: {
    IconBase,
    IconVolume,
  },
  computed: {
    ...mapState('EnglishPuzzle', ['isSpeech', 'isTranslate', 'isAudioPlay']),
    ...mapGetters('EnglishPuzzle', ['getTextExampleTranslate']),
  },
  methods: {
    ...mapActions('EnglishPuzzle', ['onPlayAudio']),
  },
};
</script>

<style lang="scss" scoped>
.game__tooltips {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 60px;
  color: $color-ghost;
  text-align: center;
}

.tooltips__play {
  color: $color-ghost;
  cursor: pointer;
  background-color: transparent;
  border: none;
  transition: color 0.3s;

  &_playing {
    color: $color-dodger-blue;
  }
}

@media (hover: hover) {
  .tooltips__play:hover {
    color: $color-dodger-blue;
    background: transparent;
  }
}
</style>
