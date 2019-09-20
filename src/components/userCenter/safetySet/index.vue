<template>
  <div class="user-center">
      <SecondHader headerTitle="安全设置"/>
      <scroll class="user-container-m" :click="false" :data="scrollDatas">
          <ul class="ul-box">
            <router-link to="/userCenterInfo" tag="li" class="list-item">
                <p>个人资料</p>
                <p>
                    <span class="font_family icon-youjiantou icon-style"></span>
                </p>
            </router-link>
            <router-link to="/realName" tag="li" class="list-item">
                <p>实名认证</p>
                <p>
                    <span class="right-state">{{getUserInfo.is_real_name ? '已认证' : '未认证'}}</span>
                    <span class="font_family icon-youjiantou icon-style"></span>
                </p>
            </router-link>
            <router-link to="/setPhone" tag="li" class="list-item">
                <p>手机绑定</p>
                <p>
                    <span class="right-state">{{getUserInfo.mobile}}</span>
                    <span class="font_family icon-youjiantou icon-style"></span>
                </p>
            </router-link>
            <router-link to="/loginPassword" tag="li" class="list-item">
                <p>登录密码</p>
                <p>
                    <span class="right-state">已设置</span>
                    <span class="font_family icon-youjiantou icon-style"></span>
                </p>
            </router-link>
            <router-link to="/payPassword" tag="li" class="list-item">
                <p>支付密码</p>
                <p>
                    <span class="right-state">{{getUserInfo.is_pay_password ? '已设置' : '未设置'}}</span>
                    <span class="font_family icon-youjiantou icon-style"></span>
                </p>
            </router-link>
            <router-link to="/savePwd" tag="li" class="list-item">
                <p>密码保护</p>
                <p>
                    <span class="right-state">{{getUserInfo.is_protect ? '已设置' : '未设置'}}</span>
                    <span class="font_family icon-youjiantou icon-style"></span>
                </p>
            </router-link>
        </ul>
      </scroll>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
import Scroll from "@/components/common/scroll"
import SecondHader from "@/components/common/SecondHader"

export default {
    components: { Scroll, SecondHader },
    data() {
        return {
           scrollDatas: [], 
        }
    },
    methods: {

    },
    mounted() {
        this.$nextTick(() => {
            this.scrollDatas = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        });
    },
    computed: {
        ...mapGetters(['getUserInfo'])
    }
}
</script>

<style lang="scss" scoped>
.user-center{
    .ul-box{
        padding-left: px2rem(30px);
        background: #fff;
        .list-item{
            display: flex;
            justify-content: space-between;
            padding: px2rem(20px) px2rem(30px) px2rem(20px) 0;
            border-bottom: px2rem(1px) solid $home-line-color;
            align-items: center;
            font-size: px2rem(28px);
            color: #333;
            .icon-style{
                color: #999;
                font-size: px2rem(20px);
            }
            .right-state{
                display: inline-block;
                padding-right: px2rem(18px);
                color: #fd591e;
            }
        }   
        .list-item:last-child{
            border-bottom: none;
        }     
    }
}
</style>