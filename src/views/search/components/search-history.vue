<template>
  <div>
    <!-- 搜索历史区域 -->
    <van-cell-group>
      <van-cell title="历史记录">
        <div v-if="accordingTo">
          <span v-show="accordingTo" @click="$emit('delete-all')">全部删除</span
          >&nbsp;&nbsp; <span v-show="accordingTo" @click="ClickOk">完成</span>
        </div>
        <van-icon name="delete" @click="ClickOnDisplay" v-else />
      </van-cell>
      <van-cell
        :title="item"
        v-for="(item, index) in searchList"
        :key="index"
        @click="onSearchClick(item, index)"
      >
        <div v-show="accordingTo">
          <van-icon v-show="accordingTo" name="close" />
        </div>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'searchlist',
  props: {
    searchList: {
      // type: Array,
      required: true
    }
  },
  data () {
    return {
      accordingTo: false
    }
  },
  methods: {
    onSearchClick (item, index) {
      if (this.accordingTo) {
        // 删除事件
        this.searchList.splice(index, 1)
      } else {
        // 跳转事件
        this.$emit('search', item)
        console.log(item)
      }
    },
    //   点击删除图标
    ClickOnDisplay () {
      this.accordingTo = true
    },
    // 点击完成图标
    ClickOk () {
      this.accordingTo = false
    }
  }
}
</script>

<style>
</style>
