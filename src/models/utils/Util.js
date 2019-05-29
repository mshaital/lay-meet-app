/**
 * 封装工具类
 * @type {{...}}
 */
'use strict'
/* eslint-disable */
import coopService from '~modules/coopService'
import store from '../../store/index'
import { Toast } from 'vant';

const Util = {
  /**
   * 判断对象或 string 是否为空
   * @param param
   * @returns {boolean}
   */
  isEmpty (param) {
    if (typeof param !== 'string') {
      param = JSON.stringify(param)
    }
    const emptyList = [undefined, null, '', '[]', '{}', 'null']
    return emptyList.indexOf(param) !== -1
  },

  /**
   * 添加关注用户
   * @param param
   * @returns {boolean}
   */
  addUserFollow (authorId) {
    let _this = this
    let data = {authorId: authorId}
    coopService.addUserAuthorFollow(data).then(res => {
      console.log(res)
      if(res === 'SUCCESS') _this.$emit('add-follow', _this.inValue.authorId)
    })
  },
  /**
   * 压缩图片
   * @description  * img    原始图片
   * @description width   压缩后的宽度
   * @description height  压缩后的高度
   * @description ratio   压缩比率
   * @returns {String}
   */
  dealImage (img, width, height, ratio) {
    let canvas, ctx, img64
    canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0, width, height)
    img64 = canvas.toDataURL('img/jpeg', ratio)
    return img64
  },
  onUpload (file) {
    let _this = this
    let image = new Image()
    image.src = URL.createObjectURL(file.file)
    // image.src = file
    image.onload = function (e) {
      let img64 = _this.dealImage(image, 70, 70, 0.1)
      // 发送请求
      let params = {userHeadImg: img64}
      console.log(params)
      coopService.userModifyHeadImg(params).then(res => {
        if (res !== 'SUCCESS') return
        let userInfo = store.state.userInfo
        userInfo.head_img = img64
        store.commit('SET_USER_INFO', userInfo)
        Toast('上传成功')
        return img64
      })
    }
  },


}

export default { Util }
