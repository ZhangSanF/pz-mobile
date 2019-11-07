<template>
  <div class="withdrawalRecord">
      <SecondHader headerTitle="提现记录">
          <span slot="right" class="right" @click="showDialog">筛选 <span class="font_family icon-shaixuan"></span></span>
      </SecondHader>
      <scroll class="user-container" :click="false" :data="curData" :pullup="true" @scrollToEnd="scrollEnd" ref="curDataContent">
          <div>
              <ul class="card-box" v-if="curData.length > 0">
                  <li class="list" v-for="(item, index) in curData" :key="index">
                      <div class="item">
                          <span class="title">订单号<span class="info">{{item.order_id}}</span></span>                        
                      </div>
                      <div class="item">
                          <span class="title">提现账号<span class="info">{{item.username}}</span></span>                          
                      </div>
                      <div class="item">
                          <span class="title">提现金额<span class="info g-info money">{{item.trueamount}}</span></span>                          
                      </div>
                      <div class="item">
                          <span class="title">手续费<span class="info money">{{item.userfee}}</span></span>                         
                      </div>
                      <div class="item">
                          <span class="title">状态<span class="info money">{{item.cn_status}}</span></span>
                          <span class="date">{{item.createtime}}</span>
                      </div>
                  </li>
              </ul>
              <div v-else class="no-f-content">
                <van-divider>暂无数据</van-divider>
            </div>
              <div v-if="noContent" class="di-line">
                    <van-divider>我是有底线的</van-divider>
                </div>
          </div>
      </scroll>
      <!-- 筛选 -->
        <van-popup v-model="showPopup" position="top">
            <div class="box">
                <div class="transaction-box">
                    <p class="left-font">状态 ：</p>
                    <ul class="right-font">
                        <li 
                        v-for="(item, index) in dealType" 
                        :key="index" 
                        :class="item.value == type ? 'active' : ''"
                        @click="changeType(item.value)"
                        class="type-list">
                        {{item.name}}
                        </li>
                    </ul>
                </div>
                <div class="transaction-box">
                    <p class="left-font">快捷 ：</p>
                    <ul class="right-font">
                        <li 
                        v-for="(item, index) in dealDate" 
                        :key="index" 
                        :class="item.value == quick_time ? 'active' : ''"
                        @click="changeTime(item.value)"
                        class="type-list">
                        {{item.name}}
                        </li>
                    </ul>
                </div>
                <div class="transaction-box">
                    <p class="left-font">日期 ：</p>
                    <div class="right-date right-font">
                        <div class="date" @click="showDateStartAction">
                            <span>{{start_time == '' ? '开始日期' : start_time.split(' ')[0]}}</span>
                            <span class="font_family icon-rili iconSize"></span>
                        </div>
                        <div class="center">&nbsp;-&nbsp;</div>
                        <div class="date" @click="showDateEndAction">
                            <span>{{end_time == '' ? '结束日期' : end_time.split(' ')[0]}}</span>
                            <span class="font_family icon-rili iconSize"></span>
                        </div>
                    </div>
                </div>
                <div class="btn-box">
                    <span class="btn" @click="inquireAction">立即查询</span>
                </div>
            </div>
        </van-popup>
        <!-- 开始时间 -->
        <van-popup v-model="showDateStart" position="bottom">
            <van-datetime-picker
                v-model="dateTimeStart"
                type="datetime"
                @confirm="dateStartConfirm"
                @cancel="dateStartCancel"
            /> 
        </van-popup>
        <!-- 结束时间 -->
        <van-popup v-model="showDateEnd" position="bottom">
            <van-datetime-picker
                v-model="dateTimeEnd"
                type="datetime"
                @confirm="dateEndConfirm"
                @cancel="dateEndCancel"
            /> 
        </van-popup>
        <div class="loading-style" v-if="getShowLoadMore">
            <van-loading size="24px"><span>加载中...</span></van-loading>
        </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import SecondHader from "@/components/common/SecondHader"
import Scroll from "@/components/common/scroll"
import { formatDate } from '@/assets//js/utils'

