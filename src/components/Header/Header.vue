<!--
 * @Author: 王精华
 * @Date: 2020-09-07 10:17:15
 * @LastEditTime: 2020-09-07 16:01:54
 * @LastEditors: 王精华
 * @Description: 
-->
<template>
  <div class="header">
    <div class="header-default">
      <div class="header-img">
        <img src="../../assets/pic@3x.png"
             alt="犀鸟公考" />
      </div>
      <div class="header-text">
        <div class="header-texts-item">下载犀鸟公考APP</div>
        <div class="header-texts-item">一次就能快乐上岸</div>
      </div>
      <van-button class="goapp-button">去APP学习</van-button>
    </div>
    <div class="header-default header-other">
      <div class="header-imgs">
        <img src="../../assets/new_head.png"
             alt="犀鸟公考" />
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Button } from 'vant'
Vue.use(Button)
export default {
  name: 'Header'
}
</script>
<style lang="less" scoped>
@import './Header.less';
</style>
