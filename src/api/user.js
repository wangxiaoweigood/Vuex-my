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
// 关注用户
export const followUser = userId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}
// 取消关注
export const unFollowUser = (userId) => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${userId}`
  })
}
// 获取用户个人资料
// /app/v1_0/user/profile
export const getPersonal = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/profile'
  })
}
// /app/v1_0/user/profile
// 编辑用户个人资料
export const patchPersinel = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/profile',
    data
  })
}
// 更新用户头像
export const updateUserImg = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/photo',
    data
  })
}
