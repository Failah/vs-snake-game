<template>
  <div id="snake-container">
    <div v-if="!pauseIndex" id="pause-screen">GAME PAUSED</div>
    <canvas
      ref="snakegame"
      id="snake-game"
      :width="boardSize.width * boardSize.cellSize"
      :height="boardSize.height * boardSize.cellSize"
    >
    </canvas>
  </div>
</template>

<script>
import { boardSize, directions } from "../data.js";

export default {
  name: "SnakeGameComponent",

  props: {
    snakeSpeed: String,
  },

  data() {
    return {
      boardSize: boardSize,
      directions: directions,
      snake: [{ x: 0, y: 0 }],
      snakeNewDirection: null,
      nextFoodPosition: { x: 0, y: 0 },
      pauseIndex: true,
      score: 0,
    };
  },

  // watches for speed (props) changes and updates the game if any
  // in this case said "change" occurs when user changes snake's speed via the html select element
  watch: {
    snakeSpeed: {
      immediate: true,
      handler(val, oldVal) {
        if (val !== oldVal) {
          this.pauseIndex = true; // this is needed otherwise different intervals will alternate on pause trigger if you start a new game while beeing in pause mode (generating not pause but alternate speed movement)
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

    window.addEventListener("keyup", (event) => {
      if (event.keyCode === 32) {
        this.pauseGame();
      }
    });

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

      this.score = 0;
      this.$emit("currentScore", this.score);

      // create game enviroinment with elements
      this.createGame();
    },

    createGame() {
      // clear entire enviroinment pixels
      this.context.clearRect(
        0,
        0,
        this.boardSize.width * this.boardSize.cellSize,
        this.boardSize.height * this.boardSize.cellSize
      );

      // create the snake appearance
      this.context.beginPath();
      this.snake.forEach((body) => {
        this.context.rect(
          body.x * this.boardSize.cellSize,
          body.y * this.boardSize.cellSize,
          this.boardSize.cellSize,
          this.boardSize.cellSize,
          // (this.context.lineCap = "round"), // working on get snake's body rounded
          // (this.context.lineWidth = 2),
          this.context.stroke()
        );
        this.context.fillStyle = "black";
        this.context.fill();
      });
      this.context.closePath();

      // creates food appearance
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

    pauseGame() {
      console.log("Pause game triggered");
      if (this.pauseIndex === true) {
        clearInterval(this.interval);
        this.pauseIndex = !this.pauseIndex;
      } else {
        this.interval = setInterval(this.moveNext, this.snakeSpeed);
        this.pauseIndex = !this.pauseIndex;
      }
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
        this.increaseScore();
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

    // score scripting
    increaseScore() {
      this.score++;
      this.$emit("currentScore", this.score);
      console.log("Current Score:", this.score);
    },
  },
};
</script>

<style lang="scss" scoped>
#snake-container {
  position: relative;
  margin: 0 auto;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;

  #snake-game {
    border: 4px solid black;
  }

  #pause-screen {
    position: absolute;
    top: 0;
    left: 0;
    border: 4px solid black;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    color: black;
    font-size: 4rem;
  }
}
</style>
