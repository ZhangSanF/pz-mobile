<template>
  <div class="save-pwd">
    <SecondHader headerTitle="密码保护"/>
    <!-- 初始化密保 -->
    <div v-if="!getUserInfo.is_protect">
      <ul class="ul-box">
        <li class="list-item">
          <p>手机号</p>
          <div class="right">
              <van-cell-group>
                <van-field :value="getUserInfo.mobile" disabled>
                  <span @click="getVerify" v-if="isShowSmsCode == 'one'" slot="button" class="verification">获取验证码</span>
                  <span v-if="isShowSmsCode == 'two'" slot="button" class="verification">短信发送中...</span>
                  <span v-if="isShowSmsCode == 'three'" slot="button" class="verification">重新获取({{smsCodeNumber}})</span>
                  <span @click="getVerify" v-if="isShowSmsCode == 'four'" slot="button" class="verification">重新获取</span>
                </van-field>
              </van-cell-group>
          </div>
        </li>
        <li class="list-item">
          <p>验证码</p>
          <div class="right">
              <van-cell-group>
                  <van-field  placeholder="请输入验证码" v-model.trim="initPwd.mobile_verify_code"/>
              </van-cell-group>
          </div>
        </li>
        <li class="list-item">
          <p>请选择问题</p>
          <div class="right">
              <van-dropdown-menu>
                <van-dropdown-item ref="initItemOne" :title="initPwd.keyOne">
                  <li 
                  class="bank-list-item"
                  v-for="(item, index) in protectionData" 
                  :key="index" 
                  @click="initOneConfirm(item.value)">
                  {{item.value}}
                  </li>
                </van-dropdown-item>
              </van-dropdown-menu>
              <span class="font_family icon-youjiantou icon-style"></span>
          </div>           
        </li>
        <li class="list-item">
          <p>请输入答案</p>
          <div class="right">
              <van-cell-group>
                <van-field  placeholder="请输入答案" v-model.trim="initPwd.valueOne"/>
            </van-cell-group>
              <!-- <span class="font_family icon-youjiantou icon-style"></span> -->
          </div>
        </li>
        <li class="list-item">
          <p>请选择问题</p>
          <div class="right">
              <van-dropdown-menu>
                <van-dropdown-item ref="intiItemTwo" :title="initPwd.keyTwo">
                  <li 
                  class="bank-list-item"
                  v-for="(item, index) in protectionData" 
                  :key="index"
                  @click="initTwoConfirm(item.value)">
                  {{item.value}}
                  </li>
                </van-dropdown-item>
              </van-dropdown-menu>
              <span class="font_family icon-youjiantou icon-style"></span>
          </div>           
        </li>
        <li class="list-item">
          <p>请输入答案</p>
          <div class="right">
              <van-cell-group>
                <van-field  placeholder="请输入答案" v-model.trim="initPwd.valueTwo"/>
            </van-cell-group>
              <!-- <span class="font_family icon-youjiantou icon-style"></span> -->
          </div>
        </li>
      </ul>
      <div class="btn-common" @click="initPwdAction">设置密保</div>
    </div>
    <!-- 修改密保 -->
    <div v-else>
      <!-- 原密保修改密保 -->
      <div v-if="showState">
        <!-- 验证密保 -->
        <div v-if="nextTo">
          <ul class="ul-box">
            <li class="list-item">
              <p>密保问题</p>
              <div class="right">
                <span class="info">{{getUserInfo.password_protection[0]}}</span>
              </div>
            </li>
            <li class="list-item">
              <p>输入答案</p>
              <div class="right">
                  <van-cell-group>
                    <van-field  placeholder="请输入答案" v-model.trim="verifiPwd.valueOne"/>
                </van-cell-group>
              </div>
            </li>
            <li class="list-item">
              <p>密保问题</p>
              <div class="right">
                  <span class="info">{{getUserInfo.password_protection[1]}}</span>
              </div>
            </li>
            <li class="list-item">
              <p>输入答案</p>
              <div class="right">
                  <van-cell-group>
                    <van-field  placeholder="请输入答案" v-model.trim="verifiPwd.valueTwo"/>
                </van-cell-group>
              </div>
            </li>
          </ul>
          <div class="btn-common" @click="verifiAction">下一步</div>
          <div class="btn-common" @click="showState = false">通过手机重置</div>
        </div>
        <!-- 修改密保 -->
        <div v-else>
          <ul class="ul-box">
            <li class="list-item">
              <p>请选择问题</p>
              <div class="right">
                <van-dropdown-menu>
                  <van-dropdown-item ref="resetItemOne" :title="resetPwdData.keyOne">
                    <li 
                    class="bank-list-item"
                    v-for="(item, index) in protectionData" 
                    :key="index" 
                    @click="resetOneConfirm(item.value)">
                    {{item.value}}
                    </li>
                  </van-dropdown-item>
                </van-dropdown-menu>
                <span class="font_family icon-youjiantou icon-style"></span>
              </div>           
            </li>
            <li class="list-item">
              <p>请输入答案</p>
              <div class="right">
                <van-cell-group>
                  <van-field  placeholder="请输入答案" v-model.trim="resetPwdData.valueOne"/>
                </van-cell-group>
                <!-- <span class="font_family icon-youjiantou icon-style"></span> -->
              </div>
            </li>
            <li class="list-item">
              <p>请选择问题</p>
              <div class="right">
                <van-dropdown-menu>
                  <van-dropdown-item ref="resetItemTwo" :title="resetPwdData.keyTwo">
                    <li 
                    class="bank-list-item"
                    v-for="(item, index) in protectionData" 
                    :key="index"
                    @click="resetTwoConfirm(item.value)">
                    {{item.value}}
                    </li>
                  </van-dropdown-item>
                </van-dropdown-menu>
                <span class="font_family icon-youjiantou icon-style"></span>
              </div>           
            </li>
            <li class="list-item">
              <p>请输入答案</p>
              <div class="right">
                <van-cell-group>
                  <van-field  placeholder="请输入答案" v-model.trim="resetPwdData.valueTwo"/>
                </van-cell-group>
                <!-- <span class="font_family icon-youjiantou icon-style"></span> -->
              </div>
            </li>
          </ul>
          <div class="btn-common" @click="changePwdAction">确定修改</div>
        </div>
      </div>
      <!-- 手机修改密保 -->
      <div v-else>
        <ul class="ul-box">
          <li class="list-item">
            <p>请选择问题</p>
            <div class="right">
              <van-dropdown-menu>
                <van-dropdown-item ref="phoneItemOne" :title="iphoneEncrypted.keyOne">
                  <li 
                  class="bank-list-item"
                  v-for="(item, index) in protectionData" 
                  :key="index" 
                  @click="phoneOneConfirm(item.value)">
                  {{item.value}}
                  </li>
                </van-dropdown-item>
              </van-dropdown-menu>
              <span class="font_family icon-youjiantou icon-style"></span>
            </div>           
          </li>
          <li class="list-item">
            <p>请输入答案</p>
            <div class="right">
              <van-cell-group>
                <van-field  placeholder="请输入答案" v-model.trim="iphoneEncrypted.valueOne"/>
              </van-cell-group>
              <!-- <span class="font_family icon-youjiantou icon-style"></span> -->
            </div>
          </li>
          <li class="list-item">
            <p>请选择问题</p>
            <div class="right">
              <van-dropdown-menu>
                <van-dropdown-item ref="phoneItemTwo" :title="iphoneEncrypted.keyTwo">
                  <li 
                  class="bank-list-item"
                  v-for="(item, index) in protectionData" 
                  :key="index"
                  @click="phoneTwoConfirm(item.value)">
                  {{item.value}}
                  </li>
                </van-dropdown-item>
              </van-dropdown-menu>
              <span class="font_family icon-youjiantou icon-style"></span>
            </div>           
          </li>
          <li class="list-item">
            <p>请输入答案</p>
            <div class="right">
              <van-cell-group>
                <van-field  placeholder="请输入答案" v-model.trim="iphoneEncrypted.valueTwo"/>
              </van-cell-group>
              <!-- <span class="font_family icon-youjiantou icon-style"></span> -->
            </div>
          </li>
          <li class="list-item">
            <p>手机号</p>
            <div class="right">
                <van-cell-group>
                  <van-field :value="getUserInfo.mobile" disabled>
                    <span @click="getVerify" v-if="isShowSmsCode == 'one'" slot="button" class="verification">获取验证码</span>
                    <span v-if="isShowSmsCode == 'two'" slot="button" class="verification">短信发送中...</span>
                    <span v-if="isShowSmsCode == 'three'" slot="button" class="verification">重新获取({{smsCodeNumber}})</span>
                    <span @click="getVerify" v-if="isShowSmsCode == 'four'" slot="button" class="verification">重新获取</span>
                  </van-field>
                </van-cell-group>
            </div>
          </li>
          <li class="list-item">
            <p>验证码</p>
            <div class="right">
                <van-cell-group>
                    <van-field  placeholder="请输入验证码" v-model.trim="iphoneEncrypted.mobile_verify_code"/>
                </van-cell-group>
            </div>
          </li>
        </ul>
        <div class="btn-common" @click="safeByPhone">确定修改</div>
        <div class="btn-common" @click="showState = true">通过原密保重置</div>
      </div>
    </div>  
  </div>
