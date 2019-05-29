<template>
  <div class="edit-div"
       v-text="innerText"
       :contenteditable="canEdit"
       :style="{ minHeight: minHeight }"
       :placeholder="tips"
       @focus="isLocked = true"
       @blur="isLocked = false"
       @input="changeText">
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    name: 'AreaInput',
    props: {
      value: {
        type: String,
        default: ''
      },
      canEdit: {
        type: Boolean,
        default: true
      },
      minHeight: {
        type: String,
        default: '20px'
      },
      tips: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        innerText: this.value,
        isLocked: false
      }
    },
    watch: {
//      'value' () {
//        if (!this.isLocked || !this.innerText) {
//          this.innerText = this.value
//        }
//      }
    },
    methods: {
      changeText () {
        this.$emit('input', this.$el.innerText)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .edit-div {
    width: 100%;
    overflow: auto;
    word-break: break-all;
    outline: none;
    user-select: text;
    white-space: pre-wrap;
    text-align: left;
    &[contenteditable=true]{
      user-modify: read-write-plaintext-only;
      outline: none;
      &:empty:before {
        content: attr(placeholder);
        display: block;
        color: #ccc;
      }
    }
  }
</style>
