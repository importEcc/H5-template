import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export const commonRoutes = [
  {
    path: '/index',
    name: 'index',
    component: () => import('@/views/index/index')
  },
  {
    path: '/',
    component: () => import('@/views/index/index'),
    name: 'index',
    redirect: '/index'
  }
]
export default new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: commonRoutes
})
