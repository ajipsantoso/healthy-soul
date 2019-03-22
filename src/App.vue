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
  font-family: Arial, Helvetica, sans-serif;
}
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
