<template>
  <div class="findpass" >
    <div v-if="!showNext">
      <van-cell-group>
        <van-field left-icon="contact" size="large" v-model.trim="form.username" clearable  placeholder="请填写用户名" />
        <van-field
          v-model.trim="form.captcha"
          clickable
          size="large" 
          left-icon="coupon-o"
          placeholder="请填写验证码" >
          <van-image
            :src="verifySrc" 
            @click="getVerifyFun"
            class="verifyImage"
            slot="button"
          />
      </van-field>
      </van-cell-group>
      <van-row v-show="errorMessage!==''" class="errorMessage">
        {{errorMessage}}
      </van-row>
      <van-cell>
        <van-button class="findpassBtn" @click="nextStep">下一步</van-button>
      </van-cell>
    </div>
    <div v-if="showNext" class="quote">
      <van-panel class="quoteCenter" >
        <template slot="header">
          <span>|</span>
          <b>找回密码-选择找回密码方式</b>
        </template>
      </van-panel>
      <van-tabs  v-model="active" @change="resetForm" @disabled="onClickDisabled" :swipeable="true">
        <van-tab class="findByPhone"  title="通过手机号找回密码">
          <van-cell-group >
            <van-field v-model.trim="getUserInfo.mobile" disabled  label="手机号"  />
            <van-field v-model.trim="getUserInfo.userName" disabled  label="用户名"  />
            <van-field
              v-model.trim="form.password"
              clickable
              label="新密码"
              type="password"
              placeholder="请输入新密码" >
            </van-field>
            <van-field 
            clickable
            v-model.trim="form.sms"
            label="验证码"
            placeholder="请输入验证码">
              <van-button 
                slot="button" 
                @click="getCode" 
                size="small" 
                v-show="isShowSmsCode == 'one'" 
                type="primary">获取验证码</van-button>
              <van-button 
                slot="button" 
                v-if="isShowSmsCode == 'two'" 
                size="small" 
                type="primary">短信发送中...</van-button>
              <van-button slot="button" 
                v-if="isShowSmsCode == 'three'" 
                size="small" 
                type="primary">
                重新获取({{smsCodeNumber}})</van-button>
              <van-button 
                slot="button" 
                @click="getCode" 
                v-if="isShowSmsCode == 'four'" 
                size="small" 
                type="primary">重新获取</van-button>
            </van-field>
            <van-cell>
              <van-button @click="resetAction('phone')" class="findpassBtn">重置密码</van-button>
            </van-cell>
          </van-cell-group>
        </van-tab>
        <van-tab :disabled="!isHaveSafe" 
          title="通过密保找回密码">
          <van-cell-group>
              <van-field v-model.trim="getUserInfo.userName" disabled  label="用户名"  />
              <van-field
                v-model.trim="form.password"
                clickable
                label="新密码"
                type="password"
                placeholder="请输入新密码" >
              </van-field>
              <van-field v-model.trim="safeOneQues"  disabled label="密保问题"  />
              <van-field  v-model.trim="form.valueOne" clearable clickable  label="输入答案" placeholder="请输入答案" />
              <van-field v-model.trim="safeTwoQues" disabled label="密保问题"  />
              <van-field  v-model.trim="form.valueTwo" clearable clickable   label="输入答案"  placeholder="请输入答案" />
            <van-cell>
              <van-button @click="resetAction('safe')" class="findpassBtn">重置密码</van-button>
            </van-cell>
          </van-cell-group>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { userMixin} from "./mixins/mixin"
