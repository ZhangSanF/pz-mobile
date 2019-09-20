<template>
    <div class="user-info">
        <scroll class="container" :click="false" :data="scrollDatas">
            <div>
                <div class="user-head">
                    <div class="bgc">
                        <img class="img" src="../../assets/images/header_user.png" alt="">
                        <div class="picture">
                            <input id="pop_file" class="file" type="file" accept=".jpg,.jpeg,.png" v-on:change="upPortrait($event)" ref="file" value="" />
                            <img v-if="getUserInfo.portrait == null" src="../../assets/images/noavatar_middle.gif" alt="">
                            <img v-else :src="getUserInfo.portrait" alt="">
                        </div>                       
                        <div class="name">
                            <p class="user-name">{{getUserInfo.username}}</p>
                            <p class="user-money money-padding">可用余额:{{getUserInfo.available_money | number}}</p>
                            <p class="user-money">冻结金额:{{getUserInfo.frozen_money | number}}</p>     
                        </div>
                    </div>
                    <div class="user-tab">              
                        <router-link class="tab" to="/recharge" tag="div">
                            <img class="tab-img img-style" src="../../assets/images/user_left.png" alt="">
                            <span>充值</span>
                        </router-link>
                        <router-link class="tab" to="/withdrawDeposit" tag="div">
                            <img class="tab-img img-style" src="../../assets/images/user_right.png" alt="">
                            <span>提现</span>
                        </router-link>
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
                                <span v-if="item.label == 'giveFee'" class="right-font">{{getUserInfo.gift_money | number}}</span>
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
                {title: '我的配资', path: '/myFinancing', label: 'myFinancing', icon: 'font_family icon-peizi-', isLogin: true},
                {title: '交易记录', path: '/tradingRecord', label: 'tradingRecord', icon: 'font_family icon-jiaoyijilu', isLogin: true},
                {title: '赠送管理费', path: '', label: 'giveFee', icon: 'font_family icon-guanlifei', isLogin: false}
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
        ...mapActions(['portraitUpload']),
        toPath(path, isLogin) {
            if(path != '') {
                if(isLogin) {
                    if(this.getIsLogin) {
                        this.$router.push(path)
                    }else {
                        this.$router.push('/user/login')
                    }
                }else {
                    this.$router.push(path)
                }
            }            
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
    background: #fff;
    padding: px2rem(16px) px2rem(15px) 0;
    .bgc{
        position: relative;
        width: px2rem(610px);
        height: px2rem(240px);
        .img{
            width: 100%;
        }
        .picture{
            position: absolute;
            top: 50%;
            left: px2rem(35px);
            width: px2rem(110px);
            height: px2rem(110px);
            transform: translate(0, -50%);
            border-radius: 50%;
            img{
                width: px2rem(110px);
                border-radius: 50%;
            }
            .file{
                position: absolute;
                width: 100%;
                height: 100%;
                z-index: 10;
                opacity: 0;
            }
        }
        .name{
            position: absolute;
            top: 50%;
            left: px2rem(170px);
            transform: translate(0, -50%);        
            color: #fff;
            .user-name{
                font-size: px2rem(30px);
                font-weight: bold;
            }
            .user-money{
                color: #ffc9b5;
                font-size: px2rem(24px);
            }
            .money-padding{
                padding:  px2rem(6px) 0;
            }
        }
    }
    .user-tab{
        padding: 0 px2rem(90px);
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: px2rem(34px);
        color: #333 ;
        .tab{
            display: flex;
            align-items: center;
        }
        .tab-img{
            width: px2rem(64px);
            padding: px2rem(24px) px2rem(15px) px2rem(30px) 0;
        }
    }
}
.user-content{
    background: #fff;
    margin-top: px2rem(20px);
    .ul-box{
        margin-left: px2rem(30px);
        padding: px2rem(17px) px2rem(30px) px2rem(17px) 0;
        border-bottom: px2rem(1px) solid $home-line-color;
        .list-item{
            display: flex;
            justify-content: space-between;
            padding: px2rem(17px) 0;
            align-items: center;
            .left{
                font-size: px2rem(28px);
                .title{                   
                    color: #333;
                    padding-left: px2rem(20px);
                }
                .icon-style{
                    color: $home-color;
                }
            }
            .right{
                font-size: px2rem(27px);
                .right-font{      
                    display: inline-block;
                    margin-right: px2rem(10px);     
                    color: #666;
                }
                .triangle-right {
                    font-size: px2rem(14px);
                    color: #999;
                }
            }
            
        }
    }
}
</style>