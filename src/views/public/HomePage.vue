<template>
  <div class="bg-light-grey">

    <nav-index title="首页"></nav-index>
      <article-list :in-value="dataList" @refresh="getList" ref="ArticleList"></article-list>

    <div class="created-blog" @click="goCreatedBlog">
      <van-icon class="align-middle" name="plus"/>
    </div>
  </div>
</template>
<script>
  /* eslint-disable */
  import {Toast} from 'vant'
  import cache from '~utils/cache'
  import ListItem from '~components/ListItem'
  import NavIndex from '~components/NavIndex'
  import ArticleList from '~components/ArticleList'
  import coopService from '~modules/coopService'
  import Cache from '~utils/cache';

  import THEME from '~config/theme'

  export default {
    name: 'HomePage',
    components: {
      Toast,
      ListItem,
      ArticleList,
      NavIndex,
    },
    data () {
      return {
        showSkeleton: true,
        showPop: false,
        userInfo: this.$store.state.userInfo,
        theme: document.getElementById('change-theme'),
        skip: 0,
        dataList: [],
      }
    },
    created(){
      let themeClass = Cache.get('theme')
      this.theme.innerHTML = THEME.THEME[themeClass] || THEME.THEME.day;
    },
    methods: {
      onClickRight () {
        this.$router.push({name: `Search`})
      },
      goCreatedBlog () {
        this.$router.push({name: 'NewArticle'})
      },
      getList () {
        let _this = this
        let data = {
          skip: _this.skip,
          authorId: [this.userInfo.user_id]
        }
        const axiosConfig = {axiosShowLoading: false}
        data.authorId.push(Object.keys(this.userInfo.author_focus))
        coopService.getArticleListByAuthor(data, axiosConfig).then(res => {

          _this.showSkeleton = false
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
  @import "../../assets/css/currency";

  .created-blog {
    position: fixed;
    bottom: 80px;
    right: 30px;
    width: 30px;
    height: 30px;
    line-height: 24px;
    padding-top: 2px;
    background-color: $deep-blue;
    color: white;
    text-align: center;
    border-radius: 15px;
  }


</style>
