<template>
  <div class="findpass">
    <van-cell>
      <van-field v-model="username" clearable label="用户名" placeholder="请填写用户名" />
    </van-cell>
    <van-cell>
      <van-button @click="nextStep" class="findpassBtn">下一步</van-button>
    </van-cell>
  </div>
</template>

<script>
export default {
  naem: "findpass",
  data() {
    return {
     username:''
    };
  },
  methods: {
   nextStep(){
       //提交注册
   }
  
  },
  created() {
    if(this.$parent.titleTxt) {
      return this.$parent.titleTxt = '找回密码'
    }
  }
};
</script>


<style lang="scss" scoped>
.findpassBtn{
  width:  100% ;
  font-size: px2rem(30px) ;
  border-radius: px2rem(8px) ;
  color:#fff;
  background-color: #e4393c;
  height: px2rem(75px) ;
}

</style>
