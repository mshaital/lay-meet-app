<template>
  <div class="">
    <nav-title title="找回密码" ></nav-title>

    <div class="p-3 m-3">
      <div class="mt-2">
        <div class="mb-4 pt-2 pb-2 rounded-pill text-center bg-light-grey font-grey font-14">
          <span>验证码</span>&emsp;
          <input class="border-0 bg-light-grey" v-model="ruleForm.code" placeholder="请输入验证码"/>
        </div>
        <div class="mb-4 pt-2 pb-2 rounded-pill text-center bg-light-grey font-grey font-14">
          <span>新密码</span>&emsp;
          <input class="border-0 bg-light-grey" v-model="ruleForm.password" placeholder="请输入密码"/>
        </div>
        <div class="mb-4 pt-2 pb-2 rounded-pill text-center bg-light-grey font-grey font-14">
          <span>重复新密码</span>&emsp;
          <input class="border-0 bg-light-grey" v-model="ruleForm.passwordRepeat" placeholder="请输入密码"/>
        </div>
      </div>
      <div class="mt-3 d-flex justify-content-around">
        <van-button type="" @click="changePassword" round class=" btn-info border-0 w-100">修改密码</van-button>
      </div>
    </div>





  </div>
</template>

<script>
  import coopService from '~modules/coopService'
  import newValidator from '~utils/validator'
  import NavTitle from '~components/NavTitle'
  import { Dialog, Toast } from 'vant';

  /* eslint-disable */
  export default {
    components: {NavTitle},
    data () {
      return {
        showError: false,
        ruleForm: {
          account: this.$route.params.account,
          userName: '',
          password: '',
          passwordRepeat: ''
        },
      }
    },
    created(){
      Dialog.alert({
        message: '邮件已发送请去邮件中复制验证码'
      }).then(() => { });
    },
    methods: {
      changePassword () {
        let _this = this
        let ruleForm = this.ruleForm
        let checkList = [
          ['isNoEmpty', '请填写密码', ruleForm.password],
          ['maxLength:15', '密码不得大于15个字符', ruleForm.password],
          ['isEqual:'+ ruleForm.passwordRepeat, '两次密码输入不同', ruleForm.password],
//          ['minLength:5', '密码不得小于5个字符', ruleForm.userPass],
        ]

        let validators = newValidator.newValidator
        if (validators.addValidator(checkList)) return
        coopService.changePassword(ruleForm).then(res => {
          if(res !== 'SUCCESS') return
          Toast.success('密码更改成功');
          _this.$router.push({ name: 'Login'})
        })
      },
    }
  }
</script>
<style lang="scss" scoped>

</style>
