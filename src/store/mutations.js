import * as types from './mutationsTypes'

const mutations = {
    // 上拉加载更多loading
    [types.SHOW_LOADMORE](state, data) {
        state.showLoadMore = data;
    },
    // 释放下拉刷新
    [types.RELEASE_REFRESH](state, data) {
        state.releaseRefresh = data;
    },
    // 下拉刷新
    [types.TOP_REFRESH](state, data) {
        state.topRefresh = data;
    },

    // 首页今日充值
  [types.DEPOSIT_LIST](state, data) {
      state.depositList = data
  },
    // 是否登录
  [types.IS_LOGIN](state, data) {
      state.isLogin = data
  },
    // 个人信息
  [types.SAVE_USER_INFO](state, obj) {
      state.userInfo = obj
      
  },
  // 首页轮播图 //11
  [types.PC_INDEX_CAROUSEL](state, data) {
    state.pcIndexCarousel = data
  },

  // 充值
  [types.PAY_DATA](state, data) {
      state.payData = data
  },

  // 系统配置
  [types.SETTING_BASE](state, data) {
      state.settingBase = data
  },
  [types.SETTING_STOCK](state, data) {
      state.settingStock = data
  },
  [types.SETTING_ORDER](state, data) {
      state.settingOrder = data
  },
  [types.SETTING_FREE](state, data) {
      state.settingFree = data
  },
  [types.SETTING_DAYS](state, data) {
      state.settingDays = data
  },
  [types.SETTING_MONTHS](state, data) {
      state.settingMonths = data
  },
  [types.SETTING_VIP](state, data) {
      state.settingVip = data
  },
  [types.SETTING_SYSTEM](state, data) {
      state.settingSystem = data
  },

  //实名认证
  [types.REAL_NAME](state, data) {
      state.userInfo.is_real_name= data.is_real_name
      state.userInfo.real_name= data.real_name
      state.userInfo.identity_number= data.identity_number
  },

  //支付密码
  [types.PAY_PASS](state, data) {
      state.userInfo.is_pay_password= data.is_pay_password
  },

  //初始化密保
  [types.PROTECT](state, data) {
      state.userInfo.is_protect = data.is_protect
      state.userInfo.password_protection = data.password_protection
  },

  //新手任务
  [types.XSRW_DATA](state, data) {
      state.xsrwData = data
  },

  //签到
  [types.SIGN](state, data) {
      state.userInfo.is_sign_in = data
  },

  //上传图片
  [types.PORTRAIT](state, data) {
      state.userInfo.portrait = data
  },

  //获取银行卡列表
  [types.BANK_LIST](state, data) {
      state.bankList = data
  },

  //添加银行卡
  [types.ADD_BANK](state, data) {
      state.userInfo.bank_card_number = data.bank_card_number
      state.userInfo.bank_name = data.bank_name
  },

  //修改手机号
  [types.SET_MOBILE](state, data) {
      state.userInfo.mobile = data
  },

    //利率/倍数
    [types.LOANSRATE_DATA](state, data) {
        state.loansrate = data
    },

    //剩余期数(扩大配资，时使用)
    [types.PERIOD_NUMBER](state, data) {
        state.periodNumber = data
    },

    //延期利息(终止操盘，时使用)
    [types.INTEREST_MONEY](state, data) {
        state.interestMoney = data
    },
    //手机号码&用户名&id&密保
    [types.USER_FIND](state, data) {
        state.userFind = data
    },
};

export default mutations;
