<template>
  <div class="article-info" v-if="curData">
    <SecondHader :headerTitle="curData.title"/>
    <scroll class="user-container" :click="false" :data="scrollDatas">
        <div class="content">
          <p class="title">{{curData.title}}</p>
          <p class="info">发送时间：{{curData.create_time.split(' ')[0]}}</p>
          <div v-html="curData.content"></div>
      </div>
    </scroll>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import Scroll from "@/components/common/scroll"
import SecondHader from "@/components/common/SecondHader"

export default {
    components: { Scroll, SecondHader },
    data() {
        return {
            scrollDatas: [],
            curData: ''
        }
    },
    created() {
        this.getReadArticles({id:this.$route.query.id}).then((res) => {
            if(res.code == 200) {
                this.curData = res.data
            }
        })
    },
    methods: {
        ...mapActions(['getReadArticles']),
    },
    mounted() {
        this.$nextTick(() => {
            this.scrollDatas = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        });
    },
}
</script>

<style lang="scss" scoped>
.article-info{
    .content{
        padding: px2rem(28px) px2rem(30px) px2rem(40px) px2rem(30px);
        background: #fff;
        font-size: px2rem(26px);
        .title{
            color: #333;
            font-weight: bold;
        }
        .info{
            color: #999;
            font-size: px2rem(20px);
            text-align: right;
            padding-top: px2rem(20px);
        }
    }
}
</style>