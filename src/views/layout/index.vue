<template>
  <!-- 主页 -->
  <div>
    <!-- 路由占位符 -->
    <router-view />
    <!-- 底部导航栏 -->
    <van-tabbar v-model="active" route class="box">
      <van-tabbar-item icon="home-o" to="/layout">主页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/qa">问答</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/video">视频</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/my">{{
        $store.state.user ? "我的" : "未登录"
      }}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: ''
    }
  }
}
</script>

<style lang="less" scoped>
.van-tabbar {
  // background-color: red;
  background: url("../../img/af117481506d7e9dda39e8da3d4aa54e.jpg") no-repeat
    0px 0px;
  background-size: cover;
}
.van-tabbar-item--active {
  background: rgba(255, 255, 255, 0.1) !important;
}
.box {
  // width: 100%;
  z-index: 99;
  // height: 79vh;
}
</style>
