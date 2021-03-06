import Vue from 'vue' // 创建路由
import VueRouter from 'vue-router' // 引入路由

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login', // 登录页
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/layout', // 主页
    name: 'layout',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '', // 主页默认子路由
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: '/qa', // 问答
        name: 'qa',
        component: () => import('@/views/qa')
      },
      {
        path: '/video', // 视频
        name: 'video',
        component: () => import('@/views/video')
      },
      {
        path: '/my', // 我的
        name: 'my',
        component: () => import('@/views/my')
      }
    ]
  },
  {
    path: '/search', // 文章搜索
    name: 'search',
    component: () => import('@/views/search')
  },
  {
    path: '/article/:articleId', // 文章详情
    name: 'article',
    component: () => import('@/views/article'),
    props: true // <= 开启props传参
  },
  {
    path: '/uesr/profile',
    name: 'uesr-profile',
    component: () => import('@/views/uesr-profile')
  }
]

const router = new VueRouter({
  routes
})

export default router
