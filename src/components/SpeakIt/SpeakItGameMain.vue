<template>
  <div class="game__main">
    <div class="game__background" :style="[{ backgroundImage }]"></div>
    <main class="speak-it" id="speak-it">
      <div class="wrapper main-wrapper">
        <div class="selected">
          <img class="image" :src="pictureSrc" />
          <input
            type="text"
            class="audioRecording"
            v-if="isStartGame"
            readonly
            :value="wordRecording"
          />
          <p class="translation" v-else>{{ translation }}</p>
        </div>
        <div id="content" class="content">
          <div
            class="item"
            :class="[
              { item_startGame: isStartGame },
              { item_correctWord: correctAnswer.includes(card) },
            ]"
            v-for="card in words"
            :key="card.word"
            @click="onClickCard(card)"
          >
            <object class="audio-icon"> </object>
            <div class="transcript">
              <p class="word">{{ card.word }}</p>
              <p class="transcription">{{ card.transcription }}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { dataSrc } from '@/helpers/constants.helper';

export default {
  name: 'SpeakItGameMain',
  components: {},
  data() {
    return {
      dataSrc,
    };
  },
  computed: {
    ...mapState('Speakit', [
      'words',
      'isStartGame',
      'wordRecording',
      'translation',
      'isCorrectWord',
      'isGameEnd',
      'correctAnswer',
      'pictureSrc',
      'wallpaperSrc',
    ]),
    backgroundImage() {
      return `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${this.wallpaperSrc}')`;
    },
  },
  methods: {
    ...mapMutations('Speakit', ['setPictureSrc', 'setTranslation']),
    onPlayAudio(audioSrc) {
      const audio = new Audio(`${dataSrc}${audioSrc}`);
      audio.play();
    },
    onClickCard(card) {
      if (!this.isStartGame) {
        this.onPlayAudio(card.audio);
        this.onChangeInfo(card);
      }
    },
    onChangeInfo(card) {
      this.setTranslation(card.wordTranslate);
      this.setPictureSrc(`${dataSrc}${card.image}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  max-width: 1197px;
  margin: 0 auto;

  @media (max-width: $tablet-width) {
    padding: 0 40px;
  }

  @media (max-width: $mobile-big-width) {
    padding: 0;
  }
}

.game__background {
  position: absolute;
  top: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  transition: background 1.5s;
}

.content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.selected {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image {
  width: 390px;
  height: 260px;
  margin-top: 20px;
  border-radius: 20px;
  box-shadow: 0 0 25px 4px $overlay-color;

  @include media-mobile {
    width: 290px;
    height: 200px;
  }

  @include media-mobile-small {
    width: 240px;
    height: 180px;
  }
}

.translation,
.audioRecording {
  margin: 20px 0;
  font-size: 30px;
  color: $color-white;
  text-shadow: 3px 3px 2px $color-black;
}

.audioRecording {
  display: block;
  height: 50px;
  padding: 5px 20px;
  margin: 20px 0;
  margin-bottom: 14px;
  font-size: 30px;
  line-height: 40px;
  color: $color-white;
  text-align: center;
  background-color: transparent;
  background-image: url('~@/assets/img/speakIt/microphone.svg');
  background-repeat: no-repeat;
  background-position: 10px 15px;
  background-size: 20px;
  border: 0;
  border-bottom: 1px solid $color-ghost;

  @media (max-width: $mobile-big-width) {
    width: 90%;
  }
}

.words {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;

  @media (max-width: $mobile-small-width) {
    flex-direction: column;
    align-items: center;
  }
}

.item {
  display: flex;
  align-items: center;
  width: 200px;
  padding: 10px;
  margin: 0 15px 30px 15px;
  cursor: pointer;
  background-color: $color-white;
  border: 1px solid $overlay-color;
  border-radius: 10px;

  &_startGame {
    cursor: default;
  }

  &_correctWord {
    background-color: $color-apple;
    opacity: 0.4;
  }

  @include media-tablet {
    width: 180px;
  }

  @include media-mobile {
    width: 200px;
    margin: 0 5px 10px 5px;
  }
}

.word,
.transcription {
  margin-bottom: 0;
  font-size: 20px;
  line-height: normal;
}

.audio-icon {
  width: 20px;
  height: 20px;
  margin: 0 15px 0 0;
  color: $caribbean-green;
  background: url('~@/assets/img/speakIt/speaker.svg');
}
</style>
