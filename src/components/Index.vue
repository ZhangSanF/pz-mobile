<template>
  <scroll class="indexContent">
    <div class="Index">
      <!-- 轮播图 -->
      <van-swipe
        :autoplay="3000"
        class="vanSwipe"
        :show-indicators="false"
        indicator-color="#007aff" >
        <van-swipe-item
          v-for="(item,key) in getPcIndexCarousel"
          :key="key">
          <img v-lazy="item.img" />
        </van-swipe-item>
      </van-swipe>
      <!-- 通知 -->
      <van-notice-bar
        background="#555556"
        color="#fff"
        left-icon="volume-o"
        v-if="getAnnouncement.length > 0"
        >
        <span class="announcement"
          v-for="(item,key) in getAnnouncement"
          @click="$router.push({path: '/articleInfo', query: {id: item.id}})"
          :key="key">
          {{item.title}} &nbsp;&nbsp;&nbsp;&nbsp;
        </span>
        </van-notice-bar>
      <!-- 宫格按钮 -->
      <div class="gridBox">
        <van-grid :column-num="4" :border="false">
          <van-grid-item
            @click="toPath('/myFinancing', true)"
            >
            <img src="../assets/images/pz.png"  class="gridBoxImg" alt="">
            <span class="name">我的配资</span>
          </van-grid-item>
          <van-grid-item
            @click="toPath('/messageCenter', true)"
            >
            <img src="../assets/images/xinxi.png"  class="gridBoxImg" alt="">
            <span class="name">站内信息</span>
          </van-grid-item>
          <van-grid-item
            @click="toKefu"
            >
            <img src="../assets/images/kefu.png" class="gridBoxImg" alt="">
            <span class="name">在线客服</span>
          </van-grid-item>
          <van-grid-item
            >
            <img src="../assets/images/xz.png" class="gridBoxImg" alt="">
            <span class="name">APP下载</span>
          </van-grid-item>
        </van-grid>
      </div>
      <!-- 产品 -->
      <div class="product">
        <van-row class="content" v-for="(item,index) in contentData" :key="index" @click="toPlan(item)">
          <van-col class="left"
            span="3">
              <div class="contentLeft "
                :class="item.class" >
                {{item.leftTitle}}
              </div>
          </van-col>
          <van-col class="mid" span="16">
            <p>
              <span class="midOne">{{item.title}}</span>
              <span class="midTwo">&nbsp;&nbsp;|&nbsp;伺机布局&nbsp;&nbsp; 稳健收益</span>
            </p>
            <p class="midDivided">
              {{item.dividedText}}
            </p>
          </van-col>
          <van-col class="right"  span="5">
              <van-button size="small" class="rightBtn" :class="item.class" >立即配资</van-button>
          </van-col>
        </van-row>
      </div>
      <!-- 行情中心 -->
      <van-panel class="quoteCenter" >
        <template slot="header">
          <span>|</span>
          <b>行情中心</b>
        </template>
      </van-panel>
      <!-- 宫格按钮 -->
      <div class="gridBox">
        <van-grid :column-num="2" :border="true">
          <van-grid-item
            @click="goQuotes"
            :class="shangZhengUpDown ? 'quotesUp' : 'quotesDown'"
            >
            <p  class="quoteName">
              {{shangZhengZhiShuYesToday[0]}}
            </p>
            <p  class="quoteNum">{{shangZhengZhiShuYesToday[1] |number}}
            <img class="upDownImg" v-if="shangZhengUpDown" src="../assets/images/indexUp.png" alt="">
            <img class="upDownImg" v-if="!shangZhengUpDown" src="../assets/images/indexDown.png" alt="">
            </p>
            <p class="quoteValue">
              <span>{{shangZhengZhiShuYesToday[2] |number}}</span>
              <span>{{shangZhengZhiShuYesToday[3] |number}}%</span>
            </p>
          </van-grid-item>
          <van-grid-item
            @click="goQuotes"
            :class="huShenUpDown ? 'quotesUp' : 'quotesDown'"
            >
            <p class="quoteName">{{huShenZhiShuYesToday[0]}}

            </p>

            <p class="quoteNum">{{huShenZhiShuYesToday[1] |number}}
            <img class="upDownImg" v-if="huShenUpDown" src="../assets/images/indexUp.png" alt="">
            <img class="upDownImg" v-if="!huShenUpDown" src="../assets/images/indexDown.png" alt="">
            </p>
            <p class="quoteValue">
              <span>{{huShenZhiShuYesToday[2] |number}}</span>
              <span>{{huShenZhiShuYesToday[3] |number}}%</span>
            </p>
          </van-grid-item>
        </van-grid>
      </div>
      <!-- 服务热线 -->
      <van-panel class="quoteCenter quoteHeader" >
        <template slot="header">
          <span>|</span>
          <b>服务热线</b>
        </template>
      </van-panel>
      <!-- 电话 -->
      <van-panel class="quoteCenter quoteMian" >
        <template slot="header">
          <van-icon class="iconSize"  name="phone-o"></van-icon>
          <b class="phone">{{getSettingBase.service_telephone}}</b>
        </template>
      </van-panel>
    </div>
  </scroll>

