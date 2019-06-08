<template>
  <div class="p-3">
    <div class="p-4 mr-4 ml-4">
      <img class="img-fluid" src="../../assets/img/logo.png">
    </div>
    <div class="">
      <div class="mb-4 pt-2 pb-2 rounded-pill text-center bg-white font-grey font-14">
        <span>用户名</span>&emsp;
        <input class="border-0" v-model="ruleForm.userName" placeholder="请输入用户名"/>
      </div>
      <div class="mb-4 pt-2 pb-2 rounded-pill text-center bg-white font-grey font-14">
        <span>密码</span>&emsp;
        <input class="border-0" v-model="ruleForm.userPass" placeholder="请输入密码"/>
      </div>
      <div class="text-info text-right font-14" @click="goChangePassword()">找回密码 </div>
    </div>
    <div class="button-group d-flex justify-content-around">
      <van-button type="default" @click="submitForm" round class="w-40">登录</van-button>
      <!--<van-button type="primary" @click="resetForm()" round>忘记密码</van-button>-->
      <van-button type="" @click="goRegister" round  class="w-40 btn-info border-0">注册</van-button>
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
      goChangePassword() {
        this.$router.push({name: `CheckEmail`})
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

  .button-group{
    margin-top: 30px;
  }
  h2 {
    color: #85898f;
    text-align: center;
    margin-bottom: 50px;
  }
</style>
