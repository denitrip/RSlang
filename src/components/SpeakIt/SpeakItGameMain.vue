<template>
  <div class="game__main">
    <main class="speak-it" id="speak-it">
      <div class="wrapper main-wrapper">
        <div class="selected">
          <img class="image" src="~@/assets/img/speakIt/do_you_speak.jpg" />
          <p class="translation">fvgfg</p>
        </div>

        <div id="content" class="content">
          <div class="item" v-for="card in cards" :key="card.word">
            <object class="audio-icon">
              <audio class="audio" src=""></audio>
            </object>
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
export default {
  name: 'SpeakItGameMain',
  data() {
    return {
      cards: [
        {
          word: 'apple',
          transcription: 'fpppf',
        },
        {
          word: 'apple',
          transcription: 'fpppf',
        },
        {
          word: 'apple',
          transcription: 'fpppf',
        },
        {
          word: 'apple',
          transcription: 'fpppf',
        },
        {
          word: 'apple',
          transcription: 'fpppf',
        },
        {
          word: 'apple',
          transcription: 'fpppf',
        },
        {
          word: 'apple',
          transcription: 'fpppf',
        },
        {
          word: 'apple',
          transcription: 'fpppf',
        },
        {
          word: 'apple',
          transcription: 'fpppf',
        },
        {
          word: 'apple',
          transcription: 'fpppf',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  max-width: 1197px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 0 40px;
  }

  @media (max-width: 414px) {
    padding: 0;
  }
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
  width: 350px;
  margin-top: 20px;
  border-radius: 20px;
  box-shadow: 0 0 25px 4px rgba(0, 0, 0, 0.404);

  @include media-mobile {
    width: 290px;
  }

  @include media-mobile-small {
    width: 240px;
  }
}

.translation {
  margin: 20px 0;
  font-size: 30px;
}

.words {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;

  @media (max-width: 320px) {
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
  border: 1px solid rgba(0, 0, 0, 0.384);
  border-radius: 10px;

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
  background: url(https://image.flaticon.com/icons/svg/876/876356.svg);
}
</style>