export default {
    components: { Scroll, SecondHader },
    data() {
        return {
            noContent: false,
            dealType: [
                {name: '全部', value: '2'},
                {name: '已通过', value: '1'},
                {name: '未审核', value: '0'},
                {name: '已拒绝', value: '-2'},
                // {name: '失败', value: '-1'}
            ],
            dealDate: [
                {name: '全部', value: '-1'},
                {name: '最近七天', value: '1'},
                {name: '1个月', value: '2'},
                {name: '3个月', value: '3'}
            ],
            showPopup: false,
            showDateStart: false,
            dateTimeStart: new Date(),
            showDateEnd: false,
            dateTimeEnd: new Date(),
            curData: [],
            start_time: '',// 开始时间
            end_time: '',// 结束时间
            quick_time: '-1',// 快选时间(全部-1，近一周1，一个月2，三个月3)
            type: '2',// 交易状态(已拒绝-2，失败-1，未审核0，已通过1，全部2)
            page: 1,// 页码
            page_size: 10,// 每页数量   
            dep_with: 2,//充值或提现（1：充值，2：为提现）                   
        }
    },
    created() {
        this.withdrawalrecordFun()
    },
    methods: {
        ...mapActions(['paymenTrecord']),
        withdrawalrecordFun() {
            this.paymenTrecord({
                start_time: this.start_time,
                end_time: this.end_time,
                quick_time: this.quick_time,
                type: this.type,
                page: this.page,
                page_size: this.page_size,
                dep_with: this.dep_with,
            }).then((res) => {
                if(res.code == 200) {
                    if(this.page == 1) {
                        this.curData = res.data.rows
                    }else {
                        if(res.data.rows.length <= 0) {
                            this.noContent = true
                            return this.$Toast.fail('没有更多数据')
                        }                        
                        this.curData = [...this.curData, ...res.data.rows]
                    } 
                }
            })
        },
        // 立即查询
        inquireAction() {
            this.noContent = false
            this.$refs.curDataContent.scrollTo(0, 0, 300)
            this.page = 1
            this.showPopup = false
            this.withdrawalrecordFun()
        },
        scrollEnd() {
            if(this.noContent) return;
            this.page++
            this.$store.commit('SHOW_LOADMORE', true)
            this.withdrawalrecordFun()
        },
        // 选择交易日期
        changeTime(value) {
            this.quick_time = value
        },
        // 选择交易类型
        changeType(value) {
            this.type = value
        },
        // 开始时间显示隐藏
        showDateStartAction() {
            this.showDateStart = !this.showDateStart
        },
        // 开始时间 confirm
        dateStartConfirm(val) {
            this.start_time = formatDate(val.getTime(), 'YY-MM-DD hh:mm:ss')
            this.showDateStart = false
        },
        // 开始时间 cancel
        dateStartCancel() {
            this.showDateStart = false
        },
        // 结束时间显示隐藏
        showDateEndAction() {
            this.showDateEnd = !this.showDateEnd
        },
        // 结束时间 confirm
        dateEndConfirm(val) {
            this.end_time = formatDate(val.getTime(), 'YY-MM-DD hh:mm:ss')
            this.showDateEnd = false
        },
        // 结束时间 cancel
        dateEndCancel() {
            this.showDateEnd = false
        },
        // 筛选
        showDialog() {
            this.showPopup = !this.showPopup
        },
    },
    mounted() {

    },
    computed: {
        ...mapGetters(["getShowLoadMore"]),
    }
}
</script>

<style lang="scss" scoped>
.withdrawalRecord{
    .no-f-content{
        .van-divider{
            margin: px2rem(20px) 0;
        }
    }
    .di-line{
        .van-divider{
            margin: 0;
        }
    }
}
.card-box{
    padding: px2rem(20px);
    .list{
        background: #fff;
        border-radius: 5px;
        padding: px2rem(24px);
        margin-bottom: px2rem(20px);
        .item{
            margin-bottom: px2rem(20px);
            display: flex;
            align-items: center;
            justify-content: space-between;
            .title{
                font-size: px2rem(26px);
                color: #333;
            }
            .info{
                font-size: px2rem(24px);
                color: #999;
                padding-left: px2rem(32px);
            }
            .g-info{
                padding-left: px2rem(56px);
            }
            .money{
                color: #fd591e;
            }
            .date{
                color: #333;
                font-size: px2rem(24px); 
            }
        }
        .item:last-child{
            margin-bottom: 0;
        }
    }
}
.withdrawalRecord{   
    .box{
        padding: px2rem(30px) 0;
    } 
    .left-font{
        font-size: px2rem(29px);
        color: #333;
    }
    .right-font{
        font-size: px2rem(26px);
        color: #333;
    }
    .transaction-box{
        display: flex;       
        align-items: center;
        padding-left: px2rem(30px);
        margin-bottom: px2rem(30px);
        .type-list{
            float: left;
            margin-right: px2rem(40px);
            padding: px2rem(3px) px2rem(8px);
        }
        .type-list:last-child{
            margin-right: 0;
        }
        .active{
            background: $home-color;
            color: #fff;
        }
        .right-date{
            display: flex;
            .date{
                box-sizing: border-box;
                border: 1px solid #ccc;
                width: px2rem(280px);
                height: px2rem(60px);
                border-radius: 4px;
                display: flex;
                padding: 0 px2rem(34px);
                justify-content: space-between;
                align-items: center;
            }
            .center{
                height: px2rem(60px);
                line-height: px2rem(60px);
            }
        }
    }
    .btn-box{
        text-align: center;
        font-size: px2rem(32px);
        .btn{
            display: inline-block;
            width: px2rem(210px);
            height: px2rem(60px);
            line-height: px2rem(60px);
            background: $home-color;
            color: #fff;
            border-radius: 5px;
        }
    }
    .van-popup--top{
        top: px2rem(88px);
    }
}
.loading-style{
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 100;
}
.iconSize{
    // font-size: px2rem(24px);
}
</style>