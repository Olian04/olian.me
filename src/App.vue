<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
#app {
  position: absolute;
  height: 100vh;
  width: 100vw;
  padding: 0px;
  margin: 0px;
  top: 0px;
  left: 0px;
  background-color: #141414;
  color: white;
  text-shadow:
    -1px 0 black,
    0 1px black,
    1px 0 black,
    0 -1px black;
}
</style>
