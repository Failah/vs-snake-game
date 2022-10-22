<template>
  <div id="lateral-menus-container">
    <div class="menu left-menu-active">
      MENU SX
      <div class="toggle-button left-button">OPTIONS</div>
    </div>
    <div class="menu right-menu-active">
      MENU DX
      <div class="toggle-button right-button">BOOSTS</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LateralMenuComponent",
};
</script>

<style lang="scss" scoped>
#lateral-menus-container {
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: #ff005b;

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
      left: -351px;
    }

    &.right-menu-active {
      animation: RightShow 0.3s ease forwards;
      left: 351px;
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
        right: -167px;
      }

      &.right-button {
        width: 162px;
        text-align: center;
        left: -167px;
      }
    }
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