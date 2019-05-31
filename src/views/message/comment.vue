<template>
  <div class="bg-gray">
    <div class="d-flex">
      <div class="comment" @click="getList('getCommentByAuthorId')">收到的评论</div>
      <div class="comment" @click="getList('getUserComment')">发出的评论</div>
    </div>
    <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="getList('getUserComment')">
      <div class="item-head" v-for="(item, index) in dataList" :key="index">
        <div class="item-head-img" @click="goAuthor">
          <img :src="userInfo.head_img">
        </div>
        <div class="item-title">
          <div class="w-100">
            <span class="font-weight-bold">{{userInfo.account}}</span>
            <span class="font-14 font-grey">{{item.comment.date | dateChange}}</span>
          </div>
          <div class="font-grey">
            {{item.comment.comment}}
          </div>
        </div>
        <div class="item-img">
          <img class="img-fluid" src="../../assets/img/banner-5.png">
        </div>
      </div>
    </van-list>

  </div>
</template>

<script>
  import coopService from '~modules/coopService'

  /* eslint-disable */
  export default {
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
//      this.getList('getUserComment')
    },
    methods: {
      goAuthor(){
      },
      getList (getComment) {
        let _this = this
        let data = {
          skip: _this.skip,
        }
        coopService[getComment](data).then(res => {
          //          if (!res) return
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

  .comment {
    background-color: white;

    border-radius: 15px;
    padding: 5px;
    font-size: 14px;
    margin: 10px;
  }

  .item-head {
    display: flex;
    padding: 10px;
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
      width: 70%;
    }
    .item-img {
      width: 40px;
      height: 40px;
    }
  }
</style>
