<template>
  <form class="login" @submit.prevent="onSubmit" novalidate>
    <h4 class="h4 wrap">{{ isRegisterPage ? 'Sign up' : 'Log in' }}</h4>
    <div class="wrap">
      <label for="login" :class="{ email__wrong_color: isValidErrorEmail }">Email</label>
      <input
        class="input"
        :class="{
          email__wrong_border: isValidErrorEmail,
          email__correct: !isInvalidEmail,
        }"
        type="email"
        name="login"
        id="login"
        v-model="email.title"
        @blur="email.touch()"
      />
      <span v-if="isValidErrorEmail" class="email__wrong email__wrong_color">
        <template v-if="!isRequiredEmail">
          Required.
        </template>
        <template v-else-if="!isEmail">
          The e-mail adress is incomplete.
        </template>
      </span>
    </div>
    <div class="wrap">
      <label for="password" :class="{ email__wrong_color: isValidErrorPassword }">Password</label>
      <input
        class="input"
        :class="{ email__wrong_border: isValidErrorPassword }"
        :type="isPasswordShow ? 'text' : 'password'"
        id="password"
        v-model="password.title"
        @blur="password.touch()"
      />
      <span
        class="eye"
        :class="isPasswordShow ? 'password__eye_close' : 'password__eye'"
        @click="showPassword"
        :title="isPasswordShow ? 'hide password' : 'show password'"
      ></span>
      <span v-if="isValidErrorPassword" class="email__wrong email__wrong_color">
        <template v-if="!isRequiredPassword">
          Required
        </template>
        <template v-else-if="!isMinLength">
          Password must be equal or more than 8 characters
        </template>
        <template v-else-if="!isPassword">
          Password must contain at least one uppercase letter, one lowercase letter, one number and
          one special character
        </template>
      </span>
    </div>
    <div class="wrap" v-if="isRegisterPage">
      <label for="repeatPassword">
        Repeat password
      </label>
      <input
        class="input"
        :class="{ email__wrong_border: isValidErrorRepeatPassword }"
        :type="isRepeatPasswordShow ? 'text' : 'password'"
        id="repeatPassword"
        v-model="repeatPassword.title"
        @blur="repeatPassword.touch()"
      />
      <span
        class="eye"
        :class="isRepeatPasswordShow ? 'password__eye_close' : 'password__eye'"
        @click="showRepeatPassword"
        :title="isRepeatPasswordShow ? 'hide password' : 'show password'"
      ></span>
      <span v-if="isValidErrorRepeatPassword" class="email__wrong email__wrong_color">
        <template v-if="!isRequiredRepeatPassword">
          Required
        </template>
        <template v-else-if="!isSameAs">
          Passwords must be identical
        </template>
      </span>
    </div>
    <button
      v-if="isRegisterPage"
      type="submit"
      class="btn btn-login wrap"
      :disabled="isRegistrationValid || isAuthLoading"
    >
      Sign Up
      <AppSpinner v-if="isAuthLoading"></AppSpinner>
      <span v-else class="btn-arrow"></span>
    </button>
    <button
      v-else
      type="submit"
      class="btn btn-login wrap"
      :disabled="isLoginValid || isAuthLoading"
    >
      Log in
      <AppSpinner v-if="isAuthLoading"></AppSpinner>
      <span v-else class="btn-arrow"></span>
    </button>
    <div class="signup wrap" v-if="isRegisterPage">
      <label for="signup">Already have an account?</label>
      <router-link :to="routerConsts.loginPage.path">
        Log In
      </router-link>
    </div>
    <div class="signup wrap" v-else>
      <label for="signup">Don't have account?</label>
      <router-link :to="{ path: routerConsts.loginPage.path, query: { signUp: true } }">
        Sign Up
      </router-link>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex';
import AppSpinner from '@/components/AppSpinner.vue';
import ValidField from '@/helpers/validation.helper';
import routerConsts from '@/router/routerConsts';

