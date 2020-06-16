<template>
  <div class="">
    Home Page
    <transition name="component-fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  components: {},
};
</script>

<style></style>
