<template>
  <div>
    <!-- 联想建议 -->
    <van-cell-group>
      <van-cell
        v-for="(text, index) in suggest"
        :key="index"
        icon="search"
        @click="$emit('search', text)"
      >
        <div v-html="highlight(text)" slot="title"></div>
      </van-cell>
    </van-cell-group>
  </div>
</template>
<script>
import { getSearchLenovoSuggest } from '@/api/search'
import { debounce } from 'lodash' // 加载Lodash里的debounce的函数
export default {
  name: 'suggestion',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggest: [] // 联想建议数据
    }
  },
  comments: {},
  //   用来监视的函数
  watch: {
    searchText: {
      // 该回调将会在侦听开始之后被立即调用
      //   handler (val) {
      //     // console.log(val)
      //     this.LenovoSuggest(val)
      //   },
      // 做节流优化
      handler: debounce(function (val) {
        // console.log(val + '111')
        this.LenovoSuggest(val)
      }, 300),
      immediate: true
    }
  },
  methods: {
    async LenovoSuggest (q) {
      try {
        const res = await getSearchLenovoSuggest(q)
        // console.log(res)
        this.suggest = res.data.data.options
        // console.log(res)
      } catch (err) {
        console.log(err)
      }
    },
    highlight (text) {
      //   console.log(text)
      //   return 123
      const highlightStr = `<span class="sarch-font">${this.searchText}</span>`
      //   定义一个正则
      //   g是全局i忽略大小写
      const reg = new RegExp(this.searchText, 'ig')
      return text.replace(reg, highlightStr)
    }
  },

  mounted () {}
}
</script>
<style lang="less" scoped>
/deep/ .sarch-font {
  color: red;
}
</style>
