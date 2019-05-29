<template>
  <div>
    <div class="nav-title">
      <div @click="$router.go(-1)">
        <van-icon :name="leftIcon" color="gray" size="20px"/>
      </div>
      <div class="w-60">{{title}}</div>
      <div @click="$emit('right-click')">
        <span>{{rightText}}</span>
        <van-icon :name="rightIcon" size="20px"/>
      </div>
    </div>
    <div class="nav-sub">~</div>
  </div>

</template>

<script>
  /* eslint-disable */

  export default {
    components: {

    },
    name: 'NavTitle',
    data () {
      return {
        active: 0,
      }
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      rightText: {
        type: String,
        default: ''
      },
      leftIcon: {
        type: String,
        default: 'arrow-left'
      },
      rightIcon: {
        type: String,
        default: ''
      },
    },
    created () {
    },
    methods: {
    }
  }
</script>

<style lang="scss" scoped>


  .nav-title{
    box-sizing: border-box;
    position: fixed;
    top: 0;
    z-index: 500;
    width: 100%;
    display: flex;
    justify-content: space-between;
    height: 40px;
    background-color: white;
    padding: 10px;
  }

  .nav-sub{
    height: 40px;
  }
</style>
