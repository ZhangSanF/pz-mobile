<template>
  <div class="user-center-info">
    <SecondHader headerTitle="个人资料"/>
    <scroll class="user-container-m" :click="false" :data="scrollDatas">
        <div>
            <ul class="ul-box">
                <li class="list-item">
                    <p>用户名</p>
                    <div class="right">
                        <van-cell-group>
                            <van-field :value="getUserInfo.username" disabled/>
                        </van-cell-group>
                        <span class="font_family icon-youjiantou icon-style"></span>
                    </div>           
                </li>
                <li class="list-item">
                    <p>性别</p>
                    <div class="right">
                        <van-dropdown-menu>
                            <van-dropdown-item v-model="gender" :options="sexList" />
                        </van-dropdown-menu>
                        <span class="font_family icon-youjiantou icon-style"></span>
                    </div>
                </li>
                <li class="list-item">
                    <p>婚姻</p>
                    <div class="right">
                        <van-dropdown-menu>
                            <van-dropdown-item v-model="marital_status" :options="maritalList" />
                        </van-dropdown-menu>
                        <span class="font_family icon-youjiantou icon-style"></span>
                    </div>
                </li>
                <li class="list-item">
                    <p>本人学历</p>
                    <div class="right">
                        <van-dropdown-menu>
                            <van-dropdown-item v-model="education" :options="educationList" />
                        </van-dropdown-menu>
                        <span class="font_family icon-youjiantou icon-style"></span>
                    </div>
                </li>
                <li class="list-item">
                    <p>通讯地址</p>
                    <div class="right">
                        <van-cell-group>
                            <van-field v-model.trim="address" />
                        </van-cell-group>
                        <span class="font_family icon-youjiantou icon-style"></span>
                    </div>
                </li>
                <li class="list-item">
                    <p>月收入</p>
                    <div class="right">
                        <van-dropdown-menu>
                            <van-dropdown-item v-model="monthly_income" :options="monthlyIncomeList" />
                        </van-dropdown-menu>
                        <span class="font_family icon-youjiantou icon-style"></span>
                    </div>
                </li>
                <li class="list-item">
                    <p>现就职于</p>
                    <div class="right">
                        <van-cell-group>
                            <van-field v-model.trim="working_company" />
                        </van-cell-group>
                        <span class="font_family icon-youjiantou icon-style"></span>
                    </div>
                </li>
            </ul>
            <div class="bottom-content">
                <p class="unLogin" @click="actionSet">确定修改</p>
            </div>
        </div>
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
            gender: '',// 性别
            marital_status: '',// 婚姻
            education: '',// 本人学历
            address: '',// 通讯地址
            monthly_income: '',// 月收入
            working_company: '',// 现就职于 
            sexList: [
                { text: '女', value: false },
                { text: '男', value: true }
            ],
            maritalList: [
                { text: '已婚', value: 1 },
                { text: '未婚', value: 0 }
            ],
            educationList: [
                { text: '高中及以下', value: '高中及以下' }, 
                { text: '大专', value: '大专' }, 
                { text: '本科', value: '本科' }, 
                { text: '研究生及以上', value: '研究生及以上' }
            ],
            monthlyIncomeList: [
                { text: '1000元以下', value: '1000元以下' }, 
                { text: '1000-2000元', value: '1000-2000元' }, 
                { text: '2000-5000元', value: '2000-5000元' }, 
                { text: '5000-10000元', value: '5000-10000元'}, 
                { text: '10000-20000元', value: '10000-20000元'}
            ]
        }
    },
    created() {
        this.gender = this.getUserInfo.gender
        this.education = this.getUserInfo.education
        this.address = this.getUserInfo.address
        this.marital_status = this.getUserInfo.marital_status
        this.working_company = this.getUserInfo.working_company
        this.monthly_income = this.getUserInfo.monthly_income       
    },
    methods: {
        ...mapActions(['getModifybasicdata']),
        actionSet() {
            let obj = {
                gender: this.gender,//性别
                education: this.education,//本人学历                
                address: this.address,//通讯地址
                marital_status: this.marital_status,//婚姻
                working_company:this.working_company,//现就职于 
                monthly_income: this.monthly_income, //月收入
            }
            this.getModifybasicdata(obj).then(res=>{
                if( res.code == 200){
                    this.$Toast.success(res.message)
                    Object.assign(this.$store.state.userInfo, obj)
                }   
            })
        }
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
.user-center-info{
    .ul-box{
        background: #fff;
        padding-left: px2rem(30px);
        .list-item{
            display: flex;
            justify-content: space-between;
            border-bottom: px2rem(1px) solid $home-line-color;
            padding-right: px2rem(30px);
            height: px2rem(80px);
            box-sizing: border-box;
            align-items: center;
            color: #333;
            font-size: px2rem(28px);          
            .right{
                overflow: hidden;
                width: px2rem(400px);
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: px2rem(78px);
                .icon-style{
                    color: #999;
                    font-size: px2rem(20px);
                }
            }
        }   
        .list-item:last-child{
            border-bottom: none;
        }     
    }
    .bottom-content{
        padding: px2rem(30px) px2rem(48px) 0;
        font-size: px2rem(26px);
        .unLogin{
            padding: px2rem(20px) 0;
            font-weight: bold;
            text-align: center;
            background: $home-color;
            color: #fff;
            border-radius: 5px;
        }
    }
}
</style>
<style lang="scss">
.user-center-info{
    .van-cell-group{
        .van-cell{
            padding: 0;
        }
  }
    .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after{
        border: none
    }
    .van-dropdown-menu{
        height: 100%;
        width: 100%;
    }
    .van-dropdown-menu__title::after{
        display: none;
    }
    .van-dropdown-menu__title{
        width: 100%;
        padding: 0;
    }
}
</style>