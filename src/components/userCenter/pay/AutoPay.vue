<template>
  <div>
    <SecondHader :headerTitle="name"/>
    <scroll class="user-container" :click="false" :data="scrollDatas">
      <div>
        <div class="inputBox">
          <p>请输入充值金额</p>
          <van-cell-group>
            <van-field 
            v-model="money" 
            type="number"
            :placeholder="'最低充值'+paydata[payIndex].min+'元'"/>
          </van-cell-group>
        </div>
        <div class="payRadioContainer" v-if="payItems">
          <div class="title">选择支付通道</div>
          <ul class="paylist">
            <li
              :key="index"
              class="payRadio"
              v-for="(item, index) of payItems"
              @click="payIndex = index"
            >
              <div class="logo">
                <img :src="payIcons[id]" alt>
              </div>
              <div class="info">
                <h4>{{getPayName(item)}}</h4>
                <p v-if="paydata[index].get_fee">此通道需支付手续费{{paydata[index].get_fee}}%</p>
                <p v-if="paydata[index].max">单笔金额下限{{paydata[index].min}}，上限{{paydata[index].max}}</p>
                <p
                  v-if="paydata[index].int_limit_type != 0"
                  v-text="paydata[index].int_limit_type == 1 ? '该支付仅支持充值100整数倍的金额，请充值如100,500等整数金额' : '该支付不支持充值100整数倍的金额，请充值如101,502等金额'"
                ></p>
                <p class="tips"><span>{{paydata[index].remark}}</span></p>
              </div>
              <div class="checkbox">
                <span>
                  <i class="font_family icon-dagou" v-show="payIndex == index"></i>
                  <i class="font_family icon-weigouxuan1" v-show="payIndex != index"></i>
                </span>
              </div>
            </li>
          </ul>
        </div>
        <div v-if="payInfo && payInfo.banklist && bankItems">
          <van-action-sheet
            v-model="bankIndex"
            :actions="bankItems"
          />
          <!-- <popup-radio
            title="选择银行"
            @on-show="popRadioShow()"
            @on-hide="popRadioHide()"
            class="pop"
            :options="bankItems"
            v-model="bankIndex"
            placeholder="请选择"
          >
            <p slot="popup-header" class="vux-1px-b demo3-slot">请选择银行</p>
            <template slot-scope="props" slot="each-item">
              <p>
                {{ bankItems[props.index].value }}
                <br>
              </p>
            </template>
          </popup-radio> -->
        </div>
        <div class="submitBox">
          <div class="btns">
            <van-button type="info" @click.native="payAction">提交充值</van-button>
          </div>
        </div>
      </div>
    </scroll>
    <form method="post" ref="payForm" :action="formData.requestUrl">
      <input
        type="hidden"
        v-for="(item, index) of formData.requestData"
        :name="index"
        :value="item"
        :key="index"
      >
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
import Scroll from "@/components/common/scroll"
import SecondHader from "@/components/common/SecondHader"

export default {
  name: "AutoPay",
  components: { Scroll, SecondHader },
  data() {
    return {
      scrollDatas: [],
      payIndex: 0,
      money: "",
      bankIndex: 0,
      formData: {},
      requestData: {},
      payIcons: {
        alipay: require("../../../assets/images/alipay.png"),
        jdpay: require("../../../assets/images/jdpay.png"),
        qqpay: require("../../../assets/images/qqpay.png"),
        weixinpay: require("../../../assets/images/weixinpay.png"),
        scanwxpay: require("../../../assets/images/scanpay.png"),
        scanysfpay: require("../../../assets/images/scanpay.png"),
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
    },

    payAction() {
      if (!parseFloat(this.money)) {
        this.$Toast.fail('请输入金额');
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
      var data = {
        method: "thirdPayment",
        order_amount: this.money,
        bank_code: this.bankInfo ? this.bankInfo.bankcode : "",// 有就传
        bank_type: this.bankInfo ? this.bankInfo.banktype : "",// 有就传
        pay_id: this.payInfo.id,
        card_num: '', //不需要
        card_name: '',//不需要
        password: ''//不需要
      };
      this.depositwithdrawplatform(data).then(res => {
        if (res.code == 200) {
          switch (res.data.requestType) {
            case "form":
              this.formData = res.data;
              this.$Dialog.confirm({
                title: '提交成功',
                message: '请点击确认跳转到支付页面'
              }).then(() => {
                this.$refs.payForm.submit(); //提交支付表单
              }).catch(() => {
                this.$Toast('已取消');
              });
              break;

            case "jump":
              this.$Dialog.confirm({
                title: '提交成功',
                message: '请点击确认跳转到支付页面'
              }).then(() => {
                window.location.href = res.data.requestUrl;
              }).catch(() => {
                this.$Toast('已取消');
              });
              break;

            case "scan":
              var data = res.data.requestData;
              this.$router.push({
                path: `/scanpage`,
                query: {
                  name: data.payName,
                  money: data.money,
                  img: data.filePath
                }
              });
              break;
          }
        }
      });
    },

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
      if (this.id && this.getPayData && this.getPayData[this.id]) {
        return this.getPayData[this.id];
      }
    },
    payItems() {
      if (this.paydata) {
        var res = [];
        for (var i = 0; i < this.paydata.length; i++) {
          res.push({ key: i, value: `支付通道${i + 1}` });
        }
        return res;
      }
    },
    payInfo() {
      if (this.paydata) {
        return this.paydata[this.payIndex];
      }
    },
    bankItems() {
      if (this.payInfo && this.payInfo.banklist) {
        var res = [];
        var data = this.payInfo.banklist;
        for (var i = 0; i < data.length; i++) {
          res.push({ key: i, value: data[i].bankname });
        }
        return res;
      }
    },
    bankInfo() {
      if (this.bankItems) {
        return this.payInfo.banklist[this.bankIndex];
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.inputBox {
  p {
    padding: px2rem(20px) px2rem(30px);
    font-size: px2rem(28px);
    color: #999;
  }
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

.payRadioContainer {
  .title {
    padding: px2rem(20px) px2rem(30px);
    font-size: px2rem(28px);
    color: #999;
  }
  .paylist {
    background-color: #fff;
    padding: 0 px2rem(30px);
    list-style: none;
    li {
      display: flex;
      border-bottom: 1px solid $home-line-color;
      .logo {
        width: px2rem(100px);
        display: flex;
        margin-right: px2rem(35px);
        justify-content: center;
        align-items: center;
        img {
          height: px2rem(100px);
          width: px2rem(100px);
        }
      }
      .info {
        flex: 1;
        padding: px2rem(20px) 0;
        h4 {
          font-size: px2rem(32px);
          color: #333;
          font-weight: 400;
          padding: 0;
        }
        p {
          font-size: px2rem(20px);
          color: #999999;
        }
        .tips{
          padding: px2rem(10px) 0;
        }
      }
      .checkbox {
        text-align: right;
        width: px2rem(50px);
        margin-left: px2rem(35px);
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          display: block;
          width: px2rem(40px);
          height: px2rem(40px);
          box-sizing: border-box;
          border-radius: 50%;
          i {
            vertical-align: middle;
            font-size: px2rem(40px);
            &.icon-dagou {
              color: $home-color;
            }
            &.icon-weigouxuan1 {
              color: #bbbbbb
            }
          }
        }
      }
    }
  }
}
</style>
