<template>
  <div class="content bg-light-grey">
    <nav-title title="个人资料" rightText="保存" @right-click="userModify"></nav-title>
    <div class="mt-5">
      <div class="head-img mx-auto d-block">
        <img :src="userInfo.head_img">
        <van-uploader class="upload-img" :after-read="onRead">
          <van-icon name="photograph" color="#1989fa"/>
        </van-uploader>
      </div>
    </div>
    <div class="bg-white p-3 font-14 border-bottom">
      <span class="mr-5">账号</span>
      <span>{{userInfo.account}}</span>
    </div>
    <div class="bg-white p-3 font-14 border-bottom">
      <span class="mr-5">昵称</span>
      <input v-model="userInfo.nick"/>
    </div>
    <div class="bg-white p-3 font-14 border-bottom d-flex">
      <span class="mr-4">性别</span>
      <van-radio-group v-model="userInfo.sex" class="d-flex">
        <van-radio name="m" class="mr-4"  checked-color="#07c160">先生</van-radio>
        <van-radio name="f"  checked-color="#07c160">小姐</van-radio>
      </van-radio-group>
    </div>

    <div class="bg-white p-3 mt-3 font-14 border-bottom">
      <div class="mr-5">个人介绍</div>
      <textarea v-model="userInfo.declaration"></textarea>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import NavTitle from '~components/NavTitle'
  import newValidator from '~utils/validator'
  import Util from '~utils/Util'
  import coopService from '~modules/coopService'
  import { Toast } from 'vant'
  import * as qiniu from 'qiniu-js'

  export default {
    components: {
      NavTitle,
    },
    data () {
      return {
        userInfo: this.$store.state.userInfo,
      }
    },
    methods: {
      uploadImg(token, file) {
        const key = file.name  // 上传后文件资源名以设置的 key 为主，如果 key 为 null 或者 undefined，则文件资源名会以 hash 值作为资源名。
        let config = {
          useCdnDomain: true,   //表示是否使用 cdn 加速域名，为布尔值，true 表示使用，默认为 false。
          region: qiniu.region.z0     // 根据具体提示修改上传地区,当为 null 或 undefined 时，自动分析上传域名区域
        };

        let putExtra = {
          fname: "",  //文件原文件名
          params: {}, //用来放置自定义变量
          mimeType: null  //用来限制上传文件类型，为 null 时表示不对文件类型限制；限制类型放到数组里： ["image/png", "image/jpeg", "image/gif"]
        };
        let observable = qiniu.upload(file, key, token, putExtra, config);
        observable.subscribe({
          next: (res) => {
            let total = res.total;
             console.log(res)
             console.log("进度：" + parseInt(total.percent) + "% ")
          },
          error: (err) => {
            console.log(err)
          },
          complete: (res) => {
            console.log(res.hash)
          }
        })
      },
      onRead (file) {
        this.userInfo.head_img = Util.Util.onUpload(file)
        let params = {}
        let _this = this
//        coopService.getToken(params).then(res => {
//         console.log(res)
//          _this.uploadImg(res,file.file)
//        })
      },

      userModify () {
        let _this = this
        let params = {
          user_id:this.userInfo.user_id,
          nick:this.userInfo.nick,
          sex:this.userInfo.sex,
          declaration:this.userInfo.declaration,
        }

        let checkList = [
          ['maxLength:15', '用户名不得大于15个字符', params.nick],
          ['maxLength:150', '介绍不得大于150个字符', params.declaration],
        ]

        let validators = newValidator.newValidator
        if (validators.addValidator(checkList)) return
        coopService.userInfoModify(params).then(res => {
          if (res !== 'SUCCESS') return
          Toast('更新成功')
          _this.$store.commit('SET_USER_INFO', _this.userInfo)
          _this.$router.push('/User')
        })
      }
    },
    // 调用
    mounted () {
    }
  }
</script>
<style lang="scss" scoped>

  @import "../../assets/css/currency";
  input{
    border: none;
    outline: none;
  }
  textarea{
    width: 100%;
    border: none;
    outline: none;
    resize: none;
  }
  .content{
    height: 100vh;
  }
  .head-img{
    width: 70px;
    height: 110px;
    position: relative;
    .upload-img{
      position: absolute;
      bottom: 10px;
      right: 5px;
    }
    img{
      margin: 20px 0;
      width: 100%;
      border-radius: 35px;

    }
  }
</style>
