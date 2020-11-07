<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      class="post-btn"
      @click="onAddComment"
      :disabled="!message.length"
      >发布</van-button
    >
  </div>
</template>

<script>
import { addComment } from '@/api/commit'
export default {
  name: 'CommentPost',
  components: {},
  props: {
    targets: {
      type: [Object, String, Number],
      required: true
    }
  },
  inject: {
    articleId: {
      type: [Object, String, Number],
      default: null
    }
  },
  data () {
    return {
      message: ''
    }
  },

  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onAddComment () {
      // console.log(this.targets)
      this.$toast.loading({
        message: '发布中',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续事件，如果另外生效了提醒上一个提醒就会关闭
      })
      try {
        // console.log(this.targets.toString())
        const { data: res } = await addComment({
          target: this.targets.toString(),
          content: this.message,
          art_id: this.articleId ? this.articleId.toString() : null
        })
        this.message = ''
        this.$emit('posh-success', res.data)
        this.$toast.success('发布成功')
      } catch (err) {
        console.log(err)
        this.$toast('发布失败,请稍后再试')
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
