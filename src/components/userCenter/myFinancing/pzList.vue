<template>
  <div class="pz-list">
    <div v-if="getOrderList.length > 0">
      <scroll style="top:0" class="user-container" :click="false" :data="getOrderList" :pullup="true" :pulldown="true" :listenScroll="true"
              @scrollToEnd="scrollEnd" @topRefresh="touchEnd" @scroll="scroll">
        <div class="content-box">
          <van-collapse v-model="activeNames" accordion>
            <van-collapse-item :name="index" v-for="(item, index) in getOrderList" :key="index">
              <div slot="title" class="title">
                <div class="title-top">
                  <div class="top-left">                    
                    <p class="top-left-center">
                      <span class="font-info">配资单号&nbsp;:</span>
                      <span class="number">{{item.order_number}}</span>
                    </p>
                    <p class="btn">
                      <span v-if="activeNames === index">收起</span>
                      <span v-else>查看</span>
                    </p>
                  </div>
                  <div class="time">
                    <p>
                      <span class="font-info">配资时间&nbsp;:</span>
                      <span class="number">{{item.start_time.split(' ')[0]}} ~ {{item.end_time.split(' ')[0]}}</span>
                    </p>                    
                    <p>
                      <van-tag mark color="#199760" v-if="item.status == 1">待审核</van-tag>
                      <van-tag mark color="#ff0000" v-else-if="item.status == 2 && outTime(item.end_time) == false">操盘中</van-tag>
                      <van-tag mark color="#FFF000" text-color="red" v-else-if="item.status == 2 && outTime(item.end_time) == true">已到期</van-tag>
                      <van-tag mark color="#666" v-else-if="item.status == 3">已失败</van-tag>
                      <van-tag mark color="#999" v-else-if="item.status == 4">已结束</van-tag>
                    </p>
                  </div>
                </div>
                <div class="title-bottom">
                  <div class="title-item">
                    <p class="item">
                      <span class="font-left">保证金</span>
                      <span>{{item.member_money | number}}</span>
                    </p>
                    <p class="item">
                      <span class="font-left">操盘资金</span>
                      <span>{{traderMoney(item.member_money, item.credit_money) | number}}</span>
                    </p>
                  </div>
                  <div class="title-item">
                    <p class="item">
                      <span class="font-left">账户</span>
                      <span v-if="item.status == 1 || item.status == 3">--</span>
                      <span v-else>{{item.username}}</span>
                    </p>
                    <p class="item">
                      <span class="font-left">密码</span>
                      <span v-if="item.status == 1 || item.status == 3">--</span>
                      <span v-else>{{item.password}}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="content">
                <div class="list">
                  <div class="title-item">
                    <p class="item">
                      <span class="font-left">借入资金</span>
                      <span>{{item.credit_money | number}}</span>
                    </p>
                    <p class="item">
                      <span class="font-left">利息</span>
                      <span>{{item.interest_money | number}}</span>
                    </p>
                  </div>
                  <div class="title-item">
                    <p class="item">
                      <span class="font-left">警戒线</span>
                      <span>{{isNaN(item.warning_amount) ? item.warning_amount : item.warning_amount.toFixed(2)}}</span>
                    </p>
                    <p class="item">
                      <span class="font-left">平仓线</span>
                      <span>{{isNaN(item.closeout_amount) ? item.closeout_amount : item.closeout_amount.toFixed(2)}}</span>
                    </p>
                  </div>
                  <div class="title-item">
                    <p class="item">
                      <span class="font-left">可提金额</span>
                      <span v-if="item.status == 1 || item.status == 3">--</span>
                      <span v-else>{{item.withdrawable_profit | number}}</span>
                    </p>
                    <p class="item">
                      <span class="font-left">操盘周期</span>
                      <span>
                        {{item.period}}
                        <span v-if="item.order_type == 1 || item.order_type == 2">天</span>
                        <span v-else>个月</span>
                      </span>
                    </p>
                  </div>
                  <div class="title-item" v-if="item.add_member_money*1 > 0">
                    <p class="item">
                      <span>追加保证金&nbsp;&nbsp;</span>
                      <span>{{item.add_member_money | number}}</span>
                    </p>
                  </div>
                </div>
                <div class="btn-box">
                  <div class="left" v-if="item.status == 2">
                    <span v-if="item.order_type != 1" 
                      @click="showAlert(2, item.id, item.order_type, item.multiple)">
                      申请延期
                    </span>
                    <span v-if="outTime(item.end_time) != true && item.order_type != 1"
                      @click="showAlert(3, item.id, item.order_type, item.multiple)">
                      提取收益
                    </span>
                    <span @click="showAlert(5, item.id, item.order_type, item.multiple)">
                      终止操盘
                    </span>
                    <span v-if="outTime(item.end_time) != true"
                      @click="showAlert(4, item.id, item.order_type, item.multiple)">
                      追加保证金
                    </span>
                    <span v-if="item.order_type != 1 && outTime(item.end_time) != true"
                      @click="showAlert(1, item.id, item.order_type, item.multiple)">
                      扩大配资
                    </span>
                  </div>
                  <div class="right" v-if="item.status != 1 && item.status != 3">
                    <!-- 已到期, 已结束, 不显示股票登录 -->
                    <span 
                      v-if="outTime(item.end_time) == false && item.status != 4 && item.username !== '' && item.password !== ''"
                      @click="loginToStockSide(item)">
                      股票登录
                    </span>
                    <router-link :to="'/contract/'+item.id" tag="span">配资合同</router-link>
                  </div>
                </div>
              </div>
            </van-collapse-item>
          </van-collapse>
          <div v-if="noContent">
            <van-divider>我是有底线的</van-divider>
          </div>
        </div>
      </scroll>
    </div>
    <div v-else>
      <van-divider>暂无数据</van-divider>
    </div>
    <van-popup v-model="isShowPzAlert" round>
      <PzAlert @listenCloseAlert="listenCloseAlert" :postData="postData" :computedData="computedData"/>
    </van-popup>
  </div>
