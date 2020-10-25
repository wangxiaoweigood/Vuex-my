import Vue from 'vue' // 创建路由
import VueRouter from 'vue-router' // 引入路由
// import Login from '../views/login.vue' // 登录页

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  }
]

const router = new VueRouter({
  routes
})

export default router
