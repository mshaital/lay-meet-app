
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import App from './App'
import store from './store/index.js'
import router from './router'
import moment from 'moment'

import Vant from 'vant'
import 'vant/lib/index.css'

moment.locale('zh-cn')

Vue.use(Vant)
Vue.config.productionTip = false


Vue.filter('dateChange', value => {
  return moment(value).format('YYYY-MM-DD')
})
/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
  // to即将进入的目标路由对象，from当前 导航正要离开的路由， next  :  下一步执行的函数钩子
  if (to.meta.requiresAuth && !store.state.token) {
    next({path: '/Login'})
  } else {
    next()
  }
  // 如果不需要登录验证，或者已经登录成功，则直接放行
})
Vue.filter('stringCut', value => {
  value = value.substring(0, 10)
  return value
})
Vue.filter('dateChange', value => {
  return moment(value).format('YYYY-MM-DD')
})
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App},
  render: h => h(App)
}).$mount('#app')

