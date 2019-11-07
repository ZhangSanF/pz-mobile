<template>
  <div class="reg-protocol">
      <SecondHader headerTitle="注册协议"/>
      <scroll class="user-container" :click="false" :data="scrollDatas">
        <div class="content">
          <div v-html="curData"></div>
      </div>
    </scroll>
  </div>
</template>

<script>
import { mapActions ,mapGetters } from "vuex"
import Scroll from "@/components/common/scroll"
import SecondHader from "@/components/common/SecondHader"

export default {
    components: { Scroll, SecondHader },
    data() {
        return {
            scrollDatas: [],
            curData: '',
            resData: {
                id: '286',
                title: '注册协议'
            }
        }
    },
    created() {
        this.getReadArticles(this.resData).then(res => {
            if(res.code == 200) {
                // console.log(res.data)
                this.curData = res.data.content
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
.content{
    background: #fff;
    padding: 0 px2rem(20px);
}
</style>