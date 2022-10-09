<template>
  <div>
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
</style>