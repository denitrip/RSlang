<template>
  <header class="header-container">
    <div class="container-label">
      <h2>{{ currentRoute }}</h2>
    </div>
    <div class="user-section">
      <img src="../assets/img/header/notifications_image.png" alt="#" />
      <img src="../assets/img/header/settings_image.png" alt="#" />
      <div class="user-details">
        <div class="user-name">
          Ivan Ivanov
        </div>
        <div class="user-level">
          Level 3
        </div>
      </div>
      <div class="user-avatar">
        <img src="../assets/img/header/user_image.png" alt="#" />
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'MainHeader',
  components: {},
  data() {
    return {
      currentRoute: this.$router.currentRoute.name,
    };
  },

  watch: {
    $route(to) {
      this.currentRoute = to.name;
    },
  },
};
</script>

<style scoped lang="scss">
.header-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  height: 86px;
  margin: 0 60px 0 75px;
}

img {
  width: 20px;
  height: 20px;
  margin-left: 16px;
}

.container-label {
  margin-left: 0;
}

.container-label h2 {
  display: inline-block;
  padding: 0;
  margin: 0;
  font-weight: 900;
  color: $color-Gigas;
}

.user-section {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-left: 10px;
}

.user-details {
  display: block;
  align-items: center;
  width: max-content;
  margin-left: 16px;
}

.user-level {
  font-size: 12px;
  opacity: 50%;
}

.user-avatar img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

@media (max-width: 414px) {
  .header-container {
    justify-content: center;
    margin: 0;
  }

  .container-label h2 {
    font-size: 1.75rem;
  }

  .user-avatar img {
    width: 40px;
    height: 40px;
  }
}
</style>
