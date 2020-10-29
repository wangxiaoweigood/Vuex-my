<template>
  <div class="box">
    <!-- 搜索区域 -->
    <div class="nav-box">
      <van-search
        class="homo-search"
        v-model="value"
        shape="round"
        placeholder="请输入搜索关键词"
      />
    </div>
    <div class="navtwo-box">
      <!-- Tab标签栏 -->
      <van-tabs class="cha-top" v-model="active" animated swipeable>
        <van-tab :title="item.name" v-for="item in channels" :key="item.id">
          <!-- 文章列表组件 -->
          <article-list :channel="item" />
          <!-- 文章列表组件 -->
        </van-tab>

        <!-- 汉堡图标 -->
        <div slot="nav-right" class="icon-but">
          <span class="icon- icon-gengduo"></span>
        </div>
      </van-tabs>
    </div>
  </div>
</template>

<script>
// 封装的接口函数
import { UserChannel } from '../../api/user'
// 导入文章列表内容组件
import ArticleList from '../components/article-list'
export default {
  name: 'list',
  data () {
    return {
      active: 0,
      value: '',
      channels: [] // 获取用户频道列表数据
    }
  },
  components: {
    ArticleList
  },
  // 生命周期函数
  created () {
    this.loadChannels()
  },
  methods: {
    // 获取用户频道列表数据
    async loadChannels () {
      // console.log(data)
      try {
        const { data: res } = await UserChannel()
        // console.log(res.data.channels)
        this.channels = res.data.channels
        // console.log(this.channels)
      } catch (err) {
        this.$toast.fail('登录失败', err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  // height: 100vh;
  // /deep/ .navtwo-box {
  //   position: fixed;
  //   padding-top: 100px;
  //   z-index: 99;
  // }

  // .nav-box {
  //   position: fixed;
  //   // top: 20px;
  //   width: 100%;
  //   z-index: 999;
  // }
  .homo-search {
    background-color: #3296fa;
    display: block;
  }
  .van-search__content--round {
    background: rgba(255, 255, 255, 0.3) !important;
  }
  /deep/.cha-top {
    // padding-right: 3px !important;
    .van-tabs__wrap {
      height: 82px;
      position: fixed;
      width: 100%;
      // top: 110px;
      z-index: 99;
    }
    .van-tab {
      min-width: 200px;
      border-right: 1px solid #edeff3 !important;
      font-size: 30px;
      color: #777777;
    }
    .van-tab--active {
      color: #333333;
    }
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
    }
    .van-tabs__nav {
      padding-bottom: 16px !important;
    }
    .icon-but {
      position: fixed;
      right: 0;
      width: 66px !important;
      height: 60px !important;
      background-color: #fff;
      opacity: 0.302;
      // line-height: 82px;
      display: flex;
      align-content: center;
      justify-content: center;
      border-left: 1px solid #000;
      margin: 10px 0;
      box-sizing: border-box;
    }
  }
  .icon- {
    font-size: 48px;
  }
  .nav-right {
    background-color: red;
  }
}
</style>
