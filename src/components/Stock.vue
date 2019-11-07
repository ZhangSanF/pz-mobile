<template>
    <div class="stock">
      <SecondHader :headerTitle="titleText"/>
      <scroll class="container" :click="false" :data="scrollDatas">
          <div class="stockContainer">
            <div class="btnGroup">
              <span
              :type="titleText === '免息配资'? 'danger':'default'"
              :class="titleText === '免息配资'?'group-active':'group'"
              @click="changeMoneyType('免息配资')" loading-text="加载中...">
              免息配资</span>
              <span
              :type="titleText === '按天配资'? 'danger':'default'"
              :class="titleText === '按天配资'?'group-active':'group'"
              @click="changeMoneyType('按天配资')"
              loading-text="加载中...">按天配资</span>
              <span
              :type="titleText === '按月配资'? 'danger':'default'"
              :class="titleText === '按月配资'?'group-active':'group'"
              @click="changeMoneyType('按月配资')"
              loading-text="加载中...">按月配资</span>
              <span
              :type="titleText === 'VIP配资'? 'danger':'default'"
              :class="titleText === 'VIP配资'?'group-active':'group'"
              @click="changeMoneyType('VIP配资')"
              loading-text="加载中...">VIP配资</span>
            </div>
            <van-panel title="输入保证金">
              <div slot="default">
                <van-field
                  v-model.trim="bond"
                  :maxlength="pzSetting.bondMaxlength"
                  clickable
                  @input="onlyInteger"
                  @blur="checkBond"
                  @click-right-icon="bond = 0"
                  :placeholder="pzSetting.bondPlaceholder">
                  <div class="bondDiv">
                    <template slot="input">
                      <input class="bondInput" type="text">
                    </template>
                  </div>
                </van-field>
              </div>
              <div slot="footer">
                {{pzSetting.bondText}}
              </div>
            </van-panel>
            <van-panel title="选择您的配资金额">
              <div class="square">
                <ul ref="squareInner" class="square-inner flex">
                  <li
                    v-for="(item,key) in programData"
                    :key="key"
                    @click="selectProgram(item, key)">
                    <div class="inner-content" :class="[{'active':moneyLever == key}]">
                      <strong class="programNum" >{{item.multiple}}</strong>
                      <span>倍</span>
                      <p v-if="titleText === '按天配资'|| titleText === '免息配资' ">
                        日利率<br>{{item.rate -0 == 0 ?'免息':item.rate+'%'}}
                      </p>
                      <p v-else>月利率<br>{{item.rate}}%</p>
                    </div>
                  </li>
                </ul>
              </div>
            </van-panel>
            <van-panel title="选择操作期限">
              <div  class="dateBox" >
                <van-field
                  readonly
                  clickable
                  label="期限："
                  :value="showSelectTermText"
                  placeholder="请选择期限"
                  :right-icon="titleText == '免息配资'?'':'arrow'"
                  @click="showPopup()"
                />
                <van-cell v-if="titleText !== '免息配资'" >
                  <template slot="title">
                    <span class="custom-title">账户管理费:</span>
                  </template>
                  <template slot="default">
                    <span class="custom-title">
                      {{getMFee | number}}{{titleText === '按天配资' ? '元/交易日' : '元/自然月'}}
                    </span>
                  </template>
                </van-cell>
              </div>
            </van-panel>
            <van-panel title="确认交易时间">
              <div class="dateBox" >
                <van-field
                  readonly
                  clickable
                  label="交易时间:"
                  :value="showTake" 
                />
              </div>
            </van-panel>
            <van-panel >
              <div slot="header">
                <van-cell  >
                  <template slot="title">
                    <span >确认操盘信息</span>
                  </template>
                </van-cell>
              </div>
              <div class="tableBox">
                <table width="100%" cellpadding="0" cellspacing="0" class="sure">
                  <tbody class="tableTbody">
                    <tr>
                      <td class="title">配资须知</td>
                      <td class="value">
                        <b id="totalAmount">{{titleText === '免息配资' ? `盈利${pzSetting.divided}%全归您` : '盈利全归您'}}   </b>
                      </td >
                    </tr>
                    <tr>
                      <td class="title">总操盘资金</td>
                      <td class="value">
                        <b id="totalAmount">{{totalAmount}}</b>元
                      </td >
                    </tr>
                    <tr>
                      <td class="title">风险保证金</td>
                      <td class="value">
                        <b id="bzjOK">{{bond}}</b>元
                      </td>
                    </tr>
                    <tr>
                      <td class="title">亏损警戒线</td>
                      <td class="value">
                        <b id="warnLine">{{warnLine}}</b>元
                      </td>
                    </tr>
                    <tr>
                      <td class="title">亏损平仓线</td>
                      <td class="value">
                        <b id="outLine">{{outLine}}</b>元
                      </td>
                    </tr>
                    <tr>
                      <td class="title">操盘周期</td>
                      <td class="value">
                        <b>{{cycleValue}}</b><span>{{titleText === '免息配资' || titleText === '按天配资' ? '个交易日' : '个自然月'}}</span>
                      </td>
                    </tr>
                    <tr v-if="titleText !== '免息配资'">
                      <td class="title">账户管理费</td>
                      <td class="value">
                        <span id="accountManageFees" class="fs20">
                          <b>{{getMFee | number}}</b>元/{{titleText === '按月配资' || titleText === 'VIP配资'?'月' :'日'}} 
                          共<b>{{totalFree | number}}</b>元</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p class="tips">
                  <b class="tipsTitle">备注:</b>
                  您需支付的金额为保证金{{bond}}元
                  +{{totalFree | number}}元(利息)
                  ={{ (bond * 1 + totalFree * 1) | number}}元</p>
              </div>
            </van-panel>
            <div class="btn-common" @click="confrimPay">我要操盘</div>
          </div>
      </scroll>
      <van-popup v-model="isShowPopup" position="bottom" 
        :style="{ height: '50%' }">
        <van-picker
          :columns="periodData"
          show-toolbar
          :visible-item-count ="6"
          :default-index="4"
          @cancel="onCancel"
          @confirm="onConfirm"
        >
        </van-picker>
      </van-popup>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import Scroll from "@/components/common/scroll"