export default {
  name: 'LoginForm',
  components: {
    AppSpinner,
  },
  created() {
    if (this.$route.query.loginError) {
      this.setError('Please log in to access this page.');
    }
  },
  data() {
    return {
      routerConsts,
      isAuthLoading: false,
      isPasswordShow: false,
      isRepeatPasswordShow: false,
      email: new ValidField(null),
      password: new ValidField(null),
      repeatPassword: new ValidField(null),
      emailRegex: /(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/,
      passwordRegex: /(?=.*[0-9])(?=.*[-+_@$!%*?&#.,;:[\]{}])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z-+_@$!%*?&#.,;:[\]{}]{8,}/,
    };
  },
  computed: {
    isRegisterPage() {
      return !!this.$route.query.signUp;
    },
    isRequiredEmail() {
      return this.isRequired(this.email.title);
    },
    isRequiredPassword() {
      return this.isRequired(this.password.title);
    },
    isRequiredRepeatPassword() {
      return this.isRequired(this.repeatPassword.title);
    },
    isEmail() {
      return this.email.title ? this.emailRegex.test(this.email.title) : false;
    },
    isPassword() {
      return this.password.title ? this.passwordRegex.test(this.password.title) : false;
    },
    isMinLength() {
      return this.password.title.length >= 8;
    },
    isSameAs() {
      return this.password.title === this.repeatPassword.title;
    },
    isInvalidEmail() {
      return !this.isRequiredEmail || !this.isEmail;
    },
    isInvalidPassword() {
      return !this.isRequiredPassword || !this.isMinLength || !this.isPassword;
    },
    isInvalidRepeatPassword() {
      return !this.isRequiredRepeatPassword || !this.isSameAs;
    },
    isValidErrorEmail() {
      return this.email.touched && this.isInvalidEmail;
    },
    isValidErrorPassword() {
      return this.password.touched && this.isInvalidPassword;
    },
    isValidErrorRepeatPassword() {
      return this.repeatPassword.touched && this.isInvalidRepeatPassword;
    },
    isLoginValid() {
      return this.isInvalidEmail || this.isInvalidPassword;
    },
    isRegistrationValid() {
      return this.isInvalidEmail || this.isInvalidPassword || this.isInvalidRepeatPassword;
    },
  },
  methods: {
    ...mapActions('Auth', ['loginUser', 'registerUser']),
    ...mapActions('Error', ['setError']),

    showPassword() {
      this.isPasswordShow = !this.isPasswordShow;
    },
    showRepeatPassword() {
      this.isRepeatPasswordShow = !this.isRepeatPasswordShow;
    },
    isRequired(field) {
      return !!field;
    },
    onSubmit() {
      if (this.isRegisterPage) {
        this.onRegister();
      } else {
        this.onLogin();
      }
    },
    async onLogin() {
      if (!this.isLoginValid) {
        this.isAuthLoading = true;
        try {
          const user = {
            email: this.email.title,
            password: this.password.title,
          };
          await this.loginUser(user).then(() => {
            this.$router.push(this.routerConsts.homePage.path);
          });
        } catch (error) {
          this.setError(error.message);
        } finally {
          this.isAuthLoading = false;
        }
      }
    },
    async onRegister() {
      if (!this.isRegistrationValid) {
        this.isAuthLoading = true;
        try {
          const user = {
            email: this.email.title,
            password: this.password.title,
          };
          await this.registerUser(user).then(() => {
            this.$router.push(this.routerConsts.loginPage.path);
          });
        } catch (error) {
          this.setError(error.message);
        } finally {
          this.isAuthLoading = false;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  max-width: 429px;
  padding: 60px 57px;
  line-height: 1;
  background: $color-rose-white;
  border-radius: 20px;
  box-shadow: 1px 5px 14px $box-shadow-one-color;

  .wrap {
    position: relative;
    margin-bottom: 24px;
  }

  .h4 {
    font-size: 24px;
    font-weight: bold;
    color: $color-pickled-bluewood;
  }

  label {
    font-size: 14px;
    color: $color-silver;
  }

  .input {
    display: block;
    width: 100%;
    padding: 9px 0;
    margin: 8px 0;
    font-size: 14px;
    line-height: 16px;
    color: $color-mine-shaft;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid $color-dodger-blue;
    outline: none;
    transition: color 0.3s, border-color 0.3s;
  }

  .email__correct {
    background-image: url('~@/assets/img/login-correct.png');
    background-repeat: no-repeat;
    background-position-x: 98%;
    background-size: 18px;
  }

  .email__wrong_color {
    color: $color-red-orange;
  }

  .email__wrong_border {
    border-bottom: 1px solid $color-red-orange;
  }

  .email__wrong {
    font-size: 10px;
    font-weight: 300;
    line-height: 12px;
  }

  .eye {
    position: absolute;
    top: 32px;
    right: 5px;
    width: 18px;
    height: 18px;
  }

  .password__eye,
  .password__eye_close {
    cursor: pointer;
    background-repeat: no-repeat;
    background-size: 18px;
  }

  .password__eye {
    top: 35px;
    background-image: url('~@/assets/img/password-eye-open.png');
  }

  .password__eye_close {
    background-image: url('~@/assets/img/password-eye-close.png');
  }

  a {
    font-size: 14px;
    font-weight: 600;
    color: $color-dodger-blue;
    text-decoration: none;
  }

  .btn {
    font-size: 20px;
    line-height: 23px;
    color: $color-white;
    cursor: pointer;
    background: $color-dodger-blue;
    border: none;
    border-radius: 20px;
    outline: none;
    transition: background-color 0.3s;

    &:disabled {
      cursor: default;
      background-color: $color-malibu;
    }
  }

  .btn-login {
    display: flex;
    justify-content: space-between;
    padding: 24px;
  }

  .btn-arrow {
    width: 18px;
    height: 24px;
    background-image: url('~@/assets/img/btn-arrow.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 18px 14px;
  }
}

.signup {
  text-align: center;
}
</style>
