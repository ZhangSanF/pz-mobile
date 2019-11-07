<template>
    <div class="user-info">
        <scroll class="container" :click="false" :data="scrollDatas">
            <div>
                <div class="user-head">
                    <div class="user-head-info">
                        <div class="left-box">
                            <input id="pop_file" class="file" type="file" accept=".jpg,.jpeg,.png" v-on:change="upPortrait($event)" ref="file" value="" />
                            <img class="img-style" v-if="getUserInfo.portrait == null" src="../../assets/images/noavatar_middle.gif" alt="">
                            <img class="img-style" v-else :src="getUserInfo.portrait" alt="">
                            <span class="user-name" v-if="getIsLogin">{{getUserInfo.username}}</span>
                            <router-link v-else to="/user/login" tag="span" class="user-name">点击登录</router-link>
                        </div>
                        <div class="right-box" v-if="getIsLogin">
                            <p class="piece" @click="exitLogin">
                                <span>退出</span>
                                <span class="font_family icon-guanbi1 icon-header"></span>
                            </p>
                            <p class="piece" @click="sign">
                                <span v-if="!getUserInfo.is_sign_in">签到</span>
                                <span v-else>已签到</span>
                                <span class="font_family icon-qiandao1 icon-header "></span>
                            </p>
                        </div>
                    </div>
                    <div class="user-money">
                        <div>
                            <span class="font-m">冻结金额(元)</span><br>
                            <span v-if="getIsLogin">{{getUserInfo.frozen_money | number}}</span>
                            <span v-else>--</span>
                        </div>
                        <div>
                            <span class="font-m">赠送管理费(元)</span><br>
                            <span v-if="getIsLogin">{{getUserInfo.gift_money | number}}</span>
                            <span v-else>--</span>
                        </div>
                    </div>
                </div>
                <div class="user-tab">
                    <div>
                        <span class="font-m">可用余额(元)</span><br>
                        <span class="money" v-if="getIsLogin">{{getUserInfo.available_money | number}}</span>
                        <span v-else>--</span>
                    </div>
                    <div>
                        <p class="btn-type" @click="toPath('/recharge', true)">充值</p>
                        <p class="btn-type" @click="toPath('/withdrawDeposit', true)">提现</p>
                    </div>
                </div>
                <div class="user-content">
                    <ul class="ul-box">
                        <li class="list-item" v-for="(item, index) in listOne" :key="index" @click="toPath(item.path, item.isLogin)">
                            <div class="left">
                                <span :class="[item.icon, 'icon-style']"></span>
                                <span class="title">{{item.title}}</span>                                
                            </div>
                            <div class="right">
                                <span class="font_family icon-jiantou triangle-right"></span>
                            </div>
                        </li>
                    </ul>
                    <ul class="ul-box">
                        <li class="list-item" v-for="(item, index) in listTwo" :key="index" @click="toPath(item.path, item.isLogin)">
                            <div class="left">
                                <span :class="[item.icon, 'icon-style']"></span>
                                <span class="title">{{item.title}}</span>  
                            </div>
                            <div class="right">
                                <span class="font_family icon-jiantou triangle-right"></span>
                            </div>
                        </li>
                    </ul>
                    <ul class="ul-box" style="border-bottom: none">
                        <li class="list-item" v-for="(item, index) in listThree" :key="index" @click="toPath(item.path, item.isLogin)">
                            <div class="left">
                                <span :class="[item.icon, 'icon-style']"></span>
                                <span class="title">{{item.title}}</span>  
                            </div>
                            <div class="right">
                                <span class="font_family icon-jiantou triangle-right"></span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div> 
        </scroll>     
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Scroll from "@/components/common/scroll";

