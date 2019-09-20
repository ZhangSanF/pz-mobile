<template>
  <div class="pay-pwd">
    <SecondHader headerTitle="支付密码"/>
    <!-- 初始化支付密码 -->
    <div v-if="!getUserInfo.is_pay_password">
      <ul class="ul-box">
        <li class="list-item" >
          <p>支付密码</p>
          <div class="right">
              <van-cell-group>
                  <van-field v-model.trim="setPayPwdForm.newPassword" placeholder="请填写支付密码" type="password"/>
              </van-cell-group>
          </div>
        </li>
        <li class="list-item">
          <p>确认密码</p>
          <div class="right">
              <van-cell-group>
                  <van-field v-model.trim="setPayPwdForm.confirmNewPassword" placeholder="请确认支付密码" type="password"/>
              </van-cell-group>
          </div>
        </li>
      </ul>
    </div>
    <!-- 修改支付密码 -->
    <ul class="ul-box" v-else>
      <li class="list-item" >
        <p>原支付密码</p>
        <div class="right">
            <van-cell-group>
                <van-field v-model.trim="setPayPwdForm.oldPassword" placeholder="请填写旧的支付密码" type="password"/>
            </van-cell-group>
        </div>
      </li>
      <li class="list-item">
        <p>新支付密码</p>
        <div class="right">
            <van-cell-group>
                <van-field v-model.trim="setPayPwdForm.newPassword" placeholder="请填写新的支付密码" type="password"/>
            </van-cell-group>
        </div>
      </li>
      <li class="list-item">
        <p>确认新密码</p>
        <div class="right">
            <van-cell-group>
                <van-field v-model.trim="setPayPwdForm.confirmNewPassword" placeholder="请确认新的支付密码" type="password"/>
            </van-cell-group>
        </div>
      </li>
    </ul>
    <div class="real-btn" @click="modifyPayPwd" v-if="getUserInfo.is_pay_password">确定修改</div>
    <div class="real-btn" @click="modifyPayPwd" v-else>设置支付密码</div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
import SecondHader from "@/components/common/SecondHader"
import { payPassword } from '@/config/rules.js'
import md5 from 'js-md5'

export default {
  components: { SecondHader },
  data() {
    return {
      setPayPwdForm:{
        oldPassword:'',
        newPassword:'',
        confirmNewPassword:''
      },
    }
  },
  methods: {
    ...mapActions(['setPayPassWord']),
    modifyPayPwd() {
      // 第一次设置支付密码
      if(!this.getUserInfo.is_pay_password) {
        if(!this.setPayPwdForm.newPassword || !this.setPayPwdForm.confirmNewPassword) {
          return this.$Toast.fail('请填写完整信息')
        }
        if(payPassword.test(this.setPayPwdForm.newPassword) && payPassword.test(this.setPayPwdForm.confirmNewPassword)) {
          const params = {
            oldPassword: '',
            newPassword: md5(this.setPayPwdForm.newPassword),
            confirmNewPassword: md5(this.setPayPwdForm.confirmNewPassword)
          }
          this.setPayPassWord(params).then(res=>{
            if(res.code == 200){
              this.$store.commit('PAY_PASS', {is_pay_password: true})
              this.$Toast.success(res.message)
              this.$router.replace('/safetySet')
            }
          })
        }else {
          this.$Toast.fail('密码必须由6-20位字母和数字符号之间的两种组合')
        }
      }else {// 修改
        if(!this.setPayPwdForm.oldPassword || !this.setPayPwdForm.newPassword || !this.setPayPwdForm.confirmNewPassword) {
          return this.$Toast.fail('请填写完整信息')
        }
        if(
          payPassword.test(this.setPayPwdForm.oldPassword) && 
          payPassword.test(this.setPayPwdForm.newPassword) && 
          payPassword.test(this.setPayPwdForm.confirmNewPassword)) {
          const params = {
            oldPassword: md5(this.setPayPwdForm.oldPassword),
            newPassword: md5(this.setPayPwdForm.newPassword),
            confirmNewPassword: md5(this.setPayPwdForm.confirmNewPassword)
          }
          this.setPayPassWord(params).then(res=>{
            if(res.code == 200){
              this.$Toast.success(res.message)
              this.$router.replace('/safetySet')
            }
          })
        }else {
          this.$Toast.fail('密码必须由6-20位字母和数字符号之间的两种组合')
        }
      }
    },
  },
  computed: {
    ...mapGetters(['getUserInfo'])
  }
}
</script>

<style lang="scss" scoped>
.pay-pwd{
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
.pay-pwd{
  .van-cell{
    padding: 0;
  }
  .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after{
    border: none;
  }
}
</style>