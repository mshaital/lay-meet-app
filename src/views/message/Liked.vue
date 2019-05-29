<template>
  <div class="gray-bg">

    <div class="pt-1 pb-1 pl-2 font-grey font-14">共{{dataList.length}}人赞了你</div>
    <template v-if="dataList>0">
      <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="getList" >
          <div class="item-head" v-for="(item, index) in dataList" :key="item.index">
            <div class="item-head-img" @click="goAuthor">
              <img :src="userInfo.head_img">
            </div>
            <div class="item-title">
              <div class="w-100">
                <span class="font-weight-bold">{{item.account}}</span>
                <span class="font-14 font-grey">{{item.bookmarks.create_date | dateChange}}</span>
              </div>
              <div class="font-grey font-14">
                赞了你的文章
              </div>
            </div>
            <div class="item-img">
              <img class="img-fluid" src="../../assets/img/banner-5.png">
            </div>
          </div>
      </van-list>

    </template>

    <div class="font-grey font-14 p-2 white-bg text-center" v-else>还没有人给你点赞哦</div>
  </div>
</template>

<script>
  import coopService from '~modules/coopService'

  /* eslint-disable */

  export default {
    components: {
    },
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
//        this.getList()
    },
    methods: {
      goAuthor(){},
      getList () {
        let _this = this
        let data = {
          skip: _this.skip,
        }
        coopService.getReceivedBookmarks(data).then(res => {
//          console.log(res)

          if (res.length === 0) return
          _this.dataList.push(...res)
          console.log(_this.dataList)
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

  .comment{
    background-color: white;
    height: 30px;
    border-radius: 15px;
    padding: 5px;
    font-size: 14px;
    margin: 10px;
  }
  .item-head{
    display: flex;
    padding: 10px;
    background-color: white;
    border-bottom: #f0f0f0 1px solid;
    .item-head-img{
      margin-right: 10px;
      width: 40px;
      height: 40px;
      img{
        width: 100%;
      }
    }
    .item-title{
      width: 70%;
    }
    .item-img{
      width: 40px;
      height: 40px;
    }
  }
</style>
