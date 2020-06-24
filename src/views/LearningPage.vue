<template>
  <div class="learning__wrapper">
    <learning-card
      englishWord="water"
      russianWord="вода"
      transcription="[ˈˈwɔtər]"
      leadingQuestion="Drink to quench your thirst"
      sentanceWithWord="I like to drink water"
    ></learning-card>
    <Notification v-if="isNotificationShow" />
    <button @click="open">NotificationShow</button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import LearningCard from '../components/LearningCard.vue';
import Notification from '../components/Notification.vue';

export default {
  name: 'LearningPage',
  components: {
    LearningCard,
    Notification,
  },
  computed: {
    ...mapState('Notification', ['isNotificationShow']),
  },
  destroyed() {
    this.setIsNotificationShow(false);
  },
  methods: {
    ...mapMutations('Notification', ['setIsNotificationShow']),
    open() {
      this.setIsNotificationShow(true);
    },
  },
};
</script>

<style scoped lang="scss">
.learning {
  &__wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    max-width: $content-width;
    padding: 20px 0 30px 0;
    margin: auto;
  }
}
</style>
