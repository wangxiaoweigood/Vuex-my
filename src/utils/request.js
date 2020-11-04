/**
 * 封装 axios 请求模块
 */
import axios from 'axios'
import store from '@/store/index.js'
import JSONBig from 'json-bigint'

// const jsonStr = '{"are_id":1245953273786007552}'
// console.log(JSON.parse(jsonStr))
// console.log(JSONBig.parse(jsonStr))
// console.log(JSONBig.parse(jsonStr).are_id.toString())
// axios.create 方法：复制一个 axios
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/', // 基础路径
  transformResponse: [function (data) { // <==axios默认会在内部处理data数据
    // 可以对data做任何操作
    // 判断如何格式对的话就使用JSONBig方法
    // 如果失败了就返回后台原本的data数据
    try {
      return JSONBig.parse(data)
    } catch (err) {
      return data
    }
  }]

})

// 请求拦截器
request.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    // 代表放行
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// 响应拦截器
// request.interceptors.response.use(
//   function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response
//   },
//   function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error)
//   }
// )

export default request
