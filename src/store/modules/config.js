/*
 * @Author: 王精华
 * @Date: 2020-09-07 10:05:41
 * @LastEditTime: 2020-09-07 11:33:59
 * @LastEditors: 王精华
 * @Description: 
 */
import store from "vuex";
const userinfo = JSON.parse(window.localStorage.getItem("userinfo"));
const config = {
  state: {
    apiurl: "http://apitest.xiniaogongkao.com/",
    headers: {
      version: "1", // 版本
      userId: userinfo ? userinfo.id : 1,
      platform: "1",
      exitId: "1"
    }
  },
  mutations: {
    SET_CONFIG: (state, value) => {
      state.headers.userId = value;
    }
  }
};
export default config;
