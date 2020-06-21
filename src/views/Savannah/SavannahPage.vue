<template>
  <div class="savannah">
    <transition name="fade" mode="out-in">
      <SavannahStartScreen
        v-if="isStartScreen"
        @startGame="onStartGame"
        :isStartLoading="isStartLoading"
      />
    </transition>
    <transition name="fade" mode="out-in">
      <SavannahGame v-if="!isStartScreen" />
    </transition>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import SavannahStartScreen from '@/components/Savannah/SavannahStartScreen.vue';
import SavannahGame from '@/components/Savannah/SavannahGame.vue';

export default {
  name: 'SavannahHomePage',
  components: {
    SavannahStartScreen,
    SavannahGame,
  },
  data() {
    return {
      isStartLoading: false,
    };
  },
  computed: {
    ...mapState('Savannah', ['isStartScreen']),
  },
  methods: {
    ...mapActions('Error', ['setError']),
    ...mapMutations('Savannah', ['setIsStartScreen']),

    async onStartGame() {
      this.isStartLoading = true;
      try {
        console.log('start');
        this.setIsStartScreen(false);
      } catch (error) {
        this.setError(error.message);
      } finally {
        this.isStartLoading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.savannah {
  width: 100%;
  height: 100%;
}
</style>
