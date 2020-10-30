import request from '@/utils/request'

// 登录发送手机号和验证码
export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}
// 请求验证码接口
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`,
    mobile
  })
}
// // 获取个人信息接口
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
  })
}
// home页获取用户频道列表
export const UserChannel = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
// 所有频道列表
export const Channel = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}
// 批量修改用户频道列表（部分覆盖）
export const AddUserChannel = channels => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data: {
      channels: [channels]
    }
  })
}
// 删除指定用户频道
export const DeleteSpecifiedUser = ChannelId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${ChannelId}`
  })
}
