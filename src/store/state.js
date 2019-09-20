
const state = {
    showLoadMore: false,//上拉加载更多loading
    isLogin: JSON.parse(sessionStorage.getItem("store")) == null ? '' : JSON.parse(sessionStorage.getItem("store")).isLogin,//是否登录
    depositList:[],//首页今日充值
    userInfo: {},//个人信息
    pcIndexCarousel: [],//首页轮播图
    cooperation: [],//合作伙伴
    industryCertification: [],//底部行业认证
    payData:{},//充值
    settingBase:{},//系统配置
    settingStock:{},//系统配置
    settingOrder:{},//系统配置
    settingFree:{},//系统配置
    settingDays:{},//系统配置
    settingMonths:{},//系统配置
    settingVip:{},//系统配置
    xsrwData:[],//新手任务
    bankList: {},//获取银行卡列表
};

export default state;
