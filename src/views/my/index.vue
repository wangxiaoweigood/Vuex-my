<template>
  <div>
    <div v-if="user">
      <!-- 已登录头部 -->
      <header>
        <div class="login-bonne">
          <div class="login-left">
            <van-image
              round
              width="80"
              height="80"
              :src="userInfo.photo"
              cover
            />
            <span class="name">{{ userInfo.name }}</span>
          </div>

          <div class="login-right">
            <van-button size="mini" round to="/uesr/profile"
              >编辑资料</van-button
            >
          </div>
        </div>
        <div class="login-top">
          <div class="data-item">
            <span class="count">{{ userInfo.art_count }}</span>
            <span class="text">头条</span>
          </div>
          <div class="data-item">
            <span class="count">{{ userInfo.follow_count }}</span>
            <span class="text">关注</span>
          </div>
          <div class="data-item">
            <span class="count">{{ userInfo.fans_count }}</span>
            <span class="text">粉丝</span>
          </div>
          <div class="data-item">
            <span class="count">{{ userInfo.like_count }}</span>
            <span class="text">获赞</span>
          </div>
        </div>
      </header>
    </div>
    <!-- 未登录 -->
    <div v-else>
      <div class="my-box">
        <div>
          <img src="../../img/mobile.png" alt="" @click="ClickOnImage" />
          <span class="my-sizs">登录 / 注册</span>
        </div>
      </div>
    </div>
    <!-- 导航区 -->
    <van-grid :column-num="2" class="grid-nav" clickable>
      <van-grid-item icon="photo-o" text="文字">
        <span class="i-sc icon- icon-xingxing1"></span>
        <span>收藏</span>
      </van-grid-item>
      <van-grid-item icon="photo-o" text="文字">
        <span class="i-wz icon- icon-shizhong"></span>
        <span>历史</span>
      </van-grid-item>
    </van-grid>
    <div class="van-box">
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
      <van-button v-if="user" type="primary" size="large" @click="LogOut"
        >退出登录</van-button
      >
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import { getUserInfo } from '@api/user'
import { getUserInfo } from '@/api/user'
export default {
  data () {
    return {
      // 接受用户信息的
      userInfo: {}
    }
  },
  // 生命周期函数优先调用此方法里的函数
  created () {
    if (this.user) {
      this.loadUserInfo()
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    // 点击图片跳转登录页
    ClickOnImage () {
      this.$router.push('login')
    },
    // 点击退出登录并清空tokon
    LogOut () {
      this.$dialog
        .confirm({
          title: '确定退出嘛'
        })
        .then(() => {
          this.$router.push('login')
          console.log('2')
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // console.log('1')
        })
    },
    // 获取个人信息
    async loadUserInfo () {
      const { data: res } = await getUserInfo()
      // console.log(res.data)
      this.userInfo = res.data
    }
  }
}
</script>

<style lang="less" scoped>
.my-box {
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("../../img/banner.png") no-repeat 0px 0px;
  height: 361px;
  div {
    // width: 50px;
    img {
      // width: 100%;
      display: flex;
      justify-content: center;
      width: 132px;
      height: 132px;
    }
    .my-sizs {
      font-size: 28px;
      color: #fff;
    }
  }
}
header {
  background: url("../../img/banner.png") no-repeat 0px 0px;
  box-sizing: border-box;
  .login-bonne {
    height: 231px;
    padding: 76px 32px 23px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .name {
      font-size: 30px;
      color: #fff;
      padding-left: 20px;
    }
  }
  .login-left {
    display: flex;
    align-items: center;
  }
  .login-top {
    display: flex;

    .data-item {
      display: flex;
      flex: 1;
      justify-content: center;
      align-items: center;
      height: 130px;
      font-size: 30px;
      color: #fff;
      flex-direction: column;
    }
  }
  .van-image {
    border: solid 3px #fff !important;
  }
  .wz {
    font-size: 100px !important;
  }
  .grid-nav {
    height: 141px;
    box-sizing: border-box;
  }
}
.i-sc,
.i-wz {
  font-size: 50px !important;
  color: #f4ea2a;
  padding-bottom: 20px;
}
.van-box {
  margin-top: 7px !important;
}
.van-button {
  margin-top: 5px;
  text-align: center;
  background-color: #fff;
  border: none;
  color: red;
}
</style>
