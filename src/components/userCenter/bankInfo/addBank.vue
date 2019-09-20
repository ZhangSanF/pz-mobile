<template>
  <div class="add-bank">
    <SecondHader headerTitle="添加银行卡"/>
    <!-- <scroll class="user-container" :click="false" :data="scrollDatas"> -->
      <div>
        <div class="bank-list">
          <div class="title">请填写身份证信息</div>
          <ul class="ul-box">
            <li class="list-item">
              <p>持卡人</p>
              <div class="right">
                  <van-cell-group>
                      <van-field :placeholder="getUserInfo.real_name" disabled/>
                  </van-cell-group>
              </div>
            </li>
            <li class="list-item">
              <p>卡号</p>
              <div class="right">
                  <van-cell-group>
                      <van-field v-model.trim="bankForm.bank_card_number" placeholder="请输入卡号"/>
                  </van-cell-group>
              </div>
            </li>
            <li class="list-item">
              <p>银行</p>
              <div class="right">
                  <van-dropdown-menu>
                    <van-dropdown-item ref="item" :title="bankForm.bank_name">
                      <li 
                      class="bank-list-item"
                      v-for="(item, index) in getBankList.banklist" 
                      :key="index" 
                      @click="onConfirm(item)">
                      {{item}}
                      </li>
                    </van-dropdown-item>
                  </van-dropdown-menu>
                  <span class="font_family icon-youjiantou icon-style"></span>
              </div>
            </li>
          </ul>
        </div>
        <div class="bank-list">
          <div class="title">请填写开户信息</div>
          <ul class="ul-box">
            <li class="list-item">
              <p>开户省份</p>
              <div class="right-fcaa">
                  <area-select type="text"  v-model="selectedCity" :data="pcaa" :placeholders="[]"></area-select>
                  <span class="font_family icon-youjiantou icon-style-pcaa"></span>
              </div>
            </li>
            <li class="list-item">
              <p>开户城市</p>
              <div class="right">
                <span></span>
                <span class="font_family icon-youjiantou icon-style"></span>
              </div>
            </li>
            <li class="list-item">
              <p>开户行</p>
              <div class="right">
                  <van-cell-group>
                    <van-field v-model.trim="bankForm.bank_branch_name" placeholder="请填写开户行"/>
                  </van-cell-group>
              </div>
            </li>
          </ul>
        </div>
        <div class="bank-list">
          <div class="title">获取验证码</div>
          <ul class="ul-box">
            <li class="list-item">
              <p>手机号</p>
              <div class="right">
                  <van-cell-group>
                    <van-field :placeholder="getUserInfo.mobile" disabled>
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
                      <van-field v-model.trim="bankForm.mobile_verify_code" placeholder="请输入验证码"/>
                  </van-cell-group>
              </div>
            </li>
          </ul>
        </div>
        <div class="btn-style" @click="add">确定绑卡</div>
      </div>
    <!-- </scroll> -->
  </div>
</template>

<script>
import { pcaa } from 'area-data' // v5 or higher
import { mapGetters, mapActions } from "vuex"
import Scroll from "@/components/common/scroll"
import SecondHader from "@/components/common/SecondHader"
import { smsCodeNumber } from '@/config/rules.js'

export default {
  components: { Scroll, SecondHader },
  data() {
    return {
      scrollDatas: [],
      pcaa: pcaa,
      selectedCity: [],
      isShowSmsCode: 'one',
      smsCodeNumber: smsCodeNumber,
      bankForm: {
        bank_name: '', //开户银行
        bank_card_number: '',//卡号
        bank_province: '',//省
        bank_city: '',//市
        bank_branch_name: '',//支行名称
        mobile_verify_code: ''//短信验证码
      },
    }
  },
  created() {
    this.bankList()//银行卡列表
  },
  methods: {
    ...mapActions(['bindBankCard', 'sendSmsCode', 'bankList']),
    onConfirm(name) {
      this.$refs.item.toggle();
      this.bankForm.bank_name = name
    },
    add() {
      if(
        !this.bankForm.bank_name || 
        !this.bankForm.bank_card_number || 
        !this.bankForm.bank_province ||
        !this.bankForm.bank_city ||
        !this.bankForm.bank_branch_name ||
        !this.bankForm.mobile_verify_code
      ) {
        this.$Toast.fail('请填写完整信息')
        return false
      }
      if(this.isShowSmsCode == 'three' || this.isShowSmsCode == 'four') {
        this.bindBankCard(this.bankForm).then((res) => {
          if(res.code == 200) {
            this.$Toast.success(res.message)
            this.$store.commit('ADD_BANK', {bank_card_number: res.data.bank_card_number, bank_name: res.data.bank_name})
            this.$router.replace('/bankInfo')
          }
        })
      }else {
        this.$Toast.fail('请点击发送手机验证码')
      } 
    },
    // 获取短信验证码
    getVerify() {
      let _this = this
      _this.isShowSmsCode = 'two'
      let obj = {
        template: 'bank_card',
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
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.scrollDatas = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    });
  },
  computed: {
    ...mapGetters(['getUserInfo', 'getBankList'])
  },
  watch:{
    'selectedCity': {
      handler(val, b) {
        this.bankForm.bank_province = val[0]
        this.bankForm.bank_city = val[1]
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.bank-list{
  font-size: px2rem(28px);
  .title{
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
      box-sizing: border-box;
      align-items: center;
      .right{
        overflow: hidden;
        width: px2rem(400px);
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: px2rem(78px);
        .bank-list-item{
          margin-left: px2rem(30px);
          padding: px2rem(20px) 0;
          border-bottom: px2rem(1px) solid $home-line-color;
        }
        .icon-style{
          color: #999;
          font-size: px2rem(20px);
        }
        .verification{
          padding: px2rem(11px) px2rem(24px);
          color: #fd591e;
          border: px2rem(1px) solid #fd591e;
          border-radius: 4px;
        }
      }
      .right-fcaa{
        width: px2rem(400px);
        position: relative;
        .icon-style-pcaa{
          position: absolute;
          right: 0;
          top: 50%;
          transform: translate(0, -50%);
          color: #999;
          font-size: px2rem(20px);
        }
      }
    }   
    .list-item:last-child{
      border-bottom: none;
    }
  }
}
.btn-style{
  margin: px2rem(30px) px2rem(48px) 0;
  background: $home-color;
  border-radius: 4px;
  color: #fff;
  text-align: center;
  font-size: px2rem(26px);
  padding: px2rem(20px) 0;
}
</style>
<style lang="scss">
.add-bank{
  .van-cell-group{
    .van-cell{
      padding: 0;
      height: px2rem(80px);
      line-height: px2rem(80px);
    }
  }
  .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after{
    border: none
  }
  .van-dropdown-menu{
    height: 100%;
    width: 100%;
  }
  .van-dropdown-menu__title::after{
    display: none;
  }
  .van-dropdown-menu__title{
    width: 100%;
    padding: 0;
  }
  .area-select{
    border: none;
    height: auto;
  }
  .area-select-wrap .area-select{
    margin: 0;
  }
  .area-select .area-select-icon{
    display: none;
  }
  .area-select:last-child{
    position: absolute;
    top: px2rem(80px);
    left: 0;
  }
  .area-selectable-list-wrap{
    top: px2rem(60px) !important;
  }
  .area-select .area-selected-trigger{
    padding: 0;
  }
}
</style>