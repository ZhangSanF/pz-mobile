<template>
    <div class="user">
        <SecondHader headerTitle="个人信息"/>
        <scroll class="user-container-m" :click="false" :data="scrollDatas">
            <div class="user-box">
                <div class="user-info">
                    <ul class="ul-box">
                        <li class="list-item">
                            <p>用户名</p>
                            <p class="right">
                                <span class="info">{{getUserInfo.username}}</span>
                            </p>
                        </li>
                        <li class="list-item">
                            <p>真实姓名</p>
                            <p class="right">
                                <span class="info">{{getUserInfo.real_name}}</span>
                                <span>
                                    <span class="isVerifi">{{getUserInfo.is_real_name ? '已认证' : '未认证'}}</span>
                                </span>
                            </p>
                        </li>
                        <li class="list-item">
                            <p>身份证号码</p>
                            <p class="right">
                                <span class="info">{{getUserInfo.identity_number}}</span>
                                <span>
                                    <span class="isVerifi">{{getUserInfo.is_real_name ? '已认证' : '未认证'}}</span>
                                </span>
                            </p>
                        </li>
                        <li class="list-item">
                            <p>手机号</p>
                            <p class="right">
                                <span class="info">{{getUserInfo.mobile}}</span>
                                <span>
                                    <span class="isVerifi">已认证</span>
                                </span>
                            </p>
                        </li>
                        <li class="list-item">
                            <p>性别</p>
                            <p class="right">
                                <span class="info">{{getUserInfo.gender == true ? '男' : '女'}}</span>
                            </p>
                        </li>
                        <li class="list-item">
                            <p>学历</p>
                            <p class="right">
                                <span class="info">{{getUserInfo.education}}</span>
                            </p>
                        </li>
                        <li class="list-item">
                            <p>省份</p>
                            <p class="right">
                                <span class="info">{{getUserInfo.province}}</span>
                            </p>
                        </li>
                        <li class="list-item">
                            <p>城市</p>
                            <p class="right">
                                <span class="info">{{getUserInfo.city}}</span>
                            </p>
                        </li>
                        <li class="list-item">
                            <p>地区</p>
                            <p class="right">
                                <span class="info">{{getUserInfo.area}}</span>
                            </p>
                        </li>
                        <li class="list-item">
                            <p>通讯地址</p>
                            <p class="right">
                                <span class="info">{{getUserInfo.address}}</span>
                            </p>
                        </li>
                        <li class="list-item">
                            <p>婚姻状态</p>
                            <p class="right">
                                <span class="info">{{getUserInfo.marital_status == '1' ? '已婚' : '未婚'}}</span>
                            </p>
                        </li>
                        <li class="list-item">
                            <p>现就职于</p>
                            <p class="right">
                                <span class="info">{{getUserInfo.working_company}}</span>
                            </p>
                        </li>
                        <li class="list-item">
                            <p>职位</p>
                            <p class="right">
                                <span class="info">{{getUserInfo.job}}</span>
                            </p>
                        </li>
                        <li class="list-item">
                            <p>月收入</p>
                            <p class="right">
                                <span class="info">{{getUserInfo.monthly_income}}</span>
                            </p>
                        </li>
                        <li class="list-item">
                            <p>紧急联系人</p>
                            <p class="right">
                                <span class="info">{{getUserInfo.emergency_name}}</span>
                            </p>
                        </li>
                        <li class="list-item">
                            <p>紧急联系人手机</p>
                            <p class="right">
                                <span class="info">{{getUserInfo.emergency_mobile}}</span>
                            </p>
                        </li>
                        <li class="list-item">
                            <p>紧急联系人关系</p>
                            <p class="right">
                                <span class="info">{{getUserInfo.emergency_relationship}}</span>
                            </p>
                        </li>                        
                    </ul>
                </div>
                <div class="btn-common" @click="exitLogin">退出登录</div>
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
        }
    },
    methods: {
        ...mapActions(['logout']),
        exitLogin() {
            this.logout()
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
.user-box{
    padding-bottom: px2rem(20px);
}
.user-info{
    background: #fff;
    .ul-box{      
        margin-left: px2rem(30px);
        .list-item{
            display: flex;
            justify-content: space-between;
            padding: px2rem(20px) px2rem(30px) px2rem(20px) 0;
            border-bottom: px2rem(1px) solid $home-line-color;
            align-items: center;
            font-size: px2rem(33px);
            color: #333;
            .right{
                width: px2rem(450px);
                display: flex;
                justify-content: space-between;
                align-items: center;
                .info{
                    color: #666;
                }
                .isVerifi{
                    display: inline-block;
                    color: rgb(253, 89, 30);
                }
                .icon-style{
                    color: #999;
                }
            }
        }   
        .list-item:last-child{
            border-bottom: none;
        }     
    }
}
</style>