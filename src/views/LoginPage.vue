<template>
  <div class="wrapper">
    <header>
      <img src="~@/assets/images/Logo.png" alt="logo" class="logo" width="118" height="72" />
      <ul class="header_buttons">
        <li class="header_buttons-button button button--bordered">Log In</li>
        <li class="header_buttons-button button button--filled">Sign Up</li>
      </ul>
    </header>
    <main v-if="isWelcomePage" class="main-welcome">
      <p class="title">Learn new words every day with RSlang</p>
      <p class="subtitle">
        An application for learning foreign words with interval repetition techniques, tracking
        individual progress and mini-games
      </p>
      <ul class="main_buttons">
        <li class="main_buttons-button button button--filled">Start learning</li>
        <li class="main_buttons-button button button--bordered">Watch video</li>
      </ul>
    </main>
    <main v-if="isLogin" class="main-login">
      <p>LOGIN TEXT</p>
    </main>
    <main v-if="isSignIn" class="main-signin">
      <p>SIGN IN TEXT</p>
    </main>
    <footer>
      <ul class="footer_features">
        <li class="footer_features-feature">
          <div class="feature-before"></div>
          <p>Interval repetition technique</p>
        </li>
        <li class="footer_features-feature">
          <div class="feature-before"></div>
          <p>Mini games</p>
        </li>
        <li class="footer_features-feature">
          <div class="feature-before"></div>
          <p>A large number of settings</p>
        </li>
        <li class="footer_features-feature">
          <div class="feature-before"></div>
          <p>Learning statistics</p>
        </li>
      </ul>
    </footer>
  </div>
</template>

<script>
import routerConsts from '../router/routerConsts';

export default {
  name: 'LoginPage',
  components: {},
  data() {
    return {};
  },
  computed: {
    isLogin() {
      return this.$router.currentRoute.name === routerConsts.loginPage.name;
    },
    isSignIn() {
      return this.$router.currentRoute.name === routerConsts.signInPage.name;
    },
    isWelcomePage() {
      return this.$router.currentRoute.name === routerConsts.welcomePage.name;
    },
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  width: 80vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

main {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  flex-grow: 20;
}

h1 {
  margin: 0;
}
.logo {
  margin-right: 20px;
}

header {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.button {
  font-size: 20px;
  line-height: 54px;
  border-radius: 20px;
  // margin-right: 16px;
  cursor: pointer;
  box-sizing: border-box;
}
.button:first-child {
  margin-right: 16px;
}
.button--bordered {
  border: 1px solid #407df4;
  color: #407df4;
}
.button--bordered:hover {
  border: 1px solid #709ef7;
  color: #709ef7;
}

.button--filled {
  background-color: #407df4;
  color: #ffffff;
}
.button--filled:hover {
  background-color: #709ef7;
}

.header_buttons,
.main_buttons {
  display: flex;
  flex-direction: row;
  list-style-type: none;
  padding: 0;
}

.header_buttons-button {
  width: 175px;
  height: 59px;
  text-align: center;
}

.main_buttons-button {
  width: 244px;
  height: 59px;
  text-align: center;
}

.main-welcome {
  background-image: url(~@/assets/images/welcome-bg.png);
  background-repeat: no-repeat;
  background-position: right;
}

.title {
  font-weight: 900;
  font-size: 56px;
  width: 30vw;
  margin: 8px 0;
}
.subtitle {
  width: 429px;
  line-height: 30px;
  margin-bottom: 32px;
}
.footer {
  flex-grow: 1;
}

.footer_features {
  display: flex;
  flex-direction: row;
  list-style-type: none;
  padding: 0;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0;
}
.footer_features-feature {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.footer_features-feature p {
  position: relative;
  display: inline-block;
  // padding-left: 10px;
}
.feature-before {
  display: inline-block;
  height: 11px;
  width: 11px;
  background-color: #f1e134;
  // position: absolute;
  top: 36%;
  // left: -15px;
  margin-right: 16px;
  // margin-bottom: 2px;
  border-radius: 5px;
}
</style>
