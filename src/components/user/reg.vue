<template>
  <div class="reg">
    <van-row v-show="errorMessage!==''" class="errorMessage">
      {{errorMessage}}
    </van-row>
    <van-cell-group>
      <van-field v-model="form.username" 
      left-icon="contact" 
      clearable  
      clickable
      required
      @blur="checkName"
      placeholder="请填写用户名(字母数字组合)" />
      <van-field 
      left-icon="contact"
      v-model="form.phone" 
      clearable
      clickable
      required
      type="tel" 
      class="mobileCode"
      placeholder="请输入手机号" />
      <van-field 
      clickable
      required
      v-model="form.sms" 
      left-icon="contact"
      placeholder="请输入验证码">
        <van-button 
          slot="button" 
          @click="getCode" 
          size="small" 
          v-show="isShowSmsCode == 'one'" 
          type="primary">发送验证码</van-button>
        <van-button 
          slot="button" 
          v-if="isShowSmsCode == 'two'" 
          size="small" 
          type="primary">短信发送中...</van-button>
        <van-button slot="button" 
          v-if="isShowSmsCode == 'three'" 
          size="small" 
          type="primary">
          {{smsCodeNumber}}秒</van-button>
        <van-button 
          slot="button" 
          @click="getCode" 
          v-if="isShowSmsCode == 'four'" 
          size="small" 
          type="primary">重新获取验证码</van-button>
      </van-field>
      <van-field
          left-icon="envelop-o"
          required
          v-model="form.captcha"  
          clickable 
          placeholder="请填写验证码" >
          <van-image
            :src="verifySrc" 
            @click="getVerifyFun"
            class="verifyImage"
            slot="button"
          />
      </van-field>
      <van-field 
      clickable
      required
      v-model="form.password" 
      :type="passWordType" 
      left-icon="contact"
      right-icon="closed-eye"
      @click-right-icon="passWordType = passWordType === 'text' ? 'password' :'text'"
      placeholder="请填写登录密码" />
      <van-field 
      v-model="form.repassword"
      :type="confirmType" 
      left-icon="contact"
      required
      right-icon="closed-eye"
      clickable
      @click-right-icon="confirmType = confirmType === 'text' ? 'password' :'text'"
      placeholder="请确认登录密码" />
      <van-field 
      v-model="form.referee" 
      left-icon="contact"
      clickable
      placeholder="填写推荐人(如果没有,可不填写)" />
      <van-cell>
        <template slot="title">
          <van-checkbox class="read"  icon-size ="20px"  v-model="form.checkedClause">
            我已阅读并同意
            <router-link class="protocol"  to="/">用户注册协议</router-link>
          </van-checkbox>
        </template>
      </van-cell>
      <van-cell>
        <van-button 
        @click="submitReg"
        class="regBtn carryOut">立即注册</van-button>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import {  rePhone, smsCodeNumber } from '@/assets/js/rules.js'
import { mapActions } from "vuex"
import { userMixin} from "./mixins/mixin"
import md5 from 'js-md5'
export default {
  name: "reg",
  mixins:[userMixin],
  data() {
    return {
      form: {
        username: "",
        phone: "",
        sms: "",
        password: "",
        repassword: "",
        referee: "",
        checkedClause: true,  //同意协议
        captcha:'',
      },
      passWordType:'password',
      confirmType:'password',
      isShowSmsCode: 'one',
      verifySrc: '',
      smsCodeNumber: '60',
      errorMessage:'',
    };
  },
  methods: {
    ...mapActions([
    'getVerify',
    'sendSmsCode',
    'register',
    'getMemberinfo']),
    //获取手机验证码
    getCode() {
        let _this = this
        if (rePhone.test(_this.form.phone)) {
            _this.isShowSmsCode = 'two'
            let obj = {
                template: 'register',
                mobile: _this.form.phone
            }
            _this.sendSmsCode(obj).then((res) => {
                if(res.code == 200) {
                    _this.$notify(res.message)
                    _this.isShowSmsCode = 'three'
                    let _run = () => {
                        setTimeout(() => {
                            _this.smsCodeNumber--
                            if (_this.smsCodeNumber > 0) {
                                _run();
                            } else {
                                _this.isShowSmsCode = 'four'
                                _this.smsCodeNumber = smsCodeNumber
                            }
                        }, 1000);
                    };
                    _run();
                }else {
                    _this.isShowSmsCode = 'one'
                }
            })
        }else {
            this.$notify(`请输入正确的手机号`);
        }
    },
    checkName(e) {
      console.log(e.target.value);
    },
    submitReg(){
      if(!this.form.checkedClause) return this.$notify(`请勾选注册服务协议`);
      this.checkFrom()
      if(!this.canSave) return false
      if(this.isShowSmsCode == 'three' || this.isShowSmsCode == 'four') {
          this.errorMessage = ''
          let reg = this.form
          let actionData = {
              username: reg.username,
              captcha: reg.captcha,//图片验证码
              mobile: reg.phone,
              mobile_verify_code: reg.sms,//短信验证码
              // invitation_code: reg.invitation_code,//邀请码
              agent_code: reg.referee,//代理码(地址栏)
              password: md5(reg.password),
              confirm_password: md5(reg.repassword),
          }
          this.register(actionData).then(res=>{ 
              if( res.code == 200) {
                  this.$notify(res.message)
                  this.getMemberinfo()
                  this.$store.commit('IS_LOGIN', true)
                  this.$router.push({path:'/'})
              }else {
                  this.getVerifyFun()
              }
          })

      }else {
        this.errorMessage = '请点击发送验证码'
      }
    },
    getVerifyFun() {
        this.getVerify().then((res) => {
            let imgUrl = 'data:image/png;base64,' + btoa(new Uint8Array(res).reduce((data, byte) => data + String.fromCharCode(byte), ''))
            this.verifySrc = imgUrl
        })
    },
  },
  created() {
      this.getVerifyFun()
      if(this.$parent.titleTxt) {
        return this.$parent.titleTxt = '注册'
      }
  },
};
</script>


<style lang="scss" scoped>
[class*=van-hairline]::after {
    border: 0 solid #fff !important;
}
.reg {
  color: #999;
  font-size: px2rem(14px) ;
}
.verifyImage{
    min-width: 0.8rem;
    width: 3rem;
    height: 0.8rem;
    padding: 0 ;
    font-size: 0.32rem;
    line-height: 0.74667rem;
    float: right;
}
.captchaInput {
    min-width: 0.8rem;
    width: 3rem;
    height: 0.8rem;
    padding: 0 ;
    font-size: 0.32rem;
    line-height: 0.74667rem;
    background-color: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    float: left;
}
.carryOut {
  background-color: #FD591E;
}
.van-cell__title .van-field__label {
  width: 0 !important;
}
.regBtn{
  width:  100% ;
  font-size: px2rem(30px) ;
  border-radius: px2rem(8px) ;
  color:#fff;
  height: px2rem(75px) ;
  line-height:  px2rem(75px) ;
}
.protocol {
  color: #64a9Fe;
  font-size: px2rem(24px) ;
}
.errorMessage{
   text-align: center;
   color:rgb(253,89,30);
   font-size: px2rem(24px) ;
}
</style>
