<template>
  <div>
    <div class="dictionary-card">
      <div class="dictionary-card__wrapper">
        <div class="layout-2-column">
          <b-form-checkbox
            size="lg"
            id="checkbox-1"
            v-model="status"
            name="checkbox-1"
          >
          </b-form-checkbox>
          <img :src="image" class="picture" />
          <span @click="changeSpeakItStatus" class="icon icon__speak-it " :class="{'icon__speak-it_selected': isSpeakItSelected}">
            <IconBase width="36" height="30" viewBox="0 0 36 30">
              <IconSpeakIt />
            </IconBase>
          </span>
          <div class="word">
            <div class="word_english" >{{englishWord}}</div>
            <div class="word_russian">{{russianWord}}</div>
          </div>
        </div>
        <div class="icons">
          <span @click="changeDoYouKnowSelected" class="icon icon__do-you-know " :class="{'icon__do-you-know_selected': isDoYouKnowSelected}">
            <IconBase width="26" height="30" viewBox="0 0 26 30">
              <IconDoYouKnow />
            </IconBase>
          </span>
          <span  @click="changeBucketSelected" class="icon icon__bucket " :class="{'icon__bucket_selected': isBucketSelected}">
            <IconBase width="24" height="30" viewBox="0 0 24 30">
              <IconBucket />
            </IconBase>
          </span>
          <span v-show="isBackUp" class="icon icon__backup">
        <IconBase width="29" height="29" viewBox="0 0 29 29">
          <IconBackup />
        </IconBase>
      </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconBase from '@/components/IconBase.vue';
import IconDoYouKnow from '@/components/icons/IconDoYouKnow.vue';
import IconSpeakIt from '@/components/icons/IconSpeakIt.vue';
import IconBucket from '@/components/icons/IconBucket.vue';
import IconBackup from '@/components/icons/IconBackup.vue';

export default {
  name: 'DictionaryCard',
  components: {
    IconBase,
    IconDoYouKnow,
    IconSpeakIt,
    IconBucket,
    IconBackup,
  },
  props: ['image', 'englishWord', 'russianWord'],
  data() {
    return {
      isSpeakItSelected: false,
      isDoYouKnowSelected: false,
      isBucketSelected: false,
      isBackUp: false,
      status: false,
    };
  },
  methods: {
    changeSpeakItStatus() {
      this.isSpeakItSelected = !this.isSpeakItSelected;
    },
    changeDoYouKnowSelected() {
      this.isDoYouKnowSelected = !this.isDoYouKnowSelected;
    },
    changeBucketSelected() {
      this.isBucketSelected = !this.isBucketSelected;
    },
  },
};
</script>

<style scoped lang="scss">
.icon {
  color: $color-ghost;

  &__speak-it {
    margin-left: 25px;
    cursor: pointer;

    &_selected {
      color: $color-cornflower-blue;
    }
  }

  &__bucket {
    margin-left: 16px;
    cursor: pointer;

    &_selected {
      color: $color-sundown;
    }
  }

  &__do-you-know {
    margin-left: 16px;
    cursor: pointer;

    &_selected {
      color: $color-golden-dream;
    }
  }

  &__backup {
    margin-left: 16px;
  }
}

.dictionary-card {
  width: 1107px;
  height: 106px;
  background-color: $color-shuttle-gray;
  border-radius: 25px;

  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 1027px;
    height: 106px;
    margin: auto;
  }
}

.layout-2-column {
  display: flex;
  align-items: center;
}

.picture {
  width: 60px;
  height: 60px;
  margin-left: 24px;
}

.word {
  margin-left: 26px;

  &_english {
    color: $color-dodger-blue;

    @include font($size: 18px, $height: 22px, $weight: bold);
  }
}
</style>