<template>
  <div class="set-phone">
    <SecondHader headerTitle="修改手机"/>
    <div v-if="nextTo">
      <!-- 原手机验证 -->
      <div v-if="showState">
        <ul class="ul-box">
          <li class="list-item">
            <p>原手机号</p>
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
                    <van-field  placeholder="请输入验证码" v-model.trim="SetPhone.oldCode"/>
                </van-cell-group>
            </div>
          </li>
        </ul>
        <div class="btn-common" @click="nextToPhone">下一步</div>
        <div class="btn-common" @click="showState = false">通过密保重置</div>
      </div>
      <!-- 密保验证 -->
      <div v-else>
        <ul class="ul-box">
          <li class="list-item">
            <p>密保问题</p>
            <div class="right">
              <van-cell-group>
                <van-field :value="getUserInfo.password_protection[0]" disabled/>
              </van-cell-group>
              <!-- <span class="font_family icon-youjiantou icon-style"></span> -->
            </div>
          </li>
          <li class="list-item">
            <p>输入答案</p>
            <div class="right">
                <van-cell-group>
                  <van-field  placeholder="请输入答案" v-model.trim="pwdFrom.valueOne"/>
              </van-cell-group>
                <!-- <span class="font_family icon-youjiantou icon-style"></span> -->
            </div>
          </li>
          <li class="list-item">
            <p>密保问题</p>
            <div class="right">
                <van-cell-group>
                  <van-field :value="getUserInfo.password_protection[1]" disabled/>
                </van-cell-group>
                <!-- <span class="font_family icon-youjiantou icon-style"></span> -->
            </div>
          </li>
          <li class="list-item">
            <p>输入答案</p>
            <div class="right">
                <van-cell-group>
                  <van-field  placeholder="请输入答案" v-model.trim="pwdFrom.valueTwo"/>
              </van-cell-group>
                <!-- <span class="font_family icon-youjiantou icon-style"></span> -->
            </div>
          </li>
        </ul>
        <div class="btn-common" @click="nextToPwd">下一步</div>
        <div class="btn-common" @click="showState = true">通过原手机号重置</div>
      </div>    
    </div>
    <div v-else>
      <ul class="ul-box">
        <li class="list-item">
          <p>新手机号</p>
          <div class="right">
              <van-cell-group>
                <van-field placeholder="请输入新手机号" v-model.trim="SetPhone.mobile" type="number">
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
                  <van-field  placeholder="请输入验证码" v-model.trim="SetPhone.newCode"/>
              </van-cell-group>
          </div>
        </li>
      </ul>
      <div class="btn-common" @click="actionPhone">确定修改</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
import SecondHader from "@/components/common/SecondHader"
import { smsCodeNumber, rePhone } from '@/config/rules'

export default {
  components: { SecondHader },
  data() {
    return {
      showState: true,
      nextTo: true,
      isShowSmsCode: 'one',
      smsCodeNumber: smsCodeNumber,
      pwdFrom: {
        valueOne: '',
        valueTwo: ''
      },
      SetPhone: {
        type: '',//1手机号，2密保
        password_protection: '',//密保
        mobile: '',//新手机号
        oldCode: '',//原手机的验证码
        newCode: ''//新手机的验证码
      }
    }
  },
  methods: {
    ...mapActions(['sendSmsCode', 'changeMobile', 'verifySmsCode', 'verifyProtection']),
    // 原手机号验证
    nextToPhone() {
      if(!this.SetPhone.oldCode) {return this.$Toast.fail('请输入验证码')}
      if(this.isShowSmsCode == 'three' || this.isShowSmsCode == 'four') {
        // 原手机号验证码验证
        let obj = {
          member_id: this.getUserInfo.id,
          mobile_verify_code: this.SetPhone.oldCode
        }
        this.verifySmsCode(obj).then(res => {
          if(res.code == 200) {
            this.SetPhone.type = 1
            this.isShowSmsCode = 'one'
            this.nextTo = false
          }
        })
      }else {
        this.$Toast.fail('请获取短信验证码')
      }
    },
    // 密保验证
    nextToPwd() {
      if(!this.pwdFrom.valueOne || !this.pwdFrom.valueTwo) {
        return this.$Toast.fail('请填写完整信息')
      }
      let obj = {
        [this.getUserInfo.password_protection[0]]: this.pwdFrom.valueOne,
        [this.getUserInfo.password_protection[1]]: this.pwdFrom.valueTwo
      } 
      const params = {
        protection: JSON.stringify(obj)
      }
      this.verifyProtection(params).then(res => {
        if(res.code == 200) {
          this.SetPhone.type = 2 
          this.isShowSmsCode = 'one'            
          this.SetPhone.password_protection = JSON.stringify(obj)
          this.nextTo = false
        }
      })
    },
    // 设置新手机号
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
      this.smsCodeNumber = smsCodeNumber
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
      align-items: center;
      color: #333;
      font-size: px2rem(33px); 
      .right{
        overflow: hidden;
        width: px2rem(500px);
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: px2rem(78px);
        .icon-style{
          color: #999;
          font-size: px2rem(26px);
        }
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
.set-phone{
  .van-cell{
    font-size: px2rem(33px);
    padding: 0;
    height: px2rem(80px);
    line-height: px2rem(80px);
  }
  .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after{
    border: none;
  }
}
</style>