<template>
  <header class="header-container">
    <div class="container-label">
      <h2>Dictionary</h2>
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
      <div class="user-avatar"><img src="../assets/img/header/user_image.png" alt="#" /></div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'MainHeader',
  components: {},
};
</script>

<style scoped lang="scss">
.header-container {
  margin: 0 60px 0 75px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  height: 86px;
}

img {
  height: 20px;
  width: 20px;
  margin-left: 16px;
}

.container-label h2 {
  display: inline-block;
  font-weight: 900;
  margin: 0;
  padding: 0;
  color: #483d8b;
}

.user-section {
  margin-left: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.user-details {
  margin-left: 16px;
  display: block;
  align-items: center;
}

.user-level {
  font-size: 12px;
  opacity: 50%;
}

.user-avatar img {
  border-radius: 50%;
  height: 50px;
  width: 50px;
}
</style>
