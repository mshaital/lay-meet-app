<template>
<div class="bg-gray">
  <nav-title title="我的评论"></nav-title>
  <article-list class="mt-4" :in-value="dataList" @refresh="getList"></article-list>

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
        userInfo: this.$store.state.userInfo,
        skip: 0,
        dataList: [],
      }
    },
    created () {},
    methods: {
      getList () {
        let _this = this
        let data = {
          skip: _this.skip,
          userId: this.userInfo.user_id
        }
        coopService.getUserComment(data).then(res => {
          if (!res) return
          _this.dataList.push(...res)
          if (res.length <= 0) _this.hasMore = false
          _this.skip += 20
          this.loading = false
          this.finished = true
        })
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>
