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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
