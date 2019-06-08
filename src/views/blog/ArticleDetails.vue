<template>
  <div class="bg-light-grey">
    <nav-title :title="authorInfo.nick || authorInfo.account"></nav-title>

    <van-skeleton title avatar :row="7" :loading="showSkeleton">
      <div class="list-item bg-white">
        <div class="item-head">
          <div class="item-head-img" @click="goAuthor">
            <img class="rounded-circle" src="../../assets/img/head.png">
          </div>
          <div class="item-title">
            <div class="item-title-more w-100 d-flex justify-content-between">
              <span class="">{{authorInfo.nick || authorInfo.account}}</span>
              <div class="" @click="isFollow">
                <van-icon name="friends-o" :color="isUserFollow?'#ff530b':''"/>
                <van-icon :name="isUserFollow ? 'success' : 'plus'" :color="isUserFollow?'#ff530b':''"/>
              </div>
            </div>
            <div class="item-title-time">
              <span>{{articleInfo.article_date | dateChange}}</span>
              <span>{{articleInfo.category}}</span>
            </div>
          </div>
        </div>
        <div class="item-content border-bottom">
          <p class="hide-text mt-2">{{articleInfo.content}}</p>
          <img src="../../assets/img/banner-5.png">
        </div>
        <div class="d-flex justify-content-around p-2">
          <van-icon v-if="showBookMark" name="like-o"size="20px" @click="createBookmarks"/>
          <van-icon name="like" color="#ff530b" size="20px" v-else @click="deleteBookmarks"/>
          <van-icon name="comment-o" size="20px" @click="showCreatedComment=true"/>
          <van-icon name="share" size="20px"/>
        </div>
      </div>

      <div class="mt-2 white-bg font-14 font-grey p-2 border-bottom">
        <span class="align-middle pr-2">赞 {{articleInfo.likes}}</span>
        <span class="align-middle font-orange pr-2">评论 {{articleInfo.comment.length}}</span>
        <span class="align-middle">阅读 {{articleInfo.read_num}}</span>
        <span class="align-middle float-right">分享 {{articleInfo.read_num}}</span>
      </div>
      <div v-if="articleInfo.comment" >
        <div class="comment white-bg" v-for="item in articleInfo.comment" :key="item.index">
          <div class="item-head">
            <div class="item-head-img" @click="goAuthor">
              <img class="img-fluid" src="../../assets/img/head.png">
            </div>
            <div class="item-title">
            <span class="item-title-more w-100">
              <span class="font-14">{{item.nick || item.userAccount}}</span>
              <span class="Blogger" v-if="item.userId === articleInfo.author_id">博主</span>
            </span>
              <div class="item-title-time">
                <span class="font-12">{{item.date | dateChange}}</span>
              </div>
            </div>
          </div>
          <div class="white-bg p-2 border-bottom">
            {{item.comment}}
          </div>
        </div>
      </div>
    </van-skeleton>

    <add-animate ref="animate"></add-animate>

    <div class="footer align-middle d-flex align-items-center bg-white" @click="showCreatedComment=true">
      <img class="rounded-circle" :src="userInfo.head_img">
      <span class="font-grey font-14 pl-2"> 添加评论...</span>
    </div>
    <van-popup v-model="showCreatedComment" position="bottom">
      <div class="com-popup">
        <textarea class="bg-white" v-model="comment" autofocus placeholder="添加评论..."/>
        <div class="font-grey">
          <img class="rounded-circle" :src="userInfo.head_img">
          <span class="float-right ">
            <span class="align-middle">{{comment.length}}</span>&nbsp;
            <van-icon @click="createComment" class="align-middle" name="envelop-o" slot="right" size="22px"/>
          </span>
        </div>
      </div>
    </van-popup>
  </div>

</template>

