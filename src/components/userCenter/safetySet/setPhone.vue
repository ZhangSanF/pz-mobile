<template>
  <div class="set-phone">
    <SecondHader headerTitle="手机绑定"/>
    <div v-if="nextTo">
      <ul class="ul-box">
        <li class="list-item">
          <p>原手机号</p>
          <div class="right">
              <van-cell-group>
                <van-field :value="getUserInfo.mobile" disabled>
                  <span @click="getVerify" v-if="isShowSmsCode == 'one'" slot="button" class="verification">发送验证码</span>
                  <span v-if="isShowSmsCode == 'two'" slot="button" class="verification">短信发送中...</span>
                  <span v-if="isShowSmsCode == 'three'" slot="button" class="verification">验证码{{smsCodeNumber}}秒有效</span>
                  <span @click="getVerify" v-if="isShowSmsCode == 'four'" slot="button" class="verification">重新获取验证码</span>
                </van-field>
              </van-cell-group>
          </div>
        </li>
        <li class="list-item">
          <p>验证码</p>
          <div class="right">
              <van-cell-group>
                  <van-field  placeholder="请输入验证码" v-model.trim="SetPhone.oldCode"/>
              </van-cell-group>
          </div>
        </li>
      </ul>
      <div class="real-btn" @click="nextToFun">下一步</div>
    </div>
    <div v-else>
      <ul class="ul-box">
        <li class="list-item">
          <p>新手机号</p>
          <div class="right">
              <van-cell-group>
                <van-field placeholder="请输入新手机号" v-model.trim="SetPhone.mobile" type="number">
                  <span @click="getVerify" v-if="isShowSmsCode == 'one'" slot="button" class="verification">发送验证码</span>
                  <span v-if="isShowSmsCode == 'two'" slot="button" class="verification">短信发送中...</span>
                  <span v-if="isShowSmsCode == 'three'" slot="button" class="verification">验证码{{smsCodeNumber}}秒有效</span>
                  <span @click="getVerify" v-if="isShowSmsCode == 'four'" slot="button" class="verification">重新获取验证码</span>
                </van-field>
              </van-cell-group>
          </div>
        </li>
        <li class="list-item">
          <p>验证码</p>
          <div class="right">
              <van-cell-group>
                  <van-field  placeholder="请输入验证码" v-model.trim="SetPhone.newCode"/>
              </van-cell-group>
          </div>
        </li>
      </ul>
      <div class="real-btn" @click="actionPhone">确定修改</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
import SecondHader from "@/components/common/SecondHader"
import { smsCodeNumber, rePhone } from '@/config/rules.js'

export default {
  components: { SecondHader },
  data() {
    return {
      nextTo: true,
      isShowSmsCode: 'one',
      smsCodeNumber: smsCodeNumber,
      SetPhone: {
        type: 1,//1手机号，2密保
        password_protection: '',//密保
        mobile: '',//新手机号
        oldCode: '',//原手机的验证码
        newCode: ''//新手机的验证码
      }
    }
  },
  methods: {
    ...mapActions(['sendSmsCode', 'changeMobile', 'verifySmsCode']),
    nextToFun() {
      if(!this.SetPhone.oldCode) {return this.$Toast.fail('请输入验证码')}
      if(this.isShowSmsCode == 'three' || this.isShowSmsCode == 'four') {
        // 原手机号验证码验证
        let obj = {
          member_id: this.getUserInfo.id,
          mobile_verify_code: this.SetPhone.oldCode
        }
        this.verifySmsCode(obj).then(res => {
          if(res.code == 200) {
            this.isShowSmsCode = 'one'
            this.smsCodeNumber = 120
            this.nextTo = false
          }
        })
      }else {
        this.$Toast.fail('请点击发送手机验证码')
      }
    },
    actionPhone() {
      if(!this.SetPhone.mobile || !this.SetPhone.newCode) {
        return this.$Toast.fail('请填写正确信息')
      }
      if(rePhone.test(this.SetPhone.mobile)) {
        if(this.isShowSmsCode == 'three' || this.isShowSmsCode == 'four') {
          this.changeMobile(this.SetPhone).then(res => {
            if(res.code == 200) {
              this.$Toast.success(res.message)
              let phone = this.SetPhone.mobile.slice(0,3) + '****' + this.SetPhone.mobile.slice(-4)
              this.$store.commit('SET_MOBILE', phone)
              this.$router.replace('/safetySet')
            }
          })
        }else {
          return this.$Toast.fail('请获取短信验证码')
        }
      }else {
        this.$Toast.fail('请输入正确的手机号码')
      }
    },
    getVerify() {
      let _this = this
      // 原手机
      if(_this.nextTo) {
        _this.isShowSmsCode = 'two'
        let obj = {
          template: 'modify_mobile',
          member_id: _this.getUserInfo.id
        }
        _this.sendSmsCode(obj).then((res) => {
          if(res.code == 200) {
            _this.$Toast.success(res.message)
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
      }else {//新手机
        if(rePhone.test(_this.SetPhone.mobile)) {
          _this.isShowSmsCode = 'two'
          let obj = {
            template: 'modify_mobile',
            mobile: _this.SetPhone.mobile
          }
          _this.sendSmsCode(obj).then((res) => {
            if(res.code == 200) {
              _this.$Toast.success(res.message)
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
          this.$Toast.fail('请输入正确的手机号')
        } 
      }
    }
  },
  computed: {
    ...mapGetters(['getUserInfo'])
  }
}
</script>

<style lang="scss" scoped>
.set-phone{
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
        overflow: hidden;
        width: px2rem(450px);
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: px2rem(78px);
        .verification{
          padding: px2rem(11px) px2rem(24px);
          color: #fd591e;
          border: px2rem(1px) solid #fd591e;
          border-radius: 4px;
        }
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
.set-phone{
  .van-cell{
    padding: 0;
    height: px2rem(80px);
    line-height: px2rem(80px);
  }
  .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after{
    border: none;
  }
}
</style>