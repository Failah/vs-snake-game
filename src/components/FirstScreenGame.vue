<template>
  <div v-if="toggleStartScreen" id="start-screen">
    <div>SNAKE!</div>
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
    this.timer = setTimeout(this.toggleScreen, 2000);
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
  row-gap: 30px;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: grey;
  color: darkgreen;
}
</style>