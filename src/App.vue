<template>
  <div id="app">
    <GameOptionsComponent @speed="setSpeed" />
    <SnakeGameComponent :snakeSpeed="speed" />
    <FooterComponent />
  </div>
</template>

<script>
import SnakeGameComponent from "./components/SnakeGameComponent.vue";
import GameOptionsComponent from "./components/GameOptionsComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";

export default {
  name: "App",
  components: {
    SnakeGameComponent,
    GameOptionsComponent,
    FooterComponent,
  },

  data() {
    return {
      speed: "400",
    };
  },

  methods: {
    setSpeed(selectedSpeed) {
      this.speed = selectedSpeed;
      console.log("selected speed is:", selectedSpeed);
      console.log("speed is:", this.speed);
    },
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
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: darkgreen;
}
</style>
