<template>
  <div class="window">
    <button class="close-button">&times;</button>
    <h2 class="title">Well done!</h2>
    <h2 class="title">It´s enough for today</h2>
    <p class="text">
      You still have new cards, but the daily limit has been reached.<br />
      You can increase your daily limit in the application <a href="#">settings.</a> But don’t
      forget that the more new cards you see, the more words to repeat.<br />
      If you want to continue training, click to <a href="#">learn more.</a>
    </p>
    <div class="buttons-wrapper">
      <button class="Primary-1">Настройки</button> <button class="Primary-2">Учить ещё!</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Notification',
  components: {},
};
</script>

<style scoped lang="scss">
.window {
  position: absolute;
  display: flex;
  flex-direction: column;
  max-width: 434px;
  padding: 40px;
  background: $color-white;
  border: 1px solid $color-black;
  border-radius: 24px;
  box-shadow: 1px 5px 14px $box-shadow-one-color;
}

.window a {
  color: $color-dodger-blue;
  text-decoration: none;
}

.title {
  font-size: 24px;
  font-weight: 900;
  line-height: 30px;
  color: $color-dodger-blue;
  text-align: center;
}

.text {
  margin-top: 13px;
  font-size: 16px;
  font-weight: normal;
  line-height: 24px;
  color: $color-pickled-bluewood;
}

.buttons-wrapper {
  display: flex;
  margin-top: 17px;
}

.close-button {
  position: absolute;
  top: 15px;
  right: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 21px;
  height: 21px;
  color: $color-white;
  background: $color-manatee;
  border: 1px solid $color-manatee;
  border-radius: 50%;
}

.Primary-1 {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 55px;
  padding: 18px 40px;
  color: $color-dodger-blue;
  background: $color-white;
  border: 1px solid $color-dodger-blue;
  border-radius: 20px;
}

.Primary-2 {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 55px;
  padding: 18px 40px;
  margin-left: 8px;
  color: $color-white;
  background: $color-dodger-blue;
  border: 1px solid $color-dodger-blue;
  border-radius: 20px;
}
</style>