import SecondHader from "@/components/common/SecondHader"

export default {
  name: "stock",
  components: { Scroll, SecondHader },
  filters: {
    number(value) {
      var toFixedNum = Number(value).toFixed(2);
      return toFixedNum;
    }
  },
  data() {
    return {
      scrollDatas:[],
      titleText: "免息配资",
      moneyLever: 0, //默认第一个杠杆倍数
      isShowPopup: false, //显示期限弹出框
      bond: 0,
      multiple: 0,//杠杆倍数
      rate: 0,//利率
      showSelectTermText: "", //选择后期限
      cycleValue: '',//操盘周期
    };
  },
  created() {
    this.changeMoneyType(this.$route.query.titleText || '免息配资')
  },
  methods: {
    ...mapActions(['addOrder']),
    //切换页面重置数据
    changeMoneyType(txt) {
      this.titleText = txt
      this.moneyLever = 0
    },
    //显示弹窗
    showPopup() {
      if(this.titleText !== '免息配资'){
        this.isShowPopup = true
      }
    },
    //关闭弹窗
    onCancel() {
      this.isShowPopup = false;
    },
    //选择杠杆
    selectProgram(item, moneyLever) {
        this.moneyLever = moneyLever
        this.multiple = item.multiple
        this.rate = item.rate
    },
    //选择周期
    onConfirm(value, index) {
      this.showSelectTermText = value.text
      this.cycleValue = value.value
      this.isShowPopup = false
    },
    //检查保证金
    checkBond() {
      if(this.bond * 1 < this.pzSetting.moneyMin * 1) return this.bond = this.pzSetting.moneyMin
      if(this.bond * 1 > this.pzSetting.moneyMax * 1) return this.bond = this.pzSetting.moneyMax
    },
    //只能输入正整数
    onlyInteger(value) {
      this.bond = this.bond.replace(/[^\d]/g,'')
    },
    //提交数据
    confrimPay() {
      // 判断登录状态
      if(!this.getIsLogin) { this.$router.push('/user/login'); return }
      // 判断是否实名认证
      if(!this.getUserInfo.is_real_name) {
        this.$Dialog.alert({
          message: '您还未完成身份验证，请先进行实名认证'
        });
        this.$router.replace('/realName')
        return
      }
      // 判断金额
      if( (this.bond * 1) < (this.pzSetting.moneyMin * 1) || 
        (this.bond * 1) > (this.pzSetting.moneyMax * 1) || 
        (this.bond * 1) % (this.pzSetting.divisor * 1) !==0) {
        return this.$Toast.fail(`本金不小于${this.pzSetting.moneyMin}元,不大于${this.pzSetting.moneyMax},且为${this.pzSetting.divisor}的倍数`)
      }
      // 是否选了配资周期
      if(this.cycleValue == 0) { this.$Toast.fail('请选择你的配资周期'); return}
      let obj = {
          orderMoney: this.bond,//金额
          orderType: this.pzSetting.orderType,//配资单类型1免息2按天3按月4VIP
          multiple:  this.multiple,//杠杆倍数
          period: this.cycleValue//期限，周期
      }
      this.addOrder(obj).then((res)=>{
        if(res.code == 200) {
          this.$Toast.success(res.message)
          this.$router.push('/myFinancing')
        }
      })
    }
  },
  computed: {
    ...mapGetters([
      'getUserInfo',
      'getIsLogin',
      'getSettingFree', //免息 
      'getSettingDays', //按天
      'getSettingMonths', // 按月 
      'getSettingVip', //Vip
      'getLoansrate',
      'getSettingStock'
    ]),
    // 账户管理费 利率 * 本金 * 倍数  再除以100
    getMFee() {
      if(this.bond > 0) {
        return this.bond * this.multiple * (this.rate / 100)
      }else {
        return 0
      }
    },
    // 总操盘资金 本金 + 杠杆倍数 * 本金
    totalAmount(){
      return this.bond * 1 + this.multiple * this.bond
    },
    // 警戒线 = 配资资金 + 本金 × (100 - getSettingStock.risk_warning_line)/100
    warnLine() {
      return this.bond * this.multiple + this.bond * (100 - this.getSettingStock.risk_warning_line)/100
    },
    // 平仓线 = 配资资金 + 本金 × (100 - getSettingStock.risk_closeout_line)/100
    outLine() {
      return this.bond * this.multiple + this.bond * (100 - this.getSettingStock.risk_closeout_line)/100
    },
    //总账户管理费 = 交易日 * 交易日每天的管理费
    totalFree() {
      return this.getMFee * this.cycleValue
    },
    // 配资选项
    programData() {
      if(Object.keys(this.getLoansrate).length !== 0) {
        switch(this.titleText) {
          case '免息配资' : 
          console.log(this.getLoansrate.free[0]);
          
            this.multiple = this.getLoansrate.free[0].multiple
            this.rate = this.getLoansrate.free[0].rate
            return this.getLoansrate.free; 
          break;
          case '按天配资' : 
            this.multiple = this.getLoansrate.day[0].multiple
            this.rate = this.getLoansrate.day[0].rate
            return this.getLoansrate.day; 
          break;
          case '按月配资' : 
            this.multiple = this.getLoansrate.month[0].multiple
            this.rate = this.getLoansrate.month[0].rate
            return this.getLoansrate.month; 
          break;
          case 'VIP配资' : 
            this.multiple = this.getLoansrate.vip[0].multiple
            this.rate = this.getLoansrate.vip[0].rate
            return this.getLoansrate.vip; 
          break;
        }
      }     
    },
    // 配资基础配置(placeholder,保证金最大长度,保证金说明,交易日期限,交易类型,金额最小最大,金额的倍数)
    pzSetting() {
      let obj = {}
      if(Object.keys(this.getSettingFree).length !== 0 &&
      Object.keys(this.getSettingDays).length !== 0 &&
      Object.keys(this.getSettingMonths).length !== 0 &&
      Object.keys(this.getSettingVip).length !== 0) {
        switch(this.titleText) {
          case '免息配资' : 
            obj.bondPlaceholder = `投入资金${this.getSettingFree.money_range.min}起步,必须以${this.getSettingFree.money_divisor}的倍数`
            obj.bondMaxlength = this.getSettingFree.money_range.max.length
            obj.bondText = `*最少${this.getSettingFree.money_range.min},最多${this.getSettingFree.money_range.max}`
            obj.columnsMin = this.getSettingFree.time_range.min
            obj.columnsMax = this.getSettingFree.time_range.max
            obj.orderType = 1
            obj.moneyMin = this.getSettingFree.money_range.min
            obj.moneyMax = this.getSettingFree.money_range.max
            obj.divisor = this.getSettingFree.money_divisor
            obj.divided = this.getSettingFree.divided //用户可收收益 盈利
            this.bond = this.getSettingFree.money_range.min
          break;
          case '按天配资' : 
            obj.bondPlaceholder = `投入资金${this.getSettingDays.money_range.min}起步,必须以${this.getSettingDays.money_divisor}的倍数`
            obj.bondMaxlength = this.getSettingDays.money_range.max.length
            obj.bondText = `*最少${this.getSettingDays.money_range.min},最多${this.getSettingDays.money_range.max}`
            obj.columnsMin = this.getSettingDays.time_range.min
            obj.columnsMax = this.getSettingDays.time_range.max
            obj.orderType = 2
            obj.moneyMin = this.getSettingDays.money_range.min
            obj.moneyMax = this.getSettingDays.money_range.max
            obj.divisor = this.getSettingDays.money_divisor
            obj.divided = this.getSettingDays.divided //用户可收收益 盈利
            this.bond = this.getSettingDays.money_range.min
          break;
          case '按月配资' : 
            obj.bondPlaceholder = `投入资金${this.getSettingMonths.money_range.min}起步,必须以${this.getSettingMonths.money_divisor}的倍数`
            obj.bondMaxlength = this.getSettingMonths.money_range.max.length
            obj.bondText = `*最少${this.getSettingMonths.money_range.min},最多${this.getSettingMonths.money_range.max}`
            obj.columnsMin = this.getSettingMonths.time_range.min
            obj.columnsMax = this.getSettingMonths.time_range.max
            obj.orderType = 3
            obj.moneyMin = this.getSettingMonths.money_range.min
            obj.moneyMax = this.getSettingMonths.money_range.max
            obj.divisor = this.getSettingMonths.money_divisor
            obj.divided = this.getSettingMonths.divided //用户可收收益 盈利
            this.bond = this.getSettingMonths.money_range.min
          break;
          case 'VIP配资' : 
            obj.bondPlaceholder = `投入资金${this.getSettingVip.money_range.min}起步,必须以${this.getSettingVip.money_divisor}的倍数`
            obj.bondMaxlength = this.getSettingVip.money_range.max.length
            obj.bondText = `*最少${this.getSettingVip.money_range.min},最多${this.getSettingVip.money_range.max}`
            obj.columnsMin = this.getSettingVip.time_range.min
            obj.columnsMax = this.getSettingVip.time_range.max
            obj.orderType = 4
            obj.moneyMin = this.getSettingVip.money_range.min
            obj.moneyMax = this.getSettingVip.money_range.max
            obj.divisor = this.getSettingVip.money_divisor
            obj.divided = this.getSettingVip.divided //用户可收收益 盈利
            this.bond = this.getSettingVip.money_range.min
          break;
        }
      }
      return obj
    },
    // 计算交易周期
    periodData() {
      let day = '个交易日'
      let monthV = '个自然月'
      let arr = []
      if(this.pzSetting.columnsMin == this.pzSetting.columnsMax) {
        this.cycleValue = this.pzSetting.columnsMax
        this.showSelectTermText = this.pzSetting.columnsMax + day
        return [
          {
            value: this.pzSetting.columnsMax,
            text: this.pzSetting.columnsMax + day
          }
        ]
      }else {
        for(let i = this.pzSetting.columnsMin; i <= this.pzSetting.columnsMax; i++) {
          if(this.titleText == '免息配资' || this.titleText == '按天配资') {
            arr.push({
              value: Number(i),
              text: i + day
            })
          }else {
            arr.push({
              value: i,
              text: i + monthV
            })
          }
        }
        this.cycleValue = arr[0].value
        this.showSelectTermText = arr[0].text
        return arr
      }
    },
    // 时间判断显示是否为当日生效(true)&下个交易日生效(false)
    showTake() {
        let myDate = new Date().getHours()
        if(myDate >= 12) {
          return '下个交易日生效'
        }else {
          return '立即生效'
        }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.scrollDatas = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    });
  },
  watch: {

  }
};
</script>


