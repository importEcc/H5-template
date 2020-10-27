/*
 * @Author: 王精华
 * @Date: 2020-09-07 09:08:42
 * @LastEditTime: 2020-09-07 11:40:35
 * @LastEditors: 王精华
 * @Description: 
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export const commonRoutes = [
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('@/views/index/index'),
    meta: {
      title: '犀鸟公考-犀鸟公考 - 大学生职业教育服务平台 公考、招教、部队文职',
      keyWords: '犀鸟公考是大学生职业教育服务平台，通过“在线直播+督学系统+游戏化激励+AI”的方式，让考试有效也有趣！提供公务员、事业单位、教师招聘、部队文职等考试服务',
      iskeep: false
    }
  },
  {
    path: '/course-details',
    name: 'courseDetails',
    component: () => import('@/views/index/course-details/course-details'),
    meta: {
      title: '课程详情',
      iskeep: true
    }
  },

]
export default new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: commonRoutes
})
