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
    <main v-if="isLogIn" class="main-login">
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
    isLogIn() {
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
%flex-column {
  display: flex;
  flex-direction: column;
}

%flex-row {
  display: flex;
  flex-direction: row;
}

$color-primary: #407df4;
$color-primary-hover: #709ef7;
$color-secondary: #f1e134;
$content-width: 1197px;
$tablet-width: 768px;
$mobile-big-width: 514px;
$mobile-small-width: 320px;

.wrapper {
  @extend %flex-column;

  width: 80vw;
  height: 100vh;
  margin: 0 auto;

  @media screen and (max-width: $content-width) {
    width: 90vw;
  }

  @media screen and (max-width: $tablet-width) {
    width: 95vw;
  }
}

main {
  @extend %flex-row;

  flex-grow: 20;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: $tablet-width) {
    flex-direction: column;
    justify-content: center;
  }
}

.main-image {
  width: 45vw;

  @media screen and (max-width: $tablet-width) {
    width: 78vw;
    margin-top: 10px;
  }

  @media screen and (max-width: $mobile-big-width) {
    width: 70vw;
  }
}

h1 {
  margin: 0;
}

.logo {
  margin-right: 20px;

  @media screen and (max-width: $mobile-big-width) {
    margin-right: 10px;
    margin-left: -17px;
    transform: scale(0.7);
  }
}

header {
  @extend %flex-row;

  flex-grow: 1;
  align-items: center;
  justify-content: space-between;
}

.button {
  box-sizing: border-box;
  font-size: 20px;
  line-height: 54px;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  border-radius: 20px;

  @media screen and (max-width: $tablet-width) {
    font-size: 18px;
  }

  @media screen and (max-width: $mobile-big-width) {
    font-size: 14px;
  }
}

.button:first-child {
  margin-right: 16px;
}

.button--bordered {
  color: $color-primary;
  border: 1px solid $color-dodger-blue;
}

.button--bordered:hover {
  color: $color-cornflower-blue;
  border: 1px solid $color-cornflower-blue;
}

.button--filled {
  color: $color-white;
  background-color: $color-dodger-blue;
}

.button--filled:hover {
  background-color: $color-cornflower-blue;
}

.header_buttons,
.main_buttons {
  @extend %flex-row;

  padding: 0;
  list-style-type: none;
}

.header_buttons-button {
  width: 175px;
  height: 59px;

  @media screen and (max-width: $tablet-width) {
    width: 100px;
  }

  @media screen and (max-width: $mobile-big-width) {
    width: 85px;
    height: 50px;
    line-height: 46px;
  }
}

.main_buttons-button {
  width: 45%;
  height: 59px;
  line-height: 56px;
}

.main-descr {
  z-index: 2;
}

.title {
  margin: 8px 0;
  font-size: 56px;
  font-weight: 900;

  @media screen and (max-width: $tablet-width) {
    font-size: 38px;
  }

  @media screen and (max-width: $mobile-big-width) {
    font-size: 30px;
  }
}

.subtitle {
  margin-bottom: 32px;
  line-height: 30px;
}

.footer {
  flex-grow: 1;
}

.footer_features {
  @extend %flex-row;

  align-items: center;
  justify-content: space-between;
  padding: 0;
  margin: 30px 0;
  list-style-type: none;
}

.footer_features-feature {
  @extend %flex-row;

  align-items: center;
}

.footer_features-feature p {
  position: relative;
  display: inline-block;

  @media screen and (max-width: $mobile-big-width) {
    font-size: 14px;
  }

  @media screen and (max-width: $mobile-big-width) {
    font-size: 11px;
  }
}

.feature-before {
  top: 36%;
  display: inline-block;
  flex-shrink: 0;
  width: 11px;
  height: 11px;
  margin-right: 16px;
  background-color: $color-golden-dream;
  border-radius: 5px;

  @media screen and (max-width: $mobile-big-width) {
    margin-right: 8px;
  }
}

.text-colored {
  color: $color-golden-dream;
}
</style>
