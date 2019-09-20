<template>
    <div class="stock">
      <scroll class="container" :click="false" :data="scrollDatas">
          <div class="stockContainer">
            <van-nav-bar  :title="titleText" left-arrow @click-left="onClickLeft" />
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
          <van-panel :title="boudTitle">
            <div slot="default">
              <!--right-icon="cross" -->
              <van-field
                v-model.trim="bond"
                :maxlength="bondMaxlength"
                clickable
                @input="onlyInteger"
                @blur="checkBond"
                @click-right-icon="bond = 0"
                :placeholder="bondPlaceholder">
                <div class="bondDiv">
                  <template slot="input">
                    <input class="bondInput" type="text">
                  </template>
                </div>
              </van-field>
            </div>
            <div slot="footer">
              {{bondText}}
            </div>
          </van-panel>
          <van-panel class="programData" :title="programTitle">
            <div class="square"
              :style="{'padding-bottom':getSquarePaddingBot}"
              :class="{'free':titleText === '免息配资' 
              ||  titleText === 'VIP配资'  }">
              <ul ref="squareInner" class="square-inner flex">
                <li
                  v-for="(item,key) in programData"
                  :key="key"
                  :class="[{'active':moneyLever == key}]"
                  @click="selectProgram(item,key)">
                  <strong class="programNum" >{{item.multiple}}</strong>
                  <span>倍</span>
                  <p v-if="titleText === '按天配资' 
                  || titleText === '免息配资' ">
                    日利率<br>{{item.rate -0 == 0 ?'0%':item.rate+'%'}}</p>
                  <p v-else>
                    月利率<br>{{item.rate}}%</p>
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
                right-icon="arrow"
                @click="showPopup('sureTheTerm')"
              />
              <van-cell v-if="titleText !== '免息配资'" >
                <template slot="title">
                  <span class="custom-title">账户管理费:</span>
                </template>
                <template slot="default">
                  <span class="custom-title"
                    v-show="titleText == '按天配资'">
                    {{getMFee}}元/交易日</span>
                  <span class="custom-title"
                    v-show="titleText == '按月配资' || titleText === 'VIP配资'">
                    {{getMFee}}元/自然月</span>
                  <span class="custom-title"
                    v-show="titleText == '免息配资'">
                    {{0}}</span>
                </template>
              </van-cell>
            </div>
          </van-panel>
          <van-panel title="确认交易时间">
            <div  class="dateBox" >
              <van-field
                readonly
                clickable
                label="交易时间:"
                :value="showSelectTimeText"
                placeholder="请选择交易时间"
                right-icon="arrow"
                @click="showPopup('sureTime')"
              />
            </div>
          </van-panel>
          <van-panel >
            <div slot="header">
              <van-cell  >
                <template slot="title">
                  <span >确认操盘信息</span>
                </template>
                <!-- <template slot="right-icon">
                  <van-icon
                    slot="right-icon"
                    name="warning-o"
                    class="warning"
                    @click="warningInfo"
                  />
                </template> -->
              </van-cell>
            </div>
            <div class="tableBox">
              <table width="100%" cellpadding="0" cellspacing="0" class="sure">
                <tbody class="tableTbody">
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
                      <b id="cycle" 
                        v-show="titleText === '免息配资' || titleText === '按天配资'">
                        {{cycleValue}}个交易日
                        </b>
                        
                      <b id="cycle" v-show="titleText === '按月配资' || titleText === 'VIP配资'">{{cycleValue}}个自然月</b>
                    </td>
                  </tr>
                  <tr>
                    <td class="title">账户管理费</td>
                    <td class="value">
                      <span id="accountManageFees" class="fs20">
                        <b>{{totalFree}}</b>
                        元/
                        {{titleText === '按月配资' || titleText === 'VIP配资'?'月' :'日'}} 
                        共
                        <b>{{totalFree}}</b>
                        元</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p class="tips">
                <b class="tipsTitle">备注:</b>
                您需支付的金额为保证金{{bond}}元
                +{{totalFree}}元(利息)
                ={{ Number(bond)+Number(totalFree)}}元</p>
            </div>
          </van-panel>
          <van-panel class="submitBtn">
            <van-button
            @click ="checkTrader"
            :loading="traderLoding"
            loading-text="操盘中"
            class="checkTrader"
            type="danger">我要操盘</van-button>
          </van-panel>

          </div>
      </scroll>
      <van-popup v-model="isShowPopup" position="bottom" 
        :style="{ height: '60%' }">
        <van-picker
          ref="picker"
          :columns="columns"
          show-toolbar
          :visible-item-count ="6"
          :default-index="4"
          :title="pickerTitle"
          @cancel="onCancel"
          @confirm="onConfirm"
        >
        </van-picker>
      </van-popup>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import Scroll from "@/components/common/scroll";
