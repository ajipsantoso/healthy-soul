<template>
  <div id="app">
    <transition name="fade">
      <router-view/>
    </transition>
  </div>
</template>

<style>
html,body{
  height: 100%;
  width: 100%;
}
* {
  margin: 0;
  padding: 0;
}
#app{
  height: 100%;
}
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 200%;
} */
/* #nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  } 
} */
.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .40s;
}
.fade-enter-active {
  transition-delay: .40s;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}
</style>
