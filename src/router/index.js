import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

import User from '@/components/user/user'
import Login from '@/components/user/login'
import Reg from '@/components/user/reg'
import Findpass from '@/components/user/findpass'
Vue.use(Router)

const router = new Router({
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
          meta: {
            showHeader: true
          },
          component: () => import ('@/components/Index'),
        },
        {
          path: '/stock',
          name: 'stock',
          component: () => import ('@/components/Stock'),
          meta: {
            showBack: true
          } 
        }, 
        {
          path: '/userCenter',
          name: 'UserCenter',
          component: () => import ('@/components/userCenter/Index')
        },
      ]
    },
    {
      path: '/regProtocol',
      name: 'RegProtocol',
      component: () => import ('@/components/user/regProtocol')//用户注册协议
    },
    // 个人中心二级页面
    {
      path: '/recharge',
      name: 'Recharge',
      component: () => import ('@/components/userCenter/pay/recharge'),//充值
      meta: {
        showInitMobile: true
      } 
    },
    {
      path: '/rechargeRecord',
      name: 'RechargeRecord',
      component: () => import ('@/components/userCenter/pay/rechargeRecord'),//充值记录
      meta: {
        showInitMobile: true
      } 
    }, 
    {
      path: '/autopay',
      name: 'AutoPay',
      component: () => import('@/components/userCenter/pay/AutoPay'),//充值
      meta: {
        showInitMobile: true
      }  
    },
    {
      path: '/scanpay',
      name: 'ScanPay',
      component: () => import('@/components/userCenter/pay/ScanPay'),//充值
      meta: {
        showInitMobile: true
      }  
    },
    {
      path: '/bankcard',
      name: 'BankCard',
      component: () => import('@/components/userCenter/pay/BankCard'),//充值
      meta: {
        showInitMobile: true
      }  
    },
    {
      path: '/scanpage',
      name: 'ScanPage',
      component: () => import('@/components/userCenter/pay/ScanPage'),//充值
      meta: {
        showInitMobile: true
      }  
    },
    {
      path: '/withdrawDeposit',
      name: 'WithdrawDeposit',
      component: () => import('@/components/userCenter/withdrawDeposit/index'),//提现
      meta: {
        showInitMobile: true
      }  
    },
    {
      path: '/withdrawalRecord',
      name: 'WithdrawalRecord',
      component: () => import('@/components/userCenter/withdrawDeposit/withdrawalRecord'),//提现记录
      meta: {
        showInitMobile: true
      }  
    },
    {
      path: '/myFinancing',
      name: 'MyFinancing',
      component: () => import('@/components/userCenter/myFinancing/index'),//我的配资
      meta: {
        showInitMobile: true
      }  
    },
    {
      path: '/contract/:id',
      component: () => import ('@/components/userCenter/myFinancing/contract'),//合同
    },
    {
      path: '/tradingRecord',
      name: 'TradingRecord',
      component: () => import ('@/components/userCenter/tradingRecord/index'),//交易记录
      meta: {
        showInitMobile: true
      } 
    },
    {
      path: '/userInfo',
      name: 'UserInfo',
      component: () => import ('@/components/userCenter/userInfo/index'),//个人信息
      meta: {
        showInitMobile: true
      } 
    },
    {
      path: '/bankInfo',
      name: 'BankInfo',
      component: () => import ('@/components/userCenter/bankInfo/index'),//银行卡信息
      meta: {
        showInitMobile: true
      } 
    },
    {
      path: '/addBank',
      name: 'AddBank',
      component: () => import ('@/components/userCenter/bankInfo/addBank'),//添加银行卡
      meta: {
        showInitMobile: true
      } 
    },
    {
      path: '/safetySet',
      name: 'SafetySet',
      component: () => import ('@/components/userCenter/safetySet/index'),//安全设置
      meta: {
        showInitMobile: true
      } 
    },
    {
      path: '/userCenterInfo',
      name: 'UserCenterInfo',
      component: () => import ('@/components/userCenter/safetySet/userCenterInfo'),//安全设置/个人资料
      meta: {
        showInitMobile: true
      } 
    },
    {
      path: '/realName',
      name: 'RealName',
      component: () => import ('@/components/userCenter/safetySet/realName'),//安全设置/实名认证
      meta: {
        showInitMobile: true
      } 
    },
    {
      path: '/setPhone',
      name: 'SetPhone',
      component: () => import ('@/components/userCenter/safetySet/setPhone'),//安全设置/手机绑定
      meta: {
        showInitMobile: true
      } 
    },
    {
      path: '/loginPassword',
      name: 'LoginPassword',
      component: () => import ('@/components/userCenter/safetySet/loginPassword'),//安全设置/登录密码
      meta: {
        showInitMobile: true
      } 
    },
    {
      path: '/payPassword',
      name: 'PayPassword',
      component: () => import ('@/components/userCenter/safetySet/payPassword'),//安全设置/支付密码
      meta: {
        showInitMobile: true
      } 
    },
    {
      path: '/savePwd',
      name: 'SavePwd',
      component: () => import ('@/components/userCenter/safetySet/savePwd'),//安全设置/密码保护
      meta: {
        showInitMobile: true
      } 
    },
    {
      path: '/messageCenter',
      name: 'MessageCenter',
      component: () => import ('@/components/userCenter/messageCenter/index'),//站内信息
      // meta: {
      //   showInitMobile: true
      // } 
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
      path: '/initMobile',
      name: 'InitMobile',
      component: () => import ('@/components/userCenter/initMobile'),//初始化手机号
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
    },
    {
      path: '*',
      redirect: '/'
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

// 是否显示初始化手机号
// router.beforeEach((to, from, next) => {
//   if(to.meta.showInitMobile) {
//     setTimeout(() => {
//       if(store.state.userInfo.mobile == '' || store.state.userInfo.mobile == undefined) {
//         router.replace('/initMobile')
//       }
//     },20)
//     next()
//   }
//   next()
// })

export default router
