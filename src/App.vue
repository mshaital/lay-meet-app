<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="scss">
  @import './assets/css/_currency';
  @import './assets/css/animate';
  @import './assets/css/base';
  @import './assets/css/bootstrap-reboot.css';
  @import './assets/css/style_boot';

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  html,body{
    margin: 0;
    padding: 0;
  }
  a{
    text-decoration:none;
    color: black;
  }
  button{
    outline: none !important;
  }
  .overflow-hidden{
    overflow: hidden !important;
  }
  .van-tabbar-item--active{
    color:$deep-blue !important;
  }
</style>
