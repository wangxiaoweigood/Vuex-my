<template>
  <div class="box">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :success-text="refreshSuccess"
    >
      <van-list
        class="lessss"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <article-item
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        ></article-item>

        <!-- <van-cell
          v-for="(item, index) in list"
          :key="index"
          :title="item.title"
        /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '../../api/article'
// import Articleitem from '../../components/article-item/index'
import ArticleItem from '../../components/article-item'
// import ArticleList from '../components/article-list'
export default {
  name: 'articleitem',

  data () {
    return {
      list: [], // 存放数据的
      loading: false, // 控制加载中
      finished: false, // 控制加载完
      error: false, // 控制加载错误
      timestamp: null, // 定义新的时间戳
      isLoading: true, // 下拉刷新
      refreshSuccess: '' // 下拉刷新成功的文字
    }
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  components: {
    ArticleItem
  },
  created () {},
  methods: {
    //   请求列表区域
    async onLoad () {
      try {
        const { data: res } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: '1'
        })
        // if (Math.random() > 0.5) {
        //   JSON.parse('dsnajndjsa')
        // }
        console.log(res.data)
        const { results } = res.data
        this.list.push(...results)
        console.log(this.list)
        this.loading = false
        if (results.length) {
          this.timestamp = res.data.pre_timestamp
        }
        this.finished = true
      } catch (err) {
        // this.$toase.fail('登录失败', err)
        this.error = true
        this.loading = false
      }
    },
    async onRefresh () {
      try {
        const { data: res } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: '1'
        })
        // this.$toase.success('1')
        const { results } = res.data
        console.log(results)
        this.list.unshift(...results)
        this.isLoading = false
        this.refreshSuccess = '刷新成功!'
        // this.$toast.success('登录成功')
        this.$toast.success(`更新了${results.length}条`)

        console.log(res)
      } catch (err) {
        // this.$toase.fail('登录失败', err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  height: 100%;
  z-index: 99;
  padding-top: 65px;
  padding-bottom: 100px;
  overflow-y: auto;
  // background-color: red;
}
</style>
