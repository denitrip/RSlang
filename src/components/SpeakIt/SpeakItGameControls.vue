<template>
  <div class="tools">
    <div class="buttons-control">
      <button class="button restart-button" @click="restartGame">Restart</button>
      <button class="button speak-button recording" :disabled="isStartGame" @click="startGame">
        Speak please
      </button>
      <button
        class="button finish-button"
        :disabled="isGameEnd || isRoundComplete"
        @click="finishGame"
      >
        Finish
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { dataSrc, correctSound, errorMessage } from '@/helpers/constants.helper';
import defaultPicture from '@/assets/img/speakIt/do_you_speak.jpg';
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
      defaultPicture,
    };
  },
  computed: {
    ...mapState('Speakit', [
      'words',
      'isStartGame',
      'isGameEnd',
      'isRoundComplete',
      'correctAnswer',
      'incorrectAnswer',
      'isResetGame',
      'wordRecording',
      'isCorrectWord',
      'pictureSrc',
      'isSound',
    ]),
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
      'setIsStartGame',
      'setIsRoundComplete',
      'setIsEndGame',
      'setCorrectAnswer',
      'setIncorrectAnswer',
      'setWordRecording',
      'setIsCorrectWord',
      'setPictureSrc',
      'setTranslation',
    ]),
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
        this.setIncorrectAnswer([...this.words]);
        this.correctResult = [];
        this.setCorrectAnswer([]);
        this.setPictureSrc(defaultPicture);
        this.setWordRecording('');
        this.setTranslation('');
        this.setIsStartGame(false);
        this.setIsCorrectWord(false);
        this.setIsEndGame(false);
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
    finishGame() {
      if (this.recognition) {
        this.recognition.removeEventListener('end', this.startRecognition);
        this.recognition.stop();
        this.$router.push(routerConsts.speakitStatsDetailed.path);
      } else {
        this.setError(errorMessage);
      }
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
