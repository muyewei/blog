<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
html,body{
  width: 100%;
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
ul{
  list-style: none;
  padding: none;
}
a{
  text-decoration: none;
  color: black;
}
a:hover{
  color: cornflowerblue;
}
.active{
  background-color: rgb(143, 143, 143)!important;
}
</style>
