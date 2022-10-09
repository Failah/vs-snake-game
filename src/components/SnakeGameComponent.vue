<template>
  <div id="snake-container">
    <canvas
      ref="snakegame"
      id="snake-game"
      :width="boardSize.width * boardSize.cellSize"
      :height="boardSize.height * boardSize.cellSize"
    />
  </div>
</template>

<script>
// let snakeSpeed = this.speed;

import { boardSize, directions } from "../data.js";

export default {
  name: "SnakeGameComponent",

  props: {
    snakeSpeed: String,
  },

  data() {
    return {
      boardSize: boardSize,
      snake: [{ x: 0, y: 0 }],
      snakeNewDirection: null,
      directions: directions,
      nextFoodPosition: { x: 0, y: 0 },
    };
  },

  // watches for speed (props) changes and updates the game if any
  watch: {
    snakeSpeed: {
      immediate: true,
      handler(val, oldVal) {
        if (val !== oldVal) {
          this.resetGame();
          this.moveSpeed();
          console.log("snakeSpeed:", this.snakeSpeed);
        }
      },
    },
  },

  mounted() {
    // generate 2d context (the ref is specified in canvas attribute ref="snakegame")
    this.context = this.$refs.snakegame.getContext("2d");

    this.resetGame();

    window.addEventListener("keydown", this.onArrowKeyboardPressed);
    this.interval = setInterval(this.moveNext, this.snakeSpeed);
  },

  methods: {
    resetGame() {
      // generate snake's head
      this.snake = [
        {
          // Math.floor is helpful here because if you have an odd width or height you might be generated on half block
          x: Math.floor(this.boardSize.width / 2),
          y: Math.floor(this.boardSize.height / 2),
        },
      ];

      this.snakeNewDirection = null;

      // create food position
      this.generateNewFoodPosition();

      // create game enviroinment
      this.createGame();
    },

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
    moveSpeed() {
      clearInterval(this.interval);
      this.interval = setInterval(this.moveNext, this.snakeSpeed);
    },

    moveNext() {
      if (this.snakeNewDirection == null) {
        return;
      }

      // generate the new position of the head after the new movement occurs
      this.snake.unshift({
        x: this.snake[0].x + this.snakeNewDirection.move.x,
        y: this.snake[0].y + this.snakeNewDirection.move.y,
      });

      // check if the new head position and the food position do match
      if (
        this.snake[0].x === this.nextFoodPosition.x &&
        this.snake[0].y === this.nextFoodPosition.y
      ) {
        this.generateNewFoodPosition();
      } else {
        this.snake.pop();
      }

      // ---------------------------------------------------------------------------------------- COLLISIONS
      // check if the new head position collides with the snake body or an area border
      // SNAKE BODY COLLISION
      for (let i = 1; i < this.snake.length; i++) {
        if (
          this.snake[0].x === this.snake[i].x &&
          this.snake[0].y === this.snake[i].y
        ) {
          // this.snakeNewDirection = null;
          this.resetGame();
          window.alert("You lost! The snake crashed on its body :(");
          return;
        }
      }
      // AREA BORDERS COLLISION
      if (
        this.snake[0].x < 0 ||
        this.snake[0].x >= this.boardSize.width ||
        this.snake[0].y < 0 ||
        this.snake[0].y >= this.boardSize.height
      ) {
        // this.snakeNewDirection = null;
        this.resetGame();
        window.alert("You lost! The snake crashed on a wall :(");
        return;
      }

      this.createGame();
    },
    // ---------------------------------------------------------------------------------------- /COLLISIONS

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
#snake-container {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

#snake-game {
  border: 1px solid black;
}
</style>
