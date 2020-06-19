<template>
  <div class="window">
    <div class="button"><button class="close-button">x</button></div>
    <h2 class="title">Well done!<br />It´s enough for today</h2>
    <p class="text">
      You still have new cards, but the daily limit has been reached.<br />
      You can increase your daily limit in the application <a href="#">settings.</a> But don’t
      forget that the more new cards you see, the more words to repeat.<br />
      If you want to continue training, click to <a href="#">learn more.</a>
    </p>
    <button class="Primary-1"><span class="Primary-1-text">Настройки</span></button>
    <button class="Primary-2"><span class="Primary-2-text">Учить ещё!</span></button>
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
  top: 65px;
  left: 938.62px;
  width: 434px;
  height: 433px;
  background: #ffffff;
  border: 1px solid black;
  border-radius: 24px;
  box-shadow: 1px 5px 14px rgba(55, 114, 227, 0.1);
}

.window a {
  color: #407df4;
  text-decoration: none;
}

.title {
  position: absolute;
  top: 40px;
  left: 97px;
  width: 243px;
  height: 60px;
  font-size: 24px;
  font-weight: 900;
  line-height: 30px;
  color: #407df4;
  text-align: center;
}

.text {
  position: absolute;
  top: 113px;
  left: 40px;
  width: 358px;
  height: 208px;
  font-size: 16px;
  font-weight: normal;
  line-height: 24px;
  color: #28374b;
}

.button {
  position: absolute;
  top: 19px;
  left: 393px;
  width: 25px;
  height: 25px;
}

.close-button {
  position: absolute;
  top: 8.33%;
  right: 8.33%;
  bottom: 8.33%;
  left: 8.33%;
  color: white;
  background: #939ba5;
  border: 1px solid #939ba5;
  border-radius: 50%;
}

.Primary-1 {
  position: absolute;
  top: 338px;
  left: 57px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  width: 158px;
  height: 55px;
  padding: 18px 40px;
  background: #ffffff;
  border: 1px solid #407df4;
  border-radius: 20px;
}

.Primary-1-text {
  position: static;
  top: 18px;
  left: 40px;
  display: flex;
  flex: none;
  align-items: center;
  align-self: center;
  order: 0;
  width: 78px;
  height: 19px;
  margin: 10px 0;
  font-size: 16px;
  font-weight: normal;
  line-height: 19px;
  color: #407df4;
  text-align: center;
}

.Primary-2 {
  position: absolute;
  top: 338px;
  left: 223px;
  display: flex;
  flex-direction: row;
  width: 158px;
  height: 55px;
  padding: 18px 40px;
  background: #407df4;
  border: 1px solid #407df4;
  border-radius: 20px;
}

.Primary-2-text {
  position: static;
  top: 18px;
  left: 40px;
  display: flex;
  flex: none;
  align-items: center;
  align-self: center;
  order: 0;
  width: 78px;
  height: 19px;
  margin: 10px 0;
  font-size: 16px;
  font-weight: normal;
  line-height: 19px;
  color: #ffffff;
  text-align: center;
}
</style>
