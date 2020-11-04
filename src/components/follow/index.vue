<!-- vue 快捷方式 -->
<template>
  <van-button
    @click="onFollow"
    v-if="value"
    class="follow-btn"
    round
    size="small"
    :loading="Loading"
    >已关注</van-button
  >
  <van-button
    v-else
    @click="onFollow"
    :loading="Loading"
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    >关注</van-button
  >
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { followUser, unFollowUser } from '@/api/user'
export default {
  name: 'isFollowed',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [Number, String, Object],
      required: true
    }
  },
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    // 这里存放数据
    return {
      Loading: false
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    // 点击关注//取消关注区域
    async onFollow () {
      this.Loading = true
      try {
        if (this.value) {
          // 已关注 就取消
          await unFollowUser(this.userId)
        } else {
          // 未关注 就关注
          await followUser(this.userId)
        }
        // this.article.is_followed = !this.article.is_followed
        // this.$emit('updata-is_followed', !this.value)
        this.$emit('input', !this.value)
      } catch (err) {
        this.$toast('设置失败请稍后再试')
        if (err.response && err.response.status === 400) {
          this.$toast('不可以关注自己！')
        }
      }
      this.Loading = false
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
<style lang='lcss' scoped>
/* @import url(); 引入公共css类 */
</style>
