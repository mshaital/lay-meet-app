<template>
  <div class="content-login">
    <div class="back-button" @click="$router.go(-1)">
      <van-icon name="arrow-left"/>
    </div>
    <div class="form-group">
      <div class="form-input">
        <span>账号</span>&emsp;
        <input v-model="submitForm.userName" placeholder="请输入用户名"/>
      </div>
      <div class="form-input">
        <span>密码</span>&emsp;
        <input v-model="submitForm.userPass" placeholder="请输入密码"/>
      </div>
      <div class="form-input">
        <span>邮箱</span>&emsp;
        <input v-model="submitForm.email" placeholder="请输入邮箱"/>
        <button type="" @click="sendCode" round class="btn-info border-0 rounded">发送验证码</button>
      </div>
      <div class="form-input">
        <span>验证码</span>&emsp;
        <input v-model="submitForm.code" placeholder="请输入邮箱"/>
      </div>
      <!--<div class="form-input">-->
        <!--<span>手机</span>&emsp;-->
        <!--<input v-model="submitForm.cellPhoneNum" placeholder="请输入手机号"/>-->
      <!--</div>-->
      <!--<div class="form-input" @click="showPicker=!showPicker">-->
        <!--<span class="">生日</span>&emsp;-->
        <!--<input v-model="birthday" placeholder="请输入密码" disabled/>-->
      <!--</div>-->
      <div class="form-input">
        <van-radio-group v-model="submitForm.sex" class="d-flex justify-content-around">
          <van-radio name="m">小哥哥</van-radio>
          <van-radio name="f">小姐姐</van-radio>
        </van-radio-group>
      </div>
    </div>
    <div class="button-group d-flex justify-content-around">
      <van-button type="" @click="submit" round :block="true" class="btn-info border-0">注册</van-button>
    </div>
    <van-popup v-model="showPicker" position="bottom">
      <van-datetime-picker
        v-model="submitForm.birthday"
        type="date"
        :min-date="minDate"
      />
    </van-popup>
  </div>

</template>
<script>
  /* eslint-disable */
  import newValidator from '~utils/validator'
  import coopService from '~modules/coopService'
  import { Toast } from 'vant'

  import moment from 'moment'
  moment.locale('zh-cn')

  export default {
    data () {
      return {
        minDate: new Date(),
        maxDate: new Date(2019, 10, 1),
        showPicker: false,
        submitForm: {
          userName: '',
          userPass: '',
          email: '',
          code: '',
          cellPhoneNum: '',
          reUserPass: '',
          birthday: new Date(),
          sex: 'm',
        }
      }
    },
    computed: {
      birthday: function () {
        return moment(this.submitForm.birthday).format('YYYY-MM-DD')
      }
    },
    methods: {
      sendCode() {
        let data = {
          email: this.submitForm.email
        }
        coopService.bindEmail(data).then(res => {
          if (res !== 'SUCCESS') return
          Toast('发送成功')
        })
      },
      submit () {
        // 获取已有账号密码
        let _this = this
        let submitForm = this.submitForm

        let checkList = [
          ['isNoEmpty', '请填写用户名', submitForm.userName],
          ['maxLength:15', '用户名不得大于15个字符', submitForm.userName],
          ['minLength:5', '用户名不得小于5个字符', submitForm.userName],
          ['isNoEmpty', '请填写密码', submitForm.userPass],
          ['maxLength:15', '密码不得大于15个字符', submitForm.userPass],
          ['minLength:5', '密码不得小于5个字符', submitForm.userPass],
          ['isNoEmpty', '请填写邮件地址', submitForm.email],
          ['isEmail', '邮件地址不正确', submitForm.email],
//          ['isNoEmpty', '请填写手机号', submitForm.cellPhoneNum],
//          ['isPhoneNum', '手机号不正确', submitForm.cellPhoneNum]
        ]

        let validators = newValidator.newValidator
        if (validators.addValidator(checkList)) return
        let data = submitForm
        coopService.userRegister(data).then(res => {
          if (res !== 'SUCCESS') return
          Toast('注册成功')
          _this.$router.push('/login')
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .content-login {
    padding-top: 30px;
  }

  .button-group {
    margin-top: 30px;
    padding: 0 20px;
  }

  .form-group {
    padding: 20px;
    .form-input {
      display: flex;

      margin-bottom: 20px;
      padding: 10px 10px 10px 20px;
      border-radius: 30px;
      text-align: center;
      background-color: white;
      color: grey;
      font-size: 14px;
      input {
        outline: none;
        border: none;
      }
    }
  }

  .back-button {
    width: 30px;
    height: 30px;
    margin: 20px;
    border-radius: 15px;
    line-height: 35px;
    text-align: center;
    font-size: 20px;
    color: white;
    background-color: #17a2b8;
  }
</style>
