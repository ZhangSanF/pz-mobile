<template>
  <div class="contract">
      <SecondHader headerTitle="合同"/>
      <scroll class="user-container" :click="false" :data="scrollDatas">
          <div class="content" v-html="infoContent"></div>
      </scroll>
  </div>
</template>

<script>
import SecondHader from "@/components/common/SecondHader"
import { mapGetters, mapActions } from "vuex"
import Scroll from "@/components/common/scroll"

export default {
    components: { SecondHader, Scroll },
    data() {
        return {
            scrollDatas: [],
           infoContent: '' 
        }
    },
    created() {
        this.contract({order_id: this.$route.params.id}).then(res => {
            if(res.code == 200) {
                this.infoContent = res.data.info
            }
        })
    },
    methods: {
        ...mapActions(['contract']),
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
    box-sizing: border-box;
    padding: px2rem(10px); 
    overflow: hidden;  
}
</style>