<template>
  <div>
    <canvas
      ref="snakegame"
      id="snake-game"
      :width="boardSize.width * boardSize.cellSize"
      :height="boardSize.height * boardSize.cellSize"
    />
  </div>
</template>

<script>
import { boardSize } from "../data.js";

export default {
  name: "SnakeGameComponent",

  data() {
    return {
      boardSize: boardSize,
      snake: [{ x: 0, y: 0 }],
    };
  },

  mounted() {
    // generate 2d context (the ref is specified in canvas attribute ref="snakegame")
    this.context = this.$refs.snakegame.getContext("2d");

    // generate snake's head
    this.snake = [
      { x: this.boardSize.width / 2, y: this.boardSize.height / 2 },
    ];

    // create game enviroinment
    this.createGame();
  },

  methods: {
    createGame() {
      // clear entire enviroinment
      this.context.clearRect(
        0,
        0,
        this.boardSize.width * this.boardSize.cellSize,
        this.boardSize.height * this.boardSize.cellSize
      );

      // create the snake
      this.context.beginPath();
      this.snake.forEach((body) => {
        this.context.rect(
          body.x * this.boardSize.cellSize,
          body.y * this.boardSize.cellSize,
          this.boardSize.cellSize,
          this.boardSize.cellSize
        );
        this.context.fillStyle = "black";
        this.context.fill();
      });
      this.context.closePath();
    },
  },
};
</script>

<style lang="scss" scoped>
#snake-game {
  border: 1px solid black;
}
</style>
