import Vue from 'vue';
import {compare} from '../assets/js/utils'

// 上拉加载更多loading
export const getShowLoadMore = state => state.showLoadMore
// 释放下拉刷新
export const getReleaseRefresh = state => state.releaseRefresh
// 下拉刷新
export const getTopRefresh = state => state.topRefresh

//是否登录
export const getIsLogin = state => state.isLogin

// 个人信息
export const getUserInfo = state =>  state.userInfo?state.userInfo:null //1

//首页今日充值
export const getDepositList = state => state.depositList

//首页轮播图
export const getPcIndexCarousel = state => {
   return  state.pcIndexCarousel
}  //1

// 合作伙伴
export const getCooperation = state => state.cooperation

// 底部行业认证
export const getIndustryCertification = state => state.industryCertification

// 充值
export const getPayData = state => state.payData

// 系统配置
export const getSettingBase = state =>  state.settingBase
export const getSettingStock = state =>  state.settingStock
export const getSettingOrder = state =>  state.settingOrder
export const getSettingFree = state =>  state.settingFree
export const getSettingDays = state =>  state.settingDays
export const getSettingMonths = state =>  state.settingMonths
export const getSettingVip = state =>  state.settingVip

//新手任务
export const getXsrwData = state =>  {
    return state.xsrwData.sort(compare("sort"));
}

//获取银行卡列表
export const getBankList = state =>  state.bankList

//利率/倍数
export const getLoansrate = state =>  state.loansrate

// 剩余期数(扩大配资，时使用)
export const getPeriodNumber = state =>  state.periodNumber

// 延期利息(终止操盘，时使用)
export const getInterestMoney = state =>  state.interestMoney

// 交易端配置
export const getSettingSystem = state =>  {
  if(state.settingSystem){
    return state.settingSystem;
  }
}

//手机号码&用户名&id&密保
export const getUserFind = state =>  state.userFind
