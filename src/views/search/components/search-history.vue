<template>
  <div>
    <!-- 搜索历史区域 -->
    <van-cell-group>
      <van-cell title="历史记录">
        <span>全部删除</span>&nbsp;&nbsp;
        <span>完成</span>
        <van-icon name="delete" />
      </van-cell>
      <van-cell :title="item" v-for="(item, index) in searchList" :key="index">
        <van-icon name="close" />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'searchlist',
  props: {
    searchList: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>
</style>
