<template>
  <div id="side-menus-container">
    <div
      class="menu"
      :class="toggleLeft === true ? 'left-menu-active' : 'left-hide'"
    >
      MENU SX
      <div @click="toggleLeftMenu" class="toggle-button left-button">
        OPTIONS
      </div>
    </div>
    <div
      class="menu"
      :class="toggleRight === true ? 'right-menu-active' : 'right-hide'"
    >
      MENU DX
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
    };
  },

  methods: {
    toggleLeftMenu() {
      this.toggleLeft = !this.toggleLeft;
    },

    toggleRightMenu() {
      this.toggleRight = !this.toggleRight;
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

  > div:first-child {
    left: -351px;
  }

  .left-hide {
    animation: LeftHide 0.3s ease forwards;
  }

  .right-hide {
    animation: RightHide 0.3s ease forwards;
  }

  > div:nth-child(2) {
    left: 351px;
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
</style>