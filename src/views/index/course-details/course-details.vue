<!--
 * @Author: 王精华
 * @Date: 2020-09-07 11:37:37
 * @LastEditTime: 2020-09-07 15:53:32
 * @LastEditors: 王精华
 * @Description: 
-->
<template>
  <div class="course-details">
    <CustomerService></CustomerService>
    <div id="details">
      <div class="details_main details_mainH">
        <!-- 视频 -->
        <video-player class="video-player vjs-custom-skin"
                      ref="videoPlayer"
                      :playsinline="true"
                      :options="playerOptions"
                      v-if="indexlists_course_info.videofile"></video-player>
        <div class="centerbody"
             v-else>
          <div class="video-img">
            <img v-bind:src="indexlists_course_info.coursecoverimage"
                 alt="" />
          </div>
        </div>
        <!-- 视频 -->
        <div class="details_content">
          <div class="details_content_title">
            {{ indexlists_course_info.name }}
          </div>
          <div class="details_content_time flex">
            {{ indexlists_course_info.courselabel }}
          </div>
          <div class="cells"
               @click="showClassType">
            <div class="cell_info">
              <div class="cell_title ">
                选择:
              </div>
              <div class="cell_value "
                   v-show="indexlists_course_info">
                {{ indexlists_course_info.name }}/{{
                indexlists_course_type.name
                }}
                {{ classTime }} {{ indexlists_course_type.classnum }}课时
              </div>
            </div>
            <img src="../../../assets/link_right.png"
                 alt="" />
          </div>
          <van-popup v-model="show"
                     position="bottom"
                     round>
            <div class="selectClassType">
              <div class="selectClassType_title">
                <p class="s_title">{{ indexlists_course_type.name }}</p>
                <p>{{ classTime }} {{ indexlists_course_type.classnum }}课时</p>
                <div class="Class_pires">
                  <div class="Class_pires_info">
                    <div class="d_p"
                         v-show="buyType == 1">
                      <img src="../../../assets/tgicon.png"
                           alt="">
                    </div>
                    <div>
                      ￥<span style="font-size:20px;">{{
                        indexlists_course_type.prices
                        }}</span>
                      <s v-show="
                        indexlists_course_type.prices <
                          indexlists_course_type.markprices
                      "
                         style="color:rgba(153,153,153,1);">￥{{ indexlists_course_type.assembleprice != 0? indexlists_course_type.markprices:indexlists_course_type.prices }}</s>
                    </div>
                  </div>
                  <div class="Class_pires_info"
                       style="color:rgba(153,153,153,1);">
                    已报{{ indexlists_course_type.total_buy }}人
                  </div>
                </div>
              </div>
              <div class="selectClassType_info">
                <div class="s_info_title">课程类型</div>
                <div class="s_info_cards">
                  <div class="info_card"
                       v-for="(item, index) in classTypeInfoList"
                       :key="index"
                       :class="{ selectInd: selectId == item.id }"
                       @click="selectType(index, item)">
                    {{ item.name }}
                  </div>
                </div>
              </div>
              <div class="buy_class team_buy"
                   v-if="buyType == 1">
                <van-button class="team_buy_btn "
                            @click="goOder(1)"> 原价购买</van-button>
                <van-button class="team_buy_btn team_btn"
                            @click="goOder(2)">三人拼团</van-button>
              </div>
              <div class="buy_class"
                   @click="goOder()"
                   v-if="buyType == 2">
                去支付
              </div>
              <div class="buy_class buyed"
                   @click="getfreecourse()"
                   v-if="buyType == 3">
                已购买，去App学习
              </div>
              <div class="buy_class buyisover"
                   v-if="buyType == 4">
                已售罄
              </div>
              <div class="buy_class freeBuy"
                   @click="goOder(4)"
                   v-if="buyType == 5">
                免费领取
              </div>
              <div class="buy_class buyisdetel"
                   v-if="buyType == 6">
                已停用
              </div>
            </div>
          </van-popup>
          <div class="details_content_endtime flex text-row">
            <span style="width: 12em;">已报名：{{ indexlists_course_type.total_buy }}人</span>
            <div class="details_pirces">
              <div class="dp_p">
                <div class="d_p"
                     v-show="buyType == 1"><img src="../../../assets/tgicon.png" /> &nbsp;&nbsp;</div>
                <div class="d_p_t">
                  <span style="font-weight: 500;font-size:0.27rem;color: #E6213A;">￥</span>
                  {{indexlists_course_type.prices}}
                </div>
              </div>
              <s class="yuanjia">￥ {{indexlists_course_type.markprices}}</s>
            </div>
          </div>
        </div>
      </div>

      <van-tabs style="margin-top:20px;min-height: 200px;background: #fff;"
                sticky
                background="white"
                v-model="active"
                color="#33CCD2"
                line-width="5%"
                title-active-color="#333333"
                title-inactive-color="#A8A8A8">
        <div class="kc_card">
          <van-tab title="课程介绍">
            <div class="details_comment">
              <div class="details_comment_jianjie"
                   v-for="kcjj in course_desc_image"
                   :key="kcjj.id">
                <img v-bind:src="kcjj" />
              </div>
            </div>
          </van-tab>
          <van-tab title="课程大纲">
            <van-collapse v-model="activeNames"
                          accordion>
              <van-collapse-item v-for="(item, index) in indexlists_course_lists"
                                 :key="index"
                                 :title="(index + 1) + '、' + item.name"
                                 :name="index">
                <div class="kcdg_item"
                     v-for="(item2, index2) in item.courseware"
                     :key="index2">
                  <p class="kcdg_item_title">{{ (index + 1) + '.' + (index2 + 1) + '&nbsp;' + item2.chapter_name }}</p>
                  <p v-html="formatTime(item2)">
                  </p>
                </div>
              </van-collapse-item>
            </van-collapse>
          </van-tab>
        </div>
      </van-tabs>

      <!-- 课程简介 -->

      <!-- 课程大纲 -->

      <!-- 没有更多了 -->

      <div class="gopay flex">
        <div class="gopay_service">
          <a @click="cc()">
            <div class="gopay_service_box">
              <img width="15px"
                   height="15px"
                   src="../../../assets/zx.png" />
              <span class="gopay-box-left">立即咨询</span>
            </div>
          </a>
        </div>
        <div class="nologin_height"></div>
        <div class="right-class">
          <div class="gopay_service_box btns"
               @click="showClassType"
               v-show="indexlists_course_type.prices != 0">
            购买:<span style="font-size:12px;margin-bottom:-3px;">￥ </span>{{ indexlists_course_type.prices }}
          </div>
          <div class="gopay_service_box btns"
               @click="showClassType"
               v-show="indexlists_course_type.prices == 0">
            <span>免费领取</span> </div>
        </div>
      </div>
    </div>
    <!-- 登录弹窗 -->
    <!-- 绑定手机号 -->
    <van-popup v-model="loginshow"
               class="phonediv phonediv-iphone">
      <div class="phone-title">手机号绑定</div>
      <div class="phonenum">
        <van-field class="phone-input"
                   v-model="phoneinput"
                   type='number'
                   :maxlength='11'
                   placeholder="请输入手机号" />
      </div>
      <div class="iphoneBd_code">
        <van-field class="phone-input"
                   type='number'
                   :maxlength="4"
                   v-model="authcode"
                   placeholder="请输入验证码" />
        <div class="code_btn"
             id="clickHqCode"
             style="margin-left: -30px;text-align: center;"
             v-if="displayauth == 0"
             @click="getCode">
          获取验证码
        </div>
        <div class="code_btn"
             id="clickHqCode"
             style="margin-left:-30px;text-align: center;"
             v-if="displayauth == 1">
          {{ count }}s
        </div>
      </div>
      <div class="loginbtn"
           @click="login()">绑定</div>
    </van-popup>
  </div>
