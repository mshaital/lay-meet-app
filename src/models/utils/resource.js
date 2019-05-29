/**
 * 统一Http请求类
 */
import {Message} from 'element-ui'
import Config from '../../config/config'
import Vue from 'vue'
import router from '../../router/index'
import store from '../../store/index.js'

// Vue.http.interceptors.push((request, next) => {
//   // console.log(this)// 此处this为请求所在页面的Vue实例
//   // modify request
//   // request.method = 'POST'// 在请求之前可以进行一些预处理和配置
//   let token = store.state.token
//   if (token) request.headers.set('token', token)
//   // console.log(request)
//   next((response) => {
//     // 在响应之后传给then之前对response进行修改和逻辑判断。对于token时候已过期的判断，就添加在此处，页面中任何一次http请求都会先调用此处方法
//     return response
//   })
// })

let resource = {
  /**
   *解析响应结果
   * @param url
   * @param responseData
   * @param success
   * @param fail
   */
  resolveResponseResult: function (url, responseData, success = function (response) {
  }, fail = function (response) {
    if (response.body.code === 103) {
      Message.error('请登录')
      router.push('/login')
    } else {
      Message.error(response.body.message)
    }
  }) {
    console.log(responseData)
    if (responseData && responseData.status === 200) {
      if (responseData.body.code === Config.resourceConfig.SUCCESS) {
        success(responseData.data)
      } else {
        let errorMsg = responseData.body.message || '当前网络不可用'
        Message.error(errorMsg)
        fail(responseData)
      }
    } else {
      fail(responseData)
    }
  },
  /**
   * 请求拦截
   */
  check (url) {
    let token = store.state.token
    if (!token && url.includes('check')) {
      console.log('check')
      Message.error('此操作需登录')
      router.push('/login')
      event.preventDefault()
      return false
    } else {
      return true
    }
  },
  /**
   * GET请求
   * @param url 请求URL
   * @param success 成功回调
   * @param fail 失败回调
   */
  get (url, success, fail) {
    if (resource.check(url)) {
      return Vue.http.get(url, Config.resourceConfig.httpOptions).then(function (response) {
        resource.resolveResponseResult(url, response, success, fail)
      }, fail)
    }
  },
  /**
   * POST请求
   * @param url 请求URL
   * @param body BODY
   * @param success 成功回调
   * @param fail 失败回调
   */
  post: function (url, body = {}, success, fail) {
    // url += Config.resourceConfig.baseUrl
    if (resource.check(url)) {
      return Vue.http.post(url, body, Config.resourceConfig.httpOptions).then(function (response) {
        resource.resolveResponseResult(url, response, success, fail)
      }, fail)
    }
  }
}

export default resource
