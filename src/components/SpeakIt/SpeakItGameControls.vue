<template>
  <div class="tools">
    <div class="buttons-control">
      <button class="button restart-button">Restart</button>
      <button class="button speak-button recording">Speak please</button>
      <button class="button finish-button">Finish</button>
    </div>
  </div>
</template>

<script></script>

<style lang="scss" scoped>
.buttons-control {
  display: flex;
  justify-content: space-around;

  @include media-mobile {
    flex-direction: column;
    align-items: center;
  }
}

.restart-button,
.speak-button,
.finish-button {
  font-size: 1.5em;
  color: white;
  cursor: pointer;
  background: $color-dodger-blue;
  border: 0.5px solid black;
  border-radius: 10px;

  @include media-tablet {
    margin: 5px 0;
    font-size: 1em;
  }
}

.restart-button,
.finish-button {
  flex-grow: 1;
  width: 100%;
  max-width: 300px;
  height: 50px;
  margin: 0 10px;

  @include media-tablet {
    width: 200px;
    height: 50px;
  }
}

.speak-button {
  flex-grow: 8;
  width: 100%;
  max-width: 350px;
  height: 50px;

  @include media-tablet {
    width: 100%;
    max-width: 200px;
    height: 50px;
  }
}
</style>
