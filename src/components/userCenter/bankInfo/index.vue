<template>
  <div class="bank-info">
        <SecondHader headerTitle="我的银行卡"/>
        <!--  -->
        <div v-if="getUserInfo.bank_card_number && getUserInfo.bank_name" class="have-bank" >
            <div class="title">我的银行卡</div>
            <div class="bank-card">
                <div class="name">{{getUserInfo.bank_name}}</div>
                <div class="number">{{getUserInfo.bank_card_number}}</div>
            </div>
        </div>
        <!--  -->
        <router-link v-else  to="/addBank" tag="div" class="no-bank">
            <span class="font_family icon-tianjia icon-style"></span>
            <p>添加银行卡</p>
        </router-link>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import SecondHader from "@/components/common/SecondHader"

export default {
    components: { SecondHader },
    data() {
        return {
            
        }
    },
    created() {
        // 未实名认证跳转
        if(!this.getUserInfo.is_real_name) {
            this.$Dialog.alert({
                message: '您还未完成身份验证，请先进行实名认证'
            });
            this.$router.replace('/realName')
        }
    },
    methods: {

    },
    mounted() {

    },
    computed:{
        ...mapGetters(['getUserInfo'])
    }
}
</script>

<style lang="scss" scoped>
.no-bank{
    margin: px2rem(30px);
    background: #fff;
    border-radius: 5px;
    text-align: center;
    font-size: px2rem(31px);
    color: #999;
    padding-bottom: px2rem(20px);
    padding-top: px2rem(15px);
    .icon-style{
        font-size: px2rem(100px);
    }
}
.have-bank{
    background: #fff;
    padding: px2rem(30px) px2rem(25px);       
    .title{     
        font-size:  px2rem(34px);   
        color: #333;
        font-weight: bold;
        margin-bottom: px2rem(30px);
    }
    .bank-card{
        box-sizing: border-box;
        height: px2rem(220px);
        background: #414a81;
        border-radius: 6px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: px2rem(30px);
        font-size: px2rem(31px);
        .name{            
            color: #fff;
        }
        .number{
            color: #8c91b1;
        }
    }
}
</style>