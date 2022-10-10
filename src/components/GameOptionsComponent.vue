<template>
  <div id="game-options-container">
    <div id="speed-select">
      <h3>Select Snake's speed:</h3>
      <select
        @change="$emit('speed', speedValue)"
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
};
</script>

<style lang="scss" scoped>
#game-options-container {
  padding: 20px;
  background-color: bisque;
  height: 120px;
  width: 100%;

  #speed-select {
    display: flex;
    column-gap: 10px;
  }
}
</style>