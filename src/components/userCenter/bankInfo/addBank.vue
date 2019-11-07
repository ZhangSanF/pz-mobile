<template>
  <div class="add-bank">
    <SecondHader headerTitle="添加银行卡"/>
    <scroll class="user-container" :click="false" :data="scrollDatas">
      <div>
        <div class="bank-list">
          <div class="title">请填写身份证信息</div>
          <ul class="ul-box">
            <li class="list-item">
              <p>持卡人</p>
              <div class="right">
                <span class="info">{{getUserInfo.real_name}}</span>
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
            <li class="list-item" @click="showBankList">
              <p>银行</p>
              <div class="right">
                  <span>{{bankForm.bank_name}}</span>
                  <span class="font_family icon-youjiantou icon-style"></span>
              </div>
            </li>
          </ul>
        </div>
        <div class="bank-list">
          <div class="title">请填写开户信息</div>
          <ul class="ul-box">
            <li class="list-item">
              <p>开户地址</p>
              <div class="right" @click="showPopup">
                <span class="city">{{selectedCity}}</span>
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
                      <van-field v-model.trim="bankForm.mobile_verify_code" placeholder="请输入验证码"/>
                  </van-cell-group>
              </div>
            </li>
          </ul>
        </div>
        <div class="btn-common" @click="add">确定绑卡</div>
      </div>
    </scroll>
    <!-- 开户地址 -->
    <van-popup v-model="showPacc" position="bottom" :style="{ height: '50%' }">
      <van-area :area-list="pcaa" @confirm="onConfirm" @cancel="onCancel" :columns-num="2"/>
    </van-popup>
    <!-- 银行 -->
     <!-- 选择银行卡 -->
    <van-popup v-model="showBank" position="bottom" :style="{ height: '50%' }">
      <BottomAlert :fatherData="getBankList.banklist" @eimtChange="eimtChange" marker='addBank'/>
    </van-popup>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import Scroll from "@/components/common/scroll"
import SecondHader from "@/components/common/SecondHader"
import { smsCodeNumber } from '@/config/rules'
import { smsCodeMixin } from "@/config/miXin"
import pcaa from '@/assets/js/pcaa'
import BottomAlert from "@/components/common/BottomAlert"

export default {
  mixins:[smsCodeMixin],
  components: { Scroll, SecondHader, BottomAlert },
  data() {
    return {
      scrollDatas: [],
      pcaa: pcaa,
      showBank: false,
      showPacc: false,
      selectedCity: '',
      isShowSmsCode: 'one',
      actionTemplate: 'bank_card',
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
    showBankList() {
      this.showBank = true
    },
    eimtChange(name) {
      this.showBank = false
      this.bankForm.bank_name = name
    },
    showPopup() {
      this.showPacc = true
    },
    onConfirm(res) {
      this.selectedCity = `${res[0].name}${res[1].name}`
      this.bankForm.bank_province = res[0].name
      this.bankForm.bank_city = res[1].name
      this.showPacc = false
    },
    onCancel() {
      this.showPacc = false
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
        this.$Toast.fail('请获取短信验证码')
      } 
    }
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

  }
}
</script>

<style lang="scss" scoped>
.bank-list{
  .title{
    padding: px2rem(20px) px2rem(30px);
    color: #999;
    font-size: px2rem(34px);
  }
  .ul-box{
    padding-left: px2rem(30px);
    background: #fff;
    .list-item{
      font-size: px2rem(33px);
      display: flex;
      justify-content: space-between;
      border-bottom: px2rem(1px) solid $home-line-color;
      padding-right: px2rem(30px);
      height: px2rem(80px);
      // box-sizing: border-box;
      align-items: center;
      .right{
        overflow: hidden;
        width: px2rem(500px);
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: px2rem(78px);
        .info{
          color: #666;
        }
        .bank-list-item{
          margin-left: px2rem(30px);
          padding: px2rem(20px) 0;
          border-bottom: px2rem(1px) solid $home-line-color;
        }
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
</style>
<style lang="scss">
.add-bank{
  .van-cell-group{
    .van-cell{
      font-size: px2rem(33px);
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
    font-size: px2rem(33px);
  }
}
</style>