<template>
  <div class="container-main">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        title: '欢迎您，请登录'
      }
    },
    methods: {}
  }
</script>
<style>
  .container-main{
    background-color: #fbf5e7;
    width: 100%;
    height:100vh;
    background-image: url(../../assets/img/login-bg.jpg);
  }
</style>
