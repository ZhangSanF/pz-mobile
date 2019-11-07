// 获取短信验证码
export const smsCodeMixin = {
    methods: {
        getVerify() {
            let _this = this
            let obj = {
                template: this.actionTemplate,
                member_id: this.getUserInfo.id
            } 
            _this.isShowSmsCode = 'two'               
            _this.sendSmsCode(obj).then((res) => {
                if(res.code == 200) {
                    _this.$Toast.success(res.message)
                    _this.isShowSmsCode = 'three'
                    let _run = () => {
                        setTimeout(() => {
                            _this.smsCodeNumber--
                            if (_this.smsCodeNumber > 0) {
                                _run();
                            } else {
                                _this.isShowSmsCode = 'four'
                                _this.smsCodeNumber = smsCodeNumber
                            }
                        }, 1000);
                    };
                    _run();
                }else {
                    _this.isShowSmsCode = 'one'
                }
            })
        }
    }
}