</template>

<script>
import { mapGetters, mapActions } from "vuex";
import testData from "../test/testJSON.json";
import Scroll from './common/scroll'
import Spin from './common/spin/index'
export default {
  filters: {
    number(value) {
      var toFixedNum = Number(value).toFixed(2);
      return toFixedNum;
    }
  },
  name: "Index",
  components: {Scroll,Spin},
  data() {
    return {
      getAnnouncement: [],
      gridList: [],
      productActive: 0,
      shangZhengZhiShuToday:[],//今日上证指数
      shangZhengZhiShuYesToday:[],//昨日上证指数
      huShenZhiShuToday:[],//沪深指数当天数据
      huShenZhiShuYesToday:[],//沪深指数昨日数据
      // goUp:[],//领涨板块
      // goDown:[],//领跌板块
      spinShow: false
    };
  },

  created() {
    //上证当天数据
    this.shangZhengZhiShuToday = hq_str_sh000001.split(',')
    //上证昨收数据
    this.shangZhengZhiShuYesToday = hq_str_s_sh000001.split(',')
    //沪深当天数据
    this.huShenZhiShuToday = hq_str_sz399001.split(',')
    //沪深昨收数据
    this.huShenZhiShuYesToday = hq_str_s_sz399001.split(',')
    // this.goUp = sinaindustry_up
    // this.goDown = sinaindustry_down
    this.$nextTick(() => {
      this.getAboutUsListFun()
      this.gridList = testData.gridMenu;
    })
  },
  methods: {
    ...mapActions(['getAboutUsList']),
    //跳转计划
    toPlan(item) {
      this.$router.push({path:'/stock', query: {titleText:item.title}})
    },
    goQuotes() {
      // this.$router.push({path:'/userQuotes'})
    },
    //公告
    getAboutUsListFun() {
      this.getAboutUsList({
        page: 1,
        page_size: 20,
        category_identification: 'announcement'
      }).then(res => {
        if(res.code == 200) {
          this.getAnnouncement = res.data.rows
        }
      })
    },
    toPath(path, isLogin) {
        if(path != '') {
            if(isLogin) {
                // 判断是否登录
                if(this.getIsLogin) {
                    // 在登录情况下判断是否有初始化手机号码
                    if(this.$store.state.userInfo.mobile == '' || this.$store.state.userInfo.mobile == undefined) {
                        this.$router.push('/initMobile')
                    }else {
                        this.$router.push(path)
                    }
                }else {// 没有登录跳转到登录页面
                    this.$router.push('/user/login')
                }
            }else {
                this.$router.push(path)
            }
        }            
    },
    toKefu() {
      this.$parent.goService()
    },
  },
  computed: {
    ...mapGetters([
      'getPcIndexCarousel',//首页轮播图
      'getSettingFree', //免息 
      'getSettingDays', //按天
      'getSettingMonths', // 按月 
      'getSettingVip', //Vip
      'getSettingBase',
      'getIsLogin'
    ]),
    contentData() {
      return testData.productData
    },
    // 涨跌(最新指数比较昨收)
    shangZhengUpDown() {
      if(this.zhishu1[1] > this.zhishu2[2]) {//今日大于昨收
        return true
      }else {
        return false
      }
    },
   // 涨跌(最新指数比较昨收)
    shangZhengUpDown() {
      if(this.shangZhengZhiShuToday[1] > this.shangZhengZhiShuYesToday[2]) {//今日大于昨收
        return true
      }else {
        return false
      }
      return true
    },
    huShenUpDown() {
      if(this.huShenZhiShuToday[1] > this.huShenZhiShuYesToday[2]) {//今日大于昨收
        return true
      }else {
        return false
      }
      return true
    },
  },
  mounted() {
    this.$emit('tabChanged', 'home');
  },

}; 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.vanSwipe {
  img {
    width: 100%;
    height: px2rem(300px); ;
  }
}
.Index {
  font-size: px2rem(20px);
  .gridBox {
    .name {
      font-size: px2rem(28px);
      margin-top: px2rem(5px);
    }
    .quoteName{
      font-size: px2rem(36px);
      font-weight: 500;
      color: #000;
      padding: px2rem(5px) 0;
    }
    .quoteNum{
      font-size: px2rem(33px);
      padding: px2rem(5px) 0;
      font-weight: bold;
    }
    .quoteValue{
      padding: px2rem(5px) 0;
      font-size: px2rem(30px);
    }
  }

  .content{
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -moz-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-pack: center;
    -moz-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    font-size: px2rem(14px);;
    height:px2rem(134px);;
    background-color: rgb(255, 255, 255);
    text-align: left;
    vertical-align: middle;
    margin-bottom: px2rem(20px);
    .left{
      margin-left: px2rem(20px);
      // height:  px2rem(60px);
      // width: px2rem(60px);
      .contentLeft{
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-align: center;
        -moz-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
        -webkit-box-pack: center;
        -moz-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        width: px2rem(70px);
        height: px2rem(70px) !important;
        border-radius: px2rem(10px);
        text-align: left;
        color: #fff;
        vertical-align: middle;
        font-size: px2rem(30px);
        line-height: px2rem(70px) !important;
      }

    };
    .mid{
      // padding-left: px2rem(20px);
      text-align: left;
      .midOne{
        font-size: px2rem(30px);
        font-weight: bold;
        color: #000
      }
      .midTwo{
        color: #111;
        font-size: px2rem(26px);
      }
      .midDivided{
        color: #acacac;
        margin-top: px2rem(10px);
        font-size: px2rem(24px);
      }
    }
    .right{
      text-align: left;
      margin-right: px2rem(5px);
      // line-height: px2rem(60px);
      // height: px2rem(60px);
      .rightBtn {
        border: none;
        text-decoration: none;
        color: #fff;
        border-radius: px2rem(8px);;
      }
      .van-button--small{
        height: px2rem(60px) !important;
        line-height: px2rem(60px) !important;
      }
      .van-button__text{
         font-size: px2rem(24px)!important;;
      }
    }

  }
  .product {
    padding: px2rem(20px) px2rem(10px) 0 px2rem(10px);
  }
}
.vanTabs {
  width: 100%;
}
.van-grid-item__content {
    padding: 0.5rem 0.25rem;
    background-color:#000 !important ;
}
.quoteCenter{
  line-height: px2rem(60px); 
  padding: px2rem(13px); 
  height:px2rem(60px); 

  font-size:px2rem(26px);
  span{
    padding-left: px2rem(12px); 
    height: px2rem(40px); 
    line-height: px2rem(40px); 
    display: inline-block;
    background-color: #ff5D5D;
    border-radius: px2rem(5px);
    color:  #fff;
    width: px2rem(0.1px); 
  }
  i{
    display: inline-block;
    width: px2rem(30px);
    height: px2rem(30px);
    line-height: px2rem(30px);
    // background-color: #000;
  }

  .phone{
    font-size: px2rem(30px);
  }
}
.quoteHeader{
  margin-top:  px2rem(20px);
}
.free{
  background-color: #198Ad9;
}
.day{
  background-color: #d91919;
}
.mouth{
  background-color: #ff8000;
}
.vip{
  background-color: #ff5d5d;
}

  .indexContent {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;
  }
  .quotesUp{
    p {
      color: #FF0000;
    }
    span {
      color: #FF0000;
    }
  }
  .quotesDown{
    p {
      color: #009900;
    }
    span {
      color: #009900;
    }
  }
.van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after {
     border-width:  0 !important; 
}
.iconSize {
  font-size: px2rem(30px);
  margin: px2rem(14px) px2rem(5px);
  float: left;
}
.gridBoxImg{
  width: px2rem(100px);
  height: px2rem(100px);
}
.upDownImg{
  width: px2rem(20px);
}

</style>
