<template>
<div class="bg-gray">
  <nav-title :title="lastPage==='IndexPage'? '我的赞' :'他的赞'"></nav-title>
  <template v-if="showTip">
    <article-list class="" :in-value="dataList" @refresh="getList" ref="ArticleList"></article-list>
  </template>
  <div class="text-center light-grey-bg p-2 font-normal font-grey" v-else>
    {{lastPage==='IndexPage'? '你' :'他'}}还没有赞哦！
  </div>
</div>
</template>

<script>
  import NavTitle from '~components/NavTitle'
  import ArticleList from '~components/ArticleList'

  import coopService from '~modules/coopService'

  /* eslint-disable */
  export default {
    components: {
      NavTitle,
      ArticleList,
    },
    data () {
      return {
        showTip: true,
        userInfo: this.$store.state.userInfo,
        bookmarks: this.$route.params.bookmarks,
        lastPage:'',
        skip: 0,
        dataList: [],
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
         vm.lastPage = from.name
      })
    },
    created () {},
    methods: {
      getList () {
        let _this = this
        if(this.lastPage === 'IndexPage') this.bookmarks = this.userInfo.bookmarks
        this.bookmarks = this.bookmarks.map(item => {
          item = item.article_id
          return item
        })
        console.log(this.bookmarks)
        let data = {
          skip: _this.skip,
          articleId: this.bookmarks
        }
        const axiosConfig = {axiosShowLoading: false}
        coopService.searchByArticleId(data, axiosConfig).then(res => {
          if (!res) return
          _this.dataList.push(...res)
          if (_this.dataList.length === 0) _this.showTip = false
          _this.skip += 20
          _this.$refs.ArticleList.changeLoading()
          if (res.length <= 0) _this.$refs.ArticleList.changeFinished()
        })
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>
