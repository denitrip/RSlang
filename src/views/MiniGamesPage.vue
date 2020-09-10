<template>
  <div class="mini-games">
    <div
      class="mini-games__card"
      :class="`mini-games__card_${game.link}`"
      v-for="game in miniGames"
      :key="game.title"
    >
      <IconBase width="57px" height="71px">
        <component :is="`Icon${game.icon}`" />
      </IconBase>
      <h2 class="mini-games__title">{{ $t(`sideMenu.${game.title}`) }}</h2>
      <router-link :to="`/${game.link}`" class="mini-games__link">{{ $t('playGame') }}</router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import IconBase from '@/components/IconBase.vue';
import IconMegaphone from '@/components/icons/IconMegaphone.vue';
import IconPuzzle from '@/components/icons/IconPuzzle.vue';
import IconSavannah from '@/components/icons/IconSavannah.vue';
import IconAudioCall from '@/components/icons/IconAudioCall.vue';
import IconRunning from '@/components/icons/IconRunning.vue';
import IconPoker from '@/components/icons/IconPoker.vue';

export default {
  name: 'MiniGamesPage',
  components: {
    IconBase,
    IconMegaphone,
    IconPuzzle,
    IconSavannah,
    IconAudioCall,
    IconRunning,
    IconPoker,
  },
  computed: {
    ...mapState('Data', ['miniGames']),
  },
};
</script>

<style lang="scss" scoped>
.mini-games {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding-top: 24px;
  overflow-y: auto;
  background-color: $color-catskill-white;

  &__title {
    font-size: 36px;
    font-weight: bold;
  }

  &__link {
    margin-top: 56px;
    font-size: 24px;
    font-weight: bold;
    text-decoration-line: underline;
    color: $color-white;
    transition: color 0.3s;
  }
}

.mini-games__card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 358px;
  height: 358px;
  margin: 24px;
  color: $color-white;
  text-align: center;
  border-radius: 24px;
  box-shadow: 1px 5px 14px $box-shadow-one-color;

  &_speak-it {
    background-color: $color-dodger-blue;
  }

  &_english-puzzle {
    background-color: $color-wild-watermelon;
  }

  &_savannah {
    background-color: $color-shuttle-gray;
  }

  &_audiocall {
    background-color: $color-golden-dream;
  }

  &_sprint {
    background-color: $color-malibu;
  }

  &_our-game {
    background-color: $color-dodger-blue;
  }
}

@media (hover: hover) {
  .mini-games__link:hover {
    color: $color-wild-watermelon;
  }

  .mini-games__card:nth-child(2) {
    .mini-games__link:hover {
      color: $color-dodger-blue;
    }
  }
}

@media screen and (max-width: $mobile-big-width) {
  .mini-games {
    padding-top: 12px;
  }

  .mini-games__card {
    height: calc(100vw - 60px);
    margin: 12px;
  }

  .mini-games__link {
    margin-top: 20px;
  }
}
</style>
