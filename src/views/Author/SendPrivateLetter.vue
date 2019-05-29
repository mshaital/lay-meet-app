<template>
  <div class="light-grey-bg vh-100">
    <nav-title :title="authorInfo.authorName" rightIcon="weapp-nav" @right-click="userModify"></nav-title>

    <div class="massage-list">
      <div v-for="(item, index) in massageList" :key="index">
        <div :class="item.private_letter.current_uid === userInfo.user_id?'message-box-send':'message-box-receive'">
          <div class="message-box">
            <img :src="item.head_img">
            <div class="message">
              {{item.private_letter.content}}
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="send-private-letter">
      <area-input v-model="content"></area-input>
      <div class="d-flex align-items-center align-middle p-2" @click="savePrivateLetter">
        <van-icon size="20px" color="#888" name="comment" />
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import coopService from '~modules/coopService'
  import NavTitle from '~components/NavTitle'
  import AreaInput from '~components/AreaInput'

  export default {
    name: 'SendPrivateLetter',
    components: {
      NavTitle,
      AreaInput,
    },
    data () {
      return {
        skip: 0,
        authorInfo: this.$route.params.authorInfo,
        userInfo: this.$store.state.userInfo,
        massageList: [],
        content: ''
      }
    },
    methods: {
      userModify () {},
      getList () {
        let _this = this
        let data = {
          skip: _this.skip,
          toUid: this.authorInfo.authorId,
        }
        coopService.getPrivateLetter(data).then(res => {
          if (!res) return
          console.log(res)

          _this.massageList.push(...res)
          _this.skip += 20
        })
      },
      savePrivateLetter () {

//        this.$store.state.token
        console.log(  this.$store.state.token)

        let _this = this
        let data = {
          to_uid: this.authorInfo.authorId,
          current_uid: this.userInfo.user_id,
          content: this.content,
        }
        coopService.savePrivateLetter(data).then(res => {
          console.log(res)
          if (res === 'fail') return
          _this.massageList.push({private_letter:res,head_img:this.userInfo.head_img})
          _this.content = ''

//          console.log( _this.massageList)
        })
      },
    },
    created () {
      this.getList()
    }
  }
</script>
<style lang="scss" scoped>


  .massage-list{
    padding-bottom: 50px;
  }

  .message-box-receive{
    .message-box{
      max-width: 80%;
      padding: 10px;
      display: flex;
      img{
        align-self: flex-end;
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      .message{
        margin-left: 5px;
        padding: 10px;
        background-color: royalblue;
        border-bottom-right-radius: 0.3rem !important;
        border-top-right-radius: 0.3rem !important;
        border-top-left-radius: 0.3rem !important;

      }
    }
  }



  .message-box-send{
    display: flex;
    flex-direction: row-reverse;
    .message-box{
      max-width: 80%;
      padding: 10px;
      display: flex;
      flex-direction: row-reverse;
      img{
        align-self: flex-end;
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      .message{
        margin-right: 5px;
        padding: 10px;
        background-color: #e1a178;
        border-bottom-left-radius: 0.3rem !important;
        border-top-right-radius: 0.3rem !important;
        border-top-left-radius: 0.3rem !important;

      }
    }
  }

  .send-private-letter{
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 7px;
    background-color: white;
  }
</style>
