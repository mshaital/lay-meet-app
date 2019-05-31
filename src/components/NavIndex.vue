<template>
  <div>
    <div class="nav-title">
      <div @click="leftClick">
        <van-icon name="wap-nav" color="gray" size="20px"/>
      </div>
      <div class="w-60">{{title}}</div>
      <div @click="rightClick">
        <span>{{rightText}}</span>
        <van-icon :name="rightIcon" color="gray" size="20px"/>
      </div>
      <pop-index v-model="showPop"></pop-index>

    </div>
    <div class="nav-sub"></div>
  </div>

</template>

<script>
  /* eslint-disable */
  import PopIndex from '~components/PopIndex'

  export default {
    components: {
      PopIndex,
    },
    name: 'NavTitle',
    data () {
      return {
        showPop: false
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
      rightIcon: {
        type: String,
        default: 'search'
      },
    },
    created () {
    },
    methods: {
      leftClick(){
//        this.$emit('left-click', '')
        this.showPop = !this.showPop
      },
      rightClick(){
//        this.$emit('right-click', '')
        this.$router.push({name: `Search`})

      }
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

    background-color: white;
    padding: 10px;
  }
  .nav-sub{
    height: 50px;
  }

</style>