</template>

<script>
import { protectionData, smsCodeNumber } from '@/config/rules'
import SecondHader from "@/components/common/SecondHader"
import { mapActions, mapGetters } from "vuex"
import { smsCodeMixin } from "@/config/miXin"

export default {
  mixins:[smsCodeMixin],
  components: { SecondHader },
  data() {
    return {
      protectionData: protectionData,
      showState: true,
      nextTo: true,
      isShowSmsCode: 'one',
      actionTemplate: 'password_protection',
      smsCodeNumber: smsCodeNumber,
      initPwd: {// 初始化密保
        mobile_verify_code: '',
        keyOne: '',
        valueOne: '',
        keyTwo: '',
        valueTwo: ''
      },
      verifiPwd: {// 验证密保
        valueOne: '',
        valueTwo: ''
      },
      resetPwdData: {//通过密保重置数据
        keyOne:'',
        valueOne:'',
        keyTwo:'',
        valueTwo:''
      },
      iphoneEncrypted: {// 手机号码设置密保
        keyOne:'',
        valueOne:'',
        keyTwo:'',
        valueTwo:'',
        mobile_verify_code:''
      },
      changePwd: {// 更换密保
        type: 1,//1密保，2手机短信
        mobile_verify_code: '',
        oldProtection: '',
        newProtection: ''
      }
    }
  },
  methods:{
    ...mapActions(['initProtection', 'verifyProtection', 'changeProtection', 'sendSmsCode']),
    initOneConfirm(name) {
      this.$refs.initItemOne.toggle();
      this.initPwd.keyOne = name
    },
    initTwoConfirm(name) {
      this.$refs.intiItemTwo.toggle();
      this.initPwd.keyTwo = name
    },
    resetOneConfirm(name) {
      this.$refs.resetItemOne.toggle();
      this.resetPwdData.keyOne = name
    },
    resetTwoConfirm(name) {
      this.$refs.resetItemTwo.toggle();
      this.resetPwdData.keyTwo = name
    },
    phoneOneConfirm(name) {
      this.$refs.phoneItemOne.toggle();
      this.iphoneEncrypted.keyOne = name
    },
    phoneTwoConfirm(name) {
      this.$refs.phoneItemTwo.toggle();
      this.iphoneEncrypted.keyTwo = name
    },
    // 初始化密保
    initPwdAction() {
      if(!this.initPwd.keyOne || !this.initPwd.valueOne || !this.initPwd.keyTwo || !this.initPwd.valueTwo || !this.initPwd.mobile_verify_code) {
        return this.$Toast.fail('请填写完整信息')
      }
      if(this.initPwd.keyOne == this.initPwd.keyTwo) {
        return this.$Toast.fail('密保问题不能相同')
      }
      if(this.isShowSmsCode == 'three' || this.isShowSmsCode == 'four') {
        let params = {
          mobile_verify_code: this.initPwd.mobile_verify_code,
          protection:`{"${this.initPwd.keyOne}":"${this.initPwd.valueOne}","${this.initPwd.keyTwo}":"${this.initPwd.valueTwo}"}`
        }
        let password_protection = [this.initPwd.keyOne,this.initPwd.keyTwo]
        this.initProtection(params).then(res=>{
          if(res.code == 200){
            this.$Toast.success(res.message)
            this.$store.commit('PROTECT', {is_protect: true, password_protection: password_protection})
            this.$router.replace('/safetySet')
          }
        })
      }else {
        this.$Toast.fail(`请获取短信验证码`)
      } 
    },
    // 验证密保
    verifiAction() {
      if(!this.verifiPwd.valueOne || !this.verifiPwd.valueTwo) {
        return this.$Toast.fail('请填写完整信息')
      }
      let obj = {
        [this.getUserInfo.password_protection[0]]: this.verifiPwd.valueOne,
        [this.getUserInfo.password_protection[1]]: this.verifiPwd.valueTwo
      }                    
      const params = {
        protection: JSON.stringify(obj)
      }
      this.verifyProtection(params).then(res => {
        if(res.code == 200) {
            // 保存旧密保数据
            this.changePwd.oldProtection = JSON.stringify(obj)
            this.nextTo = false
        }
      }) 
    },
    // 修改密保
    changePwdAction() {
      if(!this.resetPwdData.keyOne || !this.resetPwdData.valueOne || !this.resetPwdData.keyTwo || !this.resetPwdData.valueTwo) {
        return this.$Toast.fail('请填写完整信息')
      }
      if(this.resetPwdData.keyOne == this.resetPwdData.keyTwo) {
        return this.$Toast.fail('密保问题不能相同')
      }
      let obj = {
        [this.resetPwdData.keyOne]: this.resetPwdData.valueOne,
        [this.resetPwdData.keyTwo]: this.resetPwdData.valueTwo
      } 
      this.changePwd.newProtection = JSON.stringify(obj)
      let password_protection = [this.resetPwdData.keyOne, this.resetPwdData.keyTwo]
      this.changeProtection(this.changePwd).then(res => {
        if(res.code == 200) {
          this.$Toast.success(res.message)
          this.$store.commit('PROTECT', {is_protect: true, password_protection: password_protection})
          this.$router.replace('/safetySet')
        }
      })
    },
    // 通过手机重置密保
    safeByPhone() {
      if(
        !this.iphoneEncrypted.keyOne || 
        !this.iphoneEncrypted.valueOne || 
        !this.iphoneEncrypted.keyTwo || 
        !this.iphoneEncrypted.valueTwo ||
        !this.iphoneEncrypted.mobile_verify_code) {
        return this.$Toast.fail('请填写完整信息')
      }
      if(this.iphoneEncrypted.keyOne == this.iphoneEncrypted.keyTwo) {
        return this.$Toast.fail('密保问题不能相同')
      }
      if(this.isShowSmsCode == 'three' || this.isShowSmsCode == 'four') {
        let obj = {
          [this.iphoneEncrypted.keyOne]: this.iphoneEncrypted.valueOne,
          [this.iphoneEncrypted.keyTwo]: this.iphoneEncrypted.valueTwo
        } 
        let password_protection = [this.iphoneEncrypted.keyOne, this.iphoneEncrypted.keyTwo]
        this.changePwd.type = 2
        this.changePwd.mobile_verify_code = this.iphoneEncrypted.mobile_verify_code
        this.changePwd.newProtection = JSON.stringify(obj)
        this.changeProtection(this.changePwd).then(res => {
          if(res.code == 200) {
            this.$Toast.success(res.message)
            this.$store.commit('PROTECT', {is_protect: true, password_protection: password_protection})
            this.$router.replace('/safetySet')
          }
        })
      }else {
        this.$Toast.fail(`请获取短信验证码`)
      }
    }
  },
  computed: {
    ...mapGetters(['getUserInfo'])
  }
}
</script>

