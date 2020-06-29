<template functional>
  <div class="lds-spinner" :class="[props.size, props.colorName]">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: 'AppSpinner',
  props: {
    size: {
      type: [String],
      default: 'lds-spinner_small',
    },
    colorName: {
      type: [String],
      default: 'color-onahau',
    },
  },
};
</script>

<style lang="scss">
.lds-spinner_small {
  @include spinner(23px);
}

.lds-spinner_small-plus {
  @include spinner(50px);
}

.lds-spinner_medium {
  @include spinner(100px);
}

.lds-spinner_large {
  @include spinner(150px);
}

.color-dodger-blue {
  div::after {
    background: $color-dodger-blue !important;
  }
}

.color-onahau {
  div::after {
    background: $color-onahau !important;
  }
}

.lds-spinner {
  position: relative;
  display: inline-block;
  color: official;

  div {
    animation: lds-spinner 1.2s linear infinite;

    &::after {
      position: absolute;
      display: block;
      content: ' ';
      background: $color-onahau;
      border-radius: 20%;
    }
  }
}

.lds-spinner div:nth-child(1) {
  transform: rotate(0deg);
  animation-delay: -1.1s;
}

.lds-spinner div:nth-child(2) {
  transform: rotate(30deg);
  animation-delay: -1s;
}

.lds-spinner div:nth-child(3) {
  transform: rotate(60deg);
  animation-delay: -0.9s;
}

.lds-spinner div:nth-child(4) {
  transform: rotate(90deg);
  animation-delay: -0.8s;
}

.lds-spinner div:nth-child(5) {
  transform: rotate(120deg);
  animation-delay: -0.7s;
}

.lds-spinner div:nth-child(6) {
  transform: rotate(150deg);
  animation-delay: -0.6s;
}

.lds-spinner div:nth-child(7) {
  transform: rotate(180deg);
  animation-delay: -0.5s;
}

.lds-spinner div:nth-child(8) {
  transform: rotate(210deg);
  animation-delay: -0.4s;
}

.lds-spinner div:nth-child(9) {
  transform: rotate(240deg);
  animation-delay: -0.3s;
}

.lds-spinner div:nth-child(10) {
  transform: rotate(270deg);
  animation-delay: -0.2s;
}

.lds-spinner div:nth-child(11) {
  transform: rotate(300deg);
  animation-delay: -0.1s;
}

.lds-spinner div:nth-child(12) {
  transform: rotate(330deg);
  animation-delay: 0s;
}

@keyframes lds-spinner {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
</style>
