<template>
  <div class="mt-1 bg-white pt-2">
    <div class="d-flex pl-2 pr-2">
      <div class="head-img-size mr-3 d-flex" @click="goAuthor">
        <img class="align-self-center rounded-circle img-fluid" :src="inValue.head_img">
      </div>
      <div class="w-100">
        <div class="font-18 w-100 d-flex justify-content-between position-relative">
          <span class="">{{inValue.account}}</span>
          <van-icon name="arrow-down" ref="listOptBtn" @click="showOpt"/>
          <div v-if="showPop" ref="listOpt" class="item-title-pop shadow rounded white-bg">
            <div class="align-middle" @click="isFollow">
              <van-icon v-if="isUserFollow" class="align-middle" name="friends-o"/>
              {{isUserFollow ? '取消关注' : '关注'}}
            </div>
            <div class="align-middle">
              <!--<van-icon v-if="userInfo.bookmarks.indexOf(inValue.articleId) < 0" class="align-middle" name="like-o"/>-->
              <!--<van-icon class="align-middle text-danger" name="like" v-else/>-->
              {{userInfo.bookmarks.indexOf(inValue.articleId) > -1 ? '已赞' : '点赞'}}
            </div>
          </div>
        </div>
        <div class="font-14 font-grey">
          <span>{{inValue.article_date | dateChange}}</span>
          <span>{{inValue.category}}</span>
        </div>
      </div>
    </div>
    <div class="border-bottom" @click="goContent">
      <div class="text-truncate p-2">{{inValue.content}}</div>
      <img class="w-100" src="../assets/img/banner-5.png">
    </div>
    <div class="font-grey pt-1 pb-1 pr-2 pl-2">
      <span class="pr-3">
        <van-icon class="align-middle" name="fire" size="18px"/>
        <span class="align-middle">{{inValue.read_num}}</span>
      </span>
      <span>
        <van-icon class="align-middle" name="comment" size="18px"/>
        <span class="align-middle">{{inValue.comment_count}}</span>
      </span>
      <span class=" float-right">
        <van-icon class="align-middle" name="share" size="18px"/>
      </span>
    </div>
  </div>

</template>

<script>
  /* eslint-disable */
  import coopService from '~modules/coopService'
  import cache from '~utils/cache'

  import moment from 'moment'
  moment.locale('zh-cn')

  export default {
    components: {},
    name: 'ListItem',
    props: {
      inValue: {
        type: Object,
        default: () => {
        }
      },
      userInfo: {
        type: Object,
        default: () => {
        }
      },
    },
    data () {
      return {
        showPop: false,
        isUserFollow: false,
      }
    },
    created () {
      let authorFocus = Object.keys(this.userInfo.author_focus || {})
      authorFocus.indexOf(this.inValue.author_id) > -1 ? this.isUserFollow = true : this.isUserFollow = false
      let _this = this
      this.$nextTick(() => {
        document.addEventListener('click', (e) => {
          if (!_this.$refs.listOpt) return
          if (!_this.$refs.listOptBtn) return
          let moreOpt = _this.$refs.listOpt.contains(e.target)
          let toggleSelect = _this.$refs.listOptBtn.contains(e.target)
          if (!toggleSelect) {
            _this.showPop = false
            document.body.removeAttribute("class", "add_bg");

          } else if (moreOpt) {
            _this.showPop = true
          }
        })
      })
    },
    methods: {
      showOpt () {
        this.showPop = !this.showPop
        this.showPop ? document.getElementsByTagName("body")[0].className = "overflow-hidden" : document.body.removeAttribute("class", "add_bg")
      },
      goAuthor () {
        this.$router.push({name: `Author`, params: {authorId: this.inValue.author_id}})
      },
      goContent () {
        this.$router.push({name: `ArticleDetails`, params: {articleId: this.inValue.article_id}})
      },
      isFollow(){
        this.isUserFollow ? this.userUnFollow() : this.userFollow()
      },
      userFollow () {
        let _this = this
        let data = {authorId: this.inValue.author_id}
        console.log(data)

        coopService.addUserAuthorFollow(data).then(res => {
          console.log(res)
          if (res === 'SUCCESS') _this.$emit('add-follow', _this.inValue.authorId)
        })
      },
      userUnFollow () {
        let _this = this
        let data = {authorId: this.inValue.authorId}
        coopService.addUserAuthorUnFollow(data).then(res => {
          if (res === 'SUCCESS') _this.$emit('un-follow', _this.inValue.authorId)
        })
      }
    },
  }
</script>

<style lang="scss" scoped>

    .item-title-pop {
      position: absolute;
      background-color: white;
      top: 20px;
      right: 5px;
      padding: 5px 15px;
      font-size: 14px;
    }


</style>
