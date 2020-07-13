<template>
  <div class="wrapper">
    <header>
      <router-link :to="routerConsts.welcomePage.path">
        <img src="~@/assets/images/Logo.png" alt="logo" class="logo" width="118" height="72" />
      </router-link>
      <ul class="header_buttons">
        <transition name="fade" mode="out-in">
          <router-link
            v-if="isSignUp"
            :to="routerConsts.loginPage.path"
            :key="routerConsts.loginPage.path"
          >
            <li class="header_buttons-button button button--bordered">
              Log In
            </li>
          </router-link>
          <router-link
            v-if="isLogIn"
            :to="routerConsts.signUpPage.path"
            :key="routerConsts.signUpPage.path"
          >
            <li class="header_buttons-button button button--filled">
              Sign Up
            </li>
          </router-link>
          <div class="header_buttons" v-if="isWelcomePage">
            <router-link :to="routerConsts.loginPage.path" :key="routerConsts.loginPage.path">
              <li class="header_buttons-button button button--bordered">
                Log In
              </li>
            </router-link>
            <router-link :to="routerConsts.signUpPage.path" :key="routerConsts.signUpPage.path">
              <li class="header_buttons-button button button--filled">
                Sign Up
              </li>
            </router-link>
          </div>
        </transition>
      </ul>
    </header>
    <transition name="fade" mode="out-in">
      <main v-if="isWelcomePage" class="main-welcome" key="main-welcome">
        <div class="main-descr">
          <p class="title">Learn new words every day with RSlang</p>
          <p class="subtitle">
            An application for learning foreign words with interval repetition techniques, tracking
            individual progress and mini-games.
          </p>
          <p class="text-rules text-rules_title">Interval repetition rules:</p>
          <p class="text-rules">— default learning interval is 24 hours;</p>
          <p class="text-rules">— user made a mistake or clicked repeat button - 2 hours;</p>
          <p class="text-rules">— user pressed the good button - 48 hours;</p>
          <p class="text-rules">— user pressed the easy button - 120 hours.</p>
          <ul class="main_buttons">
            <li class="main_buttons-button">
              <router-link :to="routerConsts.signUpPage.path" class="StartLearning">
                <button class="button button--filled">Start learning</button>
              </router-link>
            </li>
            <li class="main_buttons-button">
              <WatchVideo />
            </li>
          </ul>
        </div>
        <img src="~@/assets/images/welcome-bg.png" alt class="main-image" />
      </main>
      <main v-if="isLogIn" class="main-login" key="main-login">
        <p class="title">
          <span class="text-colored">We miss you,</span> are you ready to continue training?
        </p>
        <div class="form-wrapper form-wrapper--login">
          <loginForm />
        </div>
      </main>
      <main v-if="isSignUp" class="main-signup" key="main-signup">
        <p class="title">
          Let’s start our jorney with
          <span class="text-colored">RSlang!</span>
        </p>
        <div class="form-wrapper form-wrapper--signup">
          <loginForm />
        </div>
      </main>
    </transition>
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
import { mapActions } from 'vuex';
import routerConsts from '@/router/routerConsts';
import loginForm from '@/components/LoginForm.vue';
import WatchVideo from '@/components/WatchVideo.vue';