import { mapActions,mapGetters } from "vuex";
import { rePhone,smsCodeNumber } from '@/config/rules'
import md5 from 'js-md5';
export default {
  name: "findpass",
  mixins:[userMixin],
  data() {
    return {
      form: {
        username: '',
        captcha: '',
        password: '',
        mobile_verify_code: '',
        valueOne:'',
        valueTwo:'',
        sms:''
      },
      verifySrc: '',
      errorMessage:'',
      showNext: false,
      smsCodeNumber: smsCodeNumber,
      canSave: false,
      active:'1',
      isShowSmsCode:'one',
    };
  },
  methods: {
  ...mapActions([
    'getVerify',
    'verifyUserName',
    'sendSmsCode',
    'retrievePassword'
  ]),
  nextStep(){
    // 判断用户是否存在
    this.checkFrom()
    if(this.errorMessage !== '') return ;
    this.verifyUserName(this.form).then((res) => {
        if(res.code == 200) {
            this.$store.commit(
                'SAVE_USER_INFO', 
                {
                    mobile: res.data.mobile || '', 
                    userName: this.form.username || '', 
                    userId:  res.data.id || '', 
                    password_protection: res.data.password_protection || []
                }
            )
          this.showNext = true
        }else {
          this.resetForm()
        }
    })
    this.getVerifyFun()
  },
  getVerifyFun() {
      this.getVerify().then((res) => {
          let imgUrl = 'data:image/png;base64,' + btoa(new Uint8Array(res).reduce((data, byte) => data + String.fromCharCode(byte), ''))
          this.verifySrc = imgUrl
      })
  },
  onClickDisabled() {
    this.$toast('您还未设置密保');
  },
  //获取手机验证码
  getCode() {
      let _this = this
      if (_this.getUserInfo.mobile) {
          _this.isShowSmsCode = 'two'
          let obj = {
              template: 'retrieve_password',
              member_id: _this.getUserInfo.userId
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
  resetAction(type) {
    if(type === 'safe') {
      this.checkPwd()
      if(this.canSave) {
        if(this.form.valueOne === '' || this.form.valueTwo ==='') return this.$notify(`请输入验证密保答案`);
      }
      if(!this.canSave) return false
      let resetForm = {
        type: 1
      }
      let protection = {
        [this.getUserInfo.password_protection[0]]: this.form.valueOne,
        [this.getUserInfo.password_protection[1]]: this.form.valueTwo
      }
      resetForm.username = this.getUserInfo.userName
      resetForm.protection = JSON.stringify(protection)
      let form = Object.assign(resetForm, {password: md5(this.form.password)})
      this.submitFrom(form)
    }else 
    if(type === 'phone') {
      this.checkPwd()
      if(this.canSave) {
        this.checkSms()
      }
      if(!this.canSave) return false
      if(this.isShowSmsCode == 'three' || this.isShowSmsCode == 'four') {
          let resetForm = {
            type: 2
          }
          resetForm.username = this.getUserInfo.userName
          resetForm.mobile_verify_code = this.form.sms
          let form = Object.assign(resetForm, {password: md5(this.form.password)})
          this.submitFrom(form)
      }else {
        this.$notify(`请点击获取手机验证码`)
      }
    }

  },
  resetForm() {
    this.form = {
        username: '',
        captcha: '',
        type: 2,
        password: '',
        mobile_verify_code: '',
        valueOne:'',
        valueTwo:'',
        sms: ''
    }
  },
  submitFrom(form) {
    this.retrievePassword(form).then(res => {
        if(res.code == 200) {
            this.$toast('密码重置成功');
            this.$router.push('/user/login')
        }else {
            this.resetForm()
        }
    })
  }
  },
  computed: {
      ...mapGetters(['getUserFind' ,'getUserInfo']),
      getPwdPction() {
        return false
      },
      styles () {
          if(!this.isHaveSafe) {
            let style = {}
            style.backgroundColor = '#ccc';
            return style 
          }
      },
      safeOneQues() {
        return this.getUserInfo.password_protection[0]
      },
      safeTwoQues() {
        return this.getUserInfo.password_protection[1]
      },
      isHaveSafe() {
        return this.getUserInfo.password_protection.length > 0 ? true : false
      }
  },
  created() {
    this.getVerifyFun()
    if(this.$parent.titleTxt) {
      return this.$parent.titleTxt = '找回密码'
    }
    
  }
};
</script>


<style lang="scss" scoped>
  .findpassBtn{
    width:  100% ;
    font-size: px2rem(36px) ;
    border-radius: px2rem(8px) ;
    color:#fff;
    background-color: #e4393c;
    height: px2rem(75px) ;
    line-height: px2rem(75px) ;
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
  .errorMessage{
    text-align: center;
    color:rgb(253,89,30);
    font-size: px2rem(26px) ;
    margin-top: px2rem(10px) ;
  }
  .quote{
    padding:  px2rem(10px);
  border-top: 0.03125rem solid #ebedf0;
  }
  .quoteCenter{
    line-height: px2rem(60px); 
    padding: px2rem(13px); 
    height:px2rem(60px); 
    font-size:px2rem(36px);
    span{
      padding-left: px2rem(12px); 
      height: px2rem(36px); 
      line-height: px2rem(36px); 
      display: inline-block;
      background-color: #ff5D5D;
      border-radius: px2rem(5px);
      color:  #fff;
      width: px2rem(0.1px); 
    }
    i{
      display: inline-block;
      width: px2rem(30px);
      height: px2rem(30px);
      line-height: px2rem(30px);
      // background-color: #000;
    }
    .iconSize {
      font-size: px2rem(30px);
    }
    .phone{
      font-size: px2rem(30px);
    }
  }
  .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after {
      border-width: 0 !important;
  }
  .blockBtn{
    display: block;
    width: 100%;
    background-color: #e35353;
    color: #fff;
  }
  .disabledBtn {
      background-color: #ccc;
      color: #fff;
  }
  .noHaveSafe {
      background-color: #ccc;

  }
  .vanDisabled{
    background-color: #ccc !important;
  }
  .van-cell{
   font-size: px2rem(33px) !important ;
}
</style>
