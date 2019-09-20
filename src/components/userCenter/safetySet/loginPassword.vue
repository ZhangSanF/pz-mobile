<template>
  <div class="login-pwd">
    <SecondHader headerTitle="登录密码"/>
    <ul class="ul-box">
      <li class="list-item">
        <p>原登录密码</p>
        <div class="right">
            <van-cell-group>
                <van-field v-model.trim="loginPwd.oldPassword" placeholder="请填写旧的登录密码" type="password"/>
            </van-cell-group>
        </div>
      </li>
      <li class="list-item">
        <p>新登录密码</p>
        <div class="right">
            <van-cell-group>
                <van-field v-model.trim="loginPwd.newPassword" placeholder="请填写新的登录密码" type="password"/>
            </van-cell-group>
        </div>
      </li>
      <li class="list-item">
        <p>确认新密码</p>
        <div class="right">
            <van-cell-group>
                <van-field v-model.trim="loginPwd.confirmNewPassword" placeholder="请确认新的登录密码" type="password"/>
            </van-cell-group>
        </div>
      </li>
    </ul>
    <div class="real-btn" @click="modifyLoginPwd">确定修改</div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
import SecondHader from "@/components/common/SecondHader"
import md5 from 'js-md5'
import { password } from '@/config/rules.js'

export default {
  components: { SecondHader },
  data() {
    return {
      loginPwd:{
        oldPassword:'',
        newPassword:'',
        confirmNewPassword:''
      },
    }
  },
  methods: {
    ...mapActions(['setLoginPassWord']),
    modifyLoginPwd() {
      if(!this.loginPwd.oldPassword || !this.loginPwd.newPassword || !this.loginPwd.confirmNewPassword) {
        return this.$Toast.fail('请填写完整信息')
      }
      if(password.test(this.loginPwd.oldPassword) && password.test(this.loginPwd.newPassword) && password.test(this.loginPwd.confirmNewPassword)) {
        const params = {
          oldPassword: md5(this.loginPwd.oldPassword),
          newPassword: md5(this.loginPwd.newPassword),
          confirmNewPassword: md5(this.loginPwd.confirmNewPassword)
        }
        this.setLoginPassWord(params).then((res) => {
          if(res.code == 200) {
              this.$Toast.success(res.message)
              this.$router.replace('/safetySet')
          }
      })
      }else {
        this.$Toast.fail('密码必须由6-20位字母和数字符号之间的两种组合')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-pwd{
  .ul-box{
    margin-top: px2rem(20px);
    padding-left: px2rem(30px);
    background: #fff;
    .list-item{
      display: flex;
      justify-content: space-between;
      border-bottom: px2rem(1px) solid $home-line-color;
      padding-right: px2rem(30px);
      height: px2rem(80px);
      box-sizing: border-box;
      align-items: center;
      color: #333;
      font-size: px2rem(28px); 
      .right{
        flex: 1;
        padding-left: px2rem(30px);
        overflow: hidden;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: px2rem(78px);
      }
    }   
    .list-item:last-child{
      border-bottom: none;
    }
  }
  .real-btn{
    margin: px2rem(30px) px2rem(48px) 0;
    background: $home-color;
    border-radius: 4px;
    color: #fff;
    text-align: center;
    font-size: px2rem(26px);
    padding: px2rem(20px) 0;
  }
}
</style>
<style lang="scss">
.login-pwd{
  .van-cell{
    padding: 0;
  }
  .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after{
    border: none;
  }
}
</style>