<template>
  <div class="message-center">
    <SecondHader headerTitle="站内信息">
        <span slot="right" class="right" @click="showDialog">筛选 <span class="font_family icon-shaixuan"></span></span>
    </SecondHader>
    <scroll class="user-container-m" :click="false" :data="curData" :pullup="true" @scrollToEnd="scrollEnd" ref="curDataContent">
        <div class="content-box">
            <div v-if="curData.length > 0">
                <messageInfo :resData="curData"/>
                <div v-if="noContent" class="di-line">
                    <van-divider>我是有底线的</van-divider>
                </div>
            </div>
            <div v-else>
                <van-divider>暂无数据</van-divider>
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
                    v-for="(item, index) in statusType" 
                    :key="index" 
                    :class="item.value == read_status ? 'active' : ''"
                    @click="changeType(item.value)"
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
import messageInfo from './messageInfo'
import { mapGetters, mapActions } from "vuex"
import Scroll from "@/components/common/scroll"
import SecondHader from "@/components/common/SecondHader"
import { formatDate } from '@/assets//js/utils'

export default {
    components: { messageInfo, Scroll, SecondHader },
    data() {
        return {
            noContent: false,
            showPopup: false,
            showDateStart: false,
            showDateEnd: false,
            dateTimeStart: new Date(),
            dateTimeEnd: new Date(),
            statusType: [
                {name: '全部', value: '-1'},
                {name: '未读', value: '0'},
                {name: '已读', value: '1'} 
            ],           
            read_status: '-1',//阅读状态(未读0，已读1，全部-1)
            page: 1,
            page_size: 10,
            start_time: '',
            end_time: '',
            curData: []
        }
    },
    created() {
        this.internalMessageFun()
    },
    methods: {
        ...mapActions(['internalMessage']),      
        scrollEnd() {
            if(this.noContent) return;
            this.page++
            this.$store.commit('SHOW_LOADMORE', true)
            this.internalMessageFun()
        },
        changeType(value) {
            this.read_status = value
        },
        // 筛选
        showDialog() {
            this.showPopup = !this.showPopup
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
        // 立即查询
        inquireAction() {
            this.noContent = false
            this.$refs.curDataContent.scrollTo(0, 0, 300)
            this.page = 1
            this.showPopup = false
            this.internalMessageFun()
        },
        internalMessageFun() {
            this.internalMessage({
                read_status: this.read_status,
                page: this.page,
                page_size: this.page_size,
                start_time: this.start_time,
                end_time: this.end_time
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
    },
    mounted() {

    },
    computed: {
        ...mapGetters(["getShowLoadMore"]),
    }
}
</script>

<style lang="scss" scoped>
.loading-style{
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 100;
}
.content-box{
    padding-bottom: px2rem(40px);
}


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
.iconSize{
    // font-size: px2rem(24px);
}
</style>
<style lang="scss">
.message-center{
    .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after{
        border: none;
    }
}
</style>