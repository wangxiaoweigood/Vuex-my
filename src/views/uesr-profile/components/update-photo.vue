<!-- vue 快捷方式 -->
<template>
  <div class="update-photo">
    <img :src="imgs" class="imgs" ref="imgs" />

    <div class="puoto-but">
      <van-button type="default" @click="$emit('close')">取消</van-button
      ><van-button type="default" @click="onConfirm">完成</van-button>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updateUserImg } from '@/api/user'
export default {
  name: 'UpdatePhoto',
  props: {
    imgs: {
      type: [String, Object],
      required: true
    }
  },
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    // 这里存放数据
    return {
      cropper: null
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合

  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    const image = this.$refs.imgs
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false
    })
  },
  methods: {
    onConfirm () {
      this.$emit('close')
      //   console.log(new Cropper())
      this.cropper.getCroppedCanvas().toBlob(async (blob) => {
        console.log(blob)
        const formData = new FormData()
        formData.append('photo', blob)
        const { data: res } = await updateUserImg(formData)
        console.log(res.data.photo)

        this.$emit('updata-photo', res.data.photo)
      })
    }
  },
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

.update-photo {
  background-color: #000;
  height: 100%;
  .imgs {
    max-width: 100%;
    display: block;
  }
  .puoto-but {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    // flex-wrap: wrap;
    justify-content: space-between;
    .van-button {
      width: 120px;
      height: 120px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #000;
      color: #fff;
      border: none;
    }
  }
}
</style>
