<template>
  <div class="box">
    <!-- 搜索框区域 -->
    <!-- 在van-search标签外包一个Form表单在添加一个action属性并且值不为空在ios系统上手机的输入框自动有收索功能 -->
    <!-- show-action显示右边取消按钮 -->
    <form action="/">
      <van-search
        class="nav-search"
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @clear="onRemove"
      />
    </form>
    <!-- /搜索框区域 -->

    <!-- 搜索结果区域 -->
    <search-result v-if="isResultShow" :search-text="searchText" />
    <!-- /搜索结果区域 -->

    <!-- 联想建议区域 -->
    <search-suggestion
      @search="onSearch"
      v-else-if="searchText"
      :search-text="searchText"
      class="search-del"
    />
    <!-- /联想建议区域 -->

    <!-- 搜索历史记录区域 -->
    <search-history v-else :search-list="searchlist" />
    <!-- /搜索历史记录区域 -->
  </div>
</template>

<script>
import SearchHistory from '../search/components/search-history' // 导入模块
import SearchSuggestion from '../search/components/search-suggestion' // 导入模块
import SearchResult from '../search/components/search-result' // 导入模块

export default {
  name: 'search',
  data () {
    return {
      searchText: '',
      searchlist: [],
      isResultShow: false
    }
  },
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  props: {},
  methods: {
    // 监听输入框输完的内容val就是输入框里的内容
    onSearch (val) {
      //   console.log(val)
      const index = this.searchlist.indexOf(val)
      if (index !== -1) {
        this.searchlist.splice(index, 1)
      }
      this.searchlist.unshift(val)
      this.isResultShow = true
    },
    // 取消按钮
    onCancel () {
      //   console.log('onCancel')
      this.$router.back(-1)
    },
    // 点清除小按钮事件
    onRemove () {
      //   console.log('1')
      this.isResultShow = false
    }
  }
}
</script>
<style lang="less" scoped>
.box {
  padding-top: 108px;
}
.nav-search {
  position: fixed;
  z-index: 1;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  background-color: #3296fa;
  .van-search__action {
    color: #fff;
  }
  .search-del {
    background-color: red;
  }
}
</style>
