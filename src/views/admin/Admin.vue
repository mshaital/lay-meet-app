<template>
  <el-container>
    <el-main>
      <div v-for="item,index in problemList" :key="index">
        <span>{{item.account}}</span>
        <span>{{item.classIfication}}</span>
        <span>{{item.date}}</span>
        <p>{{item.content}}</p>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  import Resource from '../../models/utils/resource.js'

  // vue use vueResource for http request.
  export default {
    components: {},
    data () {
      return {
        userInfo: this.$store.state.userInfo,
        problemList: []
      }
    },
    created () {
      this.getUserProblem()
    },
    methods: {
      getUserProblem () {
        let _this = this
        Resource.get('/api/admin/check/userProblem', function (response) {
          _this.problemList = response.data
        })
      }
    },
    // 调用
    mounted () {
      console.log(this.userInfo)
    }
  }
</script>
<style scoped>
  .user-container {
    max-width: 1140px;
    margin: 0 auto;
    padding: 0 10px;
  }

  /* 右侧边栏 */
  .aside .description, .aside .new-collection-block {
    position: relative;
    margin-bottom: 16px;
    padding: 0 0 16px;
    text-align: left;
    font-size: 0;
    border-bottom: 1px solid #f0f0f0;
    clear: both;
    word-break: break-word !important;
  }

  .aside .user-dynamic {
    padding-bottom: 6px;
  }

  .aside .list {
    margin-bottom: 16px;
    padding-bottom: 16px;
    list-style: none;
    border-bottom: 1px solid #f0f0f0;
    clear: both;
  }

  ul {
    padding-left: 0;
  }

  .aside .list li {
    margin-bottom: 10px;
  }

  li {
    line-height: 20px;
  }

  .aside .user-dynamic a {
    font-size: 14px;
    color: #333;
    line-height: 30px;
  }

  .aside .title {
    float: left;
    margin-bottom: 10px;
    font-size: 14px;
    color: #969696;
  }

  .aside .description, .aside .new-collection-block {
    position: relative;
    margin-bottom: 16px;
    padding: 0 0 16px;
    text-align: left;
    font-size: 0;
    border-bottom: 1px solid #f0f0f0;
    clear: both;
    word-break: break-word !important;
    word-break: break-all;
  }

  .aside .description a, .aside .new-collection-block a {
    margin-right: 5px;
  }

  .aside .new-collection-btn {
    font-size: 13px;
    color: #42c02e;
  }

  .card-declaration {
    height: 200px;
  }

  .card-declaration .el-card__header {
    padding: 10px 20px;
  }

  /* tab标签 文章列表 */

</style>
