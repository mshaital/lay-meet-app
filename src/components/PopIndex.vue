<template>
  <van-popup v-model="showPop" position="left">
    <div class="bg-light pop-home">
      <div class="pop-home-head">
        <router-link to="/User" size="mini">
          <img class="rounded-circle border mx-auto d-block" :src="userInfo.head_img" alt="240">
        </router-link>
        <div class="font-white pl-3 pt-4 font-weight-bold">{{userInfo.nick || userInfo.account}}</div>
      </div>
      <div class="font-14">
        <div class="p-3" @click="goView(0)">
          <van-icon name="user-o" size="20px" class="mr-4 align-middle"/>
          <span class="align-middle">个人主页</span>
        </div>
        <div class="p-3" @click="goView(1)">
          <van-icon name="like-o" size="20px" class="mr-4 align-middle"/>
          <span class="align-middle">我的赞</span>
        </div>
        <div class="p-3" @click="goView(2)">
          <van-icon name="fire-o" size="20px" class="mr-4 align-middle"/>
          <span class="align-middle">我的动态</span>
        </div>
        <div class="p-3 border-bottom" @click="goView(3)" >
          <van-icon name="setting-o" size="20px" class="mr-4 align-middle"/>
          <span class="align-middle">设置</span>
        </div>
        <div class="p-3" @click="goView(4)">
          <van-icon name="description" size="20px" class="mr-4 align-middle"/>
          <span class="align-middle">草稿箱</span>
        </div>
        <div class="p-3 border-bottom" @click="goView(5)">
          <van-icon name="underway-o" size="20px" class="mr-4 align-middle"/>
          <span class="align-middle">浏览记录</span>
        </div>
        <div class="p-3" @click="goView(6)">
          <van-icon name="service" size="20px" class="mr-4 align-middle"/>
          <span class="align-middle">投诉建议</span>
        </div>

      </div>
    </div>
  </van-popup>
</template>

<script>
  /* eslint-disable */
  import {Popup} from 'vant';

  export default {
    components: {
    },
    name: 'NavIndex',
    data () {
      return {
        showPop: this.value,
        userInfo: this.$store.state.userInfo,
      }
    },
    props: ['value'],
    methods: {
      goView (index) {
        let stateList = [
          {
            state: 'User',
            params: '',
          },
          {
            state: 'BookMarks',
            params: {bookmarks: []},
          },
          {
            state: 'Dynamic',
            params: [],
          },
          {
            state: 'BaseSetting',
            params: '',
          },
          {
            state: 'Drafts',
            params: '',
          },
          {
            state: 'BrowseRecord',
            params: '',
          },
          {
            state: 'Problem',
            params: '',
          },
        ]
        this.$router.push({name: stateList[index].state, params: stateList[index].params})
      },
    },
    watch:{
      value(val){
        this.showPop = val
        this.$emit('input',val);//传值给父组件, 让父组件监听到这个变化
      }
    },
  }
</script>

<style lang="scss" scoped>

  .pop-home {
    width: 18rem;
    height: 100vh;
    .pop-home-head {
      height: 200px;
      padding-top: 70px;
      background-image: url(../assets/img/banner-index.jpg);
      img {
        width: 60px;
        height: 60px;
      }
    }
  }

</style>
