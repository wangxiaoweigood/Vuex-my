<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      title="黑马头条"
      left-text="返回"
      @click-left="onClickLeft"
      left-arrow
    />
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="logding">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | relativeTime }}
          </div>
          <!-- <follow-user
            class="follow-btn"
            :is-followed="article.is_followed"
            :user-id="article.aut_id"
            @updata-is_followed="article.is_followed = $event"
          /> -->
          <!-- 关注//取消按钮 -->
          <follow-user
            class="follow-btn"
            :user-id="article.aut_id"
            v-model="article.is_followed"
          />
          <!-- /关注//取消按钮 -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="article.content"
          ref="article.content"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- <component-list
          :list="commentList"
          :source="article.art_id"
          @onloads_success="totalCount = $event.total_count"
        /> -->
        <component-list
          @reqly-click="OnReqlyClick"
          :list="commentList"
          :source="article.art_id"
          @onloads_success="totalCounts"
        />

        <!-- /文章内容 -->
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="showPopup"
            >写评论</van-button
          >
          <van-icon name="comment-o" :info="totalCount" color="#777" />

          <collect-article
            v-model="article.is_collected"
            :article-id="article.art_id"
          />
          <like-articel
            v-model="article.attitude"
            :article-id="article.art_id"
          />
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
        <!-- 评论弹出层 -->
        <!-- <van-cell is-link>展示弹出层</van-cell> -->
        <van-popup v-model="show" position="bottom">
          <!-- 输入内容 -->
          <component-post
            :targets="article.art_id"
            @posh-success="onPostSuccess"
          />
        </van-popup>
      </div>

      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
    <!-- 评论回复弹出层 -->
    <van-popup
      v-model="isReplyShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <comment-reply
        :comment="currentComment"
        @close="isReplyShow = false"
        v-if="isReplyShow"
      />
    </van-popup>
    <!-- 评论回复弹出层 -->
  </div>
</template>

<script>
import { ImagePreview } from 'vant' // 图片预览
import { getArticleById } from '@/api/article'
import FollowUser from '@/components/follow/index'
import CollectArticle from '@/components/collect-article'
import LikeArticel from '@/components/like-article'
import ComponentList from '../components/component-list'
import ComponentPost from '../components/comment-post'
import CommentReply from '../components/comment-reply'
export default {
  name: 'ArticleIndex',
  components: {
    FollowUser,
    CollectArticle,
    LikeArticel,
    ComponentList,
    ComponentPost,
    CommentReply
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  // 给所有子组件传值
  provide: function () {
    return {
      articleId: this.articleId
    }
  },
  data () {
    return {
      article: {},
      logding: true, // 控制是否显示加载成功//失败
      errStatus: 0, // 失败的状态码
      closeable: true,
      articleContent: {}, // 图片数据
      followLoading: false,
      totalCount: 0,
      show: false,
      commentList: [], // 评论列表
      isReplyShow: false, // 评论回复弹出层
      currentComment: [] // 子子组件传来的回复内容
    }
  },
  computed: {},

  watch: {},
  created () {
    this.loadArticle()
    // this.totalCounts()
  },
  mounted () {},
  methods: {
    // 点击返回上一层
    onClickLeft () {
      this.$router.go(-1)
    },
    async loadArticle () {
      try {
        const { data: res } = await getArticleById(this.articleId)
        this.article = res.data
        setTimeout(() => {
          this.previrwImagr()
        }, 0)
      } catch (err) {
        // console.log(err)
        if (err.responsr && err.responsr.status === 404) {
          this.errStatus = 404
        }
      }
      this.logding = false
    },
    // 点击预览图片事件
    previrwImagr () {
      const articleContent = this.$refs['article.content']
      const Imgs = articleContent.querySelectorAll('img')
      const images = []
      Imgs.forEach((img, index) => {
        images.push(img.src)
        img.onclick = () => {
          ImagePreview({
            images,
            startPosition: index
          })
        }
      })
    },
    totalCounts (toto) {
      this.totalCount = toto.total_count
    },
    // 点击评论展示弹出层
    showPopup () {
      this.show = true
    },
    // 子组件传来的值关闭弹出层
    onPostSuccess (data) {
      this.show = false
      this.commentList.unshift(data.new_obj)
      // this.loadArticle()
    },
    // 子组件的子组件传来的值点击回复按钮弹出回复弹出层
    OnReqlyClick (comment) {
      // comment是子组件的子组件传来的当前点击回复的内容
      // console.log(comment)
      this.currentComment = comment
      this.isReplyShow = true
    }
  }
}
</script>
<style scoped lang="less">
@import "./github-markdown.css";
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      // background-color: red;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
