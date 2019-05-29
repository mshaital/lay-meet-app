<template>
  <div>
    <div class="search">
      <input class="search-input" v-model="searchValue" v-on:input="searchItem"  placeholder="想要查找的文章"/>
    </div>
  </div>
</template>

<script>
  import coopService from '~modules/coopService'

  export default {
    name: 'editor',
    components: {

    },
    data () {
      return {
        searchValue: '',
        dataLists: [],
        activeName: 'first'
      }
    },
    methods: {
      searchItem () {
        let data = {
          searchValue: this.searchValue
        }
        coopService.searchArticleByTitle(data).then(res => {
          console.log(res)
          this.dataLists = res
        })
      }
    },
    filters: {
      aquareConCut: function (value) {
        if (value.length > 120) {
          value = value.substring(0, 120) + '...'
        }
        value = value.replace(/<\/?[^>]*>/g, '') // 去除HTML tag
        value = value.replace(/[ | ]*\n/g, '\n') // 去除行尾空白
        // str = str.replace(/\n[\s| | ]*\r/g,'\n') // 去除多余空行
        value = value.replace(/ /ig, '')// 去掉
        return value
      }
    },
    created () {}
  }
</script>
<style lang="scss" scoped>
 .search{
   text-align: center;
   .search-input{
     width: 90%;
     margin: 10px 0;
     padding: 0 5px;
     outline: none;
     border: grey solid 1px;
     border-radius: 20px;
   }
 }
</style>
