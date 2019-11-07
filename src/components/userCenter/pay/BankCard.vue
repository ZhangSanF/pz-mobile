<template>
  <div class="scan-pay">
    <SecondHader :headerTitle="name"/>
    <scroll class="user-container" :click="false" :data="scrollDatas">
      <div class="bank-box">
        <div class="title">请转账到以下账户</div>
          <div v-if="payItems">
              <div
                v-for="(item,index) in payItems"
                :key="index"
                :class="{'selected': payIndex == index}"
                @click="payIndex = index"
                class="carList"
              >
                <p class="radio-style">
                  <label v-if="id == 'alipay_bank'" >支付宝</label>
                  <label v-else>银行卡</label>
                    <span>
                      <i class="font_family icon-dagou" v-show="payIndex == index"></i>
                      <i class="font_family icon-weigouxuan1" v-show="payIndex != index"></i>
                    </span>
                </p>
                <!-- <p>请转账到以下账户：</p> -->
                <div v-if="id == 'alipay_bank'" class="scanShow">
                  <p class="label">
                    开户行：{{paydata[index].bank_name}}
                    <label
                      class="copyBtn"
                      v-clipboard:success="onCopy"
                      v-clipboard:error="onError"
                      v-clipboard:copy="paydata[index].bank_name"
                    >复制</label>
                  </p>
                  <p class="label">
                    持卡人：{{paydata[index].cardholder}}
                    <label
                      class="copyBtn"
                      v-clipboard:success="onCopy"
                      v-clipboard:error="onError"
                      v-clipboard:copy="paydata[index].cardholder"
                    >复制</label>
                  </p>
                  <p class="label">
                    卡号：{{paydata[index].card_num}}
                    <label
                      class="copyBtn"
                      v-clipboard:success="onCopy"
                      v-clipboard:error="onError"
                      v-clipboard:copy="paydata[index].card_num"
                    >复制</label>
                  </p>
                  <div class="scanImg" v-if="paydata[index].qrcode_url">
                    <img width="100" :src="paydata[index].qrcode_url" alt="二维码图片获取失败，请刷新重试">
                  </div>
                  <p class="label" v-if="paydata[index].qrcode_url">请用支付宝APP扫描上方二维码转账</p>
                  <p class="label" v-else>请用支付宝APP向上方银行卡账户转账</p>
                  <p class="label">转账完成后在下方填写转账信息，提交稍后即可自动到账</p>
                </div>

                <div v-else class="bankinfoShow">
                  <p class="label label-flex">
                    <span>开户行：{{paydata[index].bank_name}}</span>
                    <label
                      class="copyBtn"
                      v-clipboard:success="onCopy"
                      v-clipboard:error="onError"
                      v-clipboard:copy="paydata[index].bank_name"
                    >复制</label>
                  </p>
                  <p class="label label-flex">
                    <span>持卡人：{{paydata[index].cardholder}}</span>
                    <label
                      class="copyBtn"
                      v-clipboard:success="onCopy"
                      v-clipboard:error="onError"
                      v-clipboard:copy="paydata[index].cardholder"
                    >复制</label>
                  </p>
                  <p class="label label-flex">
                    <span>卡号：{{paydata[index].card_num}}</span>
                    <label
                      class="copyBtn"
                      v-clipboard:success="onCopy"
                      v-clipboard:error="onError"
                      v-clipboard:copy="paydata[index].card_num"
                    >复制</label>
                  </p>
                  <p class="label">
                    开户行地址：{{paydata[index].bank_adress}}
                    <label
                      class="copyBtn"
                      v-clipboard:success="onCopy"
                      v-clipboard:error="onError"
                      v-clipboard:copy="paydata[index].bank_adress"
                    >复制</label>
                  </p>
                </div>
                <p
                  class="redFont fontSize12"
                  v-if="paydata[index].int_limit_type != 0"
                  v-text="paydata[index].int_limit_type == 1 ? '该支付仅支持充值100整数倍的金额，请充值如100,500等整数金额' : '该支付不支持充值100整数倍的金额，请充值如101,502等金额'"
                ></p>
              </div>
            </div>

            <div class="user-content">
              <div class="title">请填写您的账户和转账信息</div>
              <van-cell-group >
                <van-field v-if="id == 'alipay_bank'" v-model="uname" placeholder="请输入您的账户名" label="账户名"/>
                <van-field v-else v-model="uname" placeholder="请输入您的账户名" label="持卡人"/>
              </van-cell-group>
              <van-cell-group v-if="id != 'alipay_bank'">
                <van-field v-model="num" placeholder="请输入您的账号" label="卡号"/>
              </van-cell-group>
              <van-cell-group>
                <van-field v-model="money" placeholder="请输入充值金额" label="转账金额" type="number"/>
              </van-cell-group>
              <van-cell-group>
                <van-field v-model="date" placeholder="点击选择时间" label="转账时间" @click="showPopup" readonly/>
              </van-cell-group>
            </div>
            <div class="btn-common" @click="payAction">提交充值</div>
        </div>
    </scroll> 
    <van-popup v-model="show" position="bottom">
      <van-datetime-picker
        v-model="dateTime"
        type="datetime"
        @confirm="confirm"
        @cancel="cancel"
      /> 
    </van-popup>    
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import { formatDate } from "@/assets/js/utils"
import Scroll from "@/components/common/scroll"
import SecondHader from "@/components/common/SecondHader"

