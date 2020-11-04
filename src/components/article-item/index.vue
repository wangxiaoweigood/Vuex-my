<template>
  <!-- <div class="article-item">文章列表内容</div> -->

  <van-cell class="article-item" :to="`/article/${article.art_id.toString()}`">
    <div slot="title" class="van-multi-ellipsis--l2">{{ article.title }}</div>
    <div slot="label">
      <!-- 下方三个图片的 -->
      <div slot="label" class="cover-imgs" v-if="article.cover.type === 3">
        <div
          v-for="(img, index) in article.cover.images"
          :key="index"
          class="cover-item"
        >
          <van-image :src="img" class="cover-item-img" />
        </div>
      </div>
      <!-- 下方文字 -->
      <div class="title">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>
    <!-- 右侧图片 -->
    <div slot="default" v-if="article.cover.type === 1">
      <van-image
        class="default-img"
        fit="cover"
        :src="article.cover.images[0]"
      />
    </div>
  </van-cell>
</template>

<script>
export default {
  name: 'Article-item',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.article-item {
  .title {
    color: #b4b4b4;
    font-size: 20px;
    // padding-top: 5px;

    div {
      color: red;
    }
    span {
      padding-right: 20px;
    }
  }
  .title span:nth-child(1) {
    color: red;
  }
  .article-item {
    padding-right: 100px !important;
  }
  .cover-imgs {
    display: flex;

    .cover-item {
      padding: 30px 0;
      flex: 1;
      height: 146px;
      margin-right: 10px;
      .cover-item-img {
        width: 100%;
        height: 146px;
      }
    }
  }
  .van-cell__value {
    // flex:un;
    flex: unset;
    width: 232px !important;
    height: 146px !important;
  }
  .default-img {
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }
}
</style>
