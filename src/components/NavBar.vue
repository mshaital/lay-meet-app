<template>
  <van-tabbar v-model="active" @change="changeComponents">
    <van-tabbar-item icon="wap-home"></van-tabbar-item>
    <van-tabbar-item icon="friends-o" dot ></van-tabbar-item>
    <van-tabbar-item icon="bell" info="20"></van-tabbar-item>
  </van-tabbar>
</template>

<script>
  /* eslint-disable */

  export default {
    components: {

    },
    name: 'navBar',
    data () {
      return {
        active: this.$store.state.indexTab,
      }
    },
    created () {
    },
    methods: {
      changeComponents (e) {
        this.$store.commit('SET_INDEX_TAB', e)
        this.$emit('change-components', e)
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>
