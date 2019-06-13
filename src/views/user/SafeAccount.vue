<template>
  <div class="content bg-light-grey">
    <nav-title title="账户安全"></nav-title>

    <div class="bg-white p-2 font-14 border-bottom mt-2">
      <span class="mr-5">昵称</span>
      <span class="float-right font-grey">
        {{userInfo.account || userInfo.nick}}
      </span>
    </div>
    <div class="bg-white p-2 font-14 border-bottom">
      <span class="mr-5">邮箱</span>
      <span class="float-right font-grey">
        {{userInfo.email}}
      </span>
    </div>
    <div class="bg-white p-2 font-14 border-bottom">
      <span class="mr-5">手机</span>
      <span class="float-right font-grey">
        {{userInfo.cell_phone_num || '未绑定'}}
      </span>
    </div>
    <div class="bg-white p-2 font-14 border-bottom mt-2" @click="changePass">
      <span class="mr-5">修改密码</span>
      <span class="float-right font-grey">
        <van-icon name="arrow" size="18px"/>
      </span>
    </div>
    <div class="bg-white p-2 font-14 border-bottom">
      <span class="">最近登录记录</span>
      <span class="float-right font-grey">
        <van-icon name="arrow" size="18px"/>
      </span>
    </div>
    <div class="bg-white p-2 font-14 border-bottom">
      <span class="mr-5">证件信息</span>
      <span class="float-right font-grey">
        {{userInfo.ID_card || '未绑定'}}
      </span>
    </div>
    <div class="bg-white p-2 font-14 border-bottom mt-2" @click="exitLogin">
      <span class="mr-5">退出登录</span>
      <span class="float-right font-grey">
        <van-icon name="arrow" size="18px"/>
      </span>
    </div>

  </div>
</template>

<script>
  /* eslint-disable */
  import NavTitle from '~components/NavTitle'
  import Config from '~config/config'
  import Util from '~utils/Util'
  import coopService from '~modules/coopService'
  import {Toast, Dialog} from 'vant'
  import HeadImg from '~assets/img/head.png'


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
      changePass() {
        this.$router.push({name: 'CheckEmail'})
      },
      exitLogin() {
        let _this = this
        Dialog.confirm({
          title: '',
          message: '确定退出登录？'
        }).then(() => {
          // on confirm
          _this.$router.replace({name: 'Login'})
        }).catch(() => {
          // on cancel
        });
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/css/currency";

  .content {
    height: 100vh;
  }

</style>
