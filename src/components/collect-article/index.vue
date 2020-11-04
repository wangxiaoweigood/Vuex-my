<!-- vue 快捷方式 -->
<template>
  <van-icon
    color="#777"
    :name="value ? 'star' : 'star-o'"
    class="{ colleacted:value }"
    @click="Article"
    :loding="loding"
  />
</template>

<script>
import { CollectionArticles, CancellationTheArticle } from '@/api/article'

export default {
  name: 'CollectArticle',
  props: {
    value: {
      type: Boolean,
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
      loding: false
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async Article () {
      this.loding = true
      try {
        if (this.value) {
          // 已收藏。则取消
          await CancellationTheArticle(this.articleId)
          this.$toast.fail('已取消')
        } else {
          // 未收藏则收藏
          await CollectionArticles(this.articleId)
          this.$toast.success('已收藏')
        }
        // 更新视图
        this.$emit('input', !this.value)
      } catch (err) {
        this.$toast('设置失败请稍后重试')
      }
      this.loding = false
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
/* @import url(); 引入公共css类 */

.van-icon {
  color: #ffa500 !important;
}
</style>
