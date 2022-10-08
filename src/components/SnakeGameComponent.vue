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
import { boardSize, directions } from "../data.js";

export default {
  name: "SnakeGameComponent",

  data() {
    return {
      boardSize: boardSize,
      snake: [{ x: 0, y: 0 }],
      snakeNewDirection: null,
      directions: directions,
      nextFoodPosition: { x: 0, y: 0 },
    };
  },

  mounted() {
    // generate 2d context (the ref is specified in canvas attribute ref="snakegame")
    this.context = this.$refs.snakegame.getContext("2d");

    // generate snake's head
    this.snake = [
      { x: this.boardSize.width / 2, y: this.boardSize.height / 2 },
    ];

    // create food position
    this.generateNewFoodPosition();

    // create game enviroinment
    this.createGame();

    window.addEventListener("keydown", this.onArrowKeyboardPressed);
    this.interval = setInterval(this.moveNext, 500);
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

      // creates the food in the game area
      this.context.beginPath();
      this.context.rect(
        this.nextFoodPosition.x * this.boardSize.cellSize,
        this.nextFoodPosition.y * this.boardSize.cellSize,
        this.boardSize.cellSize,
        this.boardSize.cellSize
      );
      this.context.fillStyle = "red";
      this.context.fill();
      this.context.closePath();
    },

    // snake movements
    moveNext() {
      if (this.snakeNewDirection == null) {
        return;
      }

      // generate the new poition oh the head after the new movement occurs
      this.snake.unshift({
        x: this.snake[0].x + this.snakeNewDirection.move.x,
        y: this.snake[0].y + this.snakeNewDirection.move.y,
      });

      this.snake.pop();

      this.createGame();
    },

    onArrowKeyboardPressed(event) {
      // find the direction
      let direction = this.directions.find(
        (direct) => direct.keyCode == event.keyCode
      );

      if (!direction) {
        return;
      }

      // checks if this new direction is usable
      if (
        this.snakeNewDirection == null ||
        Math.abs(this.snakeNewDirection.keyCode - direction.keyCode) != 2
      ) {
        this.snakeNewDirection = direction;
      }
    },

    // food scripting
    generateNewFoodPosition() {
      let positionFound = false;
      while (!positionFound) {
        // generate random food position
        const foodPosition = {
          x: Math.floor(Math.random() * this.boardSize.width),
          y: Math.floor(Math.random() * this.boardSize.height),
        };

        // check if this new food position is not part of the snake
        const snakeBody = this.snake.find(
          (snakePos) =>
            snakePos.x === foodPosition.x && snakePos.y === foodPosition.y
        );
        if (!snakeBody) {
          this.nextFoodPosition = foodPosition;
          positionFound = true;
        }
      }
      this.createGame();
    },
  },
};
</script>

<style lang="scss" scoped>
#snake-game {
  border: 1px solid black;
}
</style>
