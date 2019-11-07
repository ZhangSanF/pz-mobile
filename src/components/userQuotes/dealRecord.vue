/**
成交记录
 */
<template>
  <div class="deal-record">
      <van-tabs v-model="activeName" @click="changeTab">
            <van-tab title="近7日" name="-1">
                <div class="content-box">
                    <van-row class="title" type="flex" justify="space-between">
                        <van-col span="6" tag="span">委托时间</van-col>
                        <van-col span="6" tag="span">委托价格</van-col>
                        <van-col span="6" tag="span">成交数量</van-col>
                        <van-col span="6" tag="span">状态</van-col>
                    </van-row>
                    <van-row class="list" type="flex" justify="space-between" align="center">
                        <van-col span="6" tag="span">
                            <span class="name">委托时间</span><br>17:17:02
                        </van-col>
                        <van-col span="6" tag="span">66.66</van-col>
                        <van-col span="6" tag="span">1000</van-col>
                        <van-col span="6" tag="span">委托生效</van-col>
                    </van-row>
                </div>              
            </van-tab>
            <van-tab title="近30日" name="0">
                <div class="content-box">
                    456
                </div>
            </van-tab>
            <van-tab title="自定义" name="1">
                <div class="content-box">
                    <div class="date-box">
                        <div>
                            <span class="date-style" @click="showDateStartAction">
                                <span>{{start_time == '' ? '开始日期' : start_time.split(' ')[0]}}</span>
                                <span class="font_family icon-jiantou icon-style"></span>
                            </span>
                            <span>至</span>
                            <span class="date-style" @click="showDateEndAction">
                                <span>{{end_time == '' ? '结束日期' : end_time.split(' ')[0]}}</span>
                                <span class="font_family icon-jiantou icon-style"></span>
                            </span>
                        </div>
                        <div class="btn">确定</div>
                    </div>
                </div>
            </van-tab>
        </van-tabs>
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
  </div>
</template>

<script>
import { formatDate } from '@/assets//js/utils'

export default {
    data() {
        return {
            activeName: '-1',
            showDateStart: false,
            showDateEnd: false,
            dateTimeStart: new Date(),
            dateTimeEnd: new Date(),
            start_time: '',// 开始时间
            end_time: '',// 结束时间
        }
    },
    methods: {
        changeTab(name) {

        },
        // 开始时间显示隐藏
        showDateStartAction() {
            this.showDateStart = !this.showDateStart
        },
        // 结束时间显示隐藏
        showDateEndAction() {
            this.showDateEnd = !this.showDateEnd
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
        // 结束时间 confirm
        dateEndConfirm(val) {
            this.end_time = formatDate(val.getTime(), 'YY-MM-DD hh:mm:ss')
            this.showDateEnd = false
        },
        // 结束时间 cancel
        dateEndCancel() {
            this.showDateEnd = false
        },
    }
}
</script>

<style lang="scss" scoped>
.deal-record{
    font-size: px2rem(26px);
    .content-box{
        background: #fff;
    }
    .title{
        padding: px2rem(17px) 0 px2rem(13px) 0;
        color: #666;
        border-top: px2rem(1px) solid $home-line-color;
        span{
            text-align: center;
        }
    }
    .list{
        padding: px2rem(17px) 0;
        border-top: px2rem(1px) solid $home-line-color;
        color: #999;
        font-size: px2rem(24px);
        .name{
            color: #333;
            font-size: px2rem(26px);
            font-weight: bold;
            display: inline-block;
            margin-bottom: px2rem(2px);
        }
        span{
            text-align: center;
        }
    }
    .date-box{
        display: flex;
        justify-content: space-between;
        padding: px2rem(20px) px2rem(30px);
        font-size: px2rem(26px);
        align-items: center;
        .btn{
            width: px2rem(118px);
            height: px2rem(50px);
            color: #fff;
            background: $home-color;
            line-height: px2rem(50px);
            text-align: center;
            border-radius: 6px;
        }
        .date-style{
            color: #999;
        }
        .icon-style{
            display: inline-block;
            font-size: px2rem(20px);
            transform: rotate(90deg)
        }
    }
}
</style>