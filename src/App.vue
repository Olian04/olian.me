<template>
  <div id="app">
    <div id="nav">
      <router-link to="/"><img  src="./assets/logo.png"/></router-link>
      <router-link to="/about"><img  src="./assets/logo.png"/></router-link>
    </div>
    <div id="content">
      <router-view/>
    </div>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: calc(100% - 50px) 50px;
  grid-template-areas:
    "content"
    "navigation";
}

#content {
  position: relative;
  grid-area: content;
  overflow: auto;
}

#nav {
  position: relative;
  grid-area: navigation;
  background: #2c3e50;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  padding: 5px;
}

#nav a {
  position: relative;
  display: inline-block;
  margin-right: 5px;
  height: 40px;
  width: 40px;
  box-shadow: 0px 0px 34px -7px rgba(0,0,0,0.75);
  border-radius: 50%;
  background: white;
}
#nav img {
  position: absolute;
  display: block;
  border-radius: 50%;
  height: 100%;
  width: 100%;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
