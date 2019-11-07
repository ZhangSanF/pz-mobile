<template>
  <div class="user-center-info">
    <SecondHader headerTitle="个人资料"/>
    <scroll class="user-container-m" :click="false" :data="scrollDatas">
        <div>
            <ul class="ul-box">
                <li class="list-item">
                    <p>用户名</p>
                    <div class="right">
                        <span class="info">{{getUserInfo.username}}</span>
                    </div>           
                </li>
                <li class="list-item" @click="genderPopup = true">
                    <p>性别</p>
                    <div class="right">
                        <span>{{gender == true ? '男' : '女'}}</span>
                        <span class="font_family icon-youjiantou icon-style"></span>
                    </div>
                </li>
                <li class="list-item" @click="educationPopup = true">
                    <p>本人学历</p>
                    <div class="right">
                        <span>{{education}}</span>
                        <span class="font_family icon-youjiantou icon-style"></span>
                    </div>
                </li>                
                <li class="list-item">
                    <p>身份证所处地</p>
                    <div class="right" @click="showPopup">
                        <span class="city">{{selectedCity}}</span>
                        <span class="font_family icon-youjiantou icon-style"></span>
                    </div>
                </li> 
                <li class="list-item">
                    <p>通讯地址</p>
                    <div class="right">
                        <van-cell-group>
                            <van-field v-model.trim="address" placeholder="请填写通讯地址"/>
                        </van-cell-group>
                    </div>
                </li>
                <li class="list-item" @click="maritalPopup = true">
                    <p>婚姻</p>
                    <div class="right">
                        <span>{{marital_status == '1' ? '已婚' : '未婚'}}</span>
                        <span class="font_family icon-youjiantou icon-style"></span>
                    </div>
                </li>  
                <li class="list-item">
                    <p>现就职于</p>
                    <div class="right">
                        <van-cell-group>
                            <van-field v-model.trim="working_company" placeholder="请填写现就职于地址"/>
                        </van-cell-group>
                    </div>
                </li>
                <li class="list-item">
                    <p>职位</p>
                    <div class="right">
                        <van-cell-group>
                            <van-field v-model.trim="job" placeholder="请填写职位"/>
                        </van-cell-group>
                    </div>
                </li>                
                <li class="list-item" @click="monthlyPopup = true">
                    <p>月收入</p>
                    <div class="right">
                        <span>{{monthly_income}}</span>
                        <span class="font_family icon-youjiantou icon-style"></span>
                    </div>
                </li>
                <li class="list-item">
                    <p>紧急联系人</p>
                    <div class="right">
                        <van-cell-group>
                            <van-field v-model.trim="emergency_name" placeholder="请填写紧急联系人"/>
                        </van-cell-group>
                    </div>
                </li>
                <li class="list-item">
                    <p>紧急联系人手机</p>
                    <div class="right">
                        <van-cell-group>
                            <van-field v-model.trim="emergency_mobile" placeholder="请填写紧急联系人手机" type="number"/>
                        </van-cell-group>
                    </div>
                </li>
                <li class="list-item" @click="emergencyPopup = true">
                    <p>紧急联系人关系</p>
                    <div class="right">
                        <span>{{emergency_relationship}}</span>
                        <span class="font_family icon-youjiantou icon-style"></span>
                    </div>
                </li>               
            </ul>
            <div class="btn-common" @click="actionSet">确定修改</div>
        </div>
    </scroll>
    <!-- 性别 -->
    <van-popup v-model="genderPopup" position="bottom" :style="{ height: '50%' }">
      <BottomAlert :fatherData="sexList" @eimtChange="eimtChangeSex" marker='user'/>
    </van-popup>
    <!-- 学历 -->
    <van-popup v-model="educationPopup" position="bottom" :style="{ height: '50%' }">
      <BottomAlert :fatherData="educationList" @eimtChange="eimtChangeEducation" marker='user'/>
    </van-popup>
    <!-- 婚姻 -->
    <van-popup v-model="maritalPopup" position="bottom" :style="{ height: '50%' }">
      <BottomAlert :fatherData="maritalList" @eimtChange="eimtChangeMarital" marker='user'/>
    </van-popup>
    <!-- 月收入 -->
    <van-popup v-model="monthlyPopup" position="bottom" :style="{ height: '50%' }">
      <BottomAlert :fatherData="monthlyIncomeList" @eimtChange="eimtChangeMonthly" marker='user'/>
    </van-popup>
    <!-- 紧急联系人关系 -->
    <van-popup v-model="emergencyPopup" position="bottom" :style="{ height: '50%' }">
      <BottomAlert :fatherData="relationshipList" @eimtChange="eimtChangeEmergency" marker='user'/>
    </van-popup>
    <!-- 身份证所处地 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '50%' }">
        <van-area :area-list="pcaa" @confirm="onConfirm" @cancel="onCancel"/>
    </van-popup>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
import Scroll from "@/components/common/scroll"
import SecondHader from "@/components/common/SecondHader"
import pcaa from '@/assets/js/pcaa'
import BottomAlert from "@/components/common/BottomAlert"

