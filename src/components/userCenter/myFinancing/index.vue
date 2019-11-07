<template>
  <div class="my-financing">
    <SecondHader headerTitle="我的配资"/>
    <div class="pulldown-style" v-if="getReleaseRefresh">
        <van-loading size="24px"><span>松开手指立即刷新...</span></van-loading>
    </div>
    <div class="pulldown-style" v-if="getTopRefresh">
        <van-loading size="24px"><span>刷新中...</span></van-loading>
    </div>
    <van-tabs v-model="activeName" :swipe-threshold='5' @click="changeActive">
        <van-tab title="全部" :name="0">
            <div class="content-box">
                <pzList :curStatus="status"/>
            </div>
        </van-tab>
        <van-tab title="待审核" :name="1">
            <div class="content-box">
                <pzList :curStatus="status"/>
            </div>
        </van-tab>
        <van-tab title="操盘中" :name="2">
            <div class="content-box">
                <pzList :curStatus="status"/>
            </div>
        </van-tab>
        <van-tab title="已失败" :name="3">
            <div class="content-box">
                <pzList :curStatus="status"/>
            </div>
        </van-tab>
        <van-tab title="已结束" :name="4">
            <div class="content-box">
                <pzList :curStatus="status"/>
            </div>
        </van-tab>
        <van-tab title="已到期" :name="11">
            <div class="content-box">
                <pzList :curStatus="status"/>
            </div>
        </van-tab>
    </van-tabs>
    <div class="loading-style" v-if="getShowLoadMore">
        <van-loading size="24px"><span>加载中...</span></van-loading>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import pzList from './pzList'
import SecondHader from "@/components/common/SecondHader"

export default {
    components: { pzList, SecondHader },
    data() {
        return {
            activeName: 0,   
            status: ''
        }
    },
    created() {

    },
    methods: {
        // 点击tab
        changeActive(name) {
            if(name == 0) {
                this.status = ''
            }else {
                this.status = name
            }
        },
    },
    mounted() {

    },
    computed: {
        ...mapGetters(["getShowLoadMore", "getTopRefresh", "getReleaseRefresh"]),
    }
}
</script>

<style lang="scss" scoped>
.pulldown-style{
    position: fixed;
    top: px2rem(185px);
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 100;
}
.content-box{
    position: fixed;
    top: px2rem(196px);
    bottom: 0;
    left: 0;
    right: 0;
}
.loading-style{
    position: fixed;
    bottom: -5px;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 100;
}

</style>
<style lang="scss">
.my-financing{
    .van-tabs__line{
        z-index: 0;
    }
}
</style>