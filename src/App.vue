<template>
  <div id="app">
    <FirstScreenGame />
    <GameOptionsComponent @speed="setSpeed" />
    <SnakeGameComponent :snakeSpeed="speed" />
    <FooterComponent />
  </div>
</template>

<script>
import SnakeGameComponent from "./components/SnakeGameComponent.vue";
import GameOptionsComponent from "./components/GameOptionsComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";
import FirstScreenGame from "./components/FirstScreenGame.vue";

export default {
  name: "App",
  components: {
    SnakeGameComponent,
    GameOptionsComponent,
    FooterComponent,
    FirstScreenGame,
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

@font-face {
  font-family: "Game";
  src: local("Game"), url(./fonts/PressStart2P-Regular.ttf) format("truetype");
}

#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: darkgreen;
  font-family: "Game", Helvetica, Arial;
  position: relative;
}
</style>