export default {
    name: "userInfo",
    components: { Scroll },
    filters: {
            number(value) {
            var toFixedNum = Number(value).toFixed(2);
            return toFixedNum;
        }
    },
    data() {
        return {
            scrollDatas: [],
            listOne:[
                {title: '我的配资', path: '/myFinancing', icon: 'font_family icon-peizi-', isLogin: true},
                {title: '交易记录', path: '/tradingRecord', icon: 'font_family icon-jiaoyijilu', isLogin: true},
                {title: '充值记录', path: '/rechargeRecord', icon: 'font_family icon-cunkuan', isLogin: true},
                {title: '提现记录', path: '/withdrawalRecord', icon: 'font_family icon-jiekuan', isLogin: true},
            ],
            listTwo:[
                {title: '个人信息', path: '/userInfo', icon: 'font_family icon-gerenxinxi', isLogin: true},
                {title: '银行卡信息', path: '/bankInfo', icon: 'font_family icon-yinhangka', isLogin: true},
                {title: '安全设置', path: '/safetySet', icon: 'font_family icon-shezhi', isLogin: true}
            ],
            listThree:[
                {title: '站内信息', path: '/messageCenter', icon: 'font_family icon-wangzhangonggao', isLogin: true},
                {title: '网站公告', path: '/websiteNotice', icon: 'font_family icon-wangzhangonggao-', isLogin: false}
            ]
        };
    },
    methods: {
        ...mapActions(['portraitUpload', 'signin', 'logout']),
        toPath(path, isLogin) {
            if(path != '') {
                if(isLogin) {
                    // 判断是否登录
                    if(this.getIsLogin) {
                        // 在登录情况下判断是否有初始化手机号码
                        if(this.$store.state.userInfo.mobile == '' || this.$store.state.userInfo.mobile == undefined) {
                            this.$router.push('/initMobile')
                        }else {
                            this.$router.push(path)
                        }
                    }else {// 没有登录跳转到登录页面
                        this.$router.push('/user/login')
                    }
                }else {
                    this.$router.push(path)
                }
            }            
        },
        // 签到
        sign() {
            this.signin().then((res) => {
                if(res.code == 200) {
                    this.$store.commit('SIGN', 1)
                    this.$Toast.success('签到成功')
                }
            })
        },
        exitLogin() {
            this.logout()
        },
        // 上传图像
        upPortrait() {
            const oFiles = document.getElementById("pop_file")
            if(oFiles.value != '') {
                const fileSize = oFiles.files[0].size / 1024 
                if(fileSize > 500) {
                    this.$Toast.fail('上传图片要小于500kb!');
                }else {
                    let params = new FormData();
                    params.append('file',oFiles.files[0]);
                    this.portraitUpload(params).then((res) => {
                        if(res.code == 200) {
                            this.$store.commit('PORTRAIT', res.data.info)
                        }
                    })
                }
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.scrollDatas = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        });
    },
    computed: {
        ...mapGetters(['getUserInfo', 'getIsLogin'])
    }
}
</script>

<style lang="scss" scoped>
.container {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;
}
.user-head{
    background: $home-color;
    padding: px2rem(20px) 0;
    .user-head-info{
        padding: 0 px2rem(30px);
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left-box{
            position: relative;
            .img-style{
                width: px2rem(110px);
                border-radius: 50%;
                vertical-align: middle;
            }
            .user-name{
                font-size: px2rem(35px);
                font-weight: bold;
                color: #fff;
                vertical-align: middle;
            }
            .file{
                position: absolute;
                width: px2rem(110px);
                height: 100%;
                z-index: 10;
                opacity: 0;
            }
        }
        .right-box{
            height: px2rem(110px);
            .piece{
                display: inline-block;
                font-size: px2rem(29px);
                color: #fff;
                .icon-header{
                    vertical-align: middle;
                }
            }
            .piece:last-child{
                margin-left: px2rem(28px);
            }
        }
    }
    .user-money{
        margin-top: px2rem(84px);
        padding: 0 px2rem(70px);
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: px2rem(29px);
        color: #fff;
        text-align: center;
        .font-m{
            display: inline-block;
            margin-bottom: px2rem(5px);
        }
    }
}
.user-tab{
    padding: px2rem(10px) px2rem(30px) px2rem(10px) px2rem(70px);
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    font-size: px2rem(29px);
    color: #666;
    .money{
        font-size: px2rem(40px);
        font-weight: bold;
        color: $home-color;
    }
    .font-m{
        display: inline-block;
        margin-bottom: px2rem(5px);
    }
    .btn-type{
        display: inline-block;
        width: px2rem(108px);
        height: px2rem(51px);
        line-height: px2rem(51px);
        color: #fff;
        background: $home-color;
        border-radius: 10px;
    }
    .btn-type:last-child{
        margin-left: px2rem(28px);
    }
}
.user-content{
    background: #fff;
    margin-top: px2rem(20px);
    .ul-box{
        margin-left: px2rem(30px);
        padding: px2rem(17px) px2rem(30px) px2rem(17px) 0;
        border-bottom: 1px solid $home-line-color;
        .list-item{
            display: flex;
            justify-content: space-between;
            padding: px2rem(17px) 0;
            align-items: center;
            .left{
                font-size: px2rem(32px);
                .title{                   
                    color: #333;
                    padding-left: px2rem(20px);
                }
                .icon-style{
                    color: $home-color;
                }
            }
            .right{
                font-size: px2rem(32px);
                .right-font{      
                    display: inline-block;
                    margin-right: px2rem(10px);     
                    color: #666;
                }
                .triangle-right {
                    font-size: px2rem(22px);
                    color: #999;
                }
            }
            
        }
    }
}
</style>