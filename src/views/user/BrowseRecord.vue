<template>
  <div class="bg-gray">
    <nav-title title="浏览记录"></nav-title>

    <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="getList">
        <div class="item-head"  v-for="(item, index) in dataList" :key="item.index" :index="index" @click="goAuthor(item.user_id)">
          <div class="item-head-img">
            <img :src="item.head_img">
          </div>
          <div class="item-title">
            <div class="w-100 font-weight-bold pl-3 align-middle">
              {{item.account || item.nick}}
              <span class="font-normal font-grey float-right font-14">
                <van-icon name="arrow" size="20px"/>
              </span>
            </div>
          </div>
        </div>
    </van-list>
  </div>
</template>

<script>
  import coopService from '~modules/coopService'
  import NavTitle from '~components/NavTitle'

  /* eslint-disable */

  export default {
    name: 'BrowseRecord',
    components: {NavTitle},
    data () {
      return {
        userInfo: this.$store.state.userInfo,
        loading: false,
        finished: false,
        finishedText: '没有更多了',
        skip: 0,
        dataList: [],
      }
    },
    created () {

    },
    methods: {
      goAuthor(userId){
        this.$router.push({name: `Author`, params: {authorId: userId}})
      },
      getList () {
        let _this = this
        let data = {
          skip: _this.skip,
          authorIds: _this.userInfo.browse_record_user,
        }
        coopService.getAuthorListById(data).then(res => {
          if (res.length < 0){
            _this.hasMore = false
            return
          }
          _this.dataList.push(...res)
          _this.skip += 10
          this.loading = false
          this.finished = true
          if(_this.dataList.length === 0) _this.finishedText = '还没有浏览记录'
        })
      },
    }
  }
</script>

<style lang="scss" scoped>

  .item-head {
    box-sizing: border-box;
    display: flex;
    padding: 10px 10px 0 10px;
    background-color: white;
    .item-head-img {
      margin-right: 10px;
      width: 40px;
      height: 40px;
      img {
        width: 100%;
      }
    }
    .item-title {
      width: 100%;
      padding-bottom: 10px;
      border-bottom: #efefef 1px solid;
    }
    .item-img {
      width: 40px;
      height: 40px;
    }
  }
</style>
