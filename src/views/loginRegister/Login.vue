<template>
  <div class="content-login">
    <div class="form-group">
      <div class="form-input">
        <span>用户名</span>
        <input v-model="ruleForm.userName" placeholder="请输入用户名"/>
      </div>
      <div class="form-input">
        <span>密码</span>
        <input v-model="ruleForm.userPass" placeholder="请输入密码"/>
      </div>
    </div>
    <div class="button-group d-flex justify-content-around">
      <van-button type="default" @click="submitForm" round class="w-40">登录</van-button>
      <!--<van-button type="primary" @click="resetForm()">忘记密码</van-button>-->
      <van-button type="info" @click="goRegister" round  class="w-40">注册</van-button>
    </div>

  </div>

</template>

<script>
  import coopService from '~modules/coopService'
  import newValidator from '~utils/validator'

  /* eslint-disable */
  export default {
    components: {},
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
      this.$store.commit('SET_USER_INFO', {})
      this.$store.commit('SET_TOKEN', '')
    },
    methods: {
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
  .form-group{
    padding: 20px;
    .form-input{
      margin-bottom: 20px;
      padding: 10px 0;
      border-radius: 30px;
      text-align: center;
      background-color: white;
      color: grey;
      font-size: 14px;
      input{
        outline: none;
        border: none;
      }
    }
  }

  .content-login{
    padding-top: 20px;
  }
  .button-group{
    margin-top: 30px;
  }
  h2 {
    color: #85898f;
    text-align: center;
    margin-bottom: 50px;
  }
</style>
