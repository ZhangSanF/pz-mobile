<template>
  <div class="real-name">
    <SecondHader headerTitle="实名认证"/>
    <div class="real-list" v-if="getUserInfo.is_real_name">
        <div class="title">请填写身份证信息</div>
        <ul class="ul-box">
          <li class="list-item">
            <p>姓名</p>
            <div class="right">
                <van-cell-group>
                    <van-field :value="getUserInfo.real_name" disabled/>
                </van-cell-group>
            </div>
          </li>
          <li class="list-item">
            <p>身份证</p>
            <div class="right">
                <van-cell-group>
                    <van-field :value="getUserInfo.identity_number" disabled/>
                </van-cell-group>
            </div>
          </li>
        </ul>
        <div class="real-btn">已认证</div>
    </div>
    <div class="real-list" v-else>
        <div class="title">请填写身份证信息</div>
        <ul class="ul-box">
          <li class="list-item">
            <p>姓名</p>
            <div class="right">
                <van-cell-group>
                    <van-field v-model.trim="real_name" placeholder="请输入姓名"/>
                </van-cell-group>
            </div>
          </li>
          <li class="list-item">
            <p>身份证</p>
            <div class="right">
                <van-cell-group>
                    <van-field v-model.trim="identity_number" placeholder="请输入身份证号"/>
                </van-cell-group>
            </div>
          </li>
        </ul>
        <div class="real-btn" @click="SubmitRealName">立即认证</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SecondHader from "@/components/common/SecondHader"
import { name, number } from '@/config/rules.js'

export default {
  components: { SecondHader },
  data() {
    return {
      real_name: '',
      identity_number: ''
    }
  },
  methods: {
    ...mapActions(['realNameAuth']),
    SubmitRealName() {
      if(name.test(this.real_name) && number.test(this.identity_number)) {
        const params = {
          real_name: this.real_name,
          identity_number: this.identity_number
        }
        this.realNameAuth(params).then(res=>{
          if(res.code == 200){
            this.$Toast.success(res.message)
            let identity_number = params.identity_number.slice(0,4) + '****' + params.identity_number.slice(-4)
            this.$store.commit('REAL_NAME', {is_real_name: true, real_name: params.real_name, identity_number: identity_number})
          }
        })
      }else {
        this.$Toast.fail('请填写正确信息')
      }     
    }
  },
  computed: {
    ...mapGetters(['getUserInfo'])
  }
}
</script>

<style lang="scss" scoped>
.real-list{
  font-size: px2rem(28px);
  .title{
    padding: px2rem(20px) px2rem(30px);
    color: #999;
  }
  .ul-box{
    padding-left: px2rem(30px);
    background: #fff;
    .list-item{
      display: flex;
      justify-content: space-between;
      border-bottom: px2rem(1px) solid $home-line-color;
      padding-right: px2rem(30px);
      height: px2rem(80px);
      box-sizing: border-box;
      align-items: center;
      .right{
        overflow: hidden;
        width: px2rem(450px);
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: px2rem(78px);
      }
    }   
    .list-item:last-child{
      border-bottom: none;
    }
  }
  .real-btn{
        margin: px2rem(30px) px2rem(48px) 0;
        background: $home-color;
        border-radius: 4px;
        color: #fff;
        text-align: center;
        font-size: px2rem(26px);
        padding: px2rem(20px) 0;
    }
}
</style>
<style lang="scss" scoped>
.real-name{
    .van-cell-group{
        .van-cell{
            padding: 0;
        }
  }
  .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after{
    border: none
  }
}
</style>