export default {
    components: { Scroll, SecondHader, BottomAlert },
    data() {
        return {
            scrollDatas: [], 
            selectedCity: '',
            pcaa: pcaa,
            genderPopup: false,
            educationPopup: false,
            maritalPopup: false,
            monthlyPopup: false,
            emergencyPopup: false,
            show: false,
            gender: '',// 性别
            education: '',// 本人学历
            province: '',//省份
            city: '',//城市
            area: '',//地区
            address: '',// 通讯地址
            marital_status: '',// 婚姻
            working_company: '',// 现就职于 
            job: '',//职位
            monthly_income: '',// 月收入
            emergency_name: '', //   紧急联系人 
            emergency_mobile: '', //   紧急联系人手机    
            emergency_relationship: '', //   紧急联系人关系 
            sexList: [
                { text: '女', value: false },
                { text: '男', value: true }
            ],
            maritalList: [
                { text: '已婚', value: 1 },
                { text: '未婚', value: 0 }
            ],
            educationList: [
                { text: '高中及以下', value: '高中及以下' }, 
                { text: '大专', value: '大专' }, 
                { text: '本科', value: '本科' }, 
                { text: '研究生及以上', value: '研究生及以上' }
            ],
            monthlyIncomeList: [
                { text: '1000元以下', value: '1000元以下' }, 
                { text: '1000-2000元', value: '1000-2000元' }, 
                { text: '2000-5000元', value: '2000-5000元' }, 
                { text: '5000-10000元', value: '5000-10000元'}, 
                { text: '10000-20000元', value: '10000-20000元'}
            ],
            relationshipList: [
                { text: '父母', value: '父母' }, 
                { text: '配偶', value: '配偶' }, 
                { text: '子女', value: '子女' }, 
                { text: '兄弟姐妹', value: '兄弟姐妹'}, 
                { text: '亲戚', value: '亲戚'},
                { text: '朋友', value: '朋友'},
                { text: '同事', value: '同事'},
                { text: '同学', value: '同学'}
            ]
        }
    },
    created() {
        this.gender = this.getUserInfo.gender
        this.education = this.getUserInfo.education
        this.province = this.getUserInfo.province || ''
        this.city = this.getUserInfo.city || ''
        this.area = this.getUserInfo.area || ''
        this.selectedCity = `${this.province}${this.city}${this.area}`
        this.address = this.getUserInfo.address
        this.marital_status = this.getUserInfo.marital_status
        this.working_company = this.getUserInfo.working_company
        this.job = this.getUserInfo.job
        this.monthly_income = this.getUserInfo.monthly_income         
        this.emergency_name = this.getUserInfo.emergency_name
        this.emergency_mobile = this.getUserInfo.emergency_mobile
        this.emergency_relationship = this.getUserInfo.emergency_relationship  
    },
    methods: {
        ...mapActions(['getModifybasicdata']),
        eimtChangeSex(text) {
            this.genderPopup = false
            this.gender = text
        },
        eimtChangeEducation(text) {
            this.educationPopup = false
            this.education = text
        },
        eimtChangeMarital(text) {
            this.maritalPopup = false
            this.marital_status = text
        },
        eimtChangeMonthly(text) {
            this.monthlyPopup = false
            this.monthly_income = text
        },
        eimtChangeEmergency(text) {
            this.emergencyPopup = false
            this.emergency_relationship = text
        },
        showPopup() {
            this.show = true
        },
        onConfirm(res) {
            this.selectedCity = `${res[0].name}${res[1].name}${res[2].name}`
            this.province = res[0].name
            this.city = res[1].name
            this.area = res[2].name
            this.show = false
        },
        onCancel() {
            this.show = false
        },
        actionSet() {
            let obj = {
                gender: this.gender,//性别
                education: this.education,//本人学历  
                province: this.province,//省份
                city: this.city,//城市
                area: this.area,//地区              
                address: this.address,//通讯地址
                marital_status: this.marital_status,//婚姻
                working_company:this.working_company,//现就职于 
                job: this.job, //职位
                monthly_income: this.monthly_income, //月收入
                emergency_name: this.emergency_name, //紧急联系人  
                emergency_mobile: this.emergency_mobile, //紧急联系人手机            
                emergency_relationship: this.emergency_relationship, //紧急联系人关系
            }
            this.getModifybasicdata(obj).then(res=>{
                if(res.code == 200){
                    this.$Toast.success(res.message)
                    Object.assign(this.$store.state.userInfo, obj)
                }   
            })
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.scrollDatas = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        });
    },
    computed: {
        ...mapGetters(['getUserInfo'])
    }
}
</script>

<style lang="scss" scoped>
.user-center-info{
    .ul-box{
        background: #fff;
        padding-left: px2rem(30px);
        .list-item{
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid $home-line-color;
            padding-right: px2rem(30px);
            height: px2rem(80px);
            align-items: center;
            color: #333;
            font-size: px2rem(33px);          
            .right{
                overflow: hidden;
                width: px2rem(450px);
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: px2rem(78px);
                .icon-style{
                    color: #999;
                    font-size: px2rem(26px);
                }
                .info{
                    color: #666;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                }
                .city{
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap; 
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
.user-center-info{
    .van-cell-group{
        .van-cell{
            font-size: px2rem(33px);
            padding: 0;
        }
  }
    .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after{
        border: none
    }
    .van-dropdown-menu{
        height: 100%;
        width: 100%;
    }
    .van-dropdown-menu__title::after{
        display: none;
    }
    .van-dropdown-menu__title{
        font-size: px2rem(33px);
        // color: #666;
        width: 100%;
        padding: 0;
    }
    // .van-field__control{
    //     color: #666;
    // }
}
</style>