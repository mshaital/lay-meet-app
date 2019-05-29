<template>
  <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="getList" class="mb-5">
    <list-item
      v-for="(item, index) in inValue" :key="item.index"
      :inValue="item"
      :userInfo="userInfo"
      @add-follow="addFollow"
      @un-follow="unFollow"
      class=""
    ></list-item>
  </van-list>
</template>

<script>
  /* eslint-disable */
  import ListItem from '~components/ListItem'
  import coopService from '~modules/coopService'
  import cache from '~utils/cache'

  export default {
    components: {
      ListItem,
    },
    name: 'ArticleList',
    props: {
      inValue: {
        type: Array,
        default: () => []
      },
      isFinished: {
        type: Boolean,
        default: false
      },
      tips: {
        type: String,
        default: '没有更多了'
      }
    },
    data () {
      return {
        userInfo: this.$store.state.userInfo,
        skip: 0,
        loading: false,
        finished: false,
        finishedText: '没有更多了',
      }
    },
    created () {
      this.finished = this.isFinished
      this.finishedText = this.tips
    },
    methods: {
      getList () {
        this.$emit('refresh')
      },
      addFollow (event) {
        this.userInfo.author_focus[event] = ''
        this.$store.commit('SET_USER_INFO', this.userInfo)
      },
      unFollow (event) {
        let authorFocus = this.userInfo.author_focus
        delete authorFocus[event]
        this.$store.commit('SET_USER_INFO', this.userInfo)
      },
      changeFinished (){
        this.finished = true
      },
      changeLoading(){
        this.loading = false
      }
    }
  }
</script>

<style scoped>

</style>
