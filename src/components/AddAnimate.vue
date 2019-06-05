<template>
  <div class="position-fixed position-center wh-80" v-show="animate !== 'd-none'">
    <img class="animated img-fluid"  :class="[animate]" :src="animateSrc">
  </div>
</template>

<script>
  /* eslint-disable */
  import likes from '~assets/img/like.png'

  export default {
    name: 'AddAnimate',
    data () {
      return {
        animateSrc: likes,
        animate: 'd-none',
      }
    },
    methods: {
      addAnimated () {
        let _this = this
        setTimeout(function () {
          _this.animate = 'jackInTheBox'
        }, 1000)
        setTimeout(function () {
          _this.animate = 'zoomOut'
        }, 2000)
        setTimeout(function () {
          _this.animate = 'd-none'
        }, 3000)
      },
    }
  }
</script>

<style lang="scss" scoped>
  .wh-80{
    width: 80px;
    height: 80px;
  }
</style>
