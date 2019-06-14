<template>
  <div>
    <div class="header" :class="{'bg-img': userInfo.bg_img===''}">
      <div class="back">
        <van-icon name="arrow-left" class="font-white" @click="$router.push('/')"/>
      </div>
      <img :src="userInfo.head_img || HeadImg" @click="goSetting">
    </div>
    <div  class="d-flex justify-content-between">
      <div class="account">{{userInfo.nick || userInfo.account}}</div>
      <div class="m-3 w-30 d-flex justify-content-around">
        <div>
          <span class="edit"><van-icon name="qr" /></span>
        </div>
        <div>
          <span class="edit" @click="goSetting"><van-icon name="edit" /></span>
        </div>
      </div>
    </div>
    <div class="ml-3 font-12 font-grey">上海</div>

    <div class="ml-3 pt-2 pb-2">
      <span class="font-12">{{userInfo.author_focus.length}}<span class="font-grey">关注</span></span>
      <span class="font-12">{{userInfo.follow.length}}<span class="font-grey">粉丝</span></span>
      <span class="font-12" @click="goBookMark">我的赞</span>
    </div>
    <div class="p-2 bg-gray">
      <span class="p-2 font-14 font-grey">全部微博 • {{1}}</span>
      <span class="font-blue float-right font-14">
        <van-icon class="align-middle" name="bar-chart-o" />
        <span class="align-middle">筛选</span>
      </span>
    </div>
    <article-list :in-value="dataList" @refresh="getList" ref="ArticleList"></article-list>
  </div>
</template>

<script>
  import ArticleList from '~components/ArticleList'
  import coopService from '~modules/coopService'
  import HeadImg from '~assets/img/head.png'

  /* eslint-disable */
  // vue use vueResource for http request.
  export default {
    components: {
      ArticleList
    },
    data () {
      return {
          HeadImg,
        userInfo: this.$store.state.userInfo,
        skip: 0,
        dataList: [],
      }
    },
    methods: {
      goBookMark () {
        this.$router.push({name: 'BookMarks'})
      },
      goSetting () {
        this.$router.push({name: 'BaseSetting'})
      },
      getList () {
        let _this = this
        let data = {
          skip: _this.skip,
          authorId: [this.userInfo.user_id]
        }
        const axiosConfig = {axiosShowLoading: false}
        coopService.searchByAuthorAll(data, axiosConfig).then(res => {
          if (!res) return
          _this.dataList.push(...res)
          _this.skip += 20
          _this.$refs.ArticleList.changeLoading()
          if (res.length <= 0) _this.$refs.ArticleList.changeFinished()
        })
      },
    },
    mounted () {

    }
  }
</script>
<style lang="scss" scoped>
  .bg-img{
    background-image: url(../../assets/img/banner-index.jpg);
  }

.header{
  height: 170px;
  background-size: cover;
  position: relative;
  padding-top: 15px;
  padding-left: 15px;
  .back{
    background-color: rgba(158, 147, 147, 0.7);
    height: 30px;
    width: 30px;
    border-radius: 15px;
    line-height: 33px;
    text-align: center;
  }
  img{
    width: 70px;
    height: 70px;
    border-radius: 35px;
    position: absolute;
    left: 10px;
    bottom: -50px;
    background-color: white;
    border: white 4px solid;
  }
}
  .account{
    margin-top: 60px;
    margin-left: 15px;
    font-weight: bold;

  }
  .edit{
    padding: 10px;
    background-color: #e2e2e2;
    border-radius: 30px;
    font-weight: bold;
    font-size: 18px;
    *{
      vertical-align: middle;

    }
  }
</style>
