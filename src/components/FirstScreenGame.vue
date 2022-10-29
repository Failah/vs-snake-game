<template>
  <div
    v-if="toggleStartScreen"
    id="start-screen"
    :class="{ 'disappear-animation': !toggleAnimation }"
  >
    <div>NEON SNAKE</div>
    <div>Developed by Failah</div>
    <button @click="disappearScreen">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      START GAME
    </button>
    <div>
      <p>Instagram: valerio_skya</p>
      <p>GitHub: Failah</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "FirstScreenGame",

  data() {
    return {
      toggleStartScreen: true,
      toggleAnimation: true,
    };
  },

  // used for debug purposes
  // mounted() {
  //   this.timer = setTimeout(this.toggleScreen, 1700);
  // },

  methods: {
    toggleScreen() {
      this.toggleStartScreen = !this.toggleStartScreen;
    },

    disappearScreen() {
      console.log("START GAME button clicked");
      this.toggleAnimation = !this.toggleAnimation;
      this.timer = setTimeout(this.toggleScreen, 1300);
    },
  },
};
</script>

<style lang="scss" scoped>
#start-screen {
  user-select: none;
  font-size: 4rem;
  position: absolute;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100%;
  z-index: 200;
  display: flex;
  flex-direction: column;
  row-gap: 10%;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: black;
  color: #fa00ff;

  p {
    color: #fffd01;
    padding-bottom: 20px;
    font-size: 2rem;
  }
}

.disappear-animation {
  animation: disappear 1.2s linear forwards;
}

@keyframes disappear {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

// button skinning and animation
button {
  min-height: 98px;
  position: relative;
  display: inline-block;
  padding: 25px 30px;
  color: #03e9f4;
  background-color: black;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 3rem;
  border: none;
  transition: 0.5s;
  letter-spacing: 4px;
  overflow: hidden;
  margin-right: 50px;
  cursor: pointer;
  font-family: "Game", Helvetica, Arial;
}

button:hover {
  background: #03e9f4;
  color: #050801;
  box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4,
    0 0 200px #03e9f4;
  -webkit-box-reflect: below 1px linear-gradient(transparent, #0005);
}

button:nth-child(1) {
  filter: hue-rotate(270deg);
}

button:nth-child(2) {
  filter: hue-rotate(110deg);
}

button span {
  position: absolute;
  display: block;
}

button span:nth-child(1) {
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #03e9f4);
  animation: animate1 1s linear infinite;
}

@keyframes animate1 {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

button span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #03e9f4);
  animation: animate2 1s linear infinite;
  animation-delay: 0.25s;
}

@keyframes animate2 {
  0% {
    top: -100%;
  }
  100% {
    top: 100%;
  }
}

button span:nth-child(3) {
  bottom: 0;
  right: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, #03e9f4);
  animation: animate3 1s linear infinite;
  animation-delay: 0.5s;
}

@keyframes animate3 {
  0% {
    right: -100%;
  }
  100% {
    right: 100%;
  }
}

button span:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #03e9f4);
  animation: animate4 1s linear infinite;
  animation-delay: 0.75s;
}

@keyframes animate4 {
  0% {
    bottom: -100%;
  }
  100% {
    bottom: 100%;
  }
}
</style>