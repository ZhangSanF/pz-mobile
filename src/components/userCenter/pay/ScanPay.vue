<template>
  <div>
    <SecondHader :headerTitle="name"/>
    <scroll class="user-container" :click="false" :data="scrollDatas">
      <div class="scanpayPage">
        <div v-if="payItems">
            <div class="title">选择支付通道</div>
            <div class="payRadioContainer">
              <div
                class="payRadio"
                :key="index"
                v-for="(item, index) of paydata"
                @click="payIndex = index"
              >
                <div class="header logo">
                  <img :src="payIcons[id]" alt />
                </div>
                <div class="info">
                  <p>{{ getPayName(item) }}</p>
                  <p>此通道需支付手续费{{item.get_fee}}%</p>
                  <p>单笔金额下限{{item.min}},上限{{item.max}}</p>
                </div>
                <div class="selectBox">
                  <i v-if="payIndex == index" class="font_family icon-dagou icon-style"></i>
                  <i v-else class="font_family icon-weigouxuan1 icon-style"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="title">请扫描下方二维码转账</div>
          <span class="tips">
            温馨提示：最低充值{{getCurPayInfo().min}}元,请不要保存二维码重复支付，我们会不定时更换收款码
            <span
              v-if="payInfo.float_limit_type == 1"
            >,充值金额必须含有两位小数</span>。
          </span>

          <div style="text-align:center">
            <img class="scanImg" slot="header" :src="payInfo.code_url" />
            <div slot="content" class="card-padding">
              <p class="p1 redFont">
                <span>账户名: {{payInfo.name}}</span>
                <label
                  class="copyBtn"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"
                  v-clipboard:copy="payInfo.name"
                >复制</label>
              </p>
              <p class="p1 redFont">
                <span>账号: {{payInfo.account}}</span>
                <label
                  class="copyBtn"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"
                  v-clipboard:copy="payInfo.account"
                >复制</label>
              </p>
              <p class="p2" v-if="payInfo.remark">
                <span>备注: {{payInfo.remark}}</span>
                <label
                  class="copyBtn"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"
                  v-clipboard:copy="payInfo.remark"
                >复制</label>
              </p>
              <p
                class="p1 redFont"
                v-if="payInfo.int_limit_type != 0"
                v-text="payInfo.int_limit_type == 1 ? '该支付仅支持充值100整数倍的金额，请充值如100,500等整数金额' : '该支付不支持充值100整数倍的金额，请充值如101,502等金额'"
              ></p>
              <p class="p3">请截图或长按保存二维码，打开支付APP从相册选择二维码扫描转账（如没有二维码请直接转账到账户），转账前请核对账户名和账号是否一致。</p>
            </div>
          </div>

          <div class="user-content">
            <div class="title">请填写您的账户和转账信息</div>
            <van-cell-group>
              <van-field v-model="uname" :placeholder="getPlaceholder()" label="账户名"/>
            </van-cell-group>
            <van-cell-group>
              <van-field v-model="num" placeholder="请输入您的账号" label="账号"/>
            </van-cell-group>
            <van-cell-group>
              <van-field v-model="money" placeholder="请输入充值金额" label="充值金额" type="number"/>
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
  name: "ScanPay",
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
      payIcons: {
        alipay: require("../../../assets/images/alipay.png"),
        jdpay: require("../../../assets/images/jdpay.png"),
        qqpay: require("../../../assets/images/qqpay.png"),
        weixinpay: require("../../../assets/images/weixinpay.png"),
        scanwxpay: require("../../../assets/images/scanpay.png"),
        // scanysfpay: require("../../../assets/images/scanpay.png"),
        scanalipay: require("../../../assets/images/scanpay.png"),
        otc: require("../../../assets/images/scanpay.png"),
        bankcard: require("../../../assets/images/bankcard.png"),
        online: require("../../../assets/images/online.png"),
        union: require("../../../assets/images/union2.png"),
        quick: require("../../../assets/images/union2.png"),
        alipay_bank: require("../../../assets/images/alipay.png")
      }
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

    getPlaceholder() {
      let str = "请输入您的账户名";
      if (this.payInfo.type == 3) {
        str = "付款支付宝绑定姓名";
      }
      if (this.payInfo.type == 4) {
        str = "付款微信昵称";
      }
      return str;
    },

    getCurPayInfo() {
      return this.paydata[this.payIndex];
    },

    payAction() {
      if (!this.uname || !this.num || !this.date || !parseInt(this.money)) {
        this.$Toast.fail('请填写完整信息');
        return;
      }
      if (this.payInfo.float_limit_type == 1) {
        let moneyArr = parseFloat(this.money).toString().split(".");
        if (moneyArr.length <= 1 && (!moneyArr[1] || moneyArr[1] <= 0)) {
          this.$Dialog.alert({
            title: '提交失败',
            message: '充值金额必须含有两位小数'
          });
          return;
        }
      }
      var payInfo = this.paydata[this.payIndex];
      var data = {
          method: `artificialTransfer`,
          order_amount: this.money,
          bank_code: '',//不需要
          bank_type: '',//不需要
          pay_id: `code_${payInfo.id}`,       
          card_num: `${payInfo.account}`,
          card_name: `${payInfo.name}`,
          password: ''//不需要
      };
      this.depositwithdrawplatform(data).then(res => {
        if(res.code == 200){
            this.uname = '';
            this.num = '';
            this.money = '';
            this.date = '';
            this.$Toast.success('提交成功');
          }else {
            this.$Dialog.alert({
              title: '提交失败',
              message: `提交失败！请刷新页面重试或者联系客服处理！[${res.message}]`
            });
          }
      });
    },

    //支付名称判断 根据type值
    getPayName(e) {
      if (e && e.type) {
        switch (parseInt(e.type)) {
          case 3: return "支付宝扫码支付"; break;
          case 4: return "微信扫码支付"; break;
          case 12: return "人工支付宝收款"; break;
          case 13: return "微信/支付宝转帐"; break;
          default: return "支付通道";
        }
      } else {
        return "支付通道";
      }
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
          res.push({
            key: i,
            value: this.paydata[i].remark || `支付通道${i + 1}`
          });
        }
        return res;
      }
    },
    payInfo() {
      if (this.paydata && this.paydata[this.payIndex]) {
        return this.paydata[this.payIndex];
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.money {
  height: 100%;
}

.vux-1px-b {
  text-align: center;
}

.user-content {
  margin: px2rem(30px) 0;
  /deep/ label {
    width: px2rem(150px) !important;
  }
  .van-cell{
    font-size: px2rem(33px);
  }
}

.tips {
  padding: px2rem(30px);
  color: #ff0000;
  display: block;
  font-size: px2rem(32px);
}

.scanImg {
  height: px2rem(400px);
  width: px2rem(400px);
  margin: 0 auto;
  padding: px2rem(16px);
}

.card-padding {
  padding: 0 px2rem(30px);

  .copyBtn {
    display: inline-block;
    padding: 0 5px;
    line-height: 20px;
    color: #fff;
    background-color: #51a4fb;
    border-radius: 4px;
  }

  p.p1 {
    font-size: px2rem(32px);
    line-height: px2rem(50px);
    span {
      display: inline-block;
      width: px2rem(350px);
      text-align: left;
    }
  }

  p.p2 {
    color: #333;
    font-size: px2rem(32px);
    line-height: px2rem(40px);
    span {
      display: inline-block;
      width: px2rem(350px);
      text-align: left;
    }
  }

  p.p3 {
    color: #999;
    font-size: px2rem(32px);
    line-height: px2rem(40px);
  }
}

.redFont {
  color: #ff0000;
}

.scanpayPage {
  padding-bottom: px2rem(40px);
  .title {
    padding: px2rem(20px) px2rem(30px);
    font-size: px2rem(34px);
    color: #999;
  }
}

.payRadioContainer {
  display: flex;
  flex-direction: column;

  .payRadio {
    flex: 1;
    display: flex;
    align-items: center;
    height: px2rem(160px);
    overflow: hidden;
    border-bottom: 1px solid #ddd;
    background: #fff;

    div {
      &.header {
        width: px2rem(100px);
        height: px2rem(100px);
        display: flex;
        justify-content: center;
        align-items: center;
        padding: px2rem(20px);

        span {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #4bb6ee;
          width: 100%;
          font-weight: 600;
          height: 100%;
          color: #fff;
          border-radius: 50%;
        }
      }

      &.info {
        flex: 1;
        display: flex;
        justify-content: center;
        flex-direction: column;
        line-height: px2rem(35px);

        p {
          font-size: px2rem(32px);
          color: #999999;
        }

        p:nth-of-type(1) {
          color: #333333;
        }
      }

      &.selectBox {
        width: px2rem(100px);
        display: flex;
        justify-content: center;
        align-items: center;
        .icon-dagou {
          color: $home-color;
        }
        .icon-weigouxuan1 {
          color: #bbbbbb;
        }
        .icon-style{
          font-size: px2rem(40px);
        }
      }
    }
  }
}

.logo {
  width: px2rem(120px);
  display: flex;
  margin-right: px2rem(10px);
  justify-content: center;
  align-items: center;

  img {
    height: px2rem(120px);
    width: px2rem(120px);
  }
}
</style>
