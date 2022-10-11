<template>
  <div id="app">
    <FirstScreenGame />
    <GameOptionsComponent @speed="setSpeed" :score="score" />
    <SnakeGameComponent :snakeSpeed="speed" @currentScore="setScore" />
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
      score: 0,
    };
  },

  methods: {
    setSpeed(selectedSpeed) {
      this.speed = selectedSpeed;
      console.log("selected speed is:", selectedSpeed);
      console.log("speed is:", this.speed);
    },

    setScore(score) {
      this.score = score;
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
  background-color: black;
  font-family: "Game", Helvetica, Arial;
  position: relative;
  cursor: url(https://cdn.custom-cursor.com/db/cursor/32/Orange_Arrow_NeonCursor.png) !important;

  &:hover {
    cursor: url(https://cdn.custom-cursor.com/db/cursor/32/Orange_Arrow_NeonCursor.png) !important;
  }
}
</style>
