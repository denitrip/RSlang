<template>
  <div class="wrapper">
    <header>
      <!-- TODO links -->
      <!-- <router-link to="/welcome"> -->
      <img src="~@/assets/images/Logo.png" alt="logo" class="logo" width="118" height="72" />
      <!-- </router-link> -->
      <ul class="header_buttons">
        <li v-if="isWelcomePage || isSignUp" class="header_buttons-button button button--bordered">
          Log In
        </li>
        <li v-if="isWelcomePage || isLogIn" class="header_buttons-button button button--filled">
          Sign Up
        </li>
      </ul>
    </header>
    <main v-if="isWelcomePage" class="main-welcome">
      <div class="main-descr">
        <p class="title">Learn new words every day with RSlang</p>
        <p class="subtitle">
          An application for learning foreign words with interval repetition techniques, tracking
          individual progress and mini-games
        </p>
        <ul class="main_buttons">
          <li class="main_buttons-button button button--filled">Start learning</li>
          <li class="main_buttons-button button button--bordered">Watch video</li>
        </ul>
      </div>
      <img src="~@/assets/images/welcome-bg.png" alt class="main-image" />
    </main>
    <main v-if="isLogin" class="main-login">
      <p class="title">
        <span class="text-colored">We miss you,</span> are you ready to continue training?
      </p>
      <img src="~@/assets/images/login-bg.png" alt class="main-image" />
    </main>
    <main v-if="isSignUp" class="main-signup">
      <p class="title">
        Let’s start our jorney with
        <span class="text-colored">RSlang!</span>
      </p>
      <img src="~@/assets/images/signin-bg.png" alt class="main-image" />
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
    isSignUp() {
      return this.$router.currentRoute.name === routerConsts.signUpPage.name;
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
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  flex-grow: 20;
}
.main-image {
  width: 45vw;
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

.main-descr {
  width: 30vw;
  z-index: 2;
}
.title {
  font-weight: 900;
  font-size: 56px;
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
}

.feature-before {
  display: inline-block;
  height: 11px;
  width: 11px;
  background-color: #f1e134;
  top: 36%;
  margin-right: 16px;
  border-radius: 5px;
}
.text-colored {
  color: #f1e134;
}
</style>
