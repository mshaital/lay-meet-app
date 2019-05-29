/**
 * Created by Administrator on 2018/11/28.
 */
import Cache from '~utils/cache'
/* eslint-disable */
const state = {
  userInfo: Cache.get('userInfo'),
  token: Cache.get('Token'),
  name: 'weish',
  age: 22,
  indexTab: 0,
  messageTab: 0,
  drafts: '',
}

export default state
