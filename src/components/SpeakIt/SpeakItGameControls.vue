<template>
  <div class="tools">
    <div class="buttons-control">
      <button class="button restart-button" @click="restartGame">Restart</button>
      <button class="button speak-button recording" :disabled="isStartGame" @click="startGame">
        Speak please
      </button>
      <button class="button finish-button" :disabled="isGameEnd" @click="finishGame">
        Finish
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { dataSrc, correctSound, errorMessage } from '@/helpers/constants.helper';
import routerConsts from '@/router/routerConsts';

export default {
  name: 'Speakit',
  data() {
    return {
      correctResult: [],
      incorrectIndex: -1,
      endRound: 10,
      dataSrc,
      recognition: null,
    };
  },
  computed: {
    ...mapState('Speakit', [
      'words',
      'isStartGame',
      'isGameEnd',
      'correctAnswer',
      'incorrectAnswer',
      'wordRecording',
      'isCorrectWord',
      'pictureSrc',
      'isSound',
      'wordsArray',
    ]),
  },
  destroyed() {
    this.recognition.removeEventListener('end', this.startRecognition);
    this.recognition.stop();
  },
  created() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';

      this.recognition.addEventListener('result', (e) => {
        if (e.results[0].isFinal) {
          const transcript = Array.from(e.results)
            .map((result) => result[0])
            .map((result) => result.transcript)
            .join('');

          this.setWordRecording(transcript);
          this.checkAnswer();
        }
      });
    } else {
      this.setError(errorMessage);
    }
  },
  methods: {
    ...mapMutations('Speakit', [
      'resetGame',
      'setIsStartGame',
      'setCorrectAnswer',
      'setWordRecording',
      'setIsCorrectWord',
      'setPictureSrc',
      'setWordsArray',
      'setWordsStats',
    ]),
    ...mapActions('Speakit', ['saveStats', 'onSetCompleteRounds', 'saveSettings']),
    ...mapActions('Error', ['setError']),
    startRecognition() {
      this.recognition.start();
    },
    startGame() {
      if (this.recognition) {
        this.recognition.addEventListener('end', this.startRecognition);
        this.setIsStartGame(true);
        this.startRecognition();
      } else {
        this.setError(errorMessage);
      }
    },
    restartGame() {
      if (this.recognition) {
        this.recognition.removeEventListener('end', this.startRecognition);
        this.recognition.stop();
        this.correctResult = [];
        this.resetGame();
      } else {
        this.setError(errorMessage);
      }
    },
    checkAnswer() {
      const index = this.incorrectAnswer.findIndex(
        (item) => item.word.toLowerCase() === this.wordRecording.toLowerCase(),
      );
      this.words.forEach((item) => {
        const isSameWord = item.word.toLowerCase() === this.wordRecording.toLowerCase();
        if (isSameWord && !this.correctResult.includes(item)) {
          this.onPlaySound(correctSound);
          this.setIsCorrectWord(true);
          this.showPicture(item);
          this.correctResult.push(item);
          this.setCorrectAnswer(this.correctResult);
          if (index > this.incorrectIndex) {
            this.incorrectAnswer.splice(index, 1);
          }
          if (this.correctAnswer.length === this.endRound) {
            this.finishGame();
          }
        }
      });
    },
    showPicture(word) {
      this.setPictureSrc(`${dataSrc}${word.image}`);
    },
    async finishGame() {
      if (this.recognition) {
        this.recognition.removeEventListener('end', this.startRecognition);
        this.recognition.stop();
        this.onSetCompleteRounds();
        this.setWordsArray(this.addWordsToStatisticArray());
        this.setWordsStats(this.words);
        await this.saveStats();
        await this.saveSettings();
        this.$router.push(routerConsts.speakitStatsDetailed.path);
      } else {
        this.setError(errorMessage);
      }
    },
    addWordsToStatisticArray() {
      const arrForWords = [];
      this.correctAnswer.forEach((item) => arrForWords.push({ id: item.word, know: true }));
      this.incorrectAnswer.forEach((item) => arrForWords.push({ id: item.word, know: false }));
      return arrForWords;
    },
    onPlaySound(src) {
      if (this.isSound) {
        const audio = new Audio(src);
        audio.play();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  &:disabled {
    cursor: default;
    opacity: 0.5;
  }
}

.buttons-control {
  display: flex;
  justify-content: space-around;

  @include media-mobile {
    flex-direction: column;
    align-items: center;
  }
}

.restart-button,
.speak-button,
.finish-button {
  font-size: 1.5em;
  color: white;
  cursor: pointer;
  background: $color-dodger-blue;
  border: 0.5px solid black;
  border-radius: 10px;

  @include media-tablet {
    margin: 0 10px;
    font-size: 1em;
  }

  @include media-mobile {
    margin: 10px 0;
  }
}

.restart-button,
.finish-button {
  flex-grow: 1;
  width: 100%;
  max-width: 300px;
  height: 50px;
  margin: 0 10px;

  @include media-tablet {
    width: 200px;
    height: 50px;
  }
}

.speak-button {
  flex-grow: 8;
  width: 100%;
  max-width: 350px;
  height: 50px;

  @include media-tablet {
    width: 100%;
    max-width: 200px;
    height: 50px;
  }
}
</style>
