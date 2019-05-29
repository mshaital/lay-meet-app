<template>
  <div>
    <keep-alive>
      <component v-bind:is="currentTabComponent"></component>
    </keep-alive>
    <nav-bar @change-components="changeComponents"></nav-bar>
  </div>
</template>
<script>
  /* eslint-disable */
  import NavBar from '~components/NavBar'
  import HomePage from '~views/public/HomePage'
  import ArticleDiscover from '~views/blog/ArticleDiscover'
  import Message from '~views/message/Message'

  export default {
    components: {
      NavBar,
      HomePage,
      ArticleDiscover,
    },
    data () {
      return {
        currentTabComponent: {},
        tabComponent: [HomePage,ArticleDiscover,Message]

      }
    },
    created () {
      this.currentTabComponent = this.tabComponent[this.$store.state.indexTab]
    },
    computed: {},
    methods: {
      changeComponents(e){
        this.currentTabComponent = this.tabComponent[e]
      }
    }
  }
</script>
<style>

</style>
