<template>
  <div class="footer">
    <van-tabbar class route active-color="#fd591e" @change="chuangeTab" :safe-area-inset-bottom="true">
      <van-tabbar-item name="home" replace to="/index">
        <span>首页</span>
        <van-icon class="iconSize" slot="icon" name="home-o"/>
      </van-tabbar-item>
      <van-tabbar-item name="stock" replace to="/stock">
        <span>股票配资</span>
        <van-icon class="iconSize" slot="icon" name="cashier-o"/>
      </van-tabbar-item>
      <van-tabbar-item name="account" @click="loginToStockSide">
        <span>股票交易</span>
        <van-icon class="iconSize" slot="icon" name="chart-trending-o"/>
      </van-tabbar-item>
      <van-tabbar-item name="userCenter" to="/userCenter">
        <span>个人中心</span>
        <van-icon class="iconSize" slot="icon" name="friends-o"/>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: "footerNav",
    data() {
      return {
        active: 0
      };
    },
    computed: {
      ...mapGetters(['getSettingBase']),
    },
    methods: {
      chuangeTab(a) {
        this.$parent.pageTab = a
      },

      // 登录股票交易端
      loginToStockSide() {
        if (!this.getSettingBase || !this.getSettingBase.stock_mobile_url) return this.$Toast.fail(`跳转出错`);
        window.location.href = this.getSettingBase.stock_mobile_url;
      },
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
