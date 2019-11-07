<template>
  <div class="pz-box" >   
        <!-- 扩大配资 -->
        <div v-if="postData.modifyType == 1">
            <div class="title">扩大配资</div>
            <div class="content">
                <div class="info">
                    <p>1. 扩大配资产生的利息费，需要一次性付清。</p>
                    <p>2. 按月配资按剩余操盘时间占总操盘时间的百分比计算。</p>
                </div>
                <p class="money-center fix-box">
                    <span class="left-font">账户余额：</span> 
                    <span>
                        <span class="money-style">{{getUserInfo.available_money | number}}</span>&nbsp;&nbsp;元
                    </span>
                </p>                
                <p class="money-center fix-box">
                    <span class="left-font">手续费：</span>
                    <span>
                        <span class="money-style">{{comPushMoney | number}}</span>&nbsp;&nbsp;元
                    </span>                   
                </p>
                <p class="fix-box">
                    <span class="left-font">追加金额：</span>
                    <input type="text" class="t-input right-money" v-model="pushMoney" @keyup.native="moneyKeyUp" @blur="moneyBlur">&nbsp;&nbsp;元                  
                </p>
            </div>
            <div class="footer">
                <span @click="pushAction(postData)">确认</span>
                <span @click="closeAlert">取消</span>
            </div>
        </div>
        <!-- 申请延期 -->
        <div v-if="postData.modifyType == 2">
            <div class="title">申请延期</div>
            <div class="content">
                <div class="info">
                    <p>续期根据当前平台设置的利率重新算，收取费用的公式和申请配资一样</p>
                </div>
                <p class="kuo-date fix-box">
                    <span class="left-font">续期时间</span>                   
                    <select v-model="extension">
                        <option :value="item.value" v-for="(item, index) in periodData" :key="index">{{item.lable}}</option>
                    </select>
                </p>
                <p v-if="getInterestMoney.interest_money*1 > 0" class="is-show">
                    您已到期 {{getInterestMoney.days}} {{computedData.order_type == 1 || computedData.order_type == 2 ? '个交易日' : '天'}}
                </p>
            </div>
            <div class="footer">
                <span @click="postponeAction(postData)">确认</span>
                <span @click="closeAlert">取消</span>
            </div>
        </div>
        <!-- 提取收益 -->
        <div v-if="postData.modifyType == 3">
            <div class="title">提取收益</div>
            <div class="content">
                <div class="info">
                    <p>配资用户的可用资金大于总操盘资金，且只能提取盈利部分，提取盈利最少为100元，以10元单位为递增，即可申请提取盈利。</p>
                </div>
                <p class="fix-box">
                    <span class="left-font">提取金额：</span>
                    <span><input class="t-input" type="text" v-model="extract">&nbsp;&nbsp;元</span>
                </p>
            </div>
            <div class="footer">
                <span @click="extractAction(postData)">确认</span>
                <span @click="closeAlert">取消</span>
            </div>
        </div>
        <!-- 增加保证金 -->
        <div v-if="postData.modifyType == 4">
            <div class="title">增加保证金</div>
            <div class="content">
                <div class="info">
                    <p>每次追加保证金不能小于当前方案总操盘资金的1%，注：追加保证金没有放大资金的效果。如需放大资金，请申请扩大配资。</p>
                </div>
                <p class="money-center fix-box">
                    <span class="left-font">账户余额：</span>
                    <span><span class="money-style">{{getUserInfo.available_money | number}}</span>&nbsp;&nbsp;元</span>
                </p>
                <p class="fix-box">
                    <span class="left-font">追加金额：</span>
                    <span><input class="t-input" type="text" v-model="addMoney"> 元</span>                   
                </p>
            </div>
            <div class="footer">
                <span @click="addAction(postData)">确认</span>
                <span @click="closeAlert">取消</span>
            </div>
        </div>
        <!-- 终止操盘 -->
        <div v-if="postData.modifyType == 5">
            <div class="title">终止操盘</div>
            <div class="content">
                <p class="end-title">您确定要申请终止操盘吗？</p>
                <div class="info">
                    <p>1. 按天按月配资，不返回系统已经扣除的管理费及其他费用。</p>
                    <p>2. 请确保您的交易账户已经卖出。</p>
                    <p>3. 免息配资方案我们不会扣除任何费用。</p>
                </div>
                <p v-if="getInterestMoney.interest_money*1 > 0" class="is-show">
                    您已到期 {{getInterestMoney.days}} {{computedData.order_type == 1 || computedData.order_type == 2 ? '个交易日' : '天'}}，
                    需支付利息&nbsp;&nbsp;{{getInterestMoney.interest_money | number}}&nbsp;&nbsp;元。
                </p>
            </div>
            <div class="footer">
                <span @click="endAction(postData)">确认</span>
                <span @click="closeAlert">取消</span>
            </div>
        </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
    /**
     * modifyType 1  扩大配资
     * modifyType 2  申请延期
     * modifyType 3  提取收益
     * modifyType 4  追加保证金
     * modifyType 5  终止操盘
     */
    props:['postData', 'computedData'],
    filters: {
        number(value) {
            var toFixedNum = Number(value).toFixed(2);
            return toFixedNum;
        }
    },
    data() {
        return {
            pushMoney: '',//追加金额
            extension: '',//申请延期
            extract: '',//提取收益
            addMoney: '',//追加保证金
        }
    },
    methods: {
        ...mapActions(['getModifyorderr']),
        closeAlert() {
            this.pushMoney = ''
            this.extension = ''
            this.extract = ''
            this.addMoney = ''
            this.$emit('listenCloseAlert', false)
        },
        moneyKeyUp(e) { //金额强制转浮点型 排除0 .
            if(e && (e.keyCode === 190 || e.keyCode === 48)){return;}
        },
        moneyBlur(e) {
            this.pushMoney = parseFloat(parseFloat(this.pushMoney).toFixed(2)) || '';
        },
        // 扩大配资
        pushAction(data) {
            if(this.pushMoney == '') return this.$Toast.fail('请输入金额')
            this.getModifyorderr(Object.assign({expandMoney: this.pushMoney}, data)).then((res) => {
                if(res.code == 200) {
                    this.closeAlert()
                    this.$Toast.success(res.message)
                }
            })
        },
        // 申请延期
        postponeAction(data) {
            if(this.extension == '') return this.$Toast.fail(`请输入续期时间`);
            this.getModifyorderr(Object.assign({extension: this.extension}, data)).then((res) => {
                if(res.code == 200) {
                    this.closeAlert()
                    this.$Toast.success(res.message)
                }
            })
        },
        // 提取收益
        extractAction(data) {
            //提取收益必须在当天的9点之前和15点之后
            let timer = new Date().getHours()
            if(timer < 15 && timer > 9) return this.$Toast.fail(`请在9点之前和15点之后提取收益`);
            if(this.extract == '') return this.$Toast.fail(`请输入金额`);
            if(this.extract*1 < 100) return this.$Toast.fail(`金额不小于100`);
            this.getModifyorderr(Object.assign({extractMoney: this.extract}, data)).then((res) => {
                if(res.code == 200) {
                    this.closeAlert()
                    this.$Toast.success(res.message)
                }
            })
        },
        // 追加保证金
        addAction(data) {
            if(this.addMoney == '') return this.$Toast.fail(`请输入金额`);           
            this.getModifyorderr(Object.assign({appendMoney: this.addMoney}, data)).then((res) => {
                if(res.code == 200) {
                    this.closeAlert()
                    this.$Toast.success(res.message)
                }
            })
        },
        // 终止操盘
        endAction(data) {
            this.getModifyorderr(Object.assign({end: 'end'}, data)).then((res) => {
                if(res.code == 200) {
                    this.closeAlert()
                    this.$Toast.success(res.message)
                }
            })
        },
        // 申请延期续期时间方法
        timeFun(min, max, order_type) {
            let day = '天'
            let monthV = '月'
            let arr = []
            for(let i = min; i <= max; i++) {
                // 交易类型是按天
                if(order_type == 2) {
                    arr.push({
                        value: Number(i),
                        lable: i + day
                    })
                }else {//交易类型按月，vip
                    arr.push({
                        value: Number(i),
                        lable: i + monthV
                    })
                }
            }
            return arr
        }
    },
    mounted() {

    },
    computed: {
        ...mapGetters([
            'getUserInfo', 
            'getSettingFree', 
            'getSettingDays', 
            'getSettingMonths', 
            'getSettingVip',
            'getLoansrate', 
            'getPeriodNumber',
            'getInterestMoney'
        ]),
        // 计算扩大配资管理费(本金*杠杆倍数*利率*周期)
        comPushMoney() {
            if(isNaN(this.pushMoney) || this.pushMoney == '') return 0
            let rate = 0
            let arr = []
            switch(this.computedData.order_type) {
                case 1 : arr = this.getLoansrate.free; break;
                case 2 : arr = this.getLoansrate.day; break;
                case 3 : arr = this.getLoansrate.month; break;
                case 4 : arr = this.getLoansrate.vip; break;
            }
            for(let item of arr) {
                if(item.multiple == this.computedData.multiple) {
                    // 利率
                    rate = item.rate / 100
                }
            }
            return this.pushMoney * this.computedData.multiple * rate * this.getPeriodNumber.period
        },
        // 计算续期时间
        periodData() {
            if(this.computedData.order_type == 2) {
                return this.timeFun(this.getSettingDays.time_range.min, this.getSettingDays.time_range.max, 2)
            }else if(this.computedData.order_type == 3) {
                return this.timeFun(this.getSettingMonths.time_range.min, this.getSettingMonths.time_range.max, 3)
            }else if(this.computedData.order_type == 4) {
                return this.timeFun(this.getSettingVip.time_range.min, this.getSettingVip.time_range.max, 4)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
select{
    border: 1px solid $home-line-color;
    outline: none;
    width: px2rem(400px);
    height: px2rem(68px);
    border-radius: 5px;
    background: #fff;
}
.kuo-date{
    // margin-bottom: px2rem(20px);
}
.t-input{
    height: px2rem(68px);
    // margin-bottom: px2rem(20px);
    border: 1px  solid $home-line-color;
    padding-left: px2rem(10px);
    border-radius: 5px;
}
.fix-box{
    display: flex;
    align-items: center;
}
.left-font{
    display: inline-block;
    width: px2rem(150px);
}
.pz-box{
    width: px2rem(680px);   
    .title{
        text-align: center;
        font-size: px2rem(34px);
        border-bottom: px2rem(1px) solid $home-line-color;
        line-height: px2rem(80px);
        color: #333;
    }
    .content{
        font-size: px2rem(30px);
        padding: px2rem(20px);
    }
    .end-title{
        margin-bottom: px2rem(20px);
    }
    .info{
        color: #f60;
        margin-bottom: px2rem(30px);
    }
    .money-center{
        margin-bottom: px2rem(20px);
    }
    .money-style{
        color: red;
    }
    .is-show{
        margin-top: px2rem(20px);
        color: red;
    }
    .footer{
       border-top: 1px solid #eee;
       display: flex;
       span{
           line-height: px2rem(90px);
           font-size: px2rem(30px);
           width: 50%;
           text-align: center;
       } 
        span:first-child{
            border-right: 1px solid #eee;
            color: #1989fa;
        }
    }
}
</style>