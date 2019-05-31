<template>
  <div class="content bg-light-grey">
    <van-nav-bar title="投诉建议" left-text="" left-arrow
                 right-text="保存"
                 @click-left="onClickLeft"
                 @click-right="submitForm">
    </van-nav-bar>
    <div class="p-2 white-bg">
      <area-input  v-model="problemForm.content" min-height="300px" tips="我想说"></area-input>
    </div>

    <van-radio-group v-model="problemForm.classIfication" class="d-flex justify-content-center mt-2">
        <van-radio name="1" class="mr-5">投诉</van-radio>
        <van-radio name="2">建议</van-radio>
      </van-radio-group>
  </div>

</template>

<script>
  /* eslint-disable */
  import coopService from '~modules/coopService'
  import Cache from '~utils/cache'
  import AreaInput from '~components/AreaInput'
  import {Toast} from 'vant';

  import xss from 'xss'

  export default {
    name: 'editor',
    components: {
      AreaInput,
    },
    data () {
      return {
        editorContent: '',
        index: '',
        chooseList: [],
        problemForm: {
          classIfication: '1',
          date: new Date(),
          content: ''
        }
      }
    },
    methods: {
      onClickLeft () {

      },
      submitForm (formName) {
         // 获取已有账号密码
        let _this = this
        if (!this.problemForm.content) {
          Toast('请填写内容')
          return false
        }

        let params = {}
        params.classIfication = this.problemForm.classIfication
        params.date = this.problemForm.date
        params.content = xss(this.problemForm.content)
        params.account = Cache.get('userInfo').account
        params.id = Cache.get('userInfo').user_id
        // console.log(params)
        coopService.saveComplaintSuggestion(params).then(res => {
          if(res !== 'SUCCESS') return
          Toast('提交成功')
          _this.$router.push('/user')
        })

      }
    }
  }
</script>
<style lang="scss" scoped>
  .content{
    height: 100vh;
  }
</style>
