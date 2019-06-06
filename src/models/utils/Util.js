/**
 * 封装工具类
 * @type {{...}}
 */
'use strict'
/* eslint-disable */
import coopService from '~modules/coopService'
import store from '@/store/index'
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
   * @description   压缩图片
   * @param  * img    原始图片
   * @param width   压缩后的宽度
   * @param height  压缩后的高度
   * @param ratio   压缩比率
   * @returns {String}
   */
  dealImage (img, width, height, ratio) {
    return new Promise(function (resolve, reject) {
      let canvas, ctx
      canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, width, height)
      // img64 = canvas.toDataURL('img/jpeg', ratio)
      canvas.toBlob(blob => resolve(blob), "image/jpeg", ratio)
    });

  },
  getImgUploadToken () {
    return new Promise(function (resolve, reject) {
      coopService.getImgUploadToken({}).then(res => {
        if (!res) return
        resolve(res);
      })
    });
  },
  newImage (file) {
    return new Promise(function (resolve, reject) {
      let image = new Image()
      image.src = URL.createObjectURL(file.file)
      image.onload = () => {
        resolve(image);
      }
    });
  },
  asyncUploadImg: async function (file, w, h, ratio, callBack) {
    let _this = this
    const image = await _this.newImage(file);
    const imgBlob = await _this.dealImage(image, w, h, ratio);
    const token = await _this.getImgUploadToken();
    _this.qiniuUploadImg(token, imgBlob, callBack)
  },
  qiniuUploadImg(token, file, callBack) {
    // console.log(token)
    // console.log(file)

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
        callBack(res)
      }
    })
  },
  // 创建收藏
  createBookmarks (params, callBack) {
    let _this = this
    coopService .createBookmarks(params).then(res => {
      if (res !== 'SUCCESS') return
      // 更新Storage中的bookmark
      let bookMark = store.state.userInfo.bookmarks
      let bookmarkItem = {
        article_id: params.articleId,
        author_id: params.authorId,
        create_date: new Date(),
      }
      bookMark.push(bookmarkItem)
      store.commit('SET_USER_INFO', _this.userInfo)
      callBack()
    })
  },
  deleteBookmarks (params, callBack) {
    let _this = this
    coopService.deleteBookmarks(params).then(res => {
      if (res !== 'SUCCESS') return
      // 更新Storage中的bookmark
      let bookMark = store.state.userInfo.bookmarks
      bookMark.splice(bookMark.indexOf(params.articleId), 1)
      store.state.userInfo.bookmarks = bookMark.map((item, index) => {
        if (item.articleId === params.articleId) bookMark.splice(index,1);
      })
      store.commit('SET_USER_INFO', _this.userInfo)
      callBack()
    })
  },
}

export default {Util}
