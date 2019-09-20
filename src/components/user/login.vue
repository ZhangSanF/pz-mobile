<template>
  <div class="login">
    <div class="logoBox">
      <span class="logo">
      </span>
      <!-- <van-image lazy-load  /> -->
    </div>
    <van-row v-show="errorMessage!==''" class="errorMessage">
      {{errorMessage}}
    </van-row>
    <van-cell-group>
      <van-field
        ref="userName"
        v-model="form.username"
        clearable
        clickable
        left-icon="contact"
        placeholder="请输入用户名,字母开头,6-16位"
      >
      </van-field>
      <van-field
        ref="password"
        v-model="form.password"
        :type="passWordType"
        left-icon="records"
        clickable
        placeholder="请填写密码,6-20位字母和数字组合"
        right-icon="closed-eye"
        @click-right-icon="passWordType = passWordType === 'text' ? 'password' :'text'"
      >
      </van-field>
      <van-field
          left-icon="envelop-o"
          v-model="form.captcha"  
          clickable  
          placeholder="请填写验证码" >
          <van-image
            :src="verifySrc" 
            @click="getVerifyFun"
            class="verifyImage"
            slot="button"
          />
      </van-field>
    </van-cell-group>
    <van-row type="flex" justify="space-around">
      <van-col span="24" class="loginCol">
        <van-button class="loginBtn"  size="small" @click="submitLogin" >登录</van-button>
      </van-col>
    </van-row>
    <van-row type="flex" justify="space-around">
      <van-col span="12" class="findpassCol">
        <van-button class="findpass" to="findpass" size="small" >忘记密码</van-button>
        <span class="findpassSpan">|</span>
      </van-col>
      <van-col span="12" class="regCol">
        <van-button class="reg"  to="reg" size="small" >立即注册</van-button>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { userMixin} from "./mixins/mixin"
import md5 from 'js-md5';
export default {
  name: "login",
  mixins:[userMixin],
  data() {
    return {
      form:{
        username: "",
        password: "",
        captcha: "",
      },
      passWordType:'password',
      verifySrc: '',
      errorMessage: '',
      canSave: false,
    };
  },
  methods: {
      ...mapActions([
      "login",
      'getVerify',
      'getMemberinfo']),
      submitLogin(){
          this.checkFrom()
          if(!this.canSave) return false
          const md5Password = {
              password: md5(this.form.password),
          }
          const data = this.form
          this.login(Object.assign(data, md5Password)).then((res) => {
              if(res.code == 200) {
                  // 获取个人信息
                  this.getMemberinfo()
                  this.$store.commit('IS_LOGIN', true)
                  let redirect = ''
                  // 获取拦截路由
                  if(Object.keys(this.$route.query).length !== 0) {
                      redirect = this.$route.query.redirect
                  }else {
                      redirect = '/'
                  }
                  this.$router.push(redirect)
                  this.canSave = true
              }else {
                  this.canSave = true
                  // this.$message.error(res.message);
                  this.form.password = ''
                  this.form.captcha = ''
                  this.getVerifyFun()
              }
          })
      },
      getVerifyFun() {
          this.getVerify().then((res) => {
              let imgUrl = 'data:image/png;base64,' + btoa(new Uint8Array(res).reduce((data, byte) => data + String.fromCharCode(byte), ''))
              this.verifySrc = imgUrl
          })
      },

  },
  created() {
      this.getVerifyFun()
  },
};
</script>


<style lang="scss" scoped>
.login {
  background-color: #FFF;
  .logoBox {
    text-align: center;
    padding: 40px 0;
    .logo {
      width: px2rem(140px);
      height: px2rem(140px);
      background-color: #FD591E;
      display: inline-block;
      border-radius: px2rem(24px);
    }
  }
}
.van-row {
  margin: 20px 0;
}
.verifyImage{
    min-width: 0.8rem;
    width: 3rem;
    height: 0.8rem;
    padding: 0 ;
    font-size: 0.32rem;
    line-height: 0.74667rem;
    float: right;
}
.loginCol {
  padding: 0 px2rem(48px);
}
.loginBtn{
  width:  100% ;
  font-size: px2rem(30px) ;
  border-radius: px2rem(8px) ;
  color:#fff;
  background-color: #FD591E;
  height: px2rem(75px) ;
}
.findpassCol {
  text-align: right;
  .findpass{
    font-size: px2rem(30px) ;
    border: none !important;
    padding-right: 0;
    color: #999999;
  }
  .findpassSpan{
    font-size: px2rem(32px) ;
  }
}
.regCol{
  .reg{
    font-size: px2rem(30px) ;
    
    color: #FD591F;
    border: none !important;
  }
}
.van-cell:last-child::after {
    position: absolute;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    right: 0;
    bottom: 0;
    left: 0.5rem;
    border-bottom: 0.03125rem solid #ebedf0;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
}
.van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after {
    border-width:0 !important 
}
.errorMessage{
   text-align: center;
   color:rgb(253,89,30);
   font-size: px2rem(24px) ;
}
</style>