import { 
programFree,
programDay,
programMonth,
programVip } from '@/config'
export default {
  name: "stock",
  components: { Scroll },
  data() {
    return {
      titleText: "免息配资",
      moneyLever: 0, //默认第一个杠杆倍数
      selectLeverObj:{}, //选中的杠杆倍数
      isShowPopup: false, //显示期限弹出框
      bond: null, //保证金
      bondMaxlength:'15', //保证金最大字符数
      columns: [], // 期限,交易时间
      showSelectTermText: "", //选择后期限
      showSelectTimeText: "", //选择后交易时间
      programData: programFree, // 杠杆资金放大倍数List
      settingObj:{}, //配资设置 
      boudTitle:`输入保证金`,
      programTitle:'选择您的配资金额',
      cycle:'-',//操盘周期
      cycleValue: 0,//操盘周期数字
      timeValue: 0,//操盘时间数字
      traderLoding: false,
      scrollDatas:[],
      pickerTitle:'',//弹出框选项的Title
      canSubmitData: false, //是否可提交数据
      orderType:1,
      periodList:[],//columns 对应的key 值  选中后用
      bondPlaceholder:'',//输入保证金提示
      bondText:''//保证金说明
    };
  },
  methods: {
    //切换页面数据
    ...mapActions(['addOrder']),
    changeMoneyType(txt) {
      this.titleText = txt;
      switch(txt) {
          case '免息配资':
            this.orderType = 1
            this.setData(this.getSettingFree || {},this.getLoansrate.free) //重置所有数据
              break;
          case '按天配资':
            this.orderType = 2
            this.setData(this.getSettingFree || {},this.getLoansrate.day) //重置所有数据
              break;
          case '按月配资':
            this.orderType = 3
            this.setData( this.getSettingMonths || {},this.getLoansrate.month) //重置所有数据
              break;
          case 'VIP配资':
            this.orderType = 4
            this.setData(this.getSettingVip || {},this.getLoansrate.vip ) //重置所有数据
              break;
      }
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    //显示弹窗
    showPopup(type) {
      this.columns = []
      this.periodList = []
      if(type === 'sureTime'){
        this.pickerTitle = '请选择交易时间'
        let myDate = new Date().getHours()
        this.columns = 
        myDate >= 12 
        ?[{values:['当日生效'],
            type:'time'
          }]
        :[{values:['当日生效','下个交易日生效'],key:'time'}]
        this.periodList = [1,2]
      }else
      if(type === 'sureTheTerm') {
        let columnsMax = this.settingObj.time_range.max
        let columnsMin = this.settingObj.time_range.min
        //重置期限选择 columns
        if(columnsMax) {
          let termColumns = [] 
          for(let i = columnsMin ;i<= columnsMax ; i ++ ) {
            const columnsType = this.titleText == '免息配资' || this.titleText == '按天配资' 
            ?'个交易日'
            :'个自然月'
            termColumns.push(i + columnsType)
            this.periodList.push(i)
            this.columns =[{
              values:termColumns,
              type:'term'
            }]
          }

        }
      }
      this.isShowPopup = true;
    },
    //关闭弹窗
    onCancel() {
      this.isShowPopup = false;
    },
    //选择杠杆
    selectProgram(selectLeverObj,moneyLever) {
        this.moneyLever = moneyLever
        this.selectLeverObj = selectLeverObj
    },
    //选择周期
    onConfirm(value, index) {
      if(this.columns[0].type === 'term') {
        this.showSelectTermText = value[0];
        this.cycle = value [0]
        this.cycleValue = this.periodList[index]
      }else
      if(this.columns[0].type === 'time') {
        this.showSelectTimeText = value[0];
        this.timeValue = this.periodList[index]
      }
      this.isShowPopup = false;
    },
    // 时间判断显示是否为当日生效(true)&下个交易日生效(false)
    showTake() {
        let myDate = new Date().getHours()
        if(myDate >= 12) {
            return false
        }else {
            return true
        }
    },
    //重置页面基础数据
    setData(settingObj,programData) {
      //重置输入保证金的最大字符数 
      this.resetData(settingObj,programData)
      if(settingObj.money_range){
        this.bondMaxlength = String(settingObj.money_range.max).length
      }
    },
    //重置基础数据
    resetData(settingObj,programData) {
      this.programData = programData  //初始化杠杆list
      this.selectLeverObj = programData[0] //默认为第一个杠杆
      this.settingObj = settingObj
      this.columns = []
      this.bondMaxlength = '15'
      this.showSelectTermText = "", //选择后期限
      this.showSelectTimeText = "", //选择后交易时间
      this.bond = settingObj.money_range.min || 500
      this.cycleValue = 0//操盘周期数字
      this.cycleValue = 0//操盘时间数字
      this.bondPlaceholder = `投入资金${settingObj.money_range.min || 500} 起步,必须是100的倍数`
      this.bondText = `*最少${settingObj.money_range.min || 500},最多${settingObj.money_range.max || 5000000}`
    },
    //检查保证金
    checkBond() {
      const  bondMin = this.settingObj.money_range.min
      const  bondMax = this.settingObj.money_range.max
      if(this.bond < bondMin-0) return this.bond = bondMin
      if(this.bond > bondMax-0) return this.bond = bondMax
    },
    //只能输入正整数
    onlyInteger(value) {
      this.bond = this.bond.replace(/[^\d]/g,'')
    },
    warningInfo() {
      console.log(1);
      //操盘说明
    },
    //操盘确认数据是否正确
    checkTrader() {
      // 判断是否实名认证
      this.canSubmitData = false
      if( this.cycleValue == 0 ){
        this.$Toast.fail('请选择你的配资周期');
        return 
      }else
      if( this.timeValue == 0 ){
        this.$Toast.fail('请选择你的配资交易时间');
        return 
      } 
      if(this.bond % 100 !==0) {
        this.$Toast.fail('保证金必须是100的倍数');
        return 
      }
      // if(!this.getUserInfo.is_real_name) {
      //     this.$Toast.fail('您还未完成身份验证，请先进行实名认证');
      //     // this.$router.push('/')
      // }
      this.canSubmitData = true
      this.submitTrader()
    },
    //提交数据
    submitTrader() {
      if(this.canSubmitData) {
          this.traderLoding = true
      }
      let obj = {
          orderMoney: this.bond || '0',//金额
          orderType: this.orderType,//配资单类型1免息2按天3按月4VIP
          multiple:  this.selectLeverObj.multiple || '0',//杠杆倍数
          period: this.cycleValue//期限，周期
      }
      this.addOrder(obj).then((res)=>{
        this.traderLoding = false
        if(res== 200) {
          this.$router.push('/user/about')
        }
      })
    }
  },
  computed: {
    ...mapGetters([
      'getSettingFree', //免息 
      'getSettingDays', //按天
      'getSettingMonths', // 按月 
      'getSettingVip', //Vip
      'getUserInfo',
      'getLoansrate'
    ]),
    //账户管理费 利率*配资资金*倍数  再除以100
    getMFee() {
      if(this.bond > 0) {
        const rate = this.selectLeverObj.rate 
        const multiple = this.selectLeverObj.multiple 
        return (Number(this.bond)*rate * multiple/100).toFixed(2)
      }else {
        return 0
      }
    },
    //总操盘资金 配资资金+ 杠杆倍数*配资资金
    totalAmount(){
      return Number(this.bond) + this.selectLeverObj.multiple * Number(this.bond) 
    },
    //风险保证金
    bzjOK() {
      return 0
    },
    //亏损警戒线 杠杆倍数 * 配资金额的百分之50
    warnLine() {
      return  this.selectLeverObj.multiple * Number(this.bond) + Number(this.bond)/2 
    },
    //亏损平仓线 杠杆倍数 * 配资金额的百分之80
    outLine() {
      return this.selectLeverObj.multiple * Number(this.bond) + Number(this.bond)*0.8
    },
    //总账户管理费 账户管理费*配资天数或月数
    totalFree() {
      return Number(this.getMFee)  * Number(this.cycleValue) 
    },
    //根据选项个数计算配资金额距离底部的高度
    getSquarePaddingBot() {
      return (parseInt(this.programData.length/4 +1)*20)+'%'
    }
  },
  mounted() {
    this.changeMoneyType(this.$route.query.titleText || '免息配资')
    window.onresize = () => {
      return (() => {
        //todu
      })()
    }
  },
};
</script>


<style lang="scss" scoped>
// @import '@/assets/css/public.scss';
.stock {
  padding-bottom :px2rem(100px);
  background-color: #F0EFF4;
  height: 100%;
  .container{
    position: absolute;
    top: 0;
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
      font-size: px2rem(30px) ;
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
    width:px2rem(544px);
    color: #999;
    margin: 0 auto;
    margin-left: px2rem(30px);
  }
  .van-hairline--top::after {
      border-top-width:0
  }
  .van-panel__footer{
    font-size: px2rem(22px);
  }
  .bondInput {
    outline-style: none ;
    border: 0px;
  }
  //
    .programData{
      position: relative;
      padding: px2rem(22px);
    }
    .square{
      position: relative;
      padding: px2rem(22px);
      height: 100%;
      // padding-bottom: 65%; /* padding百分比是相对父元素宽度计算的 */
      background-color: #fff;
    }
    .square-inner{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: auto; /* 铺满父元素容器，这时候宽高就始终相等了 */
    }
    .square-inner>li{
      border-radius: px2rem(8px);
      padding: 0; 
      border: 1px solid  #999;
      width: px2rem(117px);;  /* calc里面的运算符两边要空格 */
      margin-right: px2rem(23px);;
      overflow: hidden;
    }
    .programNum{
      font-size: px2rem(40px);
    }
    .flex{
      display: flex;
      flex-wrap: wrap;
    }
    .flex>li{
      // flex-grow: 1; /* 子元素按1/n的比例进行拉伸 */
      text-align: center;
      margin-bottom: px2rem(22px);
      font-size: px2rem(20px);
      &.active{
        border: 1px solid  #FD591E;
        background-color: #FD591E;
        color: #fff;
      }
    }
    .flex>li:nth-of-type(4n){ /* 选择个数是3的倍数的元素 */
      margin-right: 0;
    }
  .tableBox {
    padding: px2rem(0px) px2rem(28px) px2rem(10px)  px2rem(28px);
    .tips {
      padding: px2rem(20px) 0 px2rem(10px) 0;
      font-size: px2rem(22px);
      color:rgb(153, 153, 153);
      .tipsTitle{
        font-size: px2rem(24px);
        color:rgb(51, 51, 51);
      }
    }
    .sure {
      border: 1px solid #e8e8e8;
      border-bottom: none;
      font-size: px2rem(24px) ;
      .title {
        padding-left: px2rem(36px);
        width: px2rem(154px) !important; 
        height: px2rem(64px) ;
        text-align: left;
        background-color: rgb(246, 247, 249);
        border-bottom: 1px solid rgb(221, 221, 221);
        border-right: 1px solid rgb(221, 221, 221);
        color: rgb(51, 51, 51);
        font-size: px2rem(24px) ;
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
.van-nav-bar {
  background-color: #FD591E;
  height: px2rem(70px) ;
  .van-nav-bar__title {
    color: #fff;
  }
  .van-icon {
    color: #ccc;
    font-size: 20px;
    display: none
  }
}
.van-cell:not(:last-child)::after {
    content:none 
}
.checkTrader{
  height: px2rem(70px);
  width:  px2rem(544px);
  background-color: #FD591E;
  line-height: px2rem(70px);
  border-radius: px2rem(10px);
}
.dateBox{
  min-height: 60px;
  .van-cell__title{
    text-align: left;
    font-weight: bold
  }
}
</style>
