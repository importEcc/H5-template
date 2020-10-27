/*
 * @Author: 王精华
 * @Date: 2020-09-07 09:08:42
 * @LastEditTime: 2020-09-07 11:50:33
 * @LastEditors: 王精华
 * @Description: 
 */
import 'amfe-flexible/index.js'
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import VConsole from 'vconsole'
import './styles/index.less'
import './styles/border.less'
import CustomerService from './common/CustomerService.vue'

Vue.component('CustomerService', CustomerService)
Vue.config.productionTip = false

import { isNeedConsole } from '../config'
import 'vant/lib/index.css' // Vant 样式
// 开启调试器
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

if (isNeedConsole) {
  new VConsole()
}

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
