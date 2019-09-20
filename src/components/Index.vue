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
      >
      <span class="announcement"
        v-for="(item,key) in getAnnouncement"
        @click="$router.push('/user/article')"
        :key="key">
        {{item.title}} &nbsp;&nbsp;&nbsp;&nbsp;
      </span>
      </van-notice-bar>
    <!-- 宫格按钮 -->
    <div class="gridBox">
      <van-grid :column-num="4" :border="false">
        <van-grid-item
          v-for="(item,key) in gridList"
          :key="key"
          @click="$router.push(item.path)">
          <van-image class="gridBoxImg"  :src="item.icon" />
          <span class="name">{{item.name}}</span>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 产品 -->
    <div class="product">
      <van-row class="content"   v-for="(item,index) in contentData" :key="index">
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
            <span class="midTwo">|伺机布局&nbsp;&nbsp; 稳健收益</span>
          </p>
          <p class="midDivided">
            {{item.dividedText}}
          </p>
        </van-col>
        <van-col class="right"  span="5">
            <span class="rightBtn"
            :class="item.class"
            @click="toPlan(item)" >立即配资</span>
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
      <van-grid :column-num="3" :border="true">
        <van-grid-item
          @click="goQuotes"
          v-for="(item,key) in 3"
          :key="key"
          >
          <p class="quoteName">上证指数</p>
          <p class="quoteNum">28886.85</p>
          <p class="quoteValue">
            <span>-4.39</span>
            <span>-0.15%</span>
          </p>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 服务热线 -->
    <van-panel class="quoteCenter" >
      <template slot="header">
        <span>|</span>
        <b>服务热线</b>
      </template>
    </van-panel>
    <!-- 电话 -->
    <van-panel class="quoteCenter" >
      <template slot="header">
        <van-icon class="iconSize"  name="phone-o"></van-icon>
        <b class="phone">400-880-8820</b>
      </template>
    </van-panel>
  </div>
  </scroll>

</template>

<script>
import { mapGetters, mapActions } from "vuex";
import testData from "../test/testJSON.json";
import Scroll from './common/scroll'

export default {
  name: "Index",
  data() {
    return {
      getAnnouncement: [],
      gridList: [],
      productActive: 0,
    };
  },
  components: {Scroll},
  created() {  
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
      this.$router.push({path:'/userQuotes'})
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
    }
  },
  mounted() {
    this.$emit('tabChanged', 'home');
  },
  computed: {
    ...mapGetters([
      'getPcIndexCarousel',//首页轮播图
      'getSettingFree', //免息 
      'getSettingDays', //按天
      'getSettingMonths', // 按月 
      'getSettingVip', //Vip
    ]),
    contentData() {
      return testData.productData
    },
    stl() {
      return 
    }
  }
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
    margin-top: px2rem(20px);
    .name {
      font-size: px2rem(14px);
      margin-top: px2rem(5px);
    }
    .quoteName{
      font-size: px2rem(26px);
      color: #999;

    }
    .quoteNum{
      font-size: px2rem(26px);
      font-weight: bold;
      color: #008000;
    }
    .quoteValue{
      color: #008000;
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
    padding:0  px2rem(5px);
    margin-bottom: px2rem(20px);
    .left{
      height:  px2rem(60px);
      width: px2rem(60px);
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
        width: px2rem(60px);
        height: px2rem(60px) !important;
        border-radius: px2rem(10px);
        text-align: left;
        color: #fff;
        vertical-align: middle;
        font-size: px2rem(30px);
      }

    };
    .mid{
      padding-left: px2rem(14px);
      text-align: left;
      .midOne{
        font-size: px2rem(30px);
        font-weight: bold;
        color: #333333
      }
      .midTwo{
        color: #333333;
        font-size: px2rem(24px);
      }
      .midDivided{
        color: #999;
        font-size: px2rem(22px);
      }
    }
    .right{
      text-align: right;
      .rightBtn {
        border: none;
        text-align: center;
        text-decoration: none;
        line-height: px2rem(40px);
        display: inline-block;
        width: px2rem(118px);;
        font-size: px2rem(20px);;
        height: px2rem(40px);
        color: #fff;
        border-radius: px2rem(5px);;
        width: px2rem(118px) !important ;
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
.quoteCenter{
  line-height: px2rem(60px); 
  padding: px2rem(13px); 
  height:px2rem(60px); 
  margin-top:  px2rem(20px);
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
  .iconSize {
    font-size: px2rem(30px);
  }
  .phone{
    font-size: px2rem(30px);
  }
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
</style>
