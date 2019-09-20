/**
 * 登录密码和支付密码规则一致
 */

// 支付密码 密码必须由6-20位字母和数字符号之间的两种组合
export const payPassword = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/

// 手机号码
export const rePhone = /^[1]([3-9])[0-9]{9}$/

// 密码框 去掉中文双字节字符
export const reChinese = /[^\x00-\xff]/

// 短信验证码时间 120
export const smsCodeNumber = 120

// 真实姓名
export const name = /[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*/

// 身份证号
export const number = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/

// 登录注册密码  密码必须由6-20位字母和数字符号之间的两种组合
export const password = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/

//验证密保提示问题
export const protectionData = [
    {
        value: '您母亲的姓名是？',
        label: '您母亲的姓名是？',
    },
    {
        value: '您的配偶的生日是？',
        label: '您的配偶的生日是？',
    },
    {
        value: '您最熟悉的学校室友名字是？',
        label: '您最熟悉的学校室友名字是？',
    },
    {
        value: '我的爱好？',
        label:  '我的爱好？',
    },
    {
        value: '我出生的城市是？',
        label: '我出生的城市是？',       
    },
    {
        value: '你的中学是？',
        label: '你的中学是？',
    },
]