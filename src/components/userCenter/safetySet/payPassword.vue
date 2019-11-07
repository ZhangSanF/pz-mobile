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
      <div class="btn-common" @click="modifyPayPwd">设置支付密码</div>
    </div>
    <!--  -->
    <div v-else>
      <!-- 修改支付密码 -->
      <div v-if="showState">
        <ul class="ul-box" >
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
        <div class="btn-common" @click="modifyPayPwd">确定修改</div>
        <div class="btn-common" @click="showState = false">找回支付密码</div>
      </div>
      <!-- 找回支付密码 -->
      <div v-else>
        <ul class="ul-box" >
          <li class="list-item" >
            <p>手机号</p>
            <div class="right">
                <van-cell-group>
                  <van-field :value="getUserInfo.mobile" disabled>
                    <span @click="getVerify" v-if="isShowSmsCode == 'one'" slot="button" class="verification">获取验证码</span>
                    <span v-if="isShowSmsCode == 'two'" slot="button" class="verification">短信发送中...</span>
                    <span v-if="isShowSmsCode == 'three'" slot="button" class="verification">重新获取({{smsCodeNumber}})</span>
                    <span @click="getVerify" v-if="isShowSmsCode == 'four'" slot="button" class="verification">重新获取</span>
                  </van-field>
                </van-cell-group>
            </div>
          </li>
          <li class="list-item">
            <p>验证码</p>
            <div class="right">
                <van-cell-group>
                  <van-field  placeholder="请输入验证码" v-model.trim="findPayPwd.mobile_verify_code"/>
                </van-cell-group>
            </div>
          </li>
          <li class="list-item">
            <p>新支付密码</p>
            <div class="right">
                <van-cell-group>
                    <van-field v-model.trim="findPayPwd.pay_password" placeholder="请填写新的支付密码" type="password"/>
                </van-cell-group>
            </div>
          </li>
        </ul>
        <div class="btn-common" @click="fondPayPwdAction">确定修改</div>
        <div class="btn-common" @click="showState = true">取消</div>
      </div>     
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
import SecondHader from "@/components/common/SecondHader"
import { payPassword, smsCodeNumber } from '@/config/rules'
import md5 from 'js-md5'
import { smsCodeMixin } from "@/config/miXin"

export default {
  mixins:[smsCodeMixin],
  components: { SecondHader },
  data() {
    return {
      showState: true,
      isShowSmsCode: 'one',
      actionTemplate: 'retrieve_pay_password',
      smsCodeNumber: smsCodeNumber,
      setPayPwdForm:{
        oldPassword:'',
        newPassword:'',
        confirmNewPassword:''
      },
      // 找回支付密码
      findPayPwd: {
          pay_password: '',
          mobile_verify_code: ''
      },
    }
  },
  methods: {
    ...mapActions(['setPayPassWord', 'sendSmsCode', 'retrievepayPassWord']),
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
    // 找回支付密码
    fondPayPwdAction() {
      if(this.findPayPwd.pay_password == '' || this.findPayPwd.mobile_verify_code == '') {
        return this.$Toast.fail(`请填写完整信息`);
      }
      if(payPassword.test(this.findPayPwd.pay_password)) {
        if(this.isShowSmsCode == 'three' || this.isShowSmsCode == 'four') {
          const params = {
            pay_password: md5(this.findPayPwd.pay_password),
            mobile_verify_code: this.findPayPwd.mobile_verify_code
          }
          this.retrievepayPassWord(params).then(res=>{
            if(res.code == 200){
              this.$Toast.success(res.message)
              this.$router.replace('/safetySet')
            }
          })
        }else {
          this.$Toast.fail(`请获取短信验证码`);
        }
      }else {
        this.$Toast.fail(`支付密码必须由6-20位字母和数字符号之间的两种组合`)
      }
    }
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
      align-items: center;
      color: #333;
      font-size: px2rem(33px); 
      .right{
        flex: 1;
        padding-left: px2rem(30px);
        overflow: hidden;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: px2rem(78px);
        .verification{
          padding: px2rem(11px) px2rem(24px);
          color: #fd591e;
          border: 1px solid #fd591e;
          border-radius: 4px;
        }
      }
    }   
    .list-item:last-child{
      border-bottom: none;
    }
  }
}
.pay-pwd{
  .van-cell{
    padding: 0;
    height: px2rem(80px);
    line-height: px2rem(80px);
    font-size: px2rem(33px); 
  }
  .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after{
    border: none;
  }
}
</style>