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
            value="accepted"
            unchecked-value="not_accepted"
          >
          </b-form-checkbox>
          <img src="../assets/img/strawberry.png" class="picture" />
          <span class="icon icon_speak-it">
            <IconBase width="36" height="30" viewBox="0 0 36 30">
              <IconSpeakIt />
            </IconBase>
          </span>
          <div class="word">
            <div class="word_english">strawberry</div>
            <div class="word_russian">клубника</div>
          </div>
        </div>
        <div class="icons">
          <span class="icon icon_do-you-know">
            <IconBase width="26" height="30" viewBox="0 0 26 30">
              <IconDoYouKnow />
            </IconBase>
          </span>
          <span class="icon icon_bucket">
            <IconBase width="24" height="30" viewBox="0 0 24 30">
              <IconBucket />
            </IconBase>
          </span>
        </div>
      </div>
      <span class="icon icon_backup">
        <IconBase width="29" height="29" viewBox="0 0 29 29">
          <IconBackup />
        </IconBase>
      </span>
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
  data() {
    return {
      status: 'not_accepted',
    };
  },
};
</script>

<style scoped lang="scss">
.icon {
  color: $color-ghost;

  &_speak-it {
    margin-left: 25px;
    cursor: pointer;
  }

  &_bucket {
    margin-left: 16px;
    cursor: pointer;
  }

  &_do-you-know {
    cursor: pointer;
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
