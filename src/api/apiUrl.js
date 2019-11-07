//注册
export function registerApi(){
    return {
        url: '/server/index/account/register',
        isOpenLoading : true
    }
}

//登录
export function loginApi(){
    return {
        url: '/server/index/account/login',
        isOpenLoading : true
    }
}

//是否登录
export function isLoginApi(){
    return {
        url: '/server/index/account/islogin'
    }
}

//验证码
export function getVerifyApi(){
    return {
        url: '/server/index/account/verify'
    }
}

//退出登录
export function logoutApi(){
    return {
        url: '/server/index/member/logout',
        isOpenLoading : true
    }
}

// 广告
export function advertisementApi(){
    return {
        url: '/server/index/advertisement/index'
    }
}

// 系统配置
export function settingApi(){
    return {
        url: '/server/index/index/setting'
    }
}

// 文章列表
export function articlesApi(){
    return {
        url: '/server/index/articles/index',
        isOpenLoading : true
    }
}

// 文章内页
export function readArticlesApi(){
    return {
        url: '/server/index/articles/read',
        isOpenLoading : true
    }
}

// 个人信息修改
export function modifybasicdataApi(){
    return {
        url: '/server/index/member/modifybasicdata',
        isOpenLoading : true
    }
}

// 获取所有支付信息
export function paymentinfoApi(){
    return {
        url: '/server/index/allpayment/getpaymentinfo'
    }
}

// 支付、充值请求接口
export function depositwithdrawplatformApi(){
    return {
        url: '/server/index/allpayment/depositwithdrawplatform',
        isOpenLoading : true
    }
}

//验证密保
export function verifyProtectionApi(){
    return {
        url: '/server/index/member/verifyprotection',
        isOpenLoading : true
    }
}

//初始化密保
export function initProtectionApi(){
    return {
        url: '/server/index/member/initprotection',
        isOpenLoading : true
    }
}

//更换密保
export function changeProtectionApi(){
    return {
        url: '/server/index/member/changeprotection',
        isOpenLoading : true
    }
}

//修改支付密码
export function changePayPasswordApi(){
    return {
        url: '/server/index/member/changepaypassword',
        isOpenLoading : true
    }
}

//修改登录密码
export function changeLoginPasswordApi(){
    return {
        url: '/server/index/member/changeloginpassword',
        isOpenLoading : true
    }
}

//实名认证
export function realNameAuthApi(){
    return {
        url: '/server/index/member/realnameauth',
        isOpenLoading : true
    }
}


//上传头像
export function portraitUploadApi(){
    return {
        url: '/server/index/member/portraitupload',
        isOpenLoading : true
    }
}

//新手任务
export function noviceTaskApi(){
    return {
        url: '/server/index/index/task',
        isOpenLoading : true
    }
}

//站内信(列表)
export function internalMessageApi(){
    return {
        url: '/server/index/member/internalmessage',
        isOpenLoading : true
    }
}

//站内信(设置已读)
export function internalMessageStatusApi(){
    return {
        url: '/server/index/member/internalmessagestatus',
        isOpenLoading : true
    }
}

//绑定银行卡
export function bindBankCardApi(){
    return {
        url: '/server/index/member/bindbankcard',
        isOpenLoading : true
    }
}

//签到
export function signinApi(){
    return {
        url: '/server/index/member/signin',
        isOpenLoading : true
    }
}

//获取银行卡列表
export function bankListApi(){
    return {
        url: '/server/index/allpayment/platformbanklist'
    }
}

//配资单申请
export function addOrderApi(){
    return {
        url: '/server/index/order/addorder',
        isOpenLoading : true
    }
}

//获取个人信息
export function getMemberinfoApi(){
    return {
        url: '/server/index/member/getmemberinfo'
    }
}

//配资单列表
export function getOrderApi(){
    return {
        url: '/server/index/order/index',
        isOpenLoading : true
    }
}

//配资单修改
export function modifyorderApi(){
    return {
        url: '/server/index/order/modifyorder',
        isOpenLoading : true
    }
}

//交易记录
export function transacTionrecordApi(){
    return {
        url: '/server/index/member/transactionrecord',
        isOpenLoading : true
    }
}

//充值提现记录
export function paymenTrecordApi(){
    return {
        url: '/server/index/member/paymentrecord'
    }
}

//短信验证码(发送)
export function sendSmsCodeApi(){
    return {
        url: '/server/index/index/sendsmscode',
        isOpenLoading : true
    }
}

//短信验证码(验证)
export function verifySmsCodeApi(){
    return {
        url: '/server/index/index/verifysmscode',
        isOpenLoading : true
    }
}

//用户是否存在
export function verifyUserNameApi(){
    return {
        url: '/server/index/account/verifyusername',
        isOpenLoading : true
    }
}

// 修改手机号
export function changeMobileApi(){
    return {
        url: '/server/index/member/changemobile',
        isOpenLoading : true
    }
}

// 找回支付密码
export function retrievepayPassWordApi(){
    return {
        url: '/server/index/member/retrievepaypassword',
        isOpenLoading : true
    }
}

// 找回登陆密码
export function retrievePasswordApi(){
    return {
        url: '/server/index/account/retrievepassword',
        isOpenLoading : true
    }
}

// 首页今日充值
export function todayDepositApi(){
    return {
        url: '/server/index/index/todaydeposit'
    }
}

// 合同
export function contractApi(){
    return {
        url: '/server/index/member/contract',
        isOpenLoading : true
    }
}

// 利率/倍数
export function loansrateApi(){
    return {
        url: '/server/index/index/loansrate'
    }
}

// 剩余期数(扩大配资，时使用)
export function remainingPeriodApi(){
    return {
        url: '/server/index/order/remainingperiod'
    }
}

// 延期利息(终止操盘，时使用)
export function interestMoneybyendApi(){
    return {
        url: '/server/index/order/interestmoneybyend'
    }
}

// 初始化手机号码
export function initMobileApi(){
    return {
        url: '/server/index/member/initmobile',
        isOpenLoading : true
    }
}

// 获取交易端登录令牌
export function getStockSignature(){
    return {
        url: '/server/index/member/getstocksignature'
    }
}
