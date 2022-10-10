<template>
  <div id="snake-container">
    <div id="score-counter">
      <h3>Score:</h3>
      <div>{{ score }}</div>
    </div>

    <canvas
      ref="snakegame"
      id="snake-game"
      :width="boardSize.width * boardSize.cellSize"
      :height="boardSize.height * boardSize.cellSize"
    />

    <!-- this is the pause screen -->
    <div v-if="!pauseIndex" id="pause-screen">GAME PAUSED</div>
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
      nextGhostPosition: { x: 0, y: 0 },
      pauseIndex: true,
      score: 0,
      ghostCounter: 0,
    };
  },

  // watches for speed (props) changes and updates the game if any
  // in this case said "change" occurs when user changes snake's speed via the html select element
  watch: {
    snakeSpeed: {
      immediate: true,
      handler(val, oldVal) {
        if (val !== oldVal && this.snakeSpeed) {
          this.pauseIndex = true; // this is needed otherwise different intervals will alternate on pause trigger if you start a new game while beeing in pause mode (generating not pause but alternate speed movement)
          this.resetGame();
          clearInterval(this.ghostInterval);
          (this.ghostCounter = 0), this.moveSpeed();
          console.log("snakeSpeed:", this.snakeSpeed);
        }
      },
    },
  },

  // computed: {
  //   getSnakeSpeed() {
  //     let speedValue = this.snakeSpeed
  //   },
  // },

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
      this.generateNewGhostPosition();

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
          this.boardSize.cellSize
          // (this.context.lineCap = "round"), // working on get snake's body rounded
          // (this.context.lineWidth = 5),
          // this.context.stroke()
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
      this.context.fillStyle = "green";
      this.context.fill();
      this.context.closePath();

      // creates ghost appearance
      this.context.beginPath();
      this.context.rect(
        this.nextGhostPosition.x * this.boardSize.cellSize,
        this.nextGhostPosition.y * this.boardSize.cellSize,
        this.boardSize.cellSize,
        this.boardSize.cellSize
      );
      // this.context.fillStyle = "#6E260E";
      this.context.fillStyle = "purple";
      this.context.fill();
      this.context.closePath();
    },

    pauseGame() {
      console.log("Pause game triggered");
      if (this.pauseIndex === true) {
        clearInterval(this.interval);
        clearInterval(this.ghostInterval);
        this.pauseIndex = !this.pauseIndex;
      } else {
        this.interval = setInterval(this.moveNext, this.snakeSpeed);
        if (this.ghostCounter !== 0) {
          this.ghostInterval = setInterval(this.generateNewGhostPosition, 2000);
        }
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
          clearInterval(this.ghostInterval);
          (this.ghostCounter = 0),
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
        clearInterval(this.ghostInterval);
        (this.ghostCounter = 0),
          window.alert("You lost! The snake crashed on a wall :(");
        return;
      }
      // GHOST COLLISION
      if (
        this.snake[0].x === this.nextGhostPosition.x &&
        this.snake[0].y === this.nextGhostPosition.y
      ) {
        // this.snakeNewDirection = null;
        this.resetGame();
        clearInterval(this.ghostInterval);
        (this.ghostCounter = 0),
          window.alert("You lost! You have been caught by a ghost :(");
        return;
      }
      this.createGame();
    },
    // ---------------------------------------------------------------------------------------- /COLLISIONS

    onArrowKeyboardPressed(event) {
      // starts generating ghosts only when the player starts playing
      if (this.ghostCounter === 0) {
        this.ghostInterval = setInterval(this.generateNewGhostPosition, 2000);
        this.ghostCounter++;
      }

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

    // game elements generation and scripting
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
    },

    generateNewGhostPosition() {
      let positionFound = false;
      while (!positionFound) {
        // generate random ghost position
        const ghostPosition = {
          x: Math.floor(Math.random() * this.boardSize.width),
          y: Math.floor(Math.random() * this.boardSize.height),
        };

        // check if this new food position is not part of the snake
        const snakeBody = this.snake.find(
          (snakePos) =>
            snakePos.x === ghostPosition.x && snakePos.y === ghostPosition.y
        );
        if (!snakeBody) {
          this.nextGhostPosition = ghostPosition;
          positionFound = true;
        }
      }
      this.createGame();
    },

    // score scripting
    getMultiplier(value) {
      let multiplier = 0;
      switch (value) {
        case "400": {
          multiplier = 1;
          break;
        }
        case "300": {
          multiplier = 2;
          break;
        }
        case "200": {
          multiplier = 3;
          break;
        }
        case "100": {
          multiplier = 4;
          break;
        }
        case "50": {
          multiplier = 5;
          break;
        }
        case "20": {
          multiplier = 6;
          break;
        }
      }
      return multiplier;
    },

    increaseScore() {
      let inc = this.getMultiplier(this.snakeSpeed);
      this.score += inc;
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

  #score-counter {
    position: absolute;
    top: -40px;
    right: 0;
    display: flex;
    column-gap: 10px;

    div {
      padding-top: 2px;
      width: 50px;
    }
  }

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
