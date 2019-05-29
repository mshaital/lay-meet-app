<template>
  <div class="gray-bg">
    <nav-title title="草稿箱" right-text="清空" @right-click="clear"></nav-title>
    <div class="border-bottom p-2 font-grey font-14 mt-2 bg-white">草稿</div>
    <van-list v-model="loading" :finished="finished" finished-text="" @load="getList">
      <van-cell v-for="(item, index) in draftList" :key="index" @click="chooseDraft(item)">
        <div class="text-truncate">{{item.content}}</div>
        <div class="text-right font-grey font-14">{{item.article_date | dateChange}}</div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
  /* eslint-disable */
  import NavTitle from '~components/NavTitle'

  import coopService from '~modules/coopService'

  export default {
    components: {
      NavTitle,
    },
    data () {
      return {
        userInfo: this.$store.state.userInfo,
        skip: 0,
        draftList: [],
        loading: false,
        finished: false
      }
    },
    created () {
    },
    methods: {
      getList () {
        let _this = this
        let data = {skip: _this.skip,}
        coopService.getArticleDraftList(data).then(res => {
          this.loading = false
          if (res.length < 20) _this.finished = true
          if (res.length > 0) _this.draftList.push(...res)
          _this.skip += 20
        })
      },
      chooseDraft(item) {
        this.$store.commit('SET_DRAFTS', item)
        this.$router.replace({name: 'NewArticle'})

      },
      clear(){
        console.log('清空')
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
