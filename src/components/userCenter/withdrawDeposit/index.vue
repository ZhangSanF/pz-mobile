<template>
  <div class="pay">
    <SecondHader headerTitle="提现"/>
    <scroll class="user-container-m" :data="scrollDatas">
      <div>
        <bank-card-info></bank-card-info>
        <div class="inputBox">
          <p class="title">输入提款金额</p>
          <van-cell-group>
            <van-field 
            v-model="money" 
            type="number"
            placeholder="请输入提款金额"/>
          </van-cell-group>
        </div>
        <div class="inputBox">
          <p class="title">输入提款密码</p>
          <van-cell-group>
            <van-field 
            v-model="password" 
            type="password"
            placeholder="请输入密码"/>
          </van-cell-group>
        </div>

        <div class="infoBox">
          <p>提现说明</p>
          <p class="pass-notice">如果您没有或者忘记了提款密码，<br>请到首页“个人中心”-“安全设置”设置提款密码，如有疑问请联系客服处理！</p>
        </div>

        <div class="submitBox">
          <van-button type="info" @click.native="drawAction">确认提现</van-button>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
  import Scroll from '@/components/common/scroll'
  import BankCardInfo from './BankCardInfo'
  import md5 from 'js-md5'
  import { mapActions, mapGetters } from "vuex"
  import SecondHader from "@/components/common/SecondHader"

  export default {
    components: { Scroll, BankCardInfo, SecondHader },
    data () {
      return {
        money: '',
        password: '',
        scrollDatas:[]
      }
    },
    created() {
        // 未实名认证跳转
        if(!this.getUserInfo.is_real_name) {
            this.$Dialog.alert({
                message: '您还未完成身份验证，请先进行实名认证'
            });
            this.$router.replace('/realName')
        }
    },
    mounted() {
      this.$nextTick(() => {
        this.scrollDatas = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      });
    },
    methods: {
      ...mapActions(['depositwithdrawplatform']),
      drawAction() {
        if(this.getUserInfo.is_pay_password == false) { return this.$Toast.fail('设置支付密码后才可以提现哦!') }
        if(!this.getUserInfo.bank_card_number && !this.getUserInfo.bank_name) {
          return this.$Toast.fail('添加银行卡后才可以提现哦!');
        }
        if(!this.money || !this.password) { return this.$Toast.fail('请填写完整的信息!'); }
        if(this.money < this.getBankList.min) {return this.$Toast.fail(`提款金额不小于${this.getBankList.min}!`);}
        this.depositwithdrawplatform({
          method: 'memberWithdrawal',
          order_amount: this.money,
          password: md5(this.password)
        }).then((res) => {
          if(res.code == 200) {
            this.$Toast.success(res.message)
          }
        })
      }
    },
    computed: {
      ...mapGetters(['getUserInfo', 'getBankList'])
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">  
.title{
  padding: px2rem(20px) px2rem(30px);
  font-size: px2rem(28px);
  color: #999;
}
  .infoBox{
    margin-top: px2rem(160px);
    padding: 0 px2rem(50px);
    box-sizing: border-box;
    p{
      font-size: px2rem(30px);
      color: #333;
      display: flex;
      justify-content: space-between;
      &:nth-of-type(2){
        font-size: px2rem(24px);
        margin-top: px2rem(30px);
      }
    }
  }
  h4 {
    color: #555;
    padding: px2rem(12px) 0 0 px2rem(6px);
  }  
  .submitBox {
    margin-top: px2rem(88px);
    padding: 0 px2rem(48px);
    button {
      height: px2rem(74px);
      line-height: px2rem(74px);
      border-radius: 4px;
      width: 100%;
      background-color: $home-color;
      border: none;
      color: #fff;
      font-size: px2rem(30);
      font-weight: 500;
    }
  }
</style>