<script>
  /* eslint-disable */

  import xss from 'xss'
  import coopService from '~modules/coopService'
  import {Toast} from 'vant'
  import AddAnimate from '~components/AddAnimate'
  import NavTitle from '~components/NavTitle'

  import UTIL from '~utils/Util'
  import { Dialog } from 'vant';
  import moment from 'moment'

  moment.locale('zh-cn')

  export default {
    components: {AddAnimate,NavTitle},
    data () {
      return {
        showSkeleton: true,
        userInfo: this.$store.state.userInfo,
        comment: '',
        bookmarks: '',
        showBookMark: false,
        articleAccount: '',
        showCreatedComment: false,
        isUserFollow: false,
        articleInfo: {
          comment: []
        },
        authorInfo: {},
        commentNun: ''
      }
    },
    created () {
      this.getContent()
      this.addRead()
    },
    methods: {
      goAuthor () {
      },

      addRead () {
        let paramsData = this.$route.params
        if (!paramsData) return
        let data = {articleId: paramsData.articleId}
        const axiosConfig = {axiosShowLoading: false}

        coopService.addReadNumber(data, axiosConfig).then(res => {
        })
      },
      getContent () {
        let _this = this
        let articleId = _this.$route.params.articleId
        if (!articleId) _this.$router.push('/login')
        let data = {articleId: articleId}
        const axiosConfig = {axiosShowLoading: false}

        coopService.getArticleDetailsAndAuthorInfo(data, axiosConfig).then(res => {
          _this.showSkeleton = false
          let articleData = res
          _this.articleInfo = articleData
          _this.authorInfo = articleData.user

          if (!_this.userInfo) return
          let bookMark = _this.userInfo.bookmarks
          bookMark.map(item => {
            if (item.article_id === articleData.article_id) _this.showBookMark = true
          })
          let authorFocus = Object.keys(_this.userInfo.author_focus || {})
          if (authorFocus.indexOf(_this.articleInfo.author_id) > -1) _this.isUserFollow = true
        })
      },
      // 创建评论
      createComment () {
        // 获取已有账号密码
        let _this = this
        let token = this.$store.state.token
        if (!token) _this.$router.push('/login')
        let data = {
          comment: xss(this.comment),
          date: new Date(),
          userAccount: this.userInfo.account,
          userId: this.userInfo.user_id,
          articleId: this.articleInfo.articleId
        }
        coopService.createComment(data).then(res => {
          if (res !== 'SUCCESS') return
          _this.comment = ''
          delete data.article_id
          _this.showCreatedComment = false
          _this.articleInfo.comment.push(data)
          Toast('评论成功')
        })
      },
      // 添加收藏
      createBookmarks () {
        let _this = this
        let params = {
          articleId: this.articleInfo.article_id,
          authorId: this.articleInfo.user.user_id
        }
        UTIL.Util.createBookmarks(params,()=> {
          _this.$refs.animate.addAnimated()
          _this.showBookMark = !_this.showBookMark

        })
      },
      // 取消收藏
      deleteBookmarks () {
        let _this = this
        Dialog.confirm({
          title: '',
          message: '确认取消？',
          confirmButtonColor: '#17a2b8'
        }).then(() => {
          let params = {
            articleId: this.articleInfo.article_id,
            authorId: this.articleInfo.user.user_id
          }
          UTIL.Util.deleteBookmarks(params,()=> {
            _this.showBookMark = !_this.showBookMark
          })
        }).catch(() => {
          // on cancel
        });

      },
      // 关注作者/取消
      isFollow () {
        let _this = this
        let params = {
          authorId: this.authorInfo.user_id,
          userAccount: _this.userInfo.account
        }
        coopService[this.isUserFollow ? 'addUserAuthorUnFollow' : 'addUserAuthorFollow'](params).then(res => {
          if (res !== 'SUCCESS') return
          _this.isUserFollow = !_this.isUserFollow
          let authorFocus = _this.userInfo.author_focus
          authorFocus.push(_this.authorInfo.user_id)
          _this.$store.commit('SET_USER_INFO', _this.userInfo)
        })
      }
    }
  }
</script>
<style lang="scss" scoped>


  .list-item {
    margin-top: 10px;
    padding: 5px;
  }

  .item-head {
    display: flex;
    padding: 0.5rem 0.5rem 0 0.5rem;
    .item-head-img {
      margin-right: 10px;
      width: 40px;
      height: 40px;
      img {
        width: 100%;
      }
    }
    .item-title {
      width: 80%;
      .item-title-more {
        font-size: 18px;
        .item-title-pop {
          position: absolute;
          top: 30px;
          right: 5px;
          padding: 5px;
          font-size: 14px;
        }
      }
      .item-title-time {
        font-size: 14px;
        color: grey;
      }
    }
  }

  .item-content {
    img {
      width: 100%;
    }
  }

  .item-footer {
    color: grey;
  }

  .footer {
    width: 100%;
    padding: 5px;
    position: fixed;
    bottom: 0;
    height: 40px;
    img {
      height: 30px;
    }
  }

  .com-popup {
    padding: 5px;
    width: 100%;
    textarea {
      width: 100%;
      border: none;
      resize: none
    }
    img {
      width: 30px;
      height: 30px;
    }
  }

  .comment {
    .item-head {
      display: flex;
      .item-head-img {
        margin-right: 10px;
        width: 30px;
        height: 30px;
        img {
          width: 100%;
        }
      }
      .item-title {
        width: 80%;
        margin: -5px 0;

        .item-title-more {
          line-height: 1px;
          .Blogger {
            width: 30px;
            height: 17px;
            border: rgba(40, 40, 255, 0.89) solid 1px;
            color: rgba(40, 40, 255, 0.89);
            font-size: 10px;
            padding: 0 2px;
            border-radius: 3px;
            background-color: rgba(47, 44, 255, 0.2);
          }
        }
        .item-title-time {
          margin: -5px 0;

          font-size: 14px;
          color: grey;
        }
      }
    }
  }
</style>