</template>
<script>
import {
  getCourseInfo,
  getClassType,
  phoneLogin,
  getPhoneCode,
  phoneBind,
  getShopInfo,
  wxLogin,
  wx_login
} from "../../../api/index.js";
import Vue from 'vue'
import { Popup, Cell, CellGroup, CollapseItem, Collapse, Field, Tabs, Tab } from 'vant'
Vue.use(Popup)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Field)
Vue.use(Tabs)
Vue.use(Tab)
Vue.use(CollapseItem)
Vue.use(Collapse)
import WxLogin from '../../../components/WxLogin/WxLogin'
export default {
  name: 'course-details',
  data () {
    return {
      show: false,
      active: "0",
      activeNames: 0,
      loginshow: false,
      curEndTime: "",
      displayauth: 0,
      day: "0",
      hour: "00",
      min: "00",
      substring: "",
      second: "00",
      xntoken: "",
      bindshow: false,
      over_limit: "",
      indexlists_course_info: "",
      indexlists_course_type: "",
      indexlists_course_lists: "",
      courseId: "",
      endtime: "",
      phoneinput: "",
      authcode: "",
      course_desc_image: "",
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "", //这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
            src: "" //url地址
          }
        ],
        poster: "", //你的封面地址
        // width: document.documentElement.clientWidth, //播放器宽度
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      },
      nowtime: "",
      close_time: "",
      is_pay: "",
      money: "",
      isActive: 1,
      classTypeInfoList: [],
      classTypeId: "",
      selectInd: 0,
      selectInfo: "",
      minPrices: "",
      selectEnd: {},
      isendbuy: false,
      selectId: "",
      openId: "",
    }
  },
  watch: {
    bindshow: {
      handler (newValue) {
        // 关闭登录弹窗，则清空手机号和验证码
        if (!newValue) {
          this.phoneinput = "";
          this.authcode = "";
        }
      },
      immediate: true
    }
  },
  components: { WxLogin },
  computed: {
    classTime: function () {
      let type = this.indexlists_course_type;
      let startTime = type.coursestarttime;
      let endTime = type.courseendtime;
      return `${startTime}-${endTime}`;
    },
    //判断是否售罄
    classOver: function () {
      let nowNum = this.indexlists_course_type.total_buy;
      let topNum = this.indexlists_course_type.xnumber;
      if (nowNum >= topNum) {
        //已售罄
        return true;
      } else {
        return false;
      }
    },
    //判断是否是团购课
    buyType: function () {
      let type = this.indexlists_course_type;
      let info = this.indexlists_course_info;
      let nowNum = type.total_buy;
      let topNum = type.xnumber;
      let prices = type.prices;
      let isBuy = type.is_buy;
      let courseswitch = info.courseswitch;
      if (type.isswitch == 1 && nowNum < topNum && prices != 0 && isBuy == 0) {
        //团购课按钮
        return 1;
      } else if (
        type.isswitch == 0 &&
        nowNum < topNum &&
        prices != 0 &&
        isBuy == 0
      ) {
        //非团购课按钮
        return 2;
        //是否已购买
      } else if (isBuy == 1) {
        return 3;
        //是否售罄
      } else if (nowNum >= topNum) {
        return 4;
        //是否免费
      } else if (prices == 0) {
        return 5;
        //是否停售
      } else if (courseswitch == 0) {
        return 6;
      }
    }
  },
  created () {
    var invitation_code = this.$route.query.invitation_code ? this.$route.query.invitation_code : null;
    this.invitation_code = invitation_code;
    var courseId = this.$route.query.courseId
    this.nowtime = parseInt(new Date().getTime() / 1000);
    this.courselists(courseId);
    var browser = localStorage.getItem("browser");
    var userinfo = localStorage.getItem("userinfo");
    let code = this.$route.query.code;
    if (code && !userinfo) {
      this.userlogin()
    }
    // that.countTime()
  },
  mounted () {
  },
  methods: {
    islogined () {
      var courseId = this.$route.query.courseId;
      // console.log(invitation_code)
      // var os = localStorage.getItem("os");
      // if (os == "iphone") {
      //   that.os = 1;
      // } else {
      //   that.os = 2;
      // }
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
            this.userlogin();
          } else {
            this.getCodeApi();
          }
        }
        localStorage.setItem("browser", "wx");
      }
      else {
        let invitation_code = this.$route.query.invitation_code
        if (invitation_code) {
          window.localStorage.setItem('invitation_code', invitation_code)
        }
      }
    },
    // 格式化时间
    formatTime (obj) {
      // console.log(obj)
      // const name = obj.t_name ? obj.t_name : ""; // 教师名称
      // const startTimeArray = obj.startdatetime ? obj.startdatetime.split(" ") : '';
      // const endTimeArray = obj.enddatetime ? obj.enddatetime.split(" ") : '';
      // const startTimeDay = startTimeArray ? startTimeArray[0] : null; // 开始的年月日
      // const startTimeMin = startTimeArray ? (startTimeArray[1]).split(":").slice(0, 2).join(":") : ''; // 开始的时分
      // const endTimeMin = endTimeArray ? (endTimeArray[1]).split(":").slice(0, 2).join(":") : ''; // 结束的时分
      // return `${name}&nbsp;&nbsp;&nbsp;&nbsp;${startTimeDay}&nbsp;&nbsp;${startTimeMin}-${endTimeMin}`
    },
    //确认班型选择去支付
    goOder (other) {
      this.islogined()
      let userinfo = window.localStorage.getItem("userinfo");
      var userphone = "";
      if (userinfo) {
        userphone = JSON.parse(userinfo).phone;
      } else {
        return;
      }
      var browser = localStorage.getItem("browser");
      let typeId = this.selectId;
      let courses_id = this.indexlists_course_info.id;
      // 有绑定手机号
      if (userphone) {
        this.loginshow = false;
        if (typeId) {
          this.$router.push({
            name: "addorder",
            query: { coursesId: courses_id, typeId: typeId, classId: 1, openId: this.openId, other: other }
          });
        } else {
          Toast("请选择班型后操作");
        }
      }
      // 无绑定手机号去登录
      else {
        this.loginshow = true;
      }
    },
    //创建订单
    addoder (typeId, uid) {
      getShopInfo(data).then(res => {
        if (res.code == 100) {
          console.log(res);
        }
      });
    },
    //选择班型
    selectType (index, item) {
      this.selectInd = index;
      this.selectId = item.id;
      this.courselists(item.id);
    },
    //显示班型选择
    showClassType () {
      this.classType();
    },
    //获取班型
    classType () {
      // let token = this.$md5(`${url}xN411`)
      let userinfo = JSON.parse(window.localStorage.getItem('userinfo'));
      const data = {
        id: this.$route.query.courseId ? this.$route.query.courseId : this.$route.query.courseid,
        userid: userinfo ? userinfo.id : 1
      };
      getClassType(data)
        .then(res => {
          if (res.code == 100) {
            this.show = true;
            this.classTypeInfoList = res.data;
            let list = res.data;
            let arr = [];
            list.map(e => {
              arr.push(e.prices);
            });
            let minPrices = arr.sort(function (a, b) {
              return a > b ? 1 : -1;
            });
            this.minPrices = minPrices[0];
          } else {
            this.$toast("网络错误，请重试");
          }
        })
        .catch(err => { });
    },
    //获取页面课程列表
    courselists (ClassTypeId) {
      const data = {
        id: this.$route.query.courseId
          ? this.$route.query.courseId
          : this.$route.query.courseid,
        classtype_id: ClassTypeId ? ClassTypeId : ""
      };
      let that = this;
      getCourseInfo(data).then(function (res) {
        if (res.code == 100) {
          that.course_desc_image = res.data.course.images;
          that.indexlists_course_type = res.data.classtype;
          that.indexlists_course_info = res.data.course;
          that.indexlists_course_lists = res.data.courseware;
          that.curEndTime = res.data.classtype.saleendtime;
          that.is_pay = res.data.classtype.is_buy;
          that.money = res.data.classtype.prices;
          that.playerOptions.sources[0].src = res.data.course.videofile
          console.log(that.playerOptions)
          that.playerOptions.poster = res.data.course.coursecoverimage
          that.countTime();
        } else {
          // Toast(res.message)
        }

        // that.playerOptions['sources'][0]['src'] = res.data.data.course_info.course_video
        // that.playerOptions['poster'] = res.data.data.course_info.desc_image
        //停售日期

        // // 获取过期时间戳
        // var close_time = that.indexlists_course_info.close_time
        // var close_time = close_time.replace(/-/g, '/')
        // that.close_time = Math.floor((new Date(close_time).getTime() / 1000))

        // that.is_pay = res.data.data.course_info.is_pay

        // that.over_limit = that.indexlists_course_info.over_limit
        // that.is_assemble = that.indexlists_course_info.is_assemble

        // // 分享内容
        // that.share_img = res.data.data.course_info.share_img
        // that.share_title = res.data.data.course_info.share_title
        // that.share_url = res.data.data.course_info.share_url
        // that.describe = res.data.data.course_info.describe
        // that.subheading = res.data.data.course_info.subheading

        // // that.wxshare()
        // that.wxshare()
        // // console.log(this)
      });
      console.log(this.is_pay);
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
    getCodeApi (state) {
      //获取code
      const urlNow = `${window.location.href}`;
      localStorage.setItem("invitation_code", this.invitation_code);
      let scope = "snsapi_userinfo"; //snsapi_userinfo   //静默授权 用户无感知
      let appid = "wxd56770f92c890f2b";
      localStorage.setItem("invitation_code", this.invitation_code);
      let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${urlNow}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`;
      window.location.replace(url);
    },
    // 倒计时
    countTime () {
      // 获取当前时间
      let date = new Date();
      let now = date.getTime();
      let endTime = new Date(this.curEndTime).getTime();
      // // 时间差
      let leftTime = endTime - now;
      // // 定义变量 d,h,m,s保存倒计时的时间
      if (leftTime >= 0) {
        // 天
        this.day = Math.floor(leftTime / 1000 / 60 / 60 / 24);
        // 时
        let h = Math.floor((leftTime / 1000 / 60 / 60) % 24);
        this.hour = h < 10 ? "0" + h : h;
        // 分
        let m = Math.floor((leftTime / 1000 / 60) % 60);
        this.min = m < 10 ? "0" + m : m;
        // 秒
        let s = Math.floor((leftTime / 1000) % 60);
        this.second = s < 10 ? "0" + s : s;
      } else {
        this.day = 0;
        this.hour = "00";
        this.min = "00";
        this.second = "00";
        this.isendbuy = true;
      }
      // // 等于0的时候不调用
      if (
        Number(this.hour) === 0 &&
        Number(this.day) === 0 &&
        Number(this.min) === 0 &&
        Number(this.second) === 0
      ) {
        return;
      } else {
        // 递归每秒调用countTime方法，显示动态时间效果,
        setTimeout(this.countTime, 1000);
      }
    },
    //进入课程详情
    gocourse_datails_list () {
      let courseId = this.$route.query.courseId
      this.$router.push({
        path:
          "/course_details_list?courseid=" +
          courseId +
          "&&invitation_code=" +
          this.invitation_code
      });
    },

    // 切换状态
    selecttab (type) {
      var that = this;
      that.isActive = type;
      console.log("获取切换状态：", type);
    },
    //免费领取课程
    getfreecourse () {
      console.log("免费领取点击");
      // var that = this;
      // var xntoken = this.$md5("get_free_coursexN411");
      // var userinfo = localStorage.getItem("userinfo");
      // if (!userinfo) {
      //   var userphone = "";
      // } else {
      //   var userphone = JSON.parse(userinfo).phone;
      // }
      // var browser = localStorage.getItem("browser");

      // if (!userphone) {
      //   this.loginshow = true;
      // }
      // var uid = JSON.parse(userinfo).id;
      // axios({
      //   method: "post",
      //   url: apiconfig.host + "code/user_course/get_free_course",
      //   // url:"code/user_course/get_free_course",
      //   data: this.qs.stringify({ //这里是发送给后台的数据
      //     "course_id": apiconfig.getUrlKey("courseid"),
      //     "user_token": that.$md5(userid + "c0411")
      //   }),
      //   headers: {
      //     'xntoken': xntoken,
      //     'version': '1',
      //     'platform': '1',
      //     'userId': userid ? userid : 1,
      //   }
      // }).then(function (res) {
      //   console.log("免费领取获取信息：", res)
      //   if (res.data.status == 100) {
      //     Toast(res.data.message);
      //     that.$router.push({
      //       // path: '/course_details_list?courseid=' + apiconfig.getUrlKey("courseid") +"&&invitation_code="+that.invitation_code
      //       path: '/goapp'
      //     })
      //   }
      // });
      this.$router.push({ name: 'goapp' })
    },
    cc () {
      console.log("调用客服");
      ysf("open", {
        templateId: 6167009
      });
    },
    back () {
      // this.$router.go(-1); //返回上一层
      // this.$router.push('/');
    },
    gopages () {
      // this.$router.push('/');
    },
    //购买课程按钮
    orderbuy (id, price) {
      var that = this;
      var browser = localStorage.getItem("browser");
      if (browser == "wx") {
        var userinfo = localStorage.getItem("userinfo");
        var userphone = JSON.parse(userinfo).phone;
        if (!userphone) {
          console.log("没有手机号弹出登录");
          that.bindshow = true;
        } else {
          console.log("有手机号 可以进入购买");
          that.$router.push(
            "/addorder?courseid=" +
            id +
            "&&price=" +
            price +
            "&&invitation_code=" +
            that.invitation_code
          );
        }
      } else {
        console.log("手机浏览器");
        var userinfo = localStorage.getItem("userinfo");
        if (!userinfo) {
          console.log("没有手机号弹出登录");
          that.loginshow = true;
        } else {
          console.log("有手机号 可以进入购买");
          that.$router.push(
            "/addorder?courseid=" +
            id +
            "&&price=" +
            price +
            "&&invitation_code=" +
            that.invitation_code
          );
        }
      }
    },
    //绑定手机号
    bind_phone () {
      var that = this;
      // var userid = JSON.parse(userinfo).id;
      let userinfo = JSON.parse(window.localStorage.getItem("userinfo"));
      var phone = that.phoneinput;
      var authcode = that.authcode;
      var invitation_code = localStorage.getItem("invitation_code");
      that.invitation_code =
        invitation_code != null ? invitation_code : "wwIftW72";
      const data = {
        phone: phone,
        code: authcode,
        userId: userinfo ? userinfo.id : "0",
        invitation_code: invitation_code ? invitation_code : null
      };
      phoneBind(data)
        .then(res => {
          if (res.code == 100) {
            that.bindshow = false;
            this.loginshow = false;
            var userinfo = JSON.stringify(res.data);
            localStorage.setItem("userinfo", userinfo);
            localStorage.removeItem("invitation_code");
          } else {
            Toast(res.message);
          }
        })
        .catch(err => {
          Toast("网络异常");
        });
    },
    //手机号登录
    phone_login () {
      var that = this;
      var phone = that.phoneinput;
      var authcode = that.authcode;
      let invitation_code = window.localStorage.getItem("invitation_code");
      console.log(that.invitation_code);
      const data = {
        phone: phone,
        code: authcode,
        sourseId: 33,
        invitation_code: invitation_code ? invitation_code : null
      };
      phoneLogin(data).then(function (res) {
        if (res.code == 100) {
          that.loginshow = false;
          var userinfo = JSON.stringify(res.data);
          that.$store.commit("SET_CONFIG", res.data.id)
          localStorage.setItem("userinfo", userinfo);
          that.courselists();
          Toast("登录成功");

          // location.reload();
        } else {
          Toast(res.data.message);
        }
      });
    },
    submit () {
      this.phoneinput = this.phoneinput;
      this.authcode = this.authcode;
    },
    //登录
    login () {
      var browser = localStorage.getItem("browser");
      if (browser == "wx") {
        this.bind_phone();
      } else {
        console.log("手机浏览器");
        this.phone_login();
      }
    },
    //获取验证码
    send_code () {
      // var that = this
      // var xntoken = this.$md5("send_codexN411")
      // var phone = that.phoneinput
      let phone = this.phoneinput;
      if (!/^1[3456789]\d{9}$/.test(phone)) {
        Toast("手机号码有误，请重新填写");
        return false;
      }
      const data = {
        userId: "",
        phone: phone
      };
      getPhoneCode(data)
        .then(function (res) {
          if (res.code == 100) {
            console.log("获取的验证码：", res);
            Toast("获取成功");
          } else {
            Toast("获取验证码失败");
          }
        })
        .catch(err => {
          Toast("获取验证码失败");
        });
    },
    //验证码获取倒计时
    getCode () {
      var phone = this.phoneinput;
      if (!phone) {
        Toast("请输入手机号码");
        return;
      }
      else if (!/^[1][3-8]\d{9}$/.test(phone)) {
        Toast("手机号码格式不正确");
        this.phoneinput = "";
        return;
      }
      this.displayauth = 1;
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.authshow = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.authshow = true;
            clearInterval(this.timer);
            this.timer = null;
            this.displayauth = 0;
          }
        }, 1000);
        this.send_code(this.phoneinput);
      }
    },
    //创建订单
    getAddOders () {
      addOders().then(res => { });
    },
    //获取分享内容
    punchShare () {
      var that = this;
      var xntoken = this.$md5("punchSharexN411");
      axios({
        method: "post",
        url: apiconfig.host + "code/punch/punchShare",
        // url:"code/punch/punchShare",
        data: this.qs.stringify({
          //这里是发送给后台的数据
          camp_id: apiconfig.getUrlKey("courseid")
        }),
        headers: {
          xntoken: xntoken,
          version: "3.1.0",
          platform: "1",
          userId: "1"
        }
      }).then(function (res) { });
    },
    //链接分享配置
    wxshare () {
      var that = this;
      var whref = window.location.href;
      var equipment = localStorage.getItem("equipment");
      if (equipment == 1) {
        var whref = window.location.href;
      } else {
        var whref = window.location.href;
      }
      var pImg = that.share_img;
      var sharetitle = that.share_title;
      var sharedesc = that.describe;
      var xntoken = this.$md5("weChatSharexN411");
      console.log("fenxiang");
      axios({
        method: "post",
        url: apiconfig.host + "/code/punch/weChatShare",
        // url:"code/punch/weChatShare",
        data: this.qs.stringify({
          //这里是发送给后台的数据
          url: whref
        }),
        headers: {
          xntoken: xntoken,
          version: "1",
          platform: "1",
          userId: 1
        }
      }).then(function (res) {
        console.log("获取微信配置信息", res);
        wx.config({
          debug: false,
          appId: res.data.data.appId,
          timestamp: res.data.data.timestamp,
          nonceStr: res.data.data.nonceStr,
          signature: res.data.data.signature,
          jsApiList: [
            "onMenuShareTimeline",
            "onMenuShareAppMessage",
            "onMenuShareQQ",
            "onMenuShareWeibo",
            "onMenuShareQZone"
          ]
        });
        wx.ready(function () {
          // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
          wx.onMenuShareTimeline({
            title: sharetitle, // 分享标题
            desc: sharedesc,
            link: whref,
            imgUrl: pImg, // 分享图标
            success: function () {
              // alert("分享成功！");
            }
          });
          // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
          wx.onMenuShareAppMessage({
            title: sharetitle, // 分享标题
            desc: sharedesc,
            link: whref,
            // link: this.share_url,
            imgUrl: pImg,
            success: function () {
              // alert("分享成功！");
            }
          });
          // 获取“分享到QQ好友”按钮点击状态及自定义分享内容接口
          wx.onMenuShareQQ({
            title: sharetitle, // 分享标题
            desc: sharedesc,
            link: whref,
            imgUrl: pImg,
            success: function (res) {
              // alert('分享成功');
            }
          });
        });
      });
    }
  }
}
</script>
<style lang="less" scoped>
@import './course-details.less';
</style>

