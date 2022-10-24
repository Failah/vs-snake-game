<template>
  <div id="header-container">
    <div id="speed-select">
      <h3>Failah</h3>
    </div>
    <div id="score-counter">
      <h3>Total Points:</h3>
      <div>{{ score }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderComponent",

  data() {
    return {
      speedValue: "400",
    };
  },

  props: {
    score: Number,
  },

  methods: {
    removeBlur() {
      console.log("remove blur");
      document.activeElement.blur();
    },
  },
};
</script>

<style lang="scss" scoped>
#header-container {
  background-color: black;
  color: #ff005b;
  height: 120px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border: #fffd01 5px solid;

  #score-counter {
    display: flex;
    column-gap: 10px;

    div {
      padding-top: 2px;
      width: 50px;
    }
  }
}
</style>