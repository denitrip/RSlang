<template>
  <form class="login" novalidate>
    <h4 class="h4 wrap">Log in</h4>
    <div class="wrap">
      <label for="login" :class="{ email__wrong_color: isValidErrorEmail }">Email or login</label>
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
      <label for="password">Password</label>
      <input class="input" :type="isPasswordShow ? 'text' : 'password'" id="password" />
      <span
        class="eye"
        :class="{ password__eye: !isPasswordShow, password__eye_close: isPasswordShow }"
        @click="showPassword"
      ></span>
    </div>
    <button type="submit" class="btn btn-login wrap btn-error">
      Log in
      <AppSpinner v-if="isAuthLoading"></AppSpinner>
      <span v-else class="btn-arrow"></span>
    </button>
    <div class="signup wrap">
      <label for="signup">Don't have account?</label>
      <a href="#" id="signup"> Sign Up</a>
    </div>
  </form>
</template>

<script>
import AppSpinner from '@/components/AppSpinner.vue';
import ValidField from '@/helpers/auth.helper';

export default {
  name: 'LoginForm',
  components: {
    AppSpinner,
  },
  data() {
    return {
      isAuthLoading: false,
      isPasswordShow: false,
      email: new ValidField(null),
      password: new ValidField(null),
      repeatPassword: new ValidField(null),
      emailRegex: /(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/,
      passwordRegex: /(?=.*[0-9])(?=.*[-+_@$!%*?&#.,;:[\]{}])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z-+_@$!%*?&#.,;:[\]{}]{8,}/g,
    };
  },
  computed: {
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
    showPassword() {
      this.isPasswordShow = !this.isPasswordShow;
    },
    isRequired(field) {
      return !!field;
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
    margin-top: 9px;
    font-size: 14px;
    line-height: 16px;
    color: $color-mine-shaft;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid $color-dodger-blue;
    outline: none;
  }

  .email__correct {
    background-image: url('~@/assets/img/login-correct.png');
    background-repeat: no-repeat;
    background-position-x: 98%;
    background-size: 18px;
  }

  .email__wrong_color {
    color: $color-wild-watermelon;
  }

  .email__wrong_border {
    border-bottom: 1px solid $color-wild-watermelon;
  }

  .email__wrong {
    font-size: 10px;
    font-weight: 300;
    line-height: 12px;
  }

  .eye {
    position: absolute;
    right: 5px;
    bottom: -2px;
    width: 18px;
    height: 18px;
  }

  .password__eye {
    cursor: pointer;
    background-image: url('~@/assets/img/password-eye-open.png');
    background-repeat: no-repeat;
    background-size: 18px;
  }

  .password__eye_close {
    bottom: 1px;
    cursor: pointer;
    background-image: url('~@/assets/img/password-eye-close.png');
    background-repeat: no-repeat;
    background-size: 18px;
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

  .btn-error {
    cursor: default;
    background-color: $color-malibu;
  }
}

.signup {
  text-align: center;
}
</style>
