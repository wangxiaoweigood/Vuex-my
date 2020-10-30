<template>
  <!-- 点击弹出 展示我的频道模块 -->
  <!-- 我的频道 -->
  <div class="channle-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        type="danger"
        class="but"
        plain
        round
        size="mini"
        @click="ClickEdit"
        >{{ shou ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        @click="MyChannel(item, index)"
        v-for="(item, index) in myChannels"
        :key="index"
        class="grid-item"
      >
        <div>
          <span
            class="icon- icon-ai54 icon-shanchu"
            v-show="shou && !FixedChannel.includes(item.id)"
          ></span>
          <span class="item" :class="{ active: index === active }">{{
            item.name
          }}</span>
        </div>
      </van-grid-item>
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">所有频道</div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        class="channel-item"
        v-for="(item, index) in recommendChannels"
        :key="index"
      >
        <span
          class="icon- icon-zengjia icon-shanchu"
          style="color: blue"
        ></span>
        <span class="channel" @click="ClickOnAdd(item)">{{ item.name }}</span>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { Channel, AddUserChannel, DeleteSpecifiedUser } from '@/api/user.js' // 所有频道接口 and 批量修改用户频道列表（部分覆盖）
import { mapState } from 'vuex'
import { setItem } from '../../utils/storage' // 吧setitem方法调用进来
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      channelsList: [],
      shou: false,
      FixedChannel: [0, 1, 11, 4]
    }
  },
  computed: {
    ...mapState(['user']),
    recommendChannels () {
      // 先声明一个空数组
      const arr = []
      // console.log(arr)

      this.channelsList.forEach((channels) => {
        const ret = this.myChannels.find((item) => {
          return item.id === channels.id
        })
        if (!ret) {
          arr.push(channels)
        }
      })
      return arr
    }
  },
  created () {
    this.AllChannels()
  },

  methods: {
    async AllChannels () {
      try {
        const { data: res } = await Channel()
        // console.log(res.data.channels)
        const channels = res.data.channels

        this.channelsList = channels
      } catch (err) {
        console.log(err)
      }
    },
    // 点击推荐频道添加到我的频道
    async ClickOnAdd (arr) {
      // console.log(arr.id + '1111')
      //   console.log(arr)
      this.myChannels.push(arr)
      // 数据持久化处理
      if (this.user) {
        // 已登录就吧数据放到后台数据里
        try {
          const res = await AddUserChannel({
            id: arr.id,
            seq: this.myChannels.length
          })
          console.log(res)
        } catch (err) {
          console.log(err)
          this.$toast('保存失败', err)
        }
      } else {
        // 未登录就吧数据放到本地
        setItem('TOTIAO_CHANNELS', this.myChannels)
      }
    },
    // 点击编辑按钮区域
    ClickEdit () {
      this.shou = !this.shou
    },
    // 点击我的频道里的内容去跳转对应的页面
    MyChannel (item, index) {
      console.log(item, index)
      if (this.shou) {
        if (this.FixedChannel.includes(item.id)) {
          return
        }
        // 非编辑状态执行删除操作
        if (index <= this.active) {
          this.$emit('updata-active', this.active - 1, true)
        }
        this.myChannels.splice(index, 1)
        // 点击删除持久话操作
        this.deleteChannel(item)
      } else {
        // 实现跳转对应的页面
        this.$emit('updata-active', index, false) // 给父组件传递本页点击的下标索引home页
      }
    },
    async deleteChannel (item) {
      try {
        if (this.user) {
          // 已登录
          await DeleteSpecifiedUser(item.id)
        } else {
          // 未登录
          setItem('TOTIAO_CHANNELS', this.myChannels)
        }
      } catch (err) {
        this.$toast('删除失败,请稍后重试', err)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.van-grid-item__text {
  font-style: 12px;
}
.active {
  color: red !important;
  //   background-color: red;
}
.icon-shanchu {
  // background-color: red;
  position: absolute;
  right: 0;
  top: -20px;
}
.channle-edit {
  padding: 85px 0;
  .but {
    width: 104px;
    height: 48px;
  }
  /deep/.title-text,
  .item {
    display: flex;
    flex-direction: row;
    font-size: 32px;
    color: #000;
    margin-top: 0;
  }
  .grid-item {
    width: 160px;
    height: 84px;
  }
}
/deep/ .recommend-grid {
  .van-grid-item__content {
    flex-direction: row;
    color: #222;
    .van-icon,
    .channel {
      font-size: 24px;
    }

    .van-grid-item__text {
      font-size: 28px;
      margin-top: 0;
    }
  }
}
/deep/ .van-icon-close {
  position: absolute;
  right: -10px;
  top: -10px;
  font-size: 36px;
  color: #ccc;
}
</style>
