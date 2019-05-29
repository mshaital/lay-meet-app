<template>
  <div>
    <nav-index title="消息"></nav-index>
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="(item, index) in tabList" :key="index" :title="item" class="p-2"></van-tab>
    </van-tabs>
    <component v-bind:is="currentTabComponent"></component>
  </div>
</template>

<script>
  /* eslint-disable */
  import NavIndex from '~components/NavIndex'
  import comment from './comment'
  import Liked from './Liked'
  import PrivateLetter from './PrivateLetter'

  export default {
    components: {
      NavIndex,
      comment,
      PrivateLetter,
    },
    data () {
      return {
        active: this.$store.state.messageTab,
        tabComponent:[comment, Liked, PrivateLetter, comment],
        tabList: ['评论', '赞', '私信','@我']
      }
    },
    computed: {
      currentTabComponent () {
        this.$store.commit('SET_MESSAGE_TAB', this.active)
        return this.tabComponent[this.active]
      }
    },
    methods: {},
    // 调用
    mounted () {
     // console.log(this.userInfo)
    }
  }
</script>
<style scoped>

</style>
