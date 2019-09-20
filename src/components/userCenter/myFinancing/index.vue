<template>
  <div class="my-financing">
    <SecondHader headerTitle="我的配资"/>
    <scroll class="user-container" :click="false" :data="getOrderList" :pullup="true" @scrollToEnd="scrollEnd">
        <div>
            <van-tabs v-model="activeName" :swipe-threshold='5' @click="changeActive">
                <van-tab title="全部" :name="0">
                    <div class="content-box">
                        <pzList :getOrderList="getOrderList"/>
                    </div>                   
                </van-tab>
                <van-tab title="审核中" :name="1">
                    <div class="content-box">
                        <pzList :getOrderList="getOrderList"/>
                    </div> 
                </van-tab>
                <van-tab title="操盘中" :name="2">
                    <div class="content-box">
                        <pzList :getOrderList="getOrderList"/>
                    </div> 
                </van-tab>
                <van-tab title="已过期" :name="3">
                    <div class="content-box">
                        <pzList :getOrderList="getOrderList"/>
                    </div> 
                </van-tab>
                <van-tab title="已结算" :name="4">
                    <div class="content-box">
                        <pzList :getOrderList="getOrderList"/>
                    </div> 
                </van-tab>
            </van-tabs>
        </div>
    </scroll>
    <div class="loading-style" v-if="getShowLoadMore">
        <van-loading color="#FD591E" size="24px"><span style="color:#FD591E">加载中...</span></van-loading>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import Scroll from "@/components/common/scroll"
import pzList from './pzList'
import SecondHader from "@/components/common/SecondHader"

export default {
    components: { Scroll, pzList, SecondHader },
    data() {
        return {
            activeName: 0,
            getOrderList: [],//list
            page: 1,
            page_size: 5, 
            order_type: '',
            status: '',   //	状态(1待审核、2审核通过、3审核失败，4操盘结束))空是全部      
            create_start: '',//配资时间-起
            create_end: '',//配资时间-止
            end_time_start: '',//结束时间-起
            end_time_end: '',//结束时间-止           
        }
    },
    created() {
        this.getOrderFun(this.page, this.page_size)
    },
    methods: {
        ...mapActions(['getOrder']),
        // 点击tab
        changeActive(res) {
            this.page = 1
            if(res == 0) {
                this.status = ''
            }else {
                this.status = res
            }
            this.getOrderFun()
        },
        getOrderFun() {
            this.getOrder({
                page: this.page,//页码
                page_size: this.page_size,//每页数据量
                order_type: this.order_type || '',//订单类型(1免息2按天3按月4VIP)
                status: this.status || '',//状态(1待审核、2审核通过、3审核失败，4操盘结束))
                create_time_start: this.create_time_start || '',//配资时间-起
                create_time_end: this.create_time_end || '',//配资时间-止
                end_time_start: this.end_time_start || '',//结束时间-起
                end_time_end: this.end_time_end || ''//结束时间-止
            }).then(res=>{
                if(res.code == 200){
                    if(this.page == 1) {
                        this.getOrderList = res.data.list
                    }else {
                        if(res.data.list.length <= 0) return this.$Toast.fail('没有更多数据')
                        this.getOrderList = [...this.getOrderList, ...res.data.list]
                    }                                  
                }
            })
        },
        scrollEnd() {
            this.page++
            this.$store.commit('SHOW_LOADMORE', true)
            this.getOrderFun()
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
.content-box{
    padding: px2rem(20px);
}
.loading-style{
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 100;
}
</style>