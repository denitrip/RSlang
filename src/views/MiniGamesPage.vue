<template>
  <div class="mini-games">
    <div class="mini-games__card mini-games__card_speak-it">
      <IconBase width="57px" height="71px">
        <IconMegaphone />
      </IconBase>
      <h2>Speak It!</h2>
      <router-link to="/english-puzzle">Play!</router-link>
    </div>
    <div class="mini-games__card mini-games__card_puzzle">2</div>
    <div class="mini-games__card mini-games__card_savannah">3</div>
    <div class="mini-games__card mini-games__card_audiocall">4</div>
    <div class="mini-games__card mini-games__card_sprint">5</div>
    <div class="mini-games__card mini-games__card_my-game">6</div>
  </div>
</template>

<script>
import IconBase from '@/components/IconBase.vue';
import IconMegaphone from '@/components/icons/IconMegaphone.vue';
// import IconPuzzle from '@/components/icons/IconPuzzle.vue';
// import IconSavannah from '@/components/icons/IconSavannah.vue';
// import IconVideoCall from '@/components/icons/IconVideoCall.vue';
// import IconRunning from '@/components/icons/IconRunning.vue';
// import IconPoker from '@/components/icons/IconPoker.vue';

export default {
  name: 'MiniGamesPage',
  components: {
    IconBase,
    IconMegaphone,
    // IconPuzzle,
    // IconSavannah,
    // IconVideoCall,
    // IconRunning,
    // IconPoker,
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
}

.mini-games__card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 358px;
  height: 358px;
  margin: 16px;
  color: $color-white;

  &_speak-it {
    background-color: $color-dodger-blue;
  }

  &_puzzle {
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

  &_my-game {
    background-color: $color-dodger-blue;
  }
}
</style>
