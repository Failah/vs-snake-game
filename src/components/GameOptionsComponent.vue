<template>
  <div id="game-options-container">
    <div id="speed-select">
      <h3>Select Snake's speed:</h3>
      <select
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
      <h3>Score:</h3>
      <div>{{ score }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameOptionsComponent",

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
  background-color: bisque;
  height: 120px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;

  #speed-select {
    display: flex;
    column-gap: 10px;
  }

  #score-counter {
    display: flex;
    column-gap: 10px;

    div {
      padding-top: 2px;
    }
  }
}
</style>