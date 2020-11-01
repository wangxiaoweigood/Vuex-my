<template>
  <div>
    <!-- 搜索结果区域 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, index) in searchList"
        :key="index"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchLenovo } from '@/api/search'
export default {
  name: 'result',
  data () {
    return {
      searchList: [], // 搜索的所有数据
      loading: false,
      finished: false,
      error: false,
      page: 1,
      per_page: 10
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      try {
        const { data: res } = await getSearchLenovo({
          page: this.page, // 页码
          per_page: this.per_page, // 每页的数量
          q: this.searchText
        })
        // console.log(res)
        const { results } = res.data
        this.searchList.push(...results)
        this.loading = false
        if (results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
        this.$toast('数据加载失败请稍后再试', err)
      }
    }
  }
}
</script>

<style>
</style>
