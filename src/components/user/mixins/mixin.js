
export const userMixin = { 
    methods: {
        checkFrom() {
            this.canSave = false
            //验证用户名
            let nameRule = /^(?=.{6,16}$)[a-zA-Z]+[A-Za-z0-9]+$/
            if(!this.form.username){
                this.errorMessage ='用户名不能为空';
            }else if(!nameRule.test(this.form.username)) {
                this.errorMessage = '用户名须由字母开头，共6到16位，可包含数字'
            }else {
                this.canSave = true
                this.errorMessage = ''
                if(this.$options.name =='login') {
                    this.checkPwd()
                }
                else
                if(this.$options.name =='reg') {
                    this.checkPwd()
                }
                else
                if(this.$options.name =='findpass') {
                    this.checkCaptcha()
                }
            }
        },
        checkUserName() {
            let nameRule = /^(?=.{6,16}$)[a-zA-Z]+[A-Za-z0-9]+$/
            if(!this.form.username){
                this.errorMessage ='用户名不能为空';
            }else if(!nameRule.test(this.form.username)) {
                this.errorMessage = '用户名须由字母开头，共6到16位，可包含数字'
            }
        },
        checkPwd() {
            this.canSave = false
            let pwdRule = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/
            if(!this.form.password){
                if(this.$options.name === 'findpass') {
                    this.$notify(`密码不能为空`)
                }else {
                    this.errorMessage ='密码不能为空';
                }
            }else if(!pwdRule.test(this.form.password)) {
                if(this.$options.name === 'findpass') {
                    this.$notify(`密码必须由6-20位字母和数字符号之间的两种组合`)
                }else {
                    this.errorMessage = '密码必须由6-20位字母和数字符号之间的两种组合'
                }
            }else {
                this.canSave = true
                this.errorMessage = ''
                if(this.$options.name ==='reg') {
                    this.checkRePwd()
                }else
                if(this.$options.name ==='login') {
                    if(this.getSettingSystem.sys.close_login_captcha !=='1') {
                        this.checkCaptcha()
                    }
                }
            }
        },
        checkRePwd() {
            this.canSave = false
            if(this.form.password !== this.form.repassword) {
                this.errorMessage = '两次密码不一致,请重新输入'
            }else {
                this.canSave = true
                this.errorMessage = ''
                this.checkPhone()
            }
        },
        checkCaptcha() {
            this.canSave = false
            let captchaRule = /^\w{4}$/i
            if(!this.form.captcha) {
                this.errorMessage ='验证码不能为空';
                return;
            }else if(!captchaRule.test(this.form.captcha)) {
                this.errorMessage = '验证码4位数'
                return 
            }else {
                this.canSave = true
                this.errorMessage = ''
            }
        },
        checkPhone() {
            this.canSave = false
            //验证手机号
            let phoneRule = /^[1]([3-9])[0-9]{9}$/
            if(!this.form.phone){
                this.errorMessage ='请输入手机号';
            }else if(!phoneRule.test(this.form.phone)) { 
                this.errorMessage = '请输入正确手机号'
            }else {
                this.canSave = true
                this.errorMessage = ''
                this.checkSms()
            }
        },
        checkSms() {
            this.canSave = false
            let smsRule = /^\w{4,6}$/i
            if(!this.form.sms){
                if(this.$options.name === 'findpass') {
                    console.log(1);
                    
                    this.$notify(`请输入手机验证码`)
                }else {
                    this.errorMessage ='请输入手机验证码';
                }
            }else if(!smsRule.test(this.form.sms)) {
                if(this.$options.name === 'findpass') {
                    this.$notify(`手机验证码4-6位数`)
                }else {
                    this.errorMessage = '手机验证码4-6位数'
                }

            }else {
                this.canSave = true
                this.errorMessage = ''
                if(this.$options.name !=='findpass') {
                    this.checkCaptcha()
                }
            }
        },
    }
}
