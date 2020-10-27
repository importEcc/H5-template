/*
 * @Author: 王精华
 * @Date: 2020-09-07 09:08:42
 * @LastEditTime: 2020-09-07 10:06:09
 * @LastEditors: 王精华
 * @Description: 
 */
import Vue from 'vue'
import Vuex from 'vuex'
import config from './modules/config'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  modules: {
    config
  }
})
