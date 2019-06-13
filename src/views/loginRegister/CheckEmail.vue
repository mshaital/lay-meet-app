<template>
  <div class="">
    <nav-title title="找回密码" ></nav-title>

    <div class="p-3 m-3">
      <div class="mt-2">
        <div class="mb-4 pt-2 pb-2 rounded-pill text-center bg-light-grey font-grey font-14">
          <span>账号</span>&emsp;
          <input class="border-0 bg-light-grey" v-model="ruleForm.account" placeholder="请输入账号"/>
        </div>
        <div class="mb-4 pt-2 pb-2 rounded-pill text-center bg-light-grey font-grey font-14">
          <span>邮箱</span>&emsp;
          <input class="border-0 bg-light-grey" v-model="ruleForm.email" placeholder="请输入邮箱"/>
        </div>
      </div>
      <div class="mt-3 d-flex justify-content-around">
        <van-button type="" @click="checkEmail" round class=" btn-info border-0 w-100">确定</van-button>
      </div>
    </div>

  </div>
</template>

<script>
  import coopService from '~modules/coopService'
  import newValidator from '~utils/validator'
  import NavTitle from '~components/NavTitle'


  /* eslint-disable */
  export default {
    components: {NavTitle},
    data () {
      return {
        showError: false,
        ruleForm: {
          account: '',
          email: ''
        },
      }
    },
    created(){

    },
    methods: {
      checkEmail() {
        let _this = this
        let ruleForm = this.ruleForm
        let checkList = [
          ['isNoEmpty', '请填写用户名', ruleForm.account],
          ['maxLength:15', '用户名不得大于15个字符', ruleForm.account],
          ['minLength:5', '用户名不得小于5个字符', ruleForm.account],
//          ['isNoEmpty', '请填写邮件地址', ruleForm.email],
//          ['isEmail', '邮件地址不正确', ruleForm.email],
        ]

        let validators = newValidator.newValidator
        if (validators.addValidator(checkList)) return
        let data = ruleForm
        coopService.checkEmail(data).then(res => {
          if (res !== 'SUCCESS') return
          _this.$router.push({ name: 'ChangePassword', params: {account: ruleForm.account}})

        })
      },

    }
  }
</script>
<style lang="scss" scoped>

</style>
