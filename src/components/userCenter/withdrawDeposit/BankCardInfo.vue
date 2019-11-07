<template>
    <div class="card-content">
      <div class="card">
        <p class="head">
          <span class="bankname">{{getUserInfo.bank_name}}</span>
        </p>
        <p class="num">{{getUserInfo.bank_card_number}}</p>
        <p class="footer">
          <span class="truename">持卡人：{{getUserInfo.real_name}}</span>
          <img src="../../../assets/images/union.png" alt="">
        </p>
      </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from "vuex"

  export default {
    name: 'BankCardInfo',
    data () {
      return {

      }
    },
    methods: {

    },
    mounted() {
      
    },
    computed: {
        ...mapGetters(['getUserInfo'])
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">  
  .card-content {
    font-size: px2rem(30px);
    box-sizing: border-box;
    padding: px2rem(30px) px2rem(30px);
    .card {
      border-radius: px2rem(12px);
      background-color: #e6e6e6;
      text-shadow: 1px 1px 1px #777;
      color: #fff;
      height: 100%;
      padding: px2rem(30px) px2rem(20px);
      position: relative;
      .head {
        padding: 0 px2rem(10px) px2rem(10px);
        border-bottom: 1px solid #c0c0c0;
        .bankname {
          font-weight: 600;
        }
      }
      .num {
        margin: px2rem(40px) 0;
        padding: 0 px2rem(16px);
        font-size: px2rem(34px);
        font-weight: 600;
      }
      .footer {
        width: 100%;
        color: #fff;
        .truename {
          margin-left: px2rem(16px);
          font-size: px2rem(24px);
        }
        img {
          float: right;
          width: px2rem(112px);
          opacity: .5;
          position: relative;
          bottom: px2rem(30px);
          right: px2rem(32px);
        }
      }
    }
  }
  
</style>
