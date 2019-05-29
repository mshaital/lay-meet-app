<template>
  <div>
    <div class="search shadow white-bg ">
      <van-icon name="arrow-left" class="align-middle" size="20px" @click="$router.go(-1)"/>
      <input class="search-input align-middle" v-model="searchValue" @keyup.enter="getList('Refresh')"  placeholder="想要查找的文章"/>
    </div>
    <div class="mt-5 p-2 font-14 font-grey border-bottom" v-if="dataList.length>0">共找到 23 条结果</div>
    <article-list :in-value="dataList" :isFinished="true" :tips="tips" @refresh="getList" ref="ArticleList"></article-list>

  </div>
</template>

<script>
  /* eslint-disable */
  import coopService from '~modules/coopService'
  import ArticleList from '~components/ArticleList'

  export default {
    name: 'editor',
    components: {
      ArticleList
    },
    data () {
      return {
        authorId: this.$route.params.authorId,
        searchValue: '',
        tips: '',
        skip: 0,
        dataList: [],
      }
    },
    methods: {
      getList (isRefresh) {
        let _this = this
        let data = {
          skip: _this.skip,
          authorId: this.authorId,
          searchValue: this.searchValue
        }
        if (isRefresh) this.dataList = []
        const axiosConfig = {axiosShowLoading: false}
        coopService.searchAuthorArticleByTitle(data, axiosConfig).then(res => {
          if (!res) return
          _this.dataList.push(...res)
          _this.skip += 20
          _this.$refs.ArticleList.changeLoading()
          if (res.length <= 0) _this.$refs.ArticleList.changeFinished()
        })
      },
    },
    filters: {
      aquareConCut: function (value) {
        if (value.length > 120) {
          value = value.substring(0, 120) + '...'
        }
        value = value.replace(/<\/?[^>]*>/g, '') // 去除HTML tag
        value = value.replace(/[ | ]*\n/g, '\n') // 去除行尾空白
        // str = str.replace(/\n[\s| | ]*\r/g,'\n') // 去除多余空行
        value = value.replace(/ /ig, '')// 去掉
        return value
      }
    },
    created () {}
  }
</script>
<style lang="scss" scoped>
 .search{
   position: fixed;
   z-index: 200;
   top: 0;
   padding: 10px;
   width: 100%;
   .search-input{
     width: 90%;
     padding: 0 5px;
     outline: none;
     border: none;
   }
 }
</style>
