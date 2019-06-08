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
          <input class="border-0 bg-light-grey" v-model="ruleForm.userPass" placeholder="请输入密码"/>
        </div>
        <div class="mb-4 pt-2 pb-2 rounded-pill text-center bg-light-grey font-grey font-14">
          <span>重复新密码</span>&emsp;
          <input class="border-0 bg-light-grey" v-model="ruleForm.userPass" placeholder="请输入密码"/>
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
  import { Dialog } from 'vant';

  /* eslint-disable */
  export default {
    components: {NavTitle},
    data () {
      return {
        showError: false,
        ruleForm: {
          userName: '',
          userPass: ''
        },
      }
    },
    created(){
      Dialog.alert({
        message: '邮件已发送请去邮件中复制验证码'
      }).then(() => { });
    },
    methods: {
      changePassword() {
        let data = {
        }
        coopService.changePassword(data).then(res => {
          console.log(res)
        })
      },
      submitForm () {
        let _this = this
        let ruleForm = this.ruleForm
        let checkList = [
          ['isNoEmpty', '请填写用户名', ruleForm.userName],
          ['maxLength:15', '用户名不得大于15个字符', ruleForm.userName],
          ['minLength:5', '用户名不得小于5个字符', ruleForm.userName],
          ['isNoEmpty', '请填写密码', ruleForm.userPass],
          ['maxLength:15', '密码不得大于15个字符', ruleForm.userPass],
//          ['minLength:5', '密码不得小于5个字符', ruleForm.userPass],
        ]

        let validators = newValidator.newValidator
        if (validators.addValidator(checkList)) return

        coopService.getAccount(ruleForm).then(res => {
          if(!res) return
          let userInfo = res.user
          let token = res.token
          console.log(token)
          _this.$store.commit('SET_USER_INFO', userInfo)
          _this.$store.commit('SET_TOKEN', token)
          _this.$router.replace('/')
          _this.showError = false

        })
      },

      goRegister(){
        this.$router.push({ name: 'Register'})
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
