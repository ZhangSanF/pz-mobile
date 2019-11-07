<template>
  <div class="init-mobile">
      <SecondHader headerTitle="验证手机号"/>
      <div class="real-list">
        <div class="title">您还未对手机验证，请先进行验证。</div>
        <ul class="ul-box">
          <li class="list-item">
            <p>手机号</p>
            <div class="right">
                <van-cell-group>
                  <van-field placeholder="请输入手机号" v-model.trim="initMobileData.mobile" type="number">
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
                    <van-field  placeholder="请输入验证码" v-model.trim="initMobileData.mobile_verify_code"/>
                </van-cell-group>
            </div>
          </li>
        </ul>
        <div class="btn-common" @click="initMobileAction">提交</div>
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
            isShowSmsCode: 'one',
            smsCodeNumber: smsCodeNumber,
            initMobileData: {
                mobile: '',
                mobile_verify_code: ''
            }
        }
    },
    methods: {
        ...mapActions(['sendSmsCode', 'initMobile']),
        initMobileAction() {
            if(!this.initMobileData.mobile || !this.initMobileData.mobile_verify_code) {
                return this.$Toast.fail('请填写正确信息')
            }
            if(this.isShowSmsCode == 'three' || this.isShowSmsCode == 'four') {
                this.initMobile(this.initMobileData).then(res => {
                    if(res.code == 200) {
                        this.$Toast.success(res.message)
                        let phone = this.initMobileData.mobile.slice(0,3) + '****' + this.initMobileData.mobile.slice(-4)
                        this.$store.commit('SET_MOBILE', phone)
                        this.$router.replace('/safetySet')
                    }
                })
            }else {
                return this.$Toast.fail('请获取短信验证码')
            }
        },
        getVerify() {
            let _this = this
            if (rePhone.test(_this.initMobileData.mobile)) {
                _this.isShowSmsCode = 'two'
                let obj = {
                    template: 'register',
                    mobile: _this.initMobileData.mobile
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
    },
    computed: {
        ...mapGetters(['getUserInfo'])
    }
}
</script>

<style lang="scss" scoped>
.init-mobile{
    .title{
        font-size: px2rem(34px);
        padding: px2rem(20px) px2rem(30px);
        color: #999;
    }
    .ul-box{
        padding-left: px2rem(30px);
        background: #fff;
        .list-item{
            display: flex;
            justify-content: space-between;
            border-bottom: px2rem(1px) solid $home-line-color;
            padding-right: px2rem(30px);
            height: px2rem(80px);
            // box-sizing: border-box;
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