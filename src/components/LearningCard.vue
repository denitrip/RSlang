<template>
  <div class="learning-card">
    <img :src="image" class="img" />
    <div class="word-with-speak-it">
      <div class="word word_english">{{ englishWord }}</div>
      <span
        @click="onPlayAudio"
        class="icon icon__speak-it "
        :class="{ 'icon__speak-it_selected': isAudioPlay }"
      >
        <IconBase width="18" height="16" viewBox="0 0 18 16">
          <IconSmallSpeakIt />
        </IconBase>
      </span>
    </div>
    <div class="word word_transcription">{{ transcription }}</div>
    <div class="text-meaning">{{ textMeaning | deleteItalic }}</div>
    <div class="text-translate">{{ textMeaningTranslate }}</div>
    <div class="text-example">{{ textExample | deleteBold }}</div>
    <div class="text-translate">{{ textExampleTranslate }}</div>
    <div class="word word_russian">{{ russianWord }}</div>
    <button type="submit" class="btn wrap" @click="nextIndex" :disabled="isWordCreating">
      Next
      <AppSpinner v-if="isWordCreating"></AppSpinner>
      <span class="btn-arrow" v-else></span>
    </button>
    <div class="show-answer">Show answer</div>
  </div>
</template>

<script>
import AppSpinner from '@/components/AppSpinner.vue';
import IconBase from '@/components/IconBase.vue';
import IconSmallSpeakIt from '@/components/icons/IconSmallSpeakIt.vue';
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  name: 'DictionaryCard',
  components: {
    IconBase,
    IconSmallSpeakIt,
    AppSpinner,
  },
  props: [
    'image',
    'englishWord',
    'russianWord',
    'transcription',
    'textMeaning',
    'textMeaningTranslate',
    'textExample',
    'textExampleTranslate',
  ],
  data() {
    return {
      isSpeakItSelected: false,
      isWordCreating: false,
    };
  },
  filters: {
    deleteBold(str) {
      return str.replace(/<b>|<\/b>/g, '');
    },
    deleteItalic(str) {
      return str.replace(/<i>|<\/i>/g, '');
    },
  },
  computed: {
    ...mapState('Learning', ['isAudioPlay', 'index', 'words']),
  },
  methods: {
    ...mapMutations('Learning', ['setIndex']),
    ...mapActions('Learning', ['onPlayAudio', 'createUserWord']),
    ...mapActions('Error', ['setError']),

    changeSpeakItStatus() {
      this.isSpeakItSelected = !this.isSpeakItSelected;
    },
    async nextIndex() {
      if (this.index < 19) {
        this.isWordCreating = true;
        try {
          await this.createUserWord({ difficulty: 'difficult', word: this.words[this.index] });
        } catch (error) {
          this.setError(error.message);
        } finally {
          this.setIndex(this.index + 1);
          this.isWordCreating = false;
        }
      } else {
        this.setIndex(0);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.learning-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  padding: 40px 60px;
  background-color: white;
  border-radius: 25px;

  @include media-mobile {
    width: 250px;
    height: 411px;
  }
}

.img {
  width: auto;
  height: 200px;
  border-radius: 20px;
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
    margin-top: -2px;
    margin-left: 4px;
    cursor: pointer;

    &_selected {
      color: $color-dodger-blue;
    }
  }
}

.text-meaning {
  margin-top: 16px;
  text-align: center;

  @include font($size: 16px, $height: 20px, $weight: normal);

  @include media-mobile {
    margin-top: 8px;
  }
}

.text-example {
  margin-top: 15px;
  color: $color-dodger-blue;
  text-align: center;

  @include font($size: 18px, $height: 21px, $weight: 500);

  @include media-mobile {
    margin-top: 10px;
  }
}

.text-translate {
  color: $color-manatee;
  text-align: center;

  @include font($size: 14px, $height: 20px, $weight: 500);
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

  &:disabled {
    cursor: default;
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
