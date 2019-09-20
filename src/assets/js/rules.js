/**
 * 登录密码和支付密码规则一致
 */
export const checkRules ={
    // 登录注册用户名
    username: [
        {   
            required: true,  
            pattern: /^(?=.{6,16}$)[a-zA-Z]+[A-Za-z0-9_]+$/,
            message: '用户名由6-16字母和数字和下划线组合且必须以字母开头',
            max: 16,
            min: 6,
            trigger: 'blur' 
        }
    ],
    // 登录注册密码
    password: [
        {   
            required: true, 
            pattern: /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/,
            // pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/, 
            message: '密码必须由6-20位字母和数字符号之间的两种组合',
            max: 20,
            min: 6,
            trigger: 'blur' 
        }
    ],
    // 注册确认密码
    confirm_password: [
        {   
            required: true, 
            pattern: /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/,
            message: '密码必须由6-20位字母和数字符号之间的两种组合',
            max: 20,
            min: 6,
            trigger: 'blur' 
        },
        // { validator: checkPass, trigger: 'blur' }
    ],
    // 图片验证码
    captcha: [
        { 
            required: true, 
            pattern: /^\w{4}$/i,
            message: '验证码4位数',
            max: 4,
            min: 4,
            trigger: 'blur' 
        }
    ],
    // 短信验证码
    mobile_verify_code: [
        { 
            required: true, 
            message: '请输入短信验证码',
            trigger: 'blur' 
        }
    ],
    // 手机号码
    mobile: [
        {
            required: true,
            pattern: /^[1]([3-9])[0-9]{9}$/,
            message: '请输入正确手机号',
            max: 11,
            min: 11,
            trigger: 'blur'
        },
    ],
    //密保问题
    //问题一
    keyOne:[
        {   
            required: true,
            message: '请选择问题一',
            trigger: 'change'
        }
    ],
    //问题二
    keyTwo:[
        { 
            required: true, 
            message: '请选择问题二', 
            trigger: 'change' 
        }
    ],
    //答案一
    valueOne:[
        { 
            required: true, 
            message: '请输入答案一', 
            trigger: 'blur' 
        }
    ],
    //答案二
    valueTwo:[
        { 
            required: true, 
            message: '请输入答案二', 
            trigger: 'blur' 
        }
    ],
    //真实姓名
    name :[
        { 
            required: true,
            message: '请输入真实姓名',
            trigger: 'blur',
            pattern: /[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*/
        }
    ],
    //身份证号
    number :[
        { 
            required: true,
            message: '请输入正确身份证号码',
            trigger: 'blur',
            pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
        }
    ],
    //修改登录密码
    //原登录密码
    opwd:[
        {
            required:true,  
            pattern: /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/,
            message: '原登录密码必须由6-20位字母和数字符号之间的两种组合',
            max: 20,
            min: 6,
            trigger: 'blur'
        }
    ],
    //新登录密码
    npwd:[
        {
            required:true,  
            pattern: /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/,
            message: '新登录密码必须由6-20位字母和数字符号之间的两种组合',
            max: 20,
            min: 6,
            trigger: 'blur'
        }
    ],
    //新登录密码
    cpwd:[
        {
            required:true,  
            pattern: /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/,
            message: '新登录密码必须由6-20位字母和数字符号之间的两种组合',
            max: 20,
            min: 6,
            trigger: 'blur'
        }
    ]
}

//支付密码
export const payPassword = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/

//手机号码
export const rePhone = /^[1]([3-9])[0-9]{9}$/

// 密码框 去掉中文双字节字符
export const reChinese = /[^\x00-\xff]/

// 短信验证码时间 120
export const smsCodeNumber = 120