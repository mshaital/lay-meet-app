<template>
  <div class="gray-bg">
    <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="getList">
        <div class="item-head"  v-for="(item, index) in dataList" :key="item.index" :index="index">
          <div class="item-head-img" @click="goAuthor(item)">
            <img :src="item._id.headImg">
          </div>
          <div class="item-title " @click="goSendPrivateLetter(item)">
            <div class="w-100">
              <span class="font-weight-bold">{{item._id.account || item._id.nick}}</span>
              <span class="font-normal font-grey float-right">{{item.privateLetter.letter_date | dateChange}}</span>
            </div>
            <div class="font-grey font-normal">
              {{item.privateLetter.content}}
            </div>
          </div>
        </div>
    </van-list>
  </div>
</template>

<script>
  import coopService from '~modules/coopService'

  /* eslint-disable */

  export default {
    name: 'PrivateLetter',
    components: {},
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
      goAuthor(item){
        this.$router.push({name: `Author`, params: {authorId: item._id.userId}})
      },
      goSendPrivateLetter(item){
        let authorInfo = {
          authorId: item._id.userId,
          authorName: item._id.account,
        }
        this.$router.push({name: `SendPrivateLetter`, params: {authorInfo: authorInfo}})
      },
      getList () {
        let _this = this
        let data = {
          skip: _this.skip,
        }
        coopService.getPrivateLetterList(data).then(res => {
          if (res.length < 0){
            _this.hasMore = false
            return
          }
          _this.dataList.push(...res)
          _this.skip += 10
          this.loading = false
          this.finished = true
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
