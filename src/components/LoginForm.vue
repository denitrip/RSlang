<template>
  <form class="login">
    <h4 class="h4 wrap">Log in</h4>
    <div class="wrap">
      <label for="login" class="email__wrong_color">Email or login</label>
      <input
        class="input email__wrong_border email__correct"
        type="email"
        name="login"
        id="login"
      />
      <div class="email__wrong email__wrong_color">The e-mail adress is incomplete.</div>
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
      Log in <span class="btn-arrow"></span>
    </button>
    <div class="signup wrap">
      <label for="signup">Don't have account? </label>
      <a href="#" id="signup">Sign Up</a>
    </div>
  </form>
</template>

<script>
export default {
  name: 'LoginForm',
  components: {},
  data() {
    return {
      isPasswordShow: false,
    };
  },
  methods: {
    showPassword() {
      this.isPasswordShow = !this.isPasswordShow;
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  max-width: 315px;
  padding: 60px 57px;
  background: #fffefe;
  border-radius: 20px;
  box-shadow: 1px 5px 14px rgba(0, 0, 0, 0.1);

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
    color: #ffffff;
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
</style>
