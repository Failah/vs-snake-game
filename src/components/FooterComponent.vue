<template>
  <div id="footer-container">
    <audio controls loop>
      <source
        src="../assets/audio/PaulKalkbrenner-Jestrupp.mp3"
        type="audio/ogg"
      />
      <source
        src="../assets/audio/PaulKalkbrenner-aron.mp3"
        type="audio/mpeg"
      />
      <source
        src="../assets/audio/PaulKalkbrenner-wirWerden.mp3"
        type="audio/mpeg"
      />
      Your browser does not support the audio element.
    </audio>
    <div>
      <h3>Press SPACE to trigger Pause Game</h3>
      <h3>Don't get caught by the <span>Ghost</span>!</h3>
    </div>

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
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
  background-color: black;
  border: 5px solid #01ffb2;
  color: #01ffb2;
  height: 120px;
  width: 100%;
  text-align: center;
  // position: relative;

  audio::-webkit-media-controls-panel {
    background-color: #01ffb2;
  }

  h3 {
    margin-bottom: 10px;

    span {
      color: purple;
    }
  }

  #credits {
    // position: absolute;
    // right: 10px;
    // bottom: 10px;

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