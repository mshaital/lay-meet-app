/**
 * @description 封装服务端交互 axios
 * @description created by neel @20190415
 * @author neel
 */
/* eslint-disable */

import axios from 'axios'
import { Toast } from 'vant'
import config from '~config/config'
import store from '../../store/index'
import router from '../../router/index'
import Cache from '~utils/cache'

// import querystring from 'querystring'

// axios.defaults.headers.common['Content-Type'] = 'application/json; charset=UTF-8'
// axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'

axios.defaults.baseURL = config.resourceConfig.baseUrl // 服务器地址 baseURL

const showLoading = () => {
  Toast.loading({
    duration: 0,       // 持续展示 toast
    forbidClick: true, // 禁用背景点击
    loadingType: 'spinner',
    message: '请稍后'
  })
}

const hideLoading = () => {
  setTimeout(function() {
    Toast.clear()
  }, 500)
}

const showToast = msg => {
  Toast.loading({
    duration: 2500,       // 持续展示 toast
    forbidClick: true, // 禁用背景点击
    loadingType: 'spinner',
    message: msg
  })
}

let orignAxios = axios.create({
  timeout: 45000,
  headers: {
    // 'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, OPTIONS',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json; charset=UTF-8',
    // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    // 'Content-Type': "application/json",
    // 'accept': 'application/json',
    // 'X-Requested-With': "XMLHttpRequest"
    token: Cache.get('Token') || ''
  }
})

// 加载等待 - 添加等待
orignAxios.interceptors.request.use(config => {
    if (config.hasOwnProperty('axiosShowLoading') && !config.axiosShowLoading) {
      // no loading
    } else {
      showLoading()
    }
    return config
  }, error => {
    hideLoading()
    return Promise.reject(error)
  }
)

// 加载等待 - 移除等待
orignAxios.interceptors.response.use(
  response => {
    hideLoading()
    return response
  },error => {
    hideLoading()
    return error
  }
)

orignAxios.interceptors.response.use(
  response => {
    console.log(response)
    if (response.request.status !== 200) {
      // 当超时或服务异常的情况，应该弹出 error 提示
      showToast('server error')
      return null
    }

    // analysis the response
    if (response.statusText !== 'OK') {
      if (response.data && response.data.msg) {
        showToast(response.data.msg)
      } else {
        // showToast('server error')
        // throw new Error('ERROR:' + response.response.status + ' ' + response.response.statusText)
      }
    }

    // data: {statusCode: 200, message: "SUCCESS", content: {…}}
    // statusCode == 200 -> 成功
    if ('statusCode' in response.data) {
      if (response.data.statusCode === 100) {
        return response.data.content
      }else if (response.data.statusCode === 103) {
        store.commit('SET_USER_INFO', '')
        store.commit('SET_TOKEN', '')
        Toast('请登录')
        router.push('/login')
        return null
      } else {
        showToast(response.data.message)
        return null
      }
    } else {
      showToast('response error')
      throw new Error("ERROR:return Format need 'code'")
    }
  },
  error => {
    hideLoading()

    showToast(error.config.url + '\n' + error.message)
    throw new Error(error.config.url + '\n' + error.message)
  }
)

let axiosCatch = err => {
  hideLoading()
  throw err
}

let localAxios = {
  setHeader (name, value) {
    orignAxios.defaults.headers[name] = value
  },

  get (url, data) {
    url = url+'?'
    if( typeof data === 'object' ){
      for( let item in data){
        url = url + item+ '=' +data[item]+'&'
      }
    }
    this.setHeader('token', Cache.get('Token'))
    return orignAxios.get(url, data).catch(axiosCatch)
  },

  post (url, data = '', config) {
    this.setHeader('token', Cache.get('Token'))

    return orignAxios.post(url, data, config).catch(axiosCatch)
    /* let dataFromat = {
      data: JSON.stringify(data),
      checkflag: true
    }
    // 使用 querystring 以适应原 PICC 服务器交互，否则无法获取数据
    dataFromat = querystring.stringify(dataFromat)
    return orignAxios.post(url, dataFromat).catch(axiosCatch) */
  },

  put (url, data) {
    return orignAxios.put(url, data).catch(axiosCatch)
  },

  delete (url, data) {
    return orignAxios.delete(url, data).catch(axiosCatch)
  }
}

// 执行多个并发请求
/* function getUserAccount () {
  return axios.get('/user/12345')
}
function getUserPermissions () {
  return axios.get('/user/12345/permissions')
}
axios.all([getUserAccount(), getUserPermissions()]).then(axios.spread(function (acct, perms) {
  // 两个请求现在都执行完成
})) */

// http://www.cnblogs.com/lewis-messi/p/9289262.html
/* const getSettings = () => {
  return axios.defaults // 返回 axios 配置对象供外部设置或自定义特殊处理
}

const checkHttp = (res) => {
  if (!res) {
    let errObj = {
      message: '响应数据为空',
      response: null
    }

    throw errObj
  }

  let status = res.status
  if (status === 200) {
    return res.data
  }

  let errObj = {
    message: '请求错误',
    response: res
  }

  throw errObj
}

const checkResult = (res) => {
  let data = checkHttp(res)
  const ua = navigator.userAgent.toLowerCase()
  if (data.retCode === '1000') {
    return data
  }

  if (data.retCode === '2005') {
    if (ua.match(/MicroMessenger/i) === 'micromessenger') {
      window.location = 'http://www.ucaigou.net/weixin/user/auth?autoCreateUserFlag=0&gotoUrl=http://mobile.ucaigou.net'
      return
    } else {
      return
    }
  }

  let errObj = {
    message: data.retMsg || '请求错误',
    response: res
  }

  throw errObj
} */

export default localAxios
