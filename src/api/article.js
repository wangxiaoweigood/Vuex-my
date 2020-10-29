// import request from '@/utils/request'
import request from '../utils/request'

// 请求获取文章列表数据的接口
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}
