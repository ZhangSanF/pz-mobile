<template>
  <div class="message-center">
    <SecondHader headerTitle="站内信息"/>
    <scroll class="user-container" :click="false" :data="curData" :pullup="true" @scrollToEnd="scrollEnd">
        <van-tabs v-model="activeName" @click="changeTab">
            <van-tab title="全部" name="-1">
                <div class="content-box">
                    <messageInfo :resData="curData"/>
                </div>              
            </van-tab>
            <van-tab title="未读" name="0">
                <div class="content-box">
                    <messageInfo :resData="curData"/>
                </div>
            </van-tab>
            <van-tab title="已读" name="1">
                <div class="content-box">
                    <messageInfo :resData="curData"/>
                </div>
            </van-tab>
        </van-tabs>
    </scroll>
    <div class="loading-style" v-if="getShowLoadMore">
        <van-loading color="#FD591E" size="24px"><span style="color:#FD591E">加载中...</span></van-loading>
    </div>
  </div>
</template>

<script>
import messageInfo from './messageInfo'
import { mapGetters, mapActions } from "vuex"
import Scroll from "@/components/common/scroll"
import SecondHader from "@/components/common/SecondHader"

export default {
    components: { messageInfo, Scroll, SecondHader },
    data() {
        return {
            activeName: '-1',
            page: 1,
            page_size: 10,
            curData: []
        }
    },
    created() {
        this.internalMessageFun()
    },
    methods: {
        ...mapActions(['internalMessage']),
        changeTab(name) {
            this.page = 1
            this.activeName = name
            this.internalMessageFun()
        },
        internalMessageFun(read_status, page, page_size) {
            this.internalMessage({
                read_status: this.activeName,
                page: this.page,
                page_size: this.page_size
            }).then((res) => {
                if(res.code == 200) {
                    if(this.page == 1) {
                        this.curData = res.data.rows
                    }else {
                        if(res.data.rows.length <= 0) return this.$Toast.fail('没有更多数据')
                        this.curData = [...this.curData, ...res.data.rows]
                    } 
                }
            })
        },
        scrollEnd() {
            this.page++
            this.$store.commit('SHOW_LOADMORE', true)
            this.internalMessageFun()
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
</style>
<style lang="scss">
.message-center{
    .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after{
        border: none
    }
}
</style>