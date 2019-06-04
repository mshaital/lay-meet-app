/**
 * 封装工具类
 * @type {{...}}
 */
'use strict'
/* eslint-disable */
import coopService from '~modules/coopService'
import store from '../../store/index'
import {Toast} from 'vant';
import * as qiniu from 'qiniu-js'

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
      if (res === 'SUCCESS') _this.$emit('add-follow', _this.inValue.authorId)
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
    function dataURLtoBlob (dataurl) {
      let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], {type: mime});
    }

    return dataURLtoBlob(img64)
  },
  onUpload (file) {
    let _this = this
    let image = new Image()
    image.src = URL.createObjectURL(file.file)
    image.onload = () => {
      let imgblob = _this.dealImage(image, 70, 70, 0.5)
      // 发送请求
      coopService.getImgUploadToken({}).then(res => {
        console.log(res)
        console.log(imgblob)
        _this.uploadImg(res, imgblob)
      })

    }
  },
  uploadImg(token, file) {
    const key = file.name  // 上传后文件资源名以设置的 key 为主，如果 key 为 null 或者 undefined，则文件资源名会以 hash 值作为资源名。
    let config = {
      useCdnDomain: true,   //表示是否使用 cdn 加速域名，为布尔值，true 表示使用，默认为 false。
      region: qiniu.region.z0     // 根据具体提示修改上传地区,当为 null 或 undefined 时，自动分析上传域名区域
    };

    let putExtra = {
      fname: "",  //文件原文件名
      params: {}, //用来放置自定义变量
      mimeType: null  //用来限制上传文件类型，为 null 时表示不对文件类型限制；限制类型放到数组里： ["image/png", "image/jpeg", "image/gif"]
    };
    let observable = qiniu.upload(file, key, token, putExtra, config);
    observable.subscribe({
      next: (res) => {
        let total = res.total;
        console.log(res)
        console.log("进度：" + parseInt(total.percent) + "% ")
      },
      error: (err) => {
        console.log(err)
      },
      complete: (res) => {
        console.log(res.hash)
        // coopService.upload(params).then(res => {
        //   if (res !== 'SUCCESS') return
        //   let userInfo = store.state.userInfo
        //   userInfo.head_img = img64
        //   store.commit('SET_USER_INFO', userInfo)
        //   Toast('上传成功')
        //   return img64
        // })
      }
    })
  },

}

export default {Util}
