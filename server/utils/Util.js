/**
 * Created by Administrator on 2018/11/16.
 */
/* eslint-disable */

const models = require('../db')
const express = require('express')
const app = express()
const jwt = require('jwt-simple')
const config = require('./../config/config')

app.set('jwtTokenSecret', config.jwtTokenSecret)
// 存储动态
let Util = {
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
  saveDynamic (userId, msg, articleTitle = '', isPublic = false) {
    let dynamicInfo = {
      time: new Date(),
      msg: msg,
      article_title: articleTitle,
      privacy: isPublic
    }
    models.Login.update({'user_id': userId}, {$push: {'dynamic': dynamicInfo}}, (err, data) => {
      // 保存创建文章动态
      if (err) {
        console.log('创建动态失败')
        console.log(err)
      } else {
        console.log('保存动态成功')
        console.log(data)
      }
    })
  },
  getToken () {
    return (req, res, next) => {
      let token = req.headers.token
      if (!token) return
      try {
        let decoded = jwt.decode(token, app.get('jwtTokenSecret'))
        req.userId = decoded.iss
        next()
      } catch (err) {
        console.log(err)
      }
    }
  },
  failHand (res, err) {
    console.log(err)
    res.status(config.RES_CODE.SUCCESS_CODE).json({message: config.RES_MSE.SUCCESS_MSG, content: config.RES_DATA_MSG.FAIL_MSG, statusCode: config.RES_DATA_CODE.FAIL_CODE})
  },
  missingParamRes (res, ...param) {
    return () => {
      let _this = this
      console.log(param)
      for (let item of param) {
        if (this.isEmpty(item)) {
          _this.failHand(config.RES_MSE.FAIL_MSG_MISSING, config.RES_DATA_MSG.FAIL_MSG, config.RES_DATA_CODE.MISSING_ERROR_CODE, res)
          return
        }
      }
    }
  }
}

module.exports = Util
