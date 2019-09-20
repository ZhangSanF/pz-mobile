<template>
  <div class="pz-list">
        <van-collapse v-model="activeNames">
            <van-collapse-item :name="index" v-for="(item, index) in getOrderList" :key="index">
                <div slot="title" class="title">
                    <div class="title-top">
                        <div class="top-left">
                            <!-- 状态(1待审核、2审核通过、3审核失败，4操盘结束) -->
                            <p class="number">股票配资：{{item.order_number}}
                                <span v-show="item.status == 1" class="state ready">待审核</span>
                                <span v-show="item.status == 2" class="state succee">操盘中</span>
                                <span v-show="item.status == 3" class="state fail"></span>
                                <span v-show="item.status == 4" class="state end"></span>
                            </p>
                            <p class="date">{{item.start_time.split(' ')[0]}} ~ {{item.end_time.split(' ')[0]}}</p>
                        </div>
                        <div class="right-info">查看详情</div>
                    </div>
                    <div class="title-bottom">
                        <div>
                            <p class="info">{{item.member_money | number}}元</p>
                            <p class="name">配资保证金</p>
                        </div>
                        <div>
                            <p class="info">{{traderMoney(item.member_money, item.credit_money) | number}}元</p>
                            <p class="name">操盘总资金</p>
                        </div>
                        <div>
                            <p class="info">
                                <span v-if="item.status == 1 || item.status == 3">--</span>
                                <span v-else>{{item.username}}</span>
                            </p>
                            <p class="name">账户</p>
                        </div>
                        <div>
                            <p class="info">
                                <span v-if="item.status == 1 || item.status == 3">--</span>
                                <span v-else>{{item.password}}</span>  
                            </p>
                            <p class="name">密码</p>
                        </div>
                    </div>
                </div>
                <div class="content">
                    <div class="title-bottom">
                        <div>
                            <p class="info">{{item.credit_money | number}}元</p>
                            <p class="name">借入资金</p>
                        </div>
                        <div>
                            <p class="info">{{item.interest_money | number}}元</p>
                            <p class="name">利息</p>
                        </div>
                        <div>
                            <p class="info">
                                <span v-if="item.status == 1 || item.status == 3">--</span>
                                <span v-else>{{item.warning_amount | number}}</span>
                            </p>
                            <p class="name">警戒线</p>
                        </div>
                        <div>
                            <p class="info">
                                <span v-if="item.status == 1 || item.status == 3">--</span>
                                <span v-else>{{item.closeout_amount | number}}</span>
                            </p>
                            <p class="name">平仓线</p>
                        </div>
                    </div>
                    <div class="title-bottom borer-line">
                        <div>
                            <p class="info">
                                <span v-if="item.status == 1 || item.status == 3">{{item.withdrawable_profit}}元</span>
                                <span v-else>{{item.withdrawable_profit | number}}</span> 
                            </p>
                            <p class="name">可提金额</p>
                        </div>
                        <div>
                            <p class="info">{{item.period}}
                                <span v-if="item.order_type == 1 || item.order_type == 2">天</span>
                                <span v-else>个月</span>
                            </p>
                            <p class="name">操盘周期</p>
                        </div>
                    </div>
                    <div class="operation">
                        <p>申请延期</p>
                        <p>提取收益</p>
                        <p>终止操盘</p>
                    </div>
                    <div class="btn-list">
                        <p>增加保证金</p>
                        <p>扩大配资</p>
                        <p>股票登录</p>
                        <p>配资合同</p>
                        <p>收起详情</p>
                    </div>
                </div>
            </van-collapse-item>
        </van-collapse>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    filters: {
        number(value) {
            var toFixedNum = Number(value).toFixed(2);
            return toFixedNum;
        }
    },
    props: ['getOrderList'],
     data() {
        return {
            activeNames: [0],           
        };
    },
    created() {

    },
    methods: {
        // 操盘资金 = 本金(member_money) + 配资资金(credit_money)
        traderMoney(member_money, credit_money) {
            return member_money * 1 + credit_money * 1
        },
    },
    mounted() {

    },
    computed: {

    }
}
</script>

<style lang="scss" scoped>
.title{
    padding-top: px2rem(20px);
    .title-top{
        margin-left: px2rem(15px);
        padding-right: px2rem(30px);
        padding-bottom: px2rem(20px);
        display: flex;
        justify-content: space-between;
        align-items: center;
        .top-left{
            font-size: px2rem(22px);
            .number{
                color: #333;
                font-weight: bold;
            }
            .state{
                display: inline-block;
                width: px2rem(80px);
                height: px2rem(30px);
                line-height: px2rem(30px);
                text-align: center;
                color: #fff;
                font-size: px2rem(20px);
                border-radius: 4px;
                margin-left: px2rem(10px);
            }
            .ready{
                background: #199760;
            }
            .succee{
                background: #ff0000;
            }
            .fail{
                background: #666;
            }
            .end{
                background: #999;
            }
            .date{
                font-size: px2rem(20px);
                color: #999;
            }
        }
        .right-info{
            padding: px2rem(11px);
            background: $home-color;
            color: #fff;
            font-size: px2rem(22px);
            border-radius: 4px;
        }
    }
}
.title-bottom{
    margin-left: px2rem(15px);
    border-top: px2rem(1px) solid $home-line-color;
    padding: px2rem(20px) 0;
    display: flex;
    justify-content: space-around;
    .info{
        font-size: px2rem(24px);
        color: rgb(253, 89, 30);
        text-align: center;
    }
    .name{
        font-size: px2rem(24px);
        color: #666;
        text-align: center;
    }
}
.borer-line{
    border-bottom: px2rem(1px) solid $home-line-color;
}
.content{
    .operation{
        display: flex;
        padding: px2rem(30px) px2rem(115px);
        justify-content: space-between;
        p{
            padding: px2rem(10px) px2rem(8px);
            font-size: px2rem(24px);
            color: rgb(253, 89, 30);
            border: px2rem(1px) solid rgb(253, 89, 30);
            border-radius: 4px;
        }
    }
    .btn-list{
        padding: 0 px2rem(10px) px2rem(20px);
        display: flex;
        justify-content: space-between;
        p{
            padding: px2rem(11px);
            font-size: px2rem(22px);
            color: #fff;
            border-radius: 4px;
            background: $home-color;
        }
    }
}
</style>
<style lang="scss">
.pz-list{
    .van-cell{
        padding: 0;
    }
    .van-cell__right-icon{
        display: none;
    }
    .van-collapse-item{
        margin-bottom: px2rem(20px);
    }
    .van-cell:not(:last-child)::after{
        display: none;
    }
    .van-collapse-item__content{
        padding: 0;
    }
    .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after{
        border: none;
    }
}
</style>