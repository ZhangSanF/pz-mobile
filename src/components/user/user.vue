<template>

  <div class="user">
    <van-nav-bar  :title="titleTxt" left-arrow @click-left="onClickLeft" />
        <router-view/>
  </div>


</template>

<script>
export default {
  name: "user",
  data() {
    return {
        titleTxt:'登录'
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
  
  },
  watch:{
      $route(to,from){
          if(to.name == 'Reg'){
              this.titleTxt = "注册"
          }else if(to.name == 'Login'){
              this.titleTxt = "登录"
          }else if(to.name == 'Findpass'){
              this.titleTxt = "找回登录密码"
          }
      }
  }
};
</script>


<style lang="scss" scoped>
.user {
  background-color: #FFF;
  height: 100%;
  overflow: auto;
}
.van-nav-bar::after {
    border: 0 solid #fff!important;
}
.van-nav-bar {
  
  .van-nav-bar__title {
    color: #000;
    font-size: px2rem(35px) ;
    font-weight: bold;
  }
  .van-icon {
    color: #000;
    font-size: px2rem(50px) ;
  }
}
.van-nav-bar__title{
  font-size: px2rem(40px) !important;
}

</style>
