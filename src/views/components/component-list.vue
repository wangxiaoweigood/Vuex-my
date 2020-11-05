<!-- vue 快捷方式 -->
<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :error.sync="error"
    error-text="请求失败，点击重新加载"
    @load="onLoad"
  >
    <comment-item v-for="(item, index) in list" :key="index" :comment="item" />
  </van-list>
</template>

<script>
import { getComments } from '../../api/commit'
import CommentItem from './comment-ltem'
export default {
  name: 'ComponentList',
  props: {
    source: {
      type: [String, Object, Number],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  components: { CommentItem },
  data () {
    // 这里存放数据
    return {
      // list: [],
      loading: false,
      finished: false,
      error: false,
      offset: null, // 获取下一页的标记
      limit: 10
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async onLoad () {
      // console.log(this.source.toString())
      try {
        const { data: res } = await getComments({
          type: 'a',
          source: this.source.toString(),
          offset: this.offset,
          limit: this.limit
        })
        const results = res.data.results
        this.$emit('onloads_success', res.data)
        this.list.push(...results)
        this.loading = false
        if (results.length) {
          this.offset = res.data.last_id
        } else {
          this.finished = true
        }
      } catch (err) {
        console.log(err)
        this.error = true
        this.loading = false
      }
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.onLoad()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {},
  beforeCreate () {}, // 生命周期 - 创建之前
  beforeMount () {}, // 生命周期 - 挂载之前
  beforeUpdate () {}, // 生命周期 - 更新之前
  updated () {}, // 生命周期 - 更新之后
  beforeDestroy () {}, // 生命周期 - 销毁之前
  destroyed () {}, // 生命周期 - 销毁完成
  activated () {} // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
</style>
