<template>
  <!-- popup picker start -->
  <van-popup class="fullWidthPopup" v-model="isVisible" position="bottom">
    <div class="popup-content">
      <div class="popup-content-title">
        请选择
        <i @click="isVisible = false" class="fontGray iconfont icon-close"></i>
      </div>
      <ul class="popup-list">
        <li v-for="(item, index) in chooseList" v-bind:key="index" @click="chooseItem(item)">{{item.name}}</li>
      </ul>
    </div>
  </van-popup>
</template>

<script>
  import {Popup} from 'vant'

  export default {
    name: 'PopupChoose',
    components: {Popup},
    props: ['popupVisible', 'chooseList'],
    data () {
      return {
        isVisible: false
      }
    },
    mounted: function () {

    },
    watch: {
      popupVisible () {
        this.isVisible = true
      }
    },
    methods: {
      chooseItem (item) {
        this.isVisible = false
        this.$emit('item', item)
      }
    }

  }
</script>

<style lang="scss" scoped>

  ul, li {
    list-style: none;
  }

  .popup-content {
    position: relative;
    .popup-list {
      overflow: scroll;
      height: 200px;
      li {
        color: grey;
        text-align: center;
        margin: 5px 0;
      }
    }
    .popup-content-title {
      padding: 10px;
      text-align: center;
      i {
        position: absolute;
        right: 5px;
        top: 0;
        bottom: 0;
        margin: auto 0;
      }
    }
  }

</style>