</template>

<script>
  import axios from "axios"
  import {mapGetters, mapActions} from "vuex"
  import PzAlert from './PzAlert'
  import Scroll from "@/components/common/scroll"

  export default {
    filters: {
      number(value) {
        var toFixedNum = Number(value).toFixed(2);
        return toFixedNum;
      }
    },
    components: {PzAlert, Scroll},
    props: ['curStatus'],
    data() {
      return {
        activeNames: '',
        noContent: false,
        isShowPzAlert: false,
        getOrderList: [],//list
        curServerTime: '',//服务器时间
        page: 1,
        page_size: 10,
        order_type: '',
        status: this.curStatus || '',   //	状态(1待审核、2审核通过、3审核失败，4操盘结束))空是全部
        create_start: '',//配资时间-起
        create_end: '',//配资时间-止
        end_time_start: '',//结束时间-起
        end_time_end: '',//结束时间-止
        // 发送给后台参数
        postData: {
          modifyType: '',
          orderId: ''
        },
        // 计算参数
        computedData: {
          order_type: '',
          multiple: ''
        }
      };
    },
    computed: {
      ...mapGetters(['getSettingBase']),
    },
    created() {
      this.getOrderFun()
    },
    methods: {
      ...mapActions(['getOrder', 'remainingPeriod', 'interestMoneybyend', 'getStockSignature']),

      // 登录股票交易端
      loginToStockSide(item) {
        if(!item.username || !item.password) return this.$Toast.fail(`用户名或密码无效`);

        const toast = this.$toast.loading({
          duration: 0,       // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          loadingType: 'spinner',
          message: '登录中'
        });

        this.getStockSignature({username: item.username, password: item.password})
          .then(res => {

            // 登录交易端 接口返回令牌后直接跳后台返回的URL 自动登录交易端
            if(res.code === 200){
              if(res.data.token && res.data.url){
                // 返回数据正常则带参数跳转 自动登录
                // window.location.href = `${res.data.url}?username=${item.username}&password=${item.password}&token=${res.data.token}`;
                window.location.href = `${res.data.url}`;
              }else{
                // 返回数据不正常或CODE异常 跳转后用户手动登录
                window.location.href = res.data.url;
              }
            }else{
              window.location.href = res.data.url;
            }
          })
          .catch(()=>{toast.clear();})

      },
      getOrderFun() {
        this.getOrder({
          page: this.page,//页码
          page_size: this.page_size,//每页数据量
          order_type: this.order_type || '',//订单类型(1免息2按天3按月4VIP)
          status: this.status || '',//状态(1待审核、2审核通过、3审核失败，4操盘结束))
          create_time_start: this.create_time_start || '',//配资时间-起
          create_time_end: this.create_time_end || '',//配资时间-止
          end_time_start: this.end_time_start || '',//结束时间-起
          end_time_end: this.end_time_end || ''//结束时间-止
        }).then(res => {
          if (res.code == 200) {
            this.curServerTime = res.data.server_time
            if (this.page == 1) {
              this.getOrderList = res.data.list
            } else {
              if (res.data.list.length <= 0) {
                this.noContent = true
                return this.$Toast.fail('没有更多数据')
              }
              this.getOrderList = [...this.getOrderList, ...res.data.list]
            }
          }
        })
      },
      // 上拉加载更多
      scrollEnd() {
        if(this.noContent) return;
        this.page++
        this.$store.commit('SHOW_LOADMORE', true)
        this.getOrderFun()
      },
      // 下拉刷新
      touchEnd() {
        this.$store.commit('RELEASE_REFRESH', false)
        this.page = 1
        this.$store.commit('TOP_REFRESH', true)
        this.getOrderFun()
      },
      // 显示释放刷新
      scroll() {
        this.$store.commit('RELEASE_REFRESH', true)
      },
      listenCloseAlert(data) {
        this.isShowPzAlert = data
      },
      showAlert(type, id, order_type, multiple) {
        this.isShowPzAlert = true
        // 发送请求参数
        this.postData.modifyType = type
        this.postData.orderId = id
        // 计算管理费参数
        this.computedData.order_type = order_type
        this.computedData.multiple = multiple
        // 扩大配资管理费(参数)
        if (type == 1) {
          this.remainingPeriod({orderId: id})
        }
        // 终止操盘(延期利息)&申请延期
        if (type == 5 || type == 2) {
          this.interestMoneybyend({orderId: id})
        }
      },
      // 操盘资金 = 本金(member_money) + 配资资金(credit_money)
      traderMoney(member_money, credit_money) {
        return member_money * 1 + credit_money * 1
      },
      // 计算当前 item 是否过期
      outTime(end_time) {
        // 当前 item 的时间
        let date = new Date(end_time)
        let dateTime = date.getTime()
        // 当前服务器时间
        let serverDate = new Date(this.curServerTime)
        let serverDateTime = serverDate.getTime()
        // 如果 item 的操盘时间小于 当前服务器时间 就说明当前单 已到期
        if (dateTime < serverDateTime) {
          return true
        } else {
          return false
        }
      }
    },
    mounted() {

    },
  }
