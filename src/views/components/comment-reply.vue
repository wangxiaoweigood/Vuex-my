<!-- vue 快捷方式 -->
<template>
  <div class="comment-reply">
    <!-- 导航栏 -->
    <van-nav-bar :title="`${comment.reply_count}条回复`">
      <van-icon slot="left" name="cross" @click="$emit('close')" />
    </van-nav-bar>
    <!-- /导航栏 -->

    <div class="scor-word">
      <!-- 当前评论项 -->
      <comment-item :comment="comment" />
      <!-- /当前评论项 -->

      <van-cell title="所有回复" />

      <!-- 评论的回复列表 -->
      <component-list :source="comment.com_id" type="c" :list="commentList" />
      <!-- /评论的回复列表 -->
    </div>

    <!-- 底部 -->
    <div class="replu-top">
      <van-button size="small" round @click="Repbut">回复</van-button>
    </div>
    <!-- /底部 -->
    <!-- 发布回复弹出层 -->
    <van-popup v-model="RepShow" position="bottom">
      <comment-post :targets="comment.com_id" @posh-success="onPostSuccess" />
    </van-popup>
    <!-- 发布回复弹出层 -->
  </div>
</template>

<script>
import CommentItem from './comment-ltem'
import ComponentList from '../components/component-list'
import CommentPost from '../components/comment-post'
export default {
  name: 'CommentReply',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  // import引入的组件需要注入到对象中才能使用
  components: {
    CommentItem,
    ComponentList,
    CommentPost
  },
  data () {
    // 这里存放数据
    return {
      RepShow: false,
      commentList: [] // 评论的回复列表
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    Repbut () {
      this.RepShow = true
    },
    onPostSuccess (data) {
      //   console.log(data)
      this.comment.reply_count++
      this.RepShow = false
      this.commentList.unshift(data.new_obj)
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
.scor-word {
  //   background-color: red;
  position: fixed;
  top: 93px;
  right: 0;
  left: 0;
  bottom: 88px;
  overflow-y: auto;
}
.replu-top {
  // width: 100%;
  height: 90px;
  display: flex;
  justify-content: center;
  //   align-content: center;
  align-items: center;

  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  border-top: 1px #ccc solid;
  font-size: 30px;
  .van-button {
    width: 60%;
    border: 1px #ccc solid;
  }
}
</style>
