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
import { mapState, mapMutations } from 'vuex';
import { dataSrc, correctSound } from '@/helpers/constants.helper';
import defaultPicture from '@/assets/img/speakIt/do_you_speak.jpg';

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
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    /* global SpeechRecognition */
    this.recognition = new SpeechRecognition();
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-En';

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
    startGame() {
      this.recognition.addEventListener('end', this.recognition.start);
      this.setIsStartGame(true);
      this.recognition.start();
    },
    restartGame() {
      this.recognition.removeEventListener('end', this.recognition.start);
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
    },
    checkAnswer() {
      const index = this.incorrectAnswer.findIndex(
        (item) => item.word.toLowerCase() === this.wordRecording.toLowerCase(),
      );
      this.words.forEach((item) => {
        if (
          item.word.toLowerCase() === this.wordRecording.toLowerCase()
          && !this.correctResult.includes(item)
        ) {
          this.onPlaySound(correctSound);
          this.setIsCorrectWord(true);
          this.showPicture(item);
          this.correctResult.push(item);
          console.log('Correct');
          console.log(this.correctResult);
          this.setCorrectAnswer(this.correctResult);
          if (index > this.incorrectIndex) {
            this.incorrectAnswer.splice(index, 1);
            console.log('Incorrect');
            console.log(this.incorrectAnswer);
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
      // this.setIsEndGame(true);
      this.recognition.removeEventListener('end', this.recognition.start);
      this.recognition.stop();
      this.$router.push('/speakit-statistic/detail');
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
    margin: 5px 0;
    font-size: 1em;
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
