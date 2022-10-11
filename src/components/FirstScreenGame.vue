<template>
  <div v-if="toggleStartScreen" id="start-screen">
    <div>NEON SNAKE</div>
    <div>Developed by Failah</div>
  </div>
</template>

<script>
export default {
  name: "FirstScreenGame",

  data() {
    return {
      toggleStartScreen: true,
    };
  },

  mounted() {
    this.timer = setTimeout(this.toggleScreen, 1700);
  },

  methods: {
    toggleScreen() {
      this.toggleStartScreen = !this.toggleStartScreen;
    },
  },
};
</script>

<style lang="scss" scoped>
#start-screen {
  font-size: 4rem;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 100;
  display: flex;
  flex-direction: column;
  row-gap: 120px;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: black;
  color: #fa00ff;
  animation: disappear 1.5s linear forwards;
}

@keyframes disappear {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>