</script>

<style lang="scss" scoped>
.font-left{
  display: inline-block;
  width: px2rem(150px);
}
.state {
  display: inline-block;
  padding: px2rem(8px) px2rem(10px);
  color: #fff;
  border-radius: 4px;
}

.ready {
  background: #199760;
}

.succee {
  background: #ff0000;
}

.fail {
  background: #666;
}

.end {
  background: #999;
}
  .pz-list {
    color: #333;
    .content-box {
      padding-bottom: px2rem(20px);
    }

    .van-popup--center.van-popup--round {
      border-radius: 10px;
    }

    .van-divider {
      margin: 0;
    }
  }

  .title {
    .title-top {
      border-bottom: px2rem(1px) solid $home-line-color;
      padding: px2rem(20px) px2rem(30px);
      .top-left {
        display: flex;
        align-items: center;
        margin-bottom: px2rem(20px);
        justify-content: space-between;
        .top-left-center {
          flex: 1;
          .font-info {
            font-size: px2rem(30px);
            font-weight: bold;
          }
          .number {
            color: #999;
          }
        }

        .btn {
          width: px2rem(126px);
          height: px2rem(52px);
          line-height: px2rem(52px);
          background: $home-color;
          text-align: center;
          color: #fff;
          border-radius: 4px;
        }
      }

      .time {
        display: flex;
        justify-content: space-between;
        .font-info {
          font-size: px2rem(30px);
          font-weight: bold;
        }

        .number {
          color: #999;
        }
      }
    }

    .title-bottom {
      padding: px2rem(20px) px2rem(30px);
      font-size: px2rem(28px);
    }
  }

  .title-item {
    display: flex;
    margin-bottom: px2rem(20px);

    .item {
      flex: 1;
    }

    .item span:first-child {
      color: rgb(102, 102, 102);
    }

    .item span:last-child {
      color: $home-color;
    }
  }

  .title-item:last-child {
    margin-bottom: 0;
  }

  .content {
    color: #333;
    font-size: px2rem(28px);
    .list {
      padding: 0 px2rem(30px) px2rem(20px);
      border-bottom: px2rem(1px) solid $home-line-color;
    }

    .btn-box {
      .left {
        float: left;
        box-sizing: border-box;
        width: px2rem(550px);
        height: px2rem(134px);
        padding-left: px2rem(30px);
        margin: px2rem(20px) 0;
        display: flex;
        flex-wrap: wrap;

        span {         
          color: $home-color;
          margin-right: px2rem(30px);
          height: px2rem(52px);
          line-height: px2rem(52px);
          margin-bottom: px2rem(30px);
        }
      }

      .right {
        float: right;
        box-sizing: border-box;
        padding-right: px2rem(30px);
        padding-left: px2rem(20px);
        margin: px2rem(20px) 0;
        height: px2rem(134px);
        width: px2rem(200px);
        display: flex;
        flex-wrap: wrap;

        span {
          width: 100%;
          height: px2rem(52px);
          line-height: px2rem(52px);
          text-align: center;
          color: #fff;
          border-radius: 5px;
        }

        span:first-child {
          background: #5da1f1;
          margin-bottom: px2rem(30px);
        }

        span:last-child {
          background: #feb834;
        }
      }
    }
  }
</style>
<style lang="scss">
  .pz-list {
    .van-collapse-item {
      margin-bottom: px2rem(20px);

      .van-cell {
        line-height: 1;
        padding: 0;
      }

      .van-cell:not(:last-child)::after {
        display: none;
      }

      .van-cell__right-icon {
        display: none;
      }

      .van-collapse-item__content {
        padding: 0;
        line-height: 1;
      }
    }

    .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after {
      border: none;
    }
  }
</style>