export default {
  name: 'LoginPage',
  components: { loginForm, WatchVideo },
  data() {
    return {
      currentRoute: this.$router.currentRoute.name,
      routerConsts,
    };
  },
  computed: {
    isLogIn() {
      return this.currentRoute === routerConsts.loginPage.name;
    },
    isSignUp() {
      return this.currentRoute === routerConsts.signUpPage.name;
    },
    isWelcomePage() {
      return this.currentRoute === routerConsts.welcomePage.name;
    },
  },
  watch: {
    $route(to) {
      this.currentRoute = to.name;
    },
  },
  created() {
    if (this.$route.query.loginError) {
      this.setError('Please log in to access this page.');
    }
  },
  methods: {
    ...mapActions('Error', ['setError']),
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

.wrapper {
  @extend %flex-column;

  width: 100%;
  max-width: $content-width;
  height: 100vh;
  padding: 20px 40px;
  margin: 0 auto;

  @media screen and (max-width: $mobile-big-width) {
    padding: 20px;
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

.form-wrapper {
  @extend %flex-row;

  flex-grow: 20;
  align-items: center;
  align-self: stretch;
  justify-content: flex-end;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;

  @media screen and (max-width: $tablet-width) {
    align-self: auto;
    width: 78vw;
    padding: 10px;
    margin-top: 10px;
  }

  @media screen and (max-width: $mobile-big-width) {
    width: 96vw;
  }
}

.form-wrapper--login {
  background-image: url('~@/assets/images/login-bg.png');
}

.form-wrapper--signup {
  background-image: url('~@/assets/images/signup-bg.png');
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

  align-items: center;
  justify-content: space-between;
}

.button {
  box-sizing: border-box;
  width: 100%;
  font-size: 20px;
  line-height: 54px;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  border-radius: 20px;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;

  @media screen and (max-width: $tablet-width) {
    font-size: 18px;
  }

  @media screen and (max-width: $mobile-big-width) {
    font-size: 14px;
  }
}

.button--bordered {
  color: $color-dodger-blue;
  border: 1px solid $color-dodger-blue;
}

.button--filled {
  color: $color-white;
  background-color: $color-dodger-blue;
  border: 1px solid $color-dodger-blue;
}

.main-image {
  width: 45vw;
  margin-top: 20px;

  @media screen and (max-width: $mobile-big-width) {
    display: none;
  }
}

.header_buttons {
  a:first-child {
    .button {
      margin-right: 16px;
    }
  }

  @media screen and (max-width: $puzzle-mobile-size) {
    flex-direction: column;

    a:first-child {
      .button {
        margin-right: 0;
        margin-bottom: 10px;
      }
    }
  }
}

.main_buttons {
  justify-content: flex-start;
  margin-top: 24px;

  @media screen and (max-width: $tablet-width) {
    justify-content: center;
  }
}

.header_buttons,
.main_buttons {
  @extend %flex-row;

  padding: 0;
  list-style-type: none;
}

.header_buttons-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 175px;
  height: 59px;

  @media screen and (max-width: $mobile-big-width) {
    width: 150px;
    height: 50px;
    margin-bottom: 10px;
  }
}

.main_buttons-button {
  width: 100%;
  max-width: 250px;
  height: 59px;

  @media screen and (max-width: $mobile-big-width) {
    width: 120px;
  }

  &:nth-child(1) {
    margin-right: 16px;
  }
}

.main-descr {
  z-index: 2;
}

.title {
  width: 100%;
  max-width: 41vw;
  margin-bottom: 24px;
  font-size: 56px;
  font-weight: 900;
  line-height: 1.2;

  @media screen and (max-width: $tablet-width) {
    max-width: 94vw;
    font-size: 38px;
    text-align: center;
  }

  @media screen and (max-width: $mobile-big-width) {
    font-size: 30px;
  }
}

.subtitle {
  margin-bottom: 24px;
  line-height: 1.5;

  @media screen and (max-width: $tablet-width) {
    text-align: center;
  }
}

.text-rules {
  @media screen and (max-width: $tablet-width) {
    text-align: center;
  }

  &_title {
    font-weight: 600;
  }
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

  @media screen and (max-width: $mobile-big-width) {
    display: none;
  }
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

.StartLearning {
  color: $color-white;
}

@media (hover: hover) {
  a:hover {
    text-decoration: none;
  }

  .button--bordered:hover {
    color: $color-malibu;
    border-color: $color-malibu;
  }

  .button--filled:hover {
    background-color: $color-malibu;
    border-color: $color-malibu;
  }
}
</style>
