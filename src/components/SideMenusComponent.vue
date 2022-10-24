<template>
  <div id="side-menus-container">
    <div
      class="menu"
      :class="toggleLeft === true ? 'left-menu-active' : 'left-hide'"
    >
      <div id="speed-select">
        <h3>Snake speed:</h3>
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
      <div id="bg-select">
        <h3>Background:</h3>
        <select
          class="decorated"
          @change="$emit('bg-image', bgImage), removeBlur()"
          v-model="bgImage"
          name="bgImage"
          id="bg-images"
        >
          <option value="neoncity1.gif">Neon City</option>
          <option value="neoncity2.gif">Space Bridge</option>
          <option value="neoncity3.gif">Rainy Day</option>
          <option value="neoncity4.gif">Gamer Room</option>
          <option value="neoncity5.gif">Bird City</option>
          <option value="neoncity6.gif">Future Sky</option>
          <option value="neoncity7.gif">Hacking Hub</option>
          <option value="blackbg.jpg">Total Black</option>
        </select>
      </div>
      <div id="hide-game-select">
        <h3>Hide Game:</h3>
        <select
          class="decorated"
          @change="$emit('hide-game', hideGame), removeBlur()"
          v-model="hideGame"
          name="hideGame"
          id="hide-game"
        >
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
      </div>
      <div @click="toggleLeftMenu" class="toggle-button left-button">
        OPTIONS
      </div>
    </div>
    <div
      class="menu"
      :class="toggleRight === true ? 'right-menu-active' : 'right-hide'"
    >
      <div @click="toggleRightMenu" class="toggle-button right-button">
        BOOSTS
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideMenuComponent",

  data() {
    return {
      toggleLeft: false,
      toggleRight: false,
      speedValue: "400",
      bgImage: "neoncity1.gif",
      hideGame: "no",
    };
  },

  methods: {
    toggleLeftMenu() {
      this.toggleLeft = !this.toggleLeft;
    },

    toggleRightMenu() {
      this.toggleRight = !this.toggleRight;
    },

    removeBlur() {
      console.log("remove blur");
      document.activeElement.blur();
    },
  },
};
</script>

<style lang="scss" scoped>
#side-menus-container {
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: #ff005b;

  // left menu + relative button styling
  > div:first-child {
    left: -351px;
    padding: 20px;
  }

  // right menu + relative button styling
  > div:nth-child(2) {
    left: 351px;
  }

  .left-hide {
    animation: LeftHide 0.3s ease forwards;
  }

  .right-hide {
    animation: RightHide 0.3s ease forwards;
  }

  .menu {
    height: 70vh;
    width: 18vw;
    background-color: black;
    border: 5px solid #ff005b;
    z-index: 100;
    position: relative;
    left: 0;

    &.left-menu-active {
      animation: LeftShow 0.3s ease forwards;
    }

    &.right-menu-active {
      animation: RightShow 0.3s ease forwards;
    }

    .toggle-button {
      position: absolute;
      background-color: black;
      border: 5px solid #fffd01;
      padding: 10px 20px;
      top: -5px;
      user-select: none;
      cursor: pointer;
      animation: glowing 1300ms infinite;

      &.left-button {
        width: 162px;
        text-align: center;
        right: -172px;
      }

      &.right-button {
        width: 162px;
        text-align: center;
        left: -172px;
      }
    }
  }

  #speed-select,
  #bg-select,
  #hide-game-select {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    column-gap: 10px;
    font-size: 0.8rem;
    padding-top: 10px;
  }

  #speed,
  #bg-images,
  #hide-game {
    background-color: black;
    color: #ff005b;
    border: #ff005b 1px solid;
    padding: 5px;

    option {
      background-color: black;
    }
  }
}

@keyframes LeftHide {
  0% {
    left: 0px;
  }
  100% {
    left: calc(-18vw - 5px);
  }
}

@keyframes RightHide {
  0% {
    left: 0px;
  }
  100% {
    left: calc(18vw + 5px);
  }
}

@keyframes LeftShow {
  0% {
    left: -351px;
  }
  100% {
    left: 0px;
  }
}

@keyframes RightShow {
  0% {
    left: 351px;
  }
  100% {
    left: 0px;
  }
}

@keyframes glowing {
  0% {
    background-color: black;
    box-shadow: 0 0 4px #ff005b;
  }
  50% {
    background-color: black;
    box-shadow: 0 0 15px #ff005b;
  }
  100% {
    background-color: black;
    box-shadow: 0 0 4px #ff005b;
  }
}
</style>