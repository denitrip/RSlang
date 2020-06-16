<template>
  <div class="mini-games">
    <div class="mini-games__card">1</div>
    <div class="mini-games__card">2</div>
    <div class="mini-games__card">3</div>
    <div class="mini-games__card">4</div>
    <div class="mini-games__card">5</div>
    <div class="mini-games__card">6</div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.mini-games {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 40px 16px;
}

.mini-games__card {
  width: 358px;
  height: 358px;
}
</style>
