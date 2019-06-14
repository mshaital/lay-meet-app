<template>
  <div class="">
    <van-skeleton title avatar :row="9" :loading="showSkeleton">

    <div class="header" :class="{'bg-img': userInfo.bg_img===''}">
      <div class="d-flex justify-content-between">
        <div class="back">
          <van-icon name="arrow-left" class="font-white" @click="$router.push('/')"/>
        </div>
        <div class="">
          <van-icon name="search" class="font-white mr-3" size="20px" @click="goSearch"/>
          <van-icon name="ellipsis" class="font-white" size="20px" ref="showMore" @click="showPop"/>
          <div class="more" v-if="showMore" ref="moreOpt">
            <div class="mb-4" v-for="(item, index) in description" :key="index" @click="popOption(index)">
              <van-icon :name="item.name" class="mr-3 align-middle font-grey" size="20px"/>
              <span class="font-14">{{item.description}}</span>
            </div>
          </div>
        </div>
      </div>

      <img :src="authorInfo.head_img || headImg">
    </div>
    <div  class="d-flex justify-content-between">
      <div class="account">{{authorInfo.nick || authorInfo.account}}</div>

      <div class="m-3 d-flex">
        <div class="edit bg-gray" @click="sendPrivateLetter">
          <van-icon name="envelop-o" size="18px"/>
        </div>
        <div @click="isFocus" :class="{'active':!isUserFollow}" class="edit">
          {{isUserFollow ? '已关注':'关注'}}
        </div>
      </div>
    </div>
    <div class="ml-3 font-12 font-grey">上海</div>
    <div class="ml-3 font-12 font-grey">简介：{{authorInfo.declaration}}</div>

    <div class="ml-3 pt-2 pb-2">
      <span class="font-12">{{Object.keys(authorInfo.author_focus).length}}<span class="font-grey">关注</span></span>
      <span class="font-12">{{authorInfo.follow.length}}<span class="font-grey">粉丝</span></span>
      <span class="font-12" @click="goBookMark">他的赞</span>
    </div>

    <div class="p-2 bg-gray">
      <span class="p-2 font-14 font-grey">全部微博 • {{dataList.length}}</span>
      <span class="font-blue float-right font-14">
        <van-icon class="align-middle" name="bar-chart-o" />
        <span class="align-middle">筛选</span>
      </span>
    </div>
    <div class="bg-gray">
      <article-list :in-value="dataList" @refresh="getList" ref="ArticleList"></article-list>
    </div>
    </van-skeleton>
  </div>
</template>

<script>
  import ArticleList from '~components/ArticleList'
  import coopService from '~modules/coopService'
  import headImg from '~assets/img/head.png'

  /* eslint-disable */
  // vue use vueResource for http request.
  export default {
    components: {
      ArticleList
    },
    data () {
      return {
        headImg,
        showMore: false,

        showSkeleton: true,
        description:[
          {
            name: 'edit',
            description: '备注'
          },
          {
            name: 'records',
            description: '复制昵称'
          },
          {
            name: 'description',
            description: '加入黑名单'
          },
          {
            name: 'qr',
            description: '他的二维码'
          },
          {
            name: 'warn-o',
            description: '举报'
          },
        ],
        userInfo: this.$store.state.userInfo,
        authorId: this.$route.params.authorId,
        authorInfo: {
          author_focus:[],
          follow:[],
        },
        isUserFollow: false,
        skip: 0,
        dataList: [],
      }
    },
    created () {
      let _this = this
      this.$nextTick(()=> {
        document.addEventListener('click', (e)=>{
          if(!_this.$refs.moreOpt) return
          if(!_this.$refs.showMore) return
          let moreOpt = _this.$refs.moreOpt.contains(e.target)
          let toggleSelect = _this.$refs.showMore.contains(e.target)
          if (!toggleSelect) {
            _this.showMore = false
            document.body.removeAttribute("class","add_bg");
          } else if (moreOpt) {
            _this.showMore = true
          }
        })
      })
      this.getAuthorInfo()
      let authorFocus = Object.keys(this.userInfo.author_focus || {})
      authorFocus.indexOf(this.authorId) > -1 ? this.isUserFollow =  true:  this.isUserFollow =  false
    },
    methods: {

      showPop () {
        this.showMore = !this.showMore
        this.showMore ? document.getElementsByTagName("body")[0].className="overflow-hidden":document.body.removeAttribute("class","add_bg")
      },
      popOption (index) {
        console.log(index)
      },
      goBookMark () {
        this.$router.push({name: `BookMarks`, params: {bookmarks: this.authorInfo.bookmarks}})
      },
      goSearch () {
        let param = {
          authorId: this.authorInfo.user_id,
        }
        this.$router.push({name: `SearchAuthorByTitle`, params: param})
      },
      sendPrivateLetter() {
        let authorInfo = {
          authorId: this.authorInfo.user_id,
          authorName: this.authorInfo.account,
        }
        this.$router.push({name: `SendPrivateLetter`, params: {authorInfo: authorInfo}})
      },
      isFocus () {
        let _this = this
        let params = {authorId: this.authorInfo.user_id,}
        coopService[this.isUserFollow ? 'addUserAuthorUnFollow' : 'addUserAuthorFollow'](params).then(res => {
          if (res !== 'SUCCESS') return
          let authorFocus = _this.userInfo.author_focus
          _this.isUserFollow ?  delete authorFocus[params.authorId] : authorFocus[params.authorId] = ''
          _this.$store.commit('SET_USER_INFO', _this.userInfo)
          _this.isUserFollow = !_this.isUserFollow
        })
      },
      getList () {
        let _this = this
        let data = {
          skip: _this.skip,
          authorId: [this.authorId]
        }
        const axiosConfig = {axiosShowLoading: false}
        coopService.getArticleListByAuthor(data, axiosConfig).then(res => {
          if (!res) return
          _this.showSkeleton = false
          _this.dataList.push(...res)
          _this.skip += 20
          _this.$refs.ArticleList.changeLoading()
          if (res.length <= 0) _this.$refs.ArticleList.changeFinished()

        })
      },
      getAuthorInfo () {
        let _this = this
        let data = {authorId: this.authorId}
        const axiosConfig = { axiosShowLoading: false }
        coopService.getAuthorInfo(data, axiosConfig).then(res => {
          if (!res){
            this.$toast('查询失败，请稍后再试')
            this.$router.go(-1)
          }
          _this.authorInfo = res
          _this.showSkeleton = false
        })
      },
      addRemarks () {

      },
    },
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
    padding-right: 15px;
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
    border-radius: 30px;
    background-color: gainsboro;
    height: 40px;
    *{
      vertical-align: middle;

    }

  }
  .active{
    color: white;
    background-color: orange;
  }
  .more{
    position: absolute;
    background-color: white;
    padding: 10px;
    width: 150px;
    right: 5px;
    z-index: 201;
  }

</style>
