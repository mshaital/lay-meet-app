<template>
  <div class="bg-light-grey">
    <nav-index title="发现"></nav-index>

    <div class="w-100 d-flex justify-content-center p-1">
      <div class="btn-group btn-group-sm mx-auto" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-info">最新</button>
        <button type="button" class="btn btn-light">最热</button>
      </div>
    </div>

    <div>
      <div class="bg-white pt-1 pb-1 pl-2 pr-2 font-14 border-bottom">
        <span class="font-grey">热门话题</span>
        <span class="float-right">
          <van-icon class="align-middle" name="arrow" size="18px"/>
        </span>
      </div>
      <div class="bg-white p-1 font-16 clearfix">
        <div class="float-left pl-2 pr-2 btn-info rounded-pill mt-1 mr-1" v-for="(item, index) in hotList" :key="index">
          <van-icon class="align-middle" name="fire" color="#959595"/>
          <span class="font-14"> {{ item}}</span>
        </div>

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
        dataList:[],
        hotList: [
          '吴京代言英英平精英',
          '吴 平精英平精英',
          '吴京代言和 精英平精英平精英平精英',
          '吴京代言和平精英平精英平 精英平精英',
          '吴京代言和英平精英',
          '吴京代言和平精英平精英平精 平精英',
          '吴 精英平精英',
          '吴京代言和平 精英平精英平精英',
          '精精英',
        ]
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
