<template>
  <div id="game-options-container">
    <div id="speed-select">
      <h3>Select Snake's speed:</h3>
      <select
        class="decorated"
        @change="$emit('speed', speedValue), removeBlur()"
        v-model="speedValue"
        name="speed"
        id="speed"
      >
        <option value="400">Very Slow</option>
        <option value="300">Slow</option>
        <option value="200">Normal</option>
        <option value="100">Fast</option>
        <option value="50">Very Fast</option>
        <option value="20">Impossible</option>
      </select>
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
#game-options-container {
  background-color: black;
  color: #ff005b;
  height: 120px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border: #fffd01 5px solid;

  #speed-select {
    display: flex;
    align-items: center;
    column-gap: 10px;
  }

  #speed {
    background-color: black;
    color: #ff005b;
    border: #ff005b 1px solid;
    padding: 5px;

    option {
      background-color: black;
    }
  }

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