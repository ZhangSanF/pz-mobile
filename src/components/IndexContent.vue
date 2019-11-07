<template>
  <div class="indexContent">
    <div v-if="$route.meta.showHeader" class="header">
      <van-nav-bar left-arrow @click-right="goService">
        <template slot="left">
            <!-- <van-image
              style="height:100%;width:auto"
              
              lazy-load
              :src=""
            /> -->
            <img :src="getSettingBase.site_mobile_logo" class="mobileLogo" alt="">
        </template>
       <template slot="right">
         <div class="service">在线客服</div>
       </template>
      </van-nav-bar>
    </div>
    <div class="mainContainer" 
      :class="$route.meta.showHeader?'showHeader':'hideHeader'">
      <router-view @tabChanged="tabChanged" @pzChanged="pzChanged"/>
    </div>
    <footer-nav class="footerNav"/>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from "vuex";
  import FooterNav from "./FooterNav";
  import Index from "./Index";

  export default {
    name: 'indexContent',
    components: {
      FooterNav,
      Index,
    },
    data() {
      return {
        pzTitle: '免息配资', //配资页选中配资类型
        pageTab: 'home', //当前tab页面
        columns:[],
        showHeader:false
      };
    },
    methods: {
      tabChanged(tab) {
        this.pageTab = tab || 'home';       
      },
      pzChanged(type) {
        this.pzTitle = type || '免息配资';
      },
      goService() {
        window.open(this.getSettingBase.service_mobile_code); 
      }
    },
    computed:{
      ...mapGetters([
      'getSettingBase'
    ]),
    },
  }
</script>

<style lang="scss" scoped>
  .second-header{
    height: px2rem(88px);
    position: relative;
    text-align: center;
    color: #fff;
    background: $home-color;
    font-size: px2rem(30px);
    line-height: px2rem(88px);
    .left{
      position: absolute;
      top: 50%;
      left: 20px;
      transform: translate(0, -50%)
    }
  }
  .indexContent {
    height: 100%;
    overflow: hidden;
    width: 100%;
    .mainContainer {
      position: absolute;
      
      bottom: px2rem(100px);
      width: 100%;
    }
    .showHeader{
      top:px2rem(90px);
    }
    .hideHeader{
      top:0;
    }
    .footerNav {
      height: px2rem(85.3px);
      position: absolute;
      bottom: 0;
      width: 100%;
      background-color: #f7f7fa;
    }
    .header {
      width: 100%;
      height: px2rem(88px);
      background-color: #eee;
    }
  }
  .van-nav-bar__left, .van-nav-bar__right {
    top:0;
  }
.mobileLogo {
    height: 98%;
}
</style>
