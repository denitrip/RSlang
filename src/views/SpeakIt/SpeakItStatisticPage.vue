<template>
  <div class="statistic">
    <h1 class="statistic__title">{{ $t('statistic.title') }}</h1>
    <section class="statistic__wrapper wrapper">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </section>
  </div>
</template>

<script>
export default {
  name: 'SpeakitStatisticPage',
};
</script>

<style lang="scss" scoped>
.statistic {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 40px;
  overflow-y: scroll;
  background-image: url('~@/assets/img/speakIt/bgSpeakIt.png');
  background-repeat: no-repeat;
  background-size: cover;
}

.statistic__wrapper {
  max-width: 600px;
  padding: 20px;
  margin-top: 10px;
  background-color: $color-wild-sand;
  border-radius: 10px;
  box-shadow: 0 0 10px $overlay-color;
}

.statistic__title {
  color: $color-white;
  text-shadow: 3px 3px 2px $color-black;
}

@media screen and (max-width: $puzzle-mobile-size) {
  .statistic {
    padding: 10px;
  }
}
</style>
