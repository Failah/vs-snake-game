<template>
  <div id="footer-container">
    <h3>Press SPACE to trigger Pause Game</h3>
    <div id="credits">
      <h5>Developed by Valerio Schiarizza</h5>
      <h5>
        Aka Failah:
        <a
          class="developer"
          target="_blank"
          href="https://github.com/Failah/vs-snake-game"
          >GitHub</a
        >
      </h5>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterComponent",
};
</script>

<style lang="scss" scoped>
#footer-container {
  padding: 20px;
  background-color: gray;
  height: 120px;
  width: 100%;
  text-align: center;
  position: relative;

  #credits {
    position: absolute;
    right: 10px;
    bottom: 10px;

    h5 {
      padding-bottom: 5px;

      a {
        text-decoration: none;
        color: red;
      }

      .developer:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>