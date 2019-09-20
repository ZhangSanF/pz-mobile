<template>
  <div class="second-header">
    <van-nav-bar
      :title="headerTitle"
      left-arrow
      @click-left="backPage"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"

export default {
  props:['headerTitle'],
  methods: {
    backPage() {
      this.$router.back(-1)
    } 
  },
  data(){
    return {

    };
  },
  mounted(){
 
  },
  computed: {

  },
  watch: {

  }
}
</script>

<style lang="scss" scoped>

</style>
<style lang="scss">
.second-header{
  .van-nav-bar{
      height: px2rem(88px);
      line-height: px2rem(88px);
      background: $home-color;
      .van-icon{
          color: #fff;
      }
      .van-nav-bar__title{
          color: #fff;
      }
  }
}
</style>