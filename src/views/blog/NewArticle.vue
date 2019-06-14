<template>
  <div>
    <van-nav-bar title="标题" left-text="" right-text="按钮" left-arrow @click-left="onClickLeft" @click-right="submitForm">
      <van-icon name="cross" slot="left" size="22px"/>
      <van-icon name="envelop-o" slot="right" size="22px"/>
    </van-nav-bar>

    <div class="input-area ">
      <area-input v-model="articleForm.content" min-height="300px" tips="我想说"></area-input>
    </div>

    <div  class="d-flex flex-wrap position-fixed w-100 bottom-40">
      <div v-for="(item, index) in articleForm.imgList" :key="index" class="p-1 w-33" @click="imagePreview(index)">
        <div class="pt-100 w-100 position-relative">
          <van-image class="position-absolute top-0" width="100%" height="100%" fit="cover" :src="examplePicture"/>
        </div>
      </div>
    </div>

    <div class="footer">
      <van-uploader :after-read="onRead" :multiple="true" class="mr-3">
        <van-icon name="photograph" size="18px"/>
      </van-uploader>
      <span class="mr-3">
        <van-switch v-model="articleForm.privacy" size="14px"/>&nbsp;
        <span class="font-14">{{articleForm.privacy?'私密':'公开'}}</span>
      </span>
      <span @click="showCategory=!showCategory" class="font-14">
        {{articleForm.category}}
      </span>&emsp;
      <span class="text-info font-14" @click="goDrafts">草稿</span>
      <span class="float-right font-grey font-14">{{articleForm.content.length}}</span>
    </div>

    <van-popup v-model="showCategory" position="bottom">
      <div class="p-3" v-for="(item, index) in columnsCategory" :key="index">
        <div class="text-center mb-2 " @click="getCategory(item)">{{item}}</div>
      </div>
    </van-popup>
    <!--<div class="created-blog" @click="goDrafts">-->
      <!--<van-icon class="align-middle" name="label-o"/>-->
    <!--</div>-->
  </div>
</template>

<script>
  /* eslint-disable */
  import {Toast, Dialog, ImagePreview} from 'vant';
  import xss from 'xss'
  import AreaInput from '~components/AreaInput'
  import coopService from '~modules/coopService'
  import examplePicture from '~assets/img/banner-5.png'
  import * as qiniu from 'qiniu-js'
  import Util from '~utils/Util'
  import Config from '~config/config'

  export default {
    name: 'editor',
    components: {
      AreaInput
    },
    data () {
      return {
        examplePicture,
        isModify: true,
        index: '',
        showCategory: false,
        columnsCategory: ['技术', '随想', '杂谈', '感悟'],
        tipText: '需要保存至草稿吗？',
        saveOrUpdata: {},
        articleForm: {
          articleTitle: '',
          id: '',
          category: '技术',
          articleDate: new Date(),
          privacy: false,
          content: '',
          account: '',
          imgList: []
        }
      }
    },
    beforeRouteLeave(to, from, next) {
      let _this = this
      if(this.articleForm.content !== ''){
        Dialog.confirm({
          title: '',
          message: _this.tipText
        }).then(() => {
          _this.saveOrUpdata(next)
        }).catch(() => {
          next()
        });
      }else {
        next()
      }
    },
    created () {
      this.saveOrUpdata = this.saveArticleDraft
      this.articleForm.content = ''
      let drafts = this.$store.state.drafts
      if(drafts !== ''){
        this.articleForm = drafts
        this.$store.commit('SET_DRAFTS', '')
        this.tipText = '需要更新至草稿吗？'
        this.saveOrUpdata = this.updataArticleDraft
      }
    },
    methods: {
      imagePreview(index) {
        ImagePreview({
          images: this.articleForm.imgList,
          startPosition: index
        });
      },

      onClickLeft() {
        this.$router.go(-1)
      },
      onRead(file) {
        let _this = this
        for(let i = 0; i < file.length; i++) {
          Util.Util.asyncUploadImg(file[i], 70, 70, .5, res => {
            let imgAddress = Config.resourceConfig.imgBaseUrl + res.hash
            _this.articleForm.imgList.push(imgAddress)
          })
        }

      },
      getCategory(val) {
        this.articleForm.category = val
        this.showCategory = false
      },
      goDrafts(){
        this.$router.push({name: 'Drafts'})
      },
      submitForm () {
        if (!this.articleForm.content) {
          this.Toast('不能发表空的内容')
          return false
        }
        if (this.articleForm.content > 300) {
          this.Toast('写的太多了 不能超过300个字')
          return false
        }
        let _this = this
        this.articleForm.content = xss(this.articleForm.content)
        let data = this.articleForm
        let userInfo = this.$store.state.userInfo
        data.account = userInfo.account
        data.authorId = userInfo.user_id
        coopService.createArticle(data).then(res => {
          if(res !== 'SUCCESS') return
          Toast('发布成功')
          _this.articleForm.content = ''
          _this.$router.push('/')
        })
      },
      saveArticleDraft (next) {
        this.articleForm.content = xss(this.articleForm.content)
        let data = this.articleForm
        let userInfo = this.$store.state.userInfo
        data.account = userInfo.account
        data.authorId = userInfo.user_id
        coopService.createArticleDraft(data).then(res => {
          if(res !== 'SUCCESS') return
          Toast('保存成功')
          next()
        })
      },
      updataArticleDraft (next) {
        this.articleForm.content = xss(this.articleForm.content)
        let data = this.articleForm
        let userInfo = this.$store.state.userInfo
        data.account = userInfo.account
        data.authorId = userInfo.user_id
        console.log(data)
        coopService.updataArticleDraft(data).then(res => {
          if(res !== 'SUCCESS') return
          Toast('保存成功')
          next()
        })
      },

      updateArticle () {
        // 获取已有账号密码
        let _this = this
        let data = {}
        data.articleForm = this.articleForm
        data.articleForm.content = xss(this.articleForm.content)
        data.index = this.index
        coopService.updateArticle(data).then(res => {
          if(res !== 'SUCCESS') return
          Toast('更新成功')
          console.log(res)
          _this.$router.push('/')
        })
      }
    },
    mounted () {
      let _this = this
      _this.isModify = false
      let articleId = _this.$route.params.articleId
      if (articleId) {
        let params = {}
        params.articleId = articleId
        coopService.getArticle(data).then(res => {
          if(!res) return
          _this.articleForm = response.data
        })
      } else {
        this.isModify = true
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/css/currency";

  .input-area {
    padding: 10px;
    overflow-y: scroll;
  }
  .img-list{
    display: flex;
    flex-wrap: wrap;
  }
  .footer{
    width: 100%;
    position: fixed;
    bottom: 0;
    padding: 5px 15px;
    background-color: white;
  }
  .created-blog {
    position: fixed;
    bottom: 80px;
    right: 30px;
    width: 30px;
    height: 30px;
    line-height: 24px;
    padding-top: 2px;
    background-color: #e6e6e6;
    color: $deep-blue;
    text-align: center;
    border-radius: 15px;
  }
</style>
