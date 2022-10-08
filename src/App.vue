<template>
  <div id="app">
    <SnakeGameComponent />
  </div>
</template>

<script>
import SnakeGameComponent from "./components/SnakeGameComponent.vue";

export default {
  name: "App",
  components: {
    SnakeGameComponent,
  },
};
</script>

<style lang="scss">
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
