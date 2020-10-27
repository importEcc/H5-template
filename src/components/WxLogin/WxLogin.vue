<!--
 * @Author: 王精华
 * @Date: 2020-09-07 15:27:28
 * @LastEditTime: 2020-09-07 15:47:18
 * @LastEditors: 王精华
 * @Description: 
-->
<template>
  <div class="wx-login"></div>
</template>
<script>
import { wxLogin, wx_login } from '../../api/index.js'
export default {
  name: 'wx-login',
  data () {
    return {
      invitation_code: '',
      openId: ''
    }
  },
  created () {
    var invitation_code = this.$route.query.invitation_code ? this.$route.query.invitation_code : null;
    this.invitation_code = invitation_code;
    this.islogined()
  },
  methods: {
    islogined () {
      var courseId = this.$route.query.courseId;
      var is_weixin = (function () {
        return navigator.userAgent.toLowerCase().indexOf("micromessenger") !== -1;
      })();
      localStorage.setItem("browser", is_weixin ? "wx" : "llq");
      var browser = localStorage.getItem("browser");
      // 微信浏览器
      if (browser == "wx") {
        var userinfo = localStorage.getItem("userinfo");
        let code = this.$route.query.code;
        var userinfo = localStorage.getItem("userinfo");
        var userinfo = JSON.parse(userinfo);
        if (userinfo) {
          console.log("用户已经登录了不用下一步操作了");
        } else {
          if (code) {
            that.userlogin();
          } else {
            that.getCodeApi();
          }
        }
        localStorage.setItem("browser", "wx");
      }
      //普通浏览器
      else {
      }
    },
    userlogin () {
      var that = this;
      var xntoken = that.$md5("appv1/oauthxN411");
      const code = this.$route.query.code;
      const data = {
        code: code
      }
      wxLogin(data).then(res => {
        if (res.data.code != '100') {
          Toast("登录出错，请联系客服");
          return;
        }
        var userinfo = JSON.stringify(res.data.data);
        localStorage.setItem("openidinfo", userinfo);
        this.openId = res.data.data.openid;
        var access_token = res.data.data.access_token;
        var xntoken = that.$md5("appv1/wxloginxN411");
        let invitation_code = window.localStorage.getItem('invitation_code')
        const data = {
          access_token: access_token,
          openid: this.openId,
          invitation_code: invitation_code,
          deviceid: "", // 机器型号
          sourseId: "38", // 用户来源 h5
          p_userid: "", // 上级
        }
        wx_login(data).then(res => {
          console.log("用户登录注册", res);
          var userinfo = JSON.stringify(res.data.data);
          localStorage.setItem("userinfo", userinfo);
          this.$store.commit("SET_CONFIG", res.data.data.id)
          // localStorage.removeItem('invitation_code')
        });
      });
    },
    getCodeApi () {
      //获取code
      const urlNow = `${window.location.href}`;
      localStorage.setItem("invitation_code", this.invitation_code);
      let scope = "snsapi_userinfo"; //snsapi_userinfo   //静默授权 用户无感知
      let appid = "wxd56770f92c890f2b";
      localStorage.setItem("invitation_code", this.invitation_code);
      let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${urlNow}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`;
      window.location.replace(url);
    },
  },
}
</script>
<style lang="less" scoped>
@import './WxLogin.less';
</style>

