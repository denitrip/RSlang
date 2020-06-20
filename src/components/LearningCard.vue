<template>
  <div class="learning-card">
    <img src="image" class="img" />
    <div class="word-with-speak-it">
      <div class="word word_english">{{ englishWord }}</div>
      <span
        @click="changeSpeakItStatus"
        class="icon icon__speak-it "
        :class="{ 'icon__speak-it_selected': isSpeakItSelected }"
      >
        <IconBase width="18" height="16" viewBox="0 0 18 16">
          <IconSmallSpeakIt />
        </IconBase>
      </span>
    </div>
    <div class="word word_transcription">{{ transcription }}</div>
    <div class="leading-question">{{ leadingQuestion }}</div>
    <div class="sentance-with-word">{{ sentanceWithWord }}</div>
    <div class="word word_russian">{{ russianWord }}</div>
    <button type="submit" class="btn wrap">
      Next
      <span class="btn-arrow"></span>
    </button>
    <div class="show-answer">Show answer</div>
  </div>
</template>

<script>
import IconBase from '@/components/IconBase.vue';
import IconSmallSpeakIt from '@/components/icons/IconSmallSpeakIt.vue';

export default {
  name: 'DictionaryCard',
  components: {
    IconBase,
    IconSmallSpeakIt,
  },
  props: [
    'image',
    'englishWord',
    'russianWord',
    'transcription',
    'leadingQuestion',
    'sentanceWithWord',
  ],
  data() {
    return {
      isSpeakItSelected: false,
    };
  },
  methods: {
    changeSpeakItStatus() {
      this.isSpeakItSelected = !this.isSpeakItSelected;
    },
  },
};
</script>

<style scoped lang="scss">
.learning-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 358px;
  height: 511px;
  margin: 6px 0;
  background-color: $color-shuttle-gray;
  border-radius: 25px;

  @include media-mobile {
    width: 250px;
    height: 411px;
  }
}

.img {
  width: 90px;
  height: 90px;
  margin-top: 43px;

  @include media-mobile {
    margin-top: 23px;
  }
}

.word-with-speak-it {
  display: flex;
  justify-content: center;
  height: 20px;
  margin-top: 16px;

  @include media-mobile {
    margin-top: 10px;
  }
}

.word {
  &_english {
    color: $color-dodger-blue;

    @include font($size: 24px, $height: 20px, $weight: 500);
  }

  &_transcription {
    margin-top: 8px;
    color: $color-manatee;

    @include font($size: 24px, $height: 20px, $weight: normal);
  }

  &_russian {
    padding-bottom: 15px;
    margin-top: 24px;
    border-bottom: 1.5px solid $color-dodger-blue;

    @include font($size: 36px, $height: 20px, $weight: normal);

    @include media-mobile {
      padding-bottom: 10px;
      margin-top: 15px;
    }
  }
}

.icon {
  color: $color-ghost;

  &__speak-it {
    width: 17px;
    height: 15px;
    margin-left: 4px;
    cursor: pointer;

    &_selected {
      color: $color-cornflower-blue;
    }
  }
}

.leading-question {
  margin-top: 16px;

  @include font($size: 16px, $height: 20px, $weight: normal);

  @include media-mobile {
    margin-top: 8px;
  }
}

.sentance-with-word {
  margin-top: 15px;
  color: $color-dodger-blue;

  @include font($size: 18px, $height: 21px, $weight: 500);

  @include media-mobile {
    margin-top: 10px;
  }
}

.show-answer {
  margin-top: 24.5px;
  color: $color-dodger-blue;
  text-decoration-line: underline;

  @include font($size: 16px, $height: 20px, $weight: 600);

  @include media-mobile {
    margin-top: 18px;
  }
}

.wrap {
  width: 187px;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 221px;
  height: 50.5px;
  padding: 0 17px 0 17px;
  margin-top: 24px;
  color: $color-white;
  cursor: pointer;
  background: $color-dodger-blue;
  border: none;
  border-radius: 20px;
  outline: none;
  transition: background-color 0.3s;

  @include font($size: 14px, $height: 16px, $weight: normal);

  @include media-mobile {
    margin-top: 20px;
  }
}

.btn-arrow {
  width: 18px;
  height: 24px;
  background-image: url('~@/assets/img/btn-arrow.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 13px 10px;
}
</style>
