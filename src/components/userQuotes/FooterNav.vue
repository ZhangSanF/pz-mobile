<template>
  <div class="footer">
    <van-tabbar class route active-color="#ec4f4f" @change="chuangeTab" :safe-area-inset-bottom="true">
      <van-tabbar-item name="home" replace to="/index">
        <span>首页</span>
        <van-icon class="iconSize" slot="icon" name="home-o" />
      </van-tabbar-item>
      <van-tabbar-item name="stock" replace to="/stock">
        <span>配资</span>
        <van-icon class="iconSize" slot="icon" name="chart-trending-o" />
      </van-tabbar-item>
      <van-tabbar-item name="account">
        <span>股票交易</span>
        <van-icon class="iconSize" slot="icon" name="service-o" />
      </van-tabbar-item>
      <van-tabbar-item name="userCenter" to="/userCenter">
        <span>我的</span>
        <van-icon class="iconSize" slot="icon" name="friends-o" />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "quotesFooter",
  data() {
    return {
      active: 0
    };
  },
  methods:{
    chuangeTab(a) {
      this.$parent.pageTab = a
    }
  }
};
</script>

<style lang="scss" scoped>
.footer {
  .iconSize {
    font-size: 25px;
  }
}
</style>
