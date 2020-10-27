<!--
 * @Author: 王精华
 * @Date: 2020-09-07 09:08:42
 * @LastEditTime: 2020-09-07 10:25:25
 * @LastEditors: 王精华
 * @Description: 
-->
<template>
  <div id="app">
    <Header></Header>
    <router-view />
  </div>
</template>

<script>
import Header from './components/Header/Header'
export default {
  name: 'App',
  components: { Header }
};
</script>

<style>
</style>