export default {
  name: "BankCard",
  components: { Scroll, SecondHader },
  data() {
    return {
      scrollDatas: [],
      dateTime: new Date(),
      show: false,
      payIndex: 0,
      uname: "",
      num: "",
      money: "",
      date: "",
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.scrollDatas = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    });
  },
  methods: {
    ...mapActions(["depositwithdrawplatform"]),
    showPopup() {
      this.show = true
    },
    confirm(val) {
      let time = formatDate(val, 'YY-MM-DD hh:mm')
      this.date = time
      this.show = false
    },
    cancel() {
      this.show = false
    },
    onCopy() {
      this.$Toast.success('复制成功');
    },

    onError() {
      this.$Toast.fail('复制失败请重试');
    },

    payAction() {
      if (this.id == "alipay_bank") {
        if (!this.uname || !this.date || !parseInt(this.money)) {
          this.$Toast.fail('请填写完整信息');
          return;
        }
      } else {
        if (!this.uname || !this.num || !this.date || !parseInt(this.money)) {
          this.$Toast.fail('请填写完整信息');
          return;
        }
      }

      var payInfo = this.paydata[this.payIndex];
      if (payInfo.float_limit_type == 1) {
        let moneyArr = parseFloat(this.money).toString().split(".");
        if (moneyArr.length <= 1 && (!moneyArr[1] || moneyArr[1] <= 0)) {
          this.$Dialog.alert({
            title: '提交失败',
            message: '充值金额必须含有两位小数'
          });
          return;
        }
      }
      var data = {
          method: `artificialTransfer`,
          order_amount: this.money,    
          bank_code: '',//不需要
          bank_type: '',//不需要
          pay_id: `bank_${payInfo.id}`,
          card_num: this.num,
          card_name: this.uname,
          password: '',//不需要
        };
        // console.log(data)
      this.depositwithdrawplatform(data).then(res => {
        if(res.code == 200){
            this.uname= '';
            this.num= '';
            this.money= '';
            this.date= '';
            this.$Toast.success('提交成功');
          }else {
            this.$Dialog.alert({
              title: '提交失败',
              message: `提交失败！请刷新页面重试或者联系客服处理！[${res.message}]`
            });
          }
      });
    }
  },
  computed: {
    ...mapGetters(['getPayData']),
    id() {
      return this.$route.query.id;
    },
    name() {
      return this.$route.query.name;
    },
    paydata() {
      if (this.id) {
        return this.getPayData[this.id];
      }
    },
    payItems() {
      if (this.paydata) {
        var res = [];
        for (var i = 0; i < this.paydata.length; i++) {
          res.push({ key: i, value: this.paydata[i].bank_name });
        }
        return res;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.bank-box{
  padding-bottom: px2rem(40px);
}
.radio-style{
  display: flex;
  justify-content: space-between;
  align-items: center;
  i{
    font-size: px2rem(40px);
    vertical-align: middle;
    &.icon-dagou {
      color: $home-color;
    }
    &.icon-weigouxuan1 {
      color: #bbbbbb
    }
  }
}

.label-flex{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title{
  padding: px2rem(20px) px2rem(30px);
  font-size: px2rem(34px);
  color: #999;
}

.label {
  font-size: px2rem(33px);
  .copyBtn {
    display: inline-block;
    float: right;
    padding: 0 5px;
    line-height: 20px;
    color: #fff;
    background-color: $home-color;
    border-radius: 4px;
  }
}

.fontSize12 {
  font-size: px2rem(30px);
}
.carList {
  padding: px2rem(10px) px2rem(20px);
  background-color: #fff;
  line-height: 35px;
  font-size: px2rem(33px);
  margin-bottom: 1px;

  &.selected {
    // background: red;
    .bankinfoShow p {
      color: #333;
    }
    .label{
      color: #333;
    }
    .rebateText {
      color: #fff;
    }
  }
}
.money {
  height: 100%;
}
.vux-1px-b {
  text-align: center;
}
.scanShow {
  padding: 4px 10px;
  text-align: center;
}
.user-content {
  .van-cell{
    font-size: px2rem(33px);
  }
}
</style>
