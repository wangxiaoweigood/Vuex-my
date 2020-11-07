<!-- 修改用户子页面 -->
<template>
  <div class="update-name">
    <!-- 导航栏 -->
    <van-nav-bar
      title="昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onClickRight"
    />
    <!-- /导航栏 -->

    <div class="flid">
      <!-- 输入框 -->
      <van-field
        v-model="message"
        rows="2"
        autosize
        label=""
        type="textarea"
        maxlength="7"
        placeholder="请输入留言"
        show-word-limit
      />
      <!-- /输入框 -->
    </div>
  </div>
</template>

<script>
import { patchPersinel } from '../../../api/user'
export default {
  name: 'UpdateName',
  props: {
    value: {
      typr: String,
      required: true
    }
  },
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    // 这里存放数据
    return {
      message: this.value
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    // 点击完成修改内容
    async onClickRight () {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true, // 禁止期间点击
        duration: 0
      })
      try {
        if (!this.message) {
          this.$toast('请输入内容')
        }
        await patchPersinel({
          name: this.message
        })
        this.$emit('input', this.message)
        this.$emit('close')
        this.$toast.success('修改成功')
      } catch (err) {
        console.log(err)
      }
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
.update-name {
  background-color: #f5f7f9;
  height: 100%;
}
.flid {
  margin: 20px;
}
</style>