<style lang="scss" scoped>
.stockContainer{
  padding-bottom: px2rem(20px);
}
.stock {
  background-color: #F0EFF4;
  height: 100%;
  .container{
    position: absolute;
    top: px2rem(88px);
    bottom: 0;
    width: 100%;
    overflow: hidden;
  }
  .btnGroup {
    padding: px2rem(20px) ;
    display: flex;
    justify-content: space-between;
    .group-active{
      background-color: #FD591E;
      color: #fff;
    }
    span{
      font-size: px2rem(33px) ;
      color: #666666;
      padding:  px2rem(10px) ;
      border-radius:  px2rem(8px) ;
    }
  }
  .van-panel {
    margin:0 px2rem(20px)  px2rem(20px)  px2rem(20px);
    border-radius:  px2rem(12px) !important ;
  }
  .van-cell{
    border-radius:  px2rem(12px) !important ;
  }
  .van-cell__title{
    font-size:  px2rem(36px);
    text-align: center;
    font-weight: bold
  }
  .van-panel__content{
    text-align: center
  }
  .van-field__body{
    background-color: #676767
  }
  .van-field{
    background-color: #F0EFF4;
    width:90%;
    color: #999;
    margin: 0 auto;
    margin-left: px2rem(30px);
  }
  .van-hairline--top::after {
      border-top-width:0
  }
  .van-panel__footer{
    font-size: px2rem(32px);
  }
  .bondInput {
    outline-style: none ;
    border: 0px;
  }
    .square-inner>li{
      box-sizing: border-box;
      color: #999;
      font-size: px2rem(28px);
      margin-bottom: px2rem(22px);
      width: 25%;
    }
    .inner-content{ 
      border: 1px solid  #999;
      border-radius: px2rem(10px);
      width: 80%;
      margin: 0 auto;
    }
    .programNum{
      font-size: px2rem(33px);
    }
    .flex{
      display: flex;
      flex-wrap: wrap;
    }
    .flex>li>div{
      padding:  px2rem(10px) 0;
      &.active{
        border: 1px solid  #FD591E;
        background-color: #FD591E;
        color: #fff;
      }
    }
    // .flex>li:nth-of-type(4n){ /* 选择个数是3的倍数的元素 */
    //   margin-right: 0;
    // }
  .tableBox {
    padding: px2rem(0px) px2rem(28px) px2rem(10px)  px2rem(28px);
    .tips {
      padding: px2rem(20px) 0 px2rem(10px) 0;
      font-size: px2rem(30px);
      color:rgb(153, 153, 153);
      .tipsTitle{
        color:rgb(51, 51, 51);
      }
    }
    .sure {
      border: 1px solid #e8e8e8;
      border-bottom: none;
      font-size: px2rem(33px) ;
      .title {
        padding-left: px2rem(36px);
        width: px2rem(180px) !important; 
        height: px2rem(64px) ;
        text-align: left;
        background-color: rgb(246, 247, 249);
        border-bottom: 1px solid rgb(221, 221, 221);
        border-right: 1px solid rgb(221, 221, 221);
        color: rgb(51, 51, 51);
        font-size: px2rem(28px) ;
      }
      .value{
        padding-left: px2rem(16px);
        text-align: left;
      }
      td {
        border-bottom: 1px solid #e4e4e4;
        line-height:  px2rem(64px) ;
        color: 333333;
        b {
          color: #FF0000;
        }
      }
    }
  }
  .selectDateBox {
    padding-bottom: 20px;
    text-align: center;
  }
}
.submitBtn {
  padding-bottom: px2rem(60px) ;
  background-color: #F0EFF4;
  .van-panel__header{
    display: none
  }
}
// .van-nav-bar {
//   background-color: $home-color;
//   height: px2rem(88px);
//   font-size: px2rem(28px);
//   .van-nav-bar__title {
//     color: #fff;
//     font-weight: bold;
//   }
// }
.van-cell:not(:last-child)::after {
    content:none 
}
.checkTrader{
  height: px2rem(70px);
  width:  px2rem(544px);
  line-height: px2rem(70px);
  border-radius: px2rem(10px);
  font-size: px2rem(36px);
}
.dateBox{
  min-height: 60px;
  .van-cell__title{
    text-align: left;
    font-weight: bold
  }
}
.tableTbody{
  font-size: px2rem(30px);
}
.van-field{
  font-size: px2rem(33px) !important;
}
.van-field__control{
  font-size: px2rem(33px) !important;
}
.custom-title{
  font-size: px2rem(33px) !important;
}
</style>
