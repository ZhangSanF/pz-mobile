<template>
  <div class="tradingRecord">
      <SecondHader headerTitle="交易记录"/>
      <scroll class="user-container" :click="false" :data="scrollDatas">
          <div>
              <ul class="card-box">
                  <li class="list" v-for="(item, index) in curData.rows" :key="index">
                      <div class="item">
                          <span class="title">交易类型<span class="info">{{item.cn_type}}</span></span>                        
                      </div>
                      <div class="item">
                          <span class="title">交易详情<span class="info">{{item.remark}}</span></span>                          
                      </div>
                      <div class="item">
                          <span class="title">管理费<span class="info g-info money">{{item.gift_change_money}}</span></span>                          
                      </div>
                      <div class="item">
                          <span class="title">变动金额<span class="info money">{{item.change_money}}</span></span>                         
                      </div>
                      <div class="item">
                          <span class="title">账户余额<span class="info money">{{item.available_money}}</span></span>
                          <span class="date">{{item.create_time}}</span>
                      </div>
                  </li>
              </ul>
          </div>
      </scroll>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import SecondHader from "@/components/common/SecondHader"
import Scroll from "@/components/common/scroll"

export default {
    components: { Scroll, SecondHader },
    data() {
        return {
            scrollDatas: [],
            start_time: '',// 开始时间
            end_time: '',// 结束时间
            quick_time: '-1',// 快选时间(全部-1，近一周1，一个月2，三个月3)
            type: '-1',// 交易类型(充值1，全部-1)
            page: 1,// 页码
            page_size: 10,// 每页数量
            range: [new Date(),new Date()],
            dealDate: [
                {name: '全部', value: '-1'},
                {name: '最近七天', value: '1'},
                {name: '1个月', value: '2'},
                {name: '3个月', value: '3'}
            ],
            dealType: [
                {name: '全部', value: '-1'},
                {name: '充值', value: '1'} 
            ],
            curData: []
        }
    },
    created() {
        this.transacTionrecordFun(this.start_time, this.end_time, this.quick_time, this.type, this.page, this.page_size)
    },
    methods: {
        ...mapActions(['transacTionrecord']),
        transacTionrecordFun(start_time, end_time, quick_time, type, page, page_size) {
            this.transacTionrecord({
                start_time: start_time,
                end_time: end_time,
                quick_time: quick_time,
                type: type,
                page: page,
                page_size: page_size
            }).then((res) => {
                if(res.code == 200) {
                    this.curData = res.data
                    // console.log(this.curData)
                }
            })
        },
        // 选择交易日期
        changeTime(value) {
            this.quick_time = value
        },
        // 选择交易类型
        changeType(value) {
            this.type = value
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.scrollDatas = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        });
    },
}
</script>

<style lang="scss" scoped>
.card-box{
    padding: px2rem(20px);
    .list{
        background: #fff;
        border-radius: 5px;
        padding: px2rem(20px);
        font-size: px2rem(22px);
        margin-bottom: px2rem(20px);
        .item{
            margin-bottom: px2rem(20px);
            display: flex;
            align-items: center;
            justify-content: space-between;
            .title{
                color: #333;
            }
            .info{
                font-size: px2rem(20px);
                color: #999;
                padding-left: px2rem(32px);
            }
            .g-info{
                padding-left: px2rem(56px);
            }
            .money{
                color: #fd591e;
            }
            .date{
                color: #333;
                font-size: px2rem(20px); 
            }
        }
        .item:last-child{
            margin-bottom: 0;
        }
    }
}
</style>