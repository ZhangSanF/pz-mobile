<template>
  <div class="container scan-page">
    <div class="title">请确认信息并扫码转账</div>
    <div class="info">
        <div class="img">
          <img :src="scanData.img" alt>
        </div>
        <p>
          支付类型:
          <span>{{scanData.name}}</span>
        </p>
        <p>
          支付金额:
          <span>{{scanData.money}}</span>
        </p>
        <span
          class="notice font-light-color"
        >请长按或者截图保存二维码图片到手机相册，在支付APP中扫描二维码处从相册选择二维码图片，核对金额无误后转账，转账成功后会直接到账，如有疑问请咨询在线客服处理！谢谢！</span>
      </div>
  </div>
</template>

<script>

export default {
  name: "ScanPage",

  data() {
    return { scanData: "" };
  },
  mounted() {
    setTimeout(() => {
      this.scanData = this.$route.query;
    }, 20);
  },
  computed: {

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container {
  // background: #fff;
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-size: 16px;
}
.font-light-color{
  height: 35px;
}
.title{
  padding: px2rem(20px) px2rem(30px);
  font-size: px2rem(34px);
  color: #999;
}
.info {
  padding: px2rem(8px) px2rem(32px);
  .img {
    text-align: center;
    img {
      width: px2rem(300px);
    }
  }
  p {
    padding: px2rem(10px) 0;
    text-align: center;
    span {
      font-size: px2rem(16px);
      color: orangered;
      font-weight: 600;
    }
  }
  .notice {
    font-size: px2rem(24px);
    color: #888;
  }
}
</style>
