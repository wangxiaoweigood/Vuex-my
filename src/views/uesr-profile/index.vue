<!--  编辑资料主页面 -->
<template>
  <div class="box">
    <!-- 导航栏 -->
    <van-nav-bar
      title="个人信息"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 导航栏 -->

    <!-- 个人信息 -->
    <input type="file" hidden ref="file" @change="onFileChangs" />
    <van-cell-group>
      <van-cell title="头像" is-link @click="$refs.file.click()">
        <van-image round class="avatar" :src="user.photo" />
      </van-cell>
      <van-cell
        title="昵称"
        :value="user.name"
        is-link
        @click="PersonalNickname"
      />
      <van-cell
        title="性别"
        :value="user.gender === 0 ? '女' : '男'"
        is-link
        @click="Gendershow = true"
      />
      <van-cell
        title="生日"
        :value="user.birthday ? user.birthday : '请设置'"
        is-link
        @click="Birthdayshow = true"
      />
    </van-cell-group>

    <!-- /个人信息 -->

    <!-- 点击昵称展示弹出层 -->
    <van-popup v-model="Usmeshow" position="bottom" :style="{ height: '100%' }">
      <update-name
        @close="Usmeshow = false"
        v-model="user.name"
        v-if="Usmeshow"
      />
    </van-popup>
    <!--/ 点击昵称展示弹出层 -->

    <!-- 点击选择性别区域 -->
    <van-popup v-model="Gendershow" position="bottom">
      <update-gender
        @close="Gendershow = false"
        v-model="user.gender"
        v-if="Gendershow"
      />
    </van-popup>
    <!--/ 点击选择性别区域 -->

    <!-- 点击生日弹出框 -->
    <van-popup v-model="Birthdayshow" position="bottom">
      <update-birthday
        v-model="user.birthday"
        @close="Birthdayshow = false"
        v-if="Birthdayshow"
    /></van-popup>
    <!-- 点击生日弹出框 -->

    <!-- 点击图片展示弹出层 -->
    <van-popup
      v-model="isUpDataBirthdayshow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-photo
        v-if="isUpDataBirthdayshow"
        :imgs="img"
        @close="isUpDataBirthdayshow = false"
        @updata-photo="user.photo = $event"
      />
    </van-popup>
    <!-- /点击图片展示弹出层 -->
  </div>
</template>

<script>
import { getPersonal } from '../../api/user'
import UpdateName from '../uesr-profile/components/update-name'
import UpdateGender from '../uesr-profile/components/update-gender'
import UpdateBirthday from '../uesr-profile/components/update-birthday'
import UpdatePhoto from '../uesr-profile/components/update-photo'
export default {
  name: 'Userprofile',
  props: {},
  // import引入的组件需要注入到对象中才能使用
  components: { UpdateName, UpdateGender, UpdateBirthday, UpdatePhoto },
  data () {
    // 这里存放数据
    return {
      user: [],
      Usmeshow: false, // 控制点击昵称展示弹出层
      Gendershow: false,
      Birthdayshow: false,
      isUpDataBirthdayshow: false,
      img: null
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    //   点击左键返回上一层
    onClickLeft () {
      this.$router.back()
    },
    // 请求个人信息主页面数据
    async loadgetPersonal () {
      try {
        const { data: res } = await getPersonal()
        this.user = res.data
        // console.log(this.user.birthday)
      } catch (err) {
        console.log(err)
      }
    },
    // 点击昵称展示弹出层
    PersonalNickname () {
      this.Usmeshow = true
    },
    // 监听选择文件拿到图片地址
    onFileChangs () {
      const file = this.$refs.file.files[0]
      const data = window.URL.createObjectURL(file)
      console.log(data)
      this.img = data
      this.isUpDataBirthdayshow = true
      //   flie-input如果选了同一个文件不会触发change事件,
      //   解决方法就是每次用完以后把他的value清空
      this.$refs.file.value = ''
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.loadgetPersonal()
  },
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
/* @import url(); 引入公共css类 */
.box {
  .van-nav-bar {
    background-color: pink;
  }
  .avatar {
    width: 60px;
    height: 60px;
  }
}
</style>
