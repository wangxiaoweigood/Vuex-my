<!-- vue 快捷方式 -->
<template>
  <van-icon
    :name="value === 1 ? 'good-job' : 'good-job-o'"
    :class="{
      liked: value === 1,
    }"
    @click="onCollect"
  />
</template>

<script>
import { GiveLike, CancelThumbUp } from '../../api/article'
export default {
  name: 'LikeArticel',
  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
      type: [Object, String, Number],
      required: true
    }
  },
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    // 这里存放数据
    return {
      loading: false
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async onCollect () {
      this.loading = true

      try {
        let status = -1
        if (this.value === 1) {
          // 已点赞实现取消赞
          await CancelThumbUp(this.articleId)
        } else {
          await GiveLike(this.articleId)
          status = 1
        }
        // console.log(this.status)
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
        this.$emit('input', status)
      } catch (err) {
        this.$toast('设置失败')
        console.log(err)
      }
      this.loading = false
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {},
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
.van-icon {
  color: #e5645f;
}
</style>
