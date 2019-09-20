import Vue from 'vue'
import Router from 'vue-router'

import User from '@/components/user/user'
import Login from '@/components/user/login'
import Reg from '@/components/user/reg'
import Findpass from '@/components/user/findpass'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'IndexContent',
      component: () => import ('@/components/IndexContent'),
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'Index',
          component: () => import ('@/components/Index'),
        },
        {
          path: '/stock',
          name: 'stock',
          component: () => import ('@/components/Stock'),
        }, 
        {
          path: '/userCenter',
          name: 'UserCenter',
          component: () => import ('@/components/userCenter/Index')
        },
      ]
    },
    {
      path: '/userQuotes',
      name: 'UerQuotes',
      component: () => import ('@/components/userQuotes/IndexContent')
    },
    // 个人中心二级页面
    {
      path: '/recharge',
      name: 'Recharge',
      component: () => import ('@/components/userCenter/pay/recharge'),//充值    
    }, 
    {
      path: '/autopay',
      name: 'AutoPay',
      component: () => import('@/components/userCenter/pay/AutoPay')//充值 
    },
    {
      path: '/scanpay',
      name: 'ScanPay',
      component: () => import('@/components/userCenter/pay/ScanPay')//充值 
    },
    {
      path: '/bankcard',
      name: 'BankCard',
      component: () => import('@/components/userCenter/pay/BankCard')//充值 
    },
    {
      path: '/scanpage',
      name: 'ScanPage',
      component: () => import('@/components/userCenter/pay/ScanPage')//充值 
    },
    {
      path: '/withdrawDeposit',
      name: 'WithdrawDeposit',
      component: () => import('@/components/userCenter/withdrawDeposit/index')//提现 
    },
    {
      path: '/myFinancing',
      name: 'MyFinancing',
      component: () => import('@/components/userCenter/myFinancing/index')//我的配资 
    },
    {
      path: '/tradingRecord',
      name: 'TradingRecord',
      component: () => import ('@/components/userCenter/tradingRecord/index'),//交易记录
    },
    {
      path: '/userInfo',
      name: 'UserInfo',
      component: () => import ('@/components/userCenter/userInfo/index'),//个人信息
    },
    {
      path: '/bankInfo',
      name: 'BankInfo',
      component: () => import ('@/components/userCenter/bankInfo/index'),//银行卡信息
    },
    {
      path: '/addBank',
      name: 'AddBank',
      component: () => import ('@/components/userCenter/bankInfo/addBank'),//添加银行卡
    },
    {
      path: '/safetySet',
      name: 'SafetySet',
      component: () => import ('@/components/userCenter/safetySet/index'),//安全设置
    },
    {
      path: '/userCenterInfo',
      name: 'UserCenterInfo',
      component: () => import ('@/components/userCenter/safetySet/userCenterInfo'),//安全设置/个人资料
    },
    {
      path: '/realName',
      name: 'RealName',
      component: () => import ('@/components/userCenter/safetySet/realName'),//安全设置/实名认证
    },
    {
      path: '/setPhone',
      name: 'SetPhone',
      component: () => import ('@/components/userCenter/safetySet/setPhone'),//安全设置/手机绑定
    },
    {
      path: '/loginPassword',
      name: 'LoginPassword',
      component: () => import ('@/components/userCenter/safetySet/loginPassword'),//安全设置/登录密码
    },
    {
      path: '/payPassword',
      name: 'PayPassword',
      component: () => import ('@/components/userCenter/safetySet/payPassword'),//安全设置/支付密码
    },
    {
      path: '/savePwd',
      name: 'SavePwd',
      component: () => import ('@/components/userCenter/safetySet/savePwd'),//安全设置/密码保护
    },
    {
      path: '/messageCenter',
      name: 'MessageCenter',
      component: () => import ('@/components/userCenter/messageCenter/index'),//站内信息
    },
    {
      path: '/websiteNotice',
      name: 'WebsiteNotice',
      component: () => import ('@/components/userCenter/websiteNotice/index'),//网站公告
    },
    {
      path: '/articleInfo',
      name: 'ArticleInfo',
      component: () => import ('@/components/userCenter/websiteNotice/articleInfo'),//网站公告/文章详情
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      children: [
        {
          path: 'login',
          name: 'Login',
          component: Login,
        },
        {
          path: 'reg',
          name: 'Reg',
          component: Reg,
        },
        {
          path: 'findpass',
          name: 'Findpass',
          component: Findpass,
        },
        
      ]
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
