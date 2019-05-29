/**
 * Created by Administrator on 2018/11/28.
 */
/* eslint-disable */
import * as types from './mutation-types.js'
import Cache from '../models/utils/cache'

export default {
  [types.SET_NAME] (state, name) {
    state.name = name
  },
  [types.SET_AGE] (state, age) {
    state.age = age
  },
  [types.INIT_INFO] (state, age) {
    state.userInfo = Cache.get('userInfo')
    state.token = Cache.get('Token')
  },
  [types.SET_USER_INFO] (state, userInfo) {
    if (Object.prototype.toString.call(userInfo) === '[object Object]') {
      state.userInfo = userInfo
      Cache.set('userInfo', userInfo)
    }
  },
  [types.UPDATA_USER_INFO] (state, key, val) {
    console.log(key)
    console.log(val)
    state.userInfo[key] = val
    Cache.set('userInfo', state.userInfo)
  },
  [types.SET_TOKEN] (state, token) {
    if (typeof token === 'string') {
      state.token = token
      Cache.set('Token', token)
    }
  },
  [types.SET_INDEX_TAB] (state, indexTab) {
    state.indexTab = indexTab
  },
  [types.SET_MESSAGE_TAB] (state, messageTab) {
    state.messageTab = messageTab
  },
  [types.SET_DRAFTS] (state, drafts) {
    state.drafts = drafts
  },
}