<style lang="scss" scoped>
.save-pwd{
  .ul-box{
    margin-top: px2rem(20px);
    padding-left: px2rem(30px);
    background: #fff;
    .list-item{
      font-size: px2rem(33px); 
      display: flex;
      justify-content: space-between;
      border-bottom: px2rem(1px) solid $home-line-color;
      padding-right: px2rem(30px);
      height: px2rem(80px);
      align-items: center;
      .right{
        padding-left: px2rem(30px);
        overflow: hidden;
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: px2rem(78px);
        .info{
          color: #666;
        }
        .bank-list-item{
          margin-left: px2rem(30px);
          padding: px2rem(20px) 0;
          border-bottom: px2rem(1px) solid $home-line-color;
        }
        .icon-style{
          color: #999;
          font-size: px2rem(26px);
        }
        .verification{
          padding: px2rem(11px) px2rem(24px);
          color: #fd591e;
          border: 1px solid #fd591e;
          border-radius: 4px;
        }
      }
    }   
    .list-item:last-child{
      border-bottom: none;
    }
  }
}
</style>
<style lang="scss">
.save-pwd{
  .van-dropdown-menu__title::after{
    display: none;
  }
  .van-dropdown-menu{
    height: 100%;
    width: 100%;
  }
  .van-dropdown-menu__title{
    width: 100%;
    padding: 0;
  }
  .van-cell-group{
    .van-cell{
      padding: 0;
      height: px2rem(80px);
      line-height: px2rem(80px);
      font-size: px2rem(33px);
    }
  }
  .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after{
    border:none;
  }
}
</style>