import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './utils/register-vant.js' // 封装的组件导入
import 'amfe-flexible' // 自动适配屏幕大小
import './utils/request' // 导入axios
import './styles/base.css'
import './styles/index.css'
import './api/user'
// import './utils/dayjs' // 处理时间的包
import './utils/day'
// import "./utils/register-vant.js";
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
