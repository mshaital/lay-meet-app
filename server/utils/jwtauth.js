/**
 * token验证中间件
 * Created by dell on 2018/1/23.
 */
'use strict'
const express = require('express')
const app = express()
const jwt = require('jwt-simple')
const config = require('./../config/config')

app.set('jwtTokenSecret', config.jwtTokenSecret)

module.exports = function (req, res, next) {
  let token = (req.headers.token)
  if (!token) {
    res.status(200).json({massage: '用户未持有有效凭证请登录', data: '', statusCode: 103})
    return
  }
  try {
    let decoded = jwt.decode(token, app.get('jwtTokenSecret'))
    if (decoded.exp <= Date.now()) {
      res.status(200).json({massage: '用户登录凭证已过期请重新登录', data: '', statusCode: 103})
      return
    }
    req.userId = decoded.iss
    next()
  } catch (err) {
    console.log(err)
    res.status(200).json({massage: '解析凭证发生错误请重新登录', data: err, statusCode: 103})
  }
}
