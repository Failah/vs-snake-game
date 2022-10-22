<template>
  <div id="app">
    <FirstScreenGame />
    <HeaderComponent @speed="setSpeed" :score="totalPoints" />
    <SnakeGameComponent :snakeSpeed="speed" @currentScore="setScore" />
    <FooterComponent />
  </div>
</template>

<script>
import SnakeGameComponent from "./components/SnakeGameComponent.vue";
import HeaderComponent from "./components/HeaderComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";
import FirstScreenGame from "./components/FirstScreenGame.vue";

export default {
  name: "App",
  components: {
    SnakeGameComponent,
    HeaderComponent,
    FooterComponent,
    FirstScreenGame,
  },

  data() {
    return {
      speed: "400",
      totalPoints: 0,
    };
  },

  methods: {
    setSpeed(selectedSpeed) {
      this.speed = selectedSpeed;
      console.log("selected speed is:", selectedSpeed);
      console.log("speed is:", this.speed);
    },

    setScore(score) {
      this.totalPoints += score;
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
  overflow: hidden;
  cursor: url(https://cdn.custom-cursor.com/db/cursor/32/Orange_Arrow_NeonCursor.png) !important;

  &:hover {
    cursor: url(https://cdn.custom-cursor.com/db/cursor/32/Orange_Arrow_NeonCursor.png) !important;
  }
}
</style>
