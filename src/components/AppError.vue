<template>
  <div class="notify" :class="[isError ? 'notify_error' : 'notify_info']">
    <div class="notify__text">{{ error }}</div>
    <button
      class="notify__close"
      :class="[isError ? 'notify__close_error' : 'notify__close_info']"
      @click="onClose"
    >
      &times;
    </button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'AppError',
  mounted() {
    setTimeout(() => {
      this.onClose();
    }, 3000);
  },
  computed: {
    ...mapState('Error', ['error', 'isError']),
  },
  methods: {
    ...mapActions('Error', ['setError']),
    onClose() {
      this.setError(null);
    },
  },
};
</script>

<style lang="scss" scoped>
.notify {
  position: fixed;
  top: 10px;
  right: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  padding: 10px 30px 10px 20px;
  margin: 0 10px;
  text-align: center;
  border-radius: 5px;
  box-shadow: 0 0 10px $overlay-color;

  &_error {
    color: $color-chestnut;
    background-color: $color-chablis;
  }

  &_info {
    color: $color-apple;
    background-color: $color-sugar-cane;
  }
}

.notify__text {
  user-select: none;
}

.notify__close {
  position: absolute;
  top: -3px;
  right: 5px;
  font-size: 26px;
  cursor: pointer;
  background-color: transparent;
  border: none;
  transition: color 0.3s;

  &_error {
    color: $color-chestnut;
  }

  &_info {
    color: $color-apple;
  }
}

@media (hover: hover) {
  .notify__close:hover {
    color: $color-dodger-blue;
    background: transparent;
  }
}
</style>
