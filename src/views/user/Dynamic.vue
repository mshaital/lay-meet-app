<template>
  <div class="gray-bg">
    <nav-title title="我的动态"></nav-title>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="getList"
    >
      <van-cell v-for="(item, index) in dynamicList" :key="index">
        您在
        <span class="font-grey font-14">{{item.dynamic.time}}{{item.dynamic.msg}}</span>
        <div class="article-info" v-if="item.dynamic.article_title">
          <router-link :to="{name:'BlogContent',params: {article_title: item.dynamic.article_title}}" class="font-green">
            <h3 class="m-0">《{{item.dynamic.article_title}}》</h3>
            <span></span>
          </router-link>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
  /* eslint-disable */
  import NavTitle from '~components/NavTitle'

  import coopService from '~modules/coopService'

  /* eslint-disable */
  export default {
    components: {
      NavTitle,
    },
    data () {
      return {
        userInfo: this.$store.state.userInfo,
        skip: 0,
        dynamicList: [],
        hasMore: true,
        loading: false,
        finished: false
      }
    },
    created () {
      this.getList()
    },
    methods: {
      getList () {
        let _this = this
        let data = {
          skip: _this.skip,
          userId: this.userInfo.user_id,
          userAccount: this.userInfo.account
        }
        coopService.getUserDynamic(data).then(res => {
          if (!res) return
          _this.dynamicList.push(...res)
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
