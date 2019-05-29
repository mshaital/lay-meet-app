/**
 * Created by Administrator on 2018/11/28.
 */
import * as types from './mutation-types.js'

export default {
  nameAsyn ({commit}, {age, name}) {
    commit(types.SET_NAME, name)
    commit(types.SET_AGE, age)
  }
}
