//注册
export function registerApi(){
    return {
        url: '/server/index/account/register'
    }
}

//登录
export function loginApi(){
    return {
        url: '/server/index/account/login'
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
        url: '/server/index/member/logout'
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
        url: '/server/index/articles/index'
    }
}

// 文章内页
export function readArticlesApi(){
    return {
        url: '/server/index/articles/read'
    }
}

// 个人信息修改
export function modifybasicdataApi(){
    return {
        url: '/server/index/member/modifybasicdata'
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
        url: '/server/index/allpayment/depositwithdrawplatform'
    }
}

//验证密保
export function verifyProtectionApi(){
    return {
        url: '/server/index/member/verifyprotection'
    }
}

//初始化密保
export function initProtectionApi(){
    return {
        url: '/server/index/member/initprotection'
    }
}

//更换密保
export function changeProtectionApi(){
    return {
        url: '/server/index/member/changeprotection'
    }
}

//修改支付密码
export function changePayPasswordApi(){
    return {
        url: '/server/index/member/changepaypassword'
    }
}

//修改登录密码
export function changeLoginPasswordApi(){
    return {
        url: '/server/index/member/changeloginpassword'
    }
}

//实名认证
export function realNameAuthApi(){
    return {
        url: '/server/index/member/realnameauth'
    }
}


//上传头像
export function portraitUploadApi(){
    return {
        url: '/server/index/member/portraitupload'
    }
}

//新手任务
export function noviceTaskApi(){
    return {
        url: '/server/index/index/task'
    }
}

//站内信(列表)
export function internalMessageApi(){
    return {
        url: '/server/index/member/internalmessage'
    }
}

//站内信(设置已读)
export function internalMessageStatusApi(){
    return {
        url: '/server/index/member/internalmessagestatus'
    }
}

//绑定银行卡
export function bindBankCardApi(){
    return {
        url: '/server/index/member/bindbankcard'
    }
}

//签到
export function signinApi(){
    return {
        url: '/server/index/member/signin'
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
        url: '/server/index/order/addorder'
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
        url: '/server/index/order/index'
    }
}

//配资单修改
export function modifyorderApi(){
    return {
        url: '/server/index/order/modifyorder'
    }
}

//交易记录
export function transacTionrecordApi(){
    return {
        url: '/server/index/member/transactionrecord'
    }
}

//提现记录
export function withdrawalrecordApi(){
    return {
        url: '/server/index/member/withdrawalrecord'
    }
}

//短信验证码(发送)
export function sendSmsCodeApi(){
    return {
        url: '/server/index/index/sendsmscode'
    }
}

//短信验证码(验证)
export function verifySmsCodeApi(){
    return {
        url: '/server/index/index/verifysmscode'
    }
}

//用户是否存在
export function verifyUserNameApi(){
    return {
        url: '/server/index/account/verifyusername'
    }
}

// 修改手机号
export function changeMobileApi(){
    return {
        url: '/server/index/member/changemobile'
    }
}

// 找回支付密码
export function retrievepayPassWordApi(){
    return {
        url: '/server/index/member/retrievepaypassword'
    }
}

// 找回登陆密码
export function retrievePasswordApi(){
    return {
        url: '/server/index/account/retrievepassword'
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
        url: '/server/index/member/contract'
    }
}

// 利率/倍数
export function loansrateApi(){
    return {
        url: '/server/index/index/loansrate'
    }
}