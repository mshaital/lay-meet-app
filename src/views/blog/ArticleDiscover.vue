<template>
  <div class="bg-light-grey">
    <nav-index title="发现"></nav-index>

    <div class="w-100 d-flex justify-content-center p-1">
      <div class="btn-group btn-group-sm mx-auto" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-info">最新</button>
        <button type="button" class="btn btn-light">最热</button>
      </div>
    </div>

    <article-list :in-value="dataList" @refresh="getList" ref="ArticleList"></article-list>
  </div>
</template>

<script>
  /* eslint-disable */
  import coopService from '~modules/coopService'
  import ArticleList from '~components/ArticleList'
  import cache from '~utils/cache'
  import NavIndex from '~components/NavIndex'

  export default {
    components: {
      ArticleList,
      NavIndex
    },
    data () {
      return {
        skip: 0,
        dataList:[]
      }
    },
    created () {
    },
    methods: {
      getList () {
        let _this = this
        let data = {
          skip: _this.skip,
        }
        const axiosConfig = { axiosShowLoading: false }
        coopService.getAllArticle(data, axiosConfig).then(res => {
          if (!res) return
          _this.dataList.push(...res)
          _this.skip += 20
          _this.$refs.ArticleList.changeLoading()
          if (res.length <= 0) _this.$refs.ArticleList.changeFinished()
        })
      },
    },

  }
</script>
<style lang="scss" scoped>

</style>
