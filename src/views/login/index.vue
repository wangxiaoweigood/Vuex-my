<template>
  <!-- <div ></div> -->
  <div class="box" id="app">
    <!-- 导航栏 -->

    <van-nav-bar class="page-nav-bar" name="" title="登录"
      ><van-icon name="arrow-left"
    /></van-nav-bar>

    <!-- 登录区域 -->
    <van-form @submit="onSubmit" ref="LoginForm">
      <van-field
        name="mobile"
        :rules="FormRules.mobile"
        type="number"
        placeholder="请输入手机号"
        v-model="user.mobile"
      >
        <!-- <van-field
        type="number"
        placeholder="请输入手机号"
        v-model="user.mobile"
        :rules="FormRules.name"
      > -->
        <i slot="left-icon" class="icon- icon-dengluyonghuming"></i>
      </van-field>

      <van-field
        left-icon="icon-dengluyonghuming"
        type="password"
        name="code"
        placeholder="请输入验证码/密码"
        v-model="user.code"
        :rules="FormRules.code"
        maxlength="6"
      >
        <i slot="left-icon" class="icon- icon-denglu-mima"></i>
        <template #button>
          <van-count-down
            @finish="Countdown = false"
            v-if="Countdown"
            :time="10000 * 0.5"
            format="ss s"
          />
          <van-button
            v-else
            size="small"
            type="primary"
            class="van-button-but"
            @click="Captcha"
            native-type="button"
            >获取验证码</van-button
          >
        </template></van-field
      >
      <div class="login-but">
        <van-button block type="info" native-type="submit"> 登录 </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
// import { login } from "@/api/user";

export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      FormRules: {
        mobile: [
          {
            required: true,
            message: '请填写手机号码'
          },
          {
            pattern: /^1[3|4|5|7|8][0-9]{9}$/,
            message: '手机格式错误'
          }
        ],
        code: [
          {
            require: true,
            message: '请填写密码/验证码'
          },
          {
            pattern: /^\d{6}$/,
            message: '格式错误'
          }
        ]
      },
      Countdown: false // 控制是否显示倒计时
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 表单事件
    async onSubmit () {
      console.log(this.user)
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续事件，如果另外生效了提醒上一个提醒就会关闭
      })
      try {
        const { data } = await login(this.user)
        // console.log(data)
        this.$store.commit('setUser', data.data)
        console.log(data.data)
        this.$router.push('layout')
        this.$toast.success('登录成功')
      } catch (err) {
        // console.log(err)
        if (err.status !== 201) {
          this.$toast.fail('登录失败')
        }
      }
    },
    // 点击验证码事件
    async Captcha () {
      // 1 验证手机号码。
      try {
        await this.$refs.LoginForm.validate('mobile')
      } catch (err) {
        return console.log('验证失败', err)
      }
      // 2 倒计时
      this.Countdown = true
      // // 3发送验证码
      try {
        console.log(this.user.mobile)
        await sendSms(this.user.mobile)
      } catch (err) {
        console.log('发送失败', err)
        // if (err.response.status === 429) {
        this.$toast.fail('请60秒后点击发送')
        // } else {
        //   this.$toast('发送失败,请重试')
        // }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  background: url("../../img/1433263250c022089d88ad95eaa6a535.jpg") no-repeat
    0px 0px;
  width: 100%;
  height: 100%;
  background-size: cover;
  font-size: 37px;
  .van-button-but {
    background: rgba(255, 255, 255, 0.3) !important;
    width: 180px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    color: #1054d1;
    font-size: 12px !important;
    border-radius: 25px;
  }
  .login-but {
    padding: 53px 33px;
    border: none;
  }
  .van-field__body {
    padding-left: 15px;
  }
  .icon-dengluyonghuming,
  .icon-denglu-mima {
    margin-right: 15px;
  }
  .van-cell,
  .van-field__value {
    background: rgba(255, 255, 255, 0.1) !important;
    margin-top: 40px;
    border-radius: 100px;
  }
}
// .page-nav-bar {
//   border: none;
// }
</style>
