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
  background: linear-gradient(#00efd1, #00acea);
  border: 0.5px solid black;
  border-radius: 10px;

  @include media-tablet {
    margin: 5px 0;
    font-size: 1em;
  }
}

.restart-button,
.finish-button {
  width: 200px;
  height: 50px;

  @include media-tablet {
    width: 200px;
    height: 50px;
  }
}

.speak-button {
  width: 400px;
  height: 50px;

  @include media-tablet {
    width: 200px;
    height: 50px;
  }
}
</style>
