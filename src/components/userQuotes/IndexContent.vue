<template>
  <div class="indexContent">
    <div v-show="showHeader" class="header">
      <van-row>
        <van-col span="6">
          <div>
            <van-icon name="arrow-left" />
          </div>
        </van-col>
        <van-col class="tabs" span="18">
          
          <ul>
            <li class="headerTabs">自选股</li>
            <li class="headerTabs">自选股</li>
            <li class="headerTabs">自选股</li>
          </ul>
        </van-col>
      </van-row>
    </div>
    <div class="mainContainer" 
      :class="showHeader?'showHeader':'hideHeader'">
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
    name: 'quotesContent',
    components: {
      FooterNav,
      Index,
    },
    watch:{
      $route(to,from){
        this.showHeader =  to.name === 'Index'? true : false
      }
    },
    data() {
      return {
        pzTitle: '免息配资', //配资页选中配资类型
        pageTab: 'home', //当前tab页面
        columns:[],
        showHeader:true
      };
    },
    methods: {
      tabChanged(tab) {
        this.pageTab = tab || 'home';       
      },
      pzChanged(type) {
        this.pzTitle = type || '免息配资';
      },
    },
    
  }
</script>

<style lang="scss" scoped>
  .indexContent {
    height: 100%;
    overflow: hidden;
    width: 100%;

  }
  .header{
    display: flex;
    top:0;
    font-size: px2rem(40px);
    width: 100%;
    background-color: #FD591E;
    line-height: px2rem(80px);
    height: px2rem(80px);
    vertical-align: middle;
    text-align: center;
    .headerLeft{
      vertical-align: middle;
      text-align: center;
    }
  }
  .tabs{
    margin: 0 auto;
  }
  .headerTabs{
    margin-left: px2rem(20px);
    height: px2rem(60px);
    margin-top: px2rem(10px);
    text-align: center;
    line-height: px2rem(60px);
    background-color: #fff;
    font-size: px2rem(30px);
  }

</style>