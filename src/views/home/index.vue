<template>
  <div class="box">
    <!-- 搜索区域 -->
    <div class="nav-box">
      <van-search
        @click="InputKeyword"
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
          <article-list :channel="item" class="wwww" />
          <!-- 文章列表组件 -->
        </van-tab>

        <!-- 汉堡图标 -->
        <div slot="nav-right" class="icon-but" @click="ClickPopUp">
          <span class="icon- icon-gengduo"></span>
        </div>
      </van-tabs>
    </div>
    <!-- 点击按钮弹出区域 -->
    <van-popup
      v-model="isChannelShow"
      position="left"
      :style="{ height: '100%', width: '100%' }"
      closeable
      duration="0.5"
      round
    >
      <!-- 弹出层插槽 -->
      <channel-edit
        :my-channels="channels"
        :active="active"
        @updata-active="OupdataActive"
      />
      <!-- @updata-active="OupdataActive(index)" 获取子组件里传来对应的active的值 -->
      <!-- 弹出层插槽 -->
    </van-popup>
  </div>
</template>

<script>
// 封装的接口函数
import { UserChannel } from '../../api/user'
// 导入文章列表内容组件
import ArticleList from '../components/article-list'
// 导入编辑频道组件
import ChannelEdit from '../components/channel-edit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  name: 'home',
  data () {
    return {
      active: 0,
      value: '',
      channels: [], // 获取用户频道列表数据
      isChannelShow: false // 展示弹出层
    }
  },
  components: {
    ArticleList,
    ChannelEdit
  },
  computed: {
    ...mapState(['user'])
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
        // this.channels = res.data.channels
        // const channels = []
        // console.log(channels)
        if (this.user) {
          // 已登录
          const { data: res } = await UserChannel()
          this.channels = res.data.channels
        } else {
          // 没有登录
          const loadChannels = getItem('TOTIAO_CHANNELS')
          console.log(loadChannels)
          if (loadChannels) {
            this.channels = loadChannels
          } else {
            const { data: res } = await UserChannel()
            this.channels = res.data.channels
          }
        }
        // this.channels = channels
      } catch (err) {
        this.$toast.fail('登录失败', err)
      }
    },
    // 获取子组件传来的值去重新赋值
    OupdataActive (index, isChannelShow = true) {
      // console.log(index + '这是子组件传来的值')s
      // 重新给active赋值
      this.active = index
      // 点击关闭弹窗
      this.isChannelShow = isChannelShow
    },
    // 点击图标弹出
    showPopup () {
      // console.log('1')
    },
    ClickPopUp () {
      this.isChannelShow = true
    },
    // 点击输入框跳转页面
    InputKeyword () {
      this.$router.push('search')
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  height: 79vh;
  /deep/ .navtwo-box {
    width: 100%;
    position: fixed;
    padding-top: 106px;
    // background-color: red;
    z-index: 99;
  }

  .nav-box {
    position: fixed;
    // top: 20px;
    width: 100%;
    z-index: 999;
  }
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
  .poput-tanchu {
    width: 100%;
    height: 100%;
  }
}
</style>
