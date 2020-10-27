import request from "@/utils/request";

// 获取轮播图
export function getPunchData (data) {
  return request.post("appv1/punch", data);
}

// 获取轮播图
export function getBannerList (data) {
  return request.post("appv1/banner", data);
}

// 获取课程标签
export function getCourseLabel (data) {
  return request.post("appv1/courseLabel", data);
}

// 获取课程列表
export function getCourseList (data) {
  return request.post("appv1/courseList", data);
}

//获取课程详情
export function getCourseInfo (data) {
  return request.post("appv1/courseDetail", data);
}

//获取班型
export function getClassType (data) {
  return request.post("appv1/classtypeList", data);
}

//手机号登录
export function phoneLogin (data) {
  return request.post("appv1/userloginbyphone", data);
}

//手机号绑定
export function phoneBind (data) {
  return request.post("appv1/bindphone", data);
}

//获取验证码
export function getPhoneCode (data) {
  return request.post("appv1/sendcode", data);
}

//获取商品详情
export function getShopInfo (data) {
  return request.post("appv2/classtypedetails", data);
}

//获取优惠券列表
export function getCouponList (data) {
  return request.post("appv1/getordercoupon", data);
}

//我的优惠券列表
export function getMyCouponList (data) {
  return request.post("appv1/mycouponlist", data);
}

//创建订单
export function addOders (data) {
  return request.post("appv1/userorder", data);
}

//微信内部支付
export function wxPayfor (data) {
  return request.post("appv1/webpays", data);
}

//微信外部支付
export function wxOutPayfor (data) {
  return request.post("appv1/wappay", data);
}

//支付宝支付
export function zfbPayfor (data) {
  return request.post("appv1/wapalipay", data);
}

// 查询支付订单状态
export function getOrderStatusAPI (data) {
  return request.post("appv1/userorderstatus", data);
}

//打卡营
export function getTimeClass (data) {
  return request.post("appv2/punchPoster", data);
}

//打卡营评论
export function getTimeClassPl (data) {
  return request.post("appv1/punchComments", data);
}

//评论点赞
export function dianzan (data) {
  return request.post("appv1/commentPunchPraise", data);
}

//微信解析code
export function wxLogin (data) {
  return request.post("appv1/oauth", data);
}

//微信登录
export function wx_login (data) {
  return request.post("appv1/wxlogin", data)
}

//直播预约按钮
export function videoYuyue (data) {
  return request.post("appv1/publicSubscribe", data);
}

//获取直播详情
export function getVideoInfo (data) {
  return request.post("appv1/liveDetail", data);
}

//获取课程推荐列表
export function getTuijianList (data) {
  return request.post("appv1/recommendList", data);
}

//获取瓜分金额
export function getRule (data) {
  return request.post("appv2/rule", data);
}

//获取往期回顾
export function getHistory (data) {
  return request.post("appv2/coursesSignInfo", data);
}

//支付页面的督学提醒
export function getDuxue (data) {
  return request.post("appv2/joinClockRemind", data);
}

//获取信息填写详情
export function getUserMessage (data) {
  return request.post("appv2/myCourseDetail", data);
}

//提交用户填写信息
export function adduserInfo (data) {
  return request.post("appv2/submitUsermsg", data);
}

