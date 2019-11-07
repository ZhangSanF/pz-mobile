<template>
  <div class="message-info">
      <div  style="background: #fff;">
          <van-collapse v-model="activeNames">
            <van-collapse-item :name="index" v-for="(item, index) in resData" :key="index" @click.native="changeState(index, item.read_status, item.id)">
                <div slot="title" class="title">
                    <p class="list-box">
                        <span class="left-box">
                            <span class="state" v-show="item.read_status == '0'"></span>
                            <span class="title-font" :style="{paddingLeft: item.read_status == '0' ? '15px' : ''}">系统通知</span>
                        </span>
                        <span class="info">{{item.create_time}}</span>
                    </p>
                    <p class="info">{{item.title}}</p>
                </div>
                <div class="content">{{item.content}}</div>
            </van-collapse-item>
        </van-collapse>
      </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
    props: [ 'resData' ],
    data() {
        return {
            activeNames: [], 
        }
    },
    created() {

    },
    methods: {
        ...mapActions(['internalMessageStatus']),
        changeState(index, read_status, id) {
            if(read_status == '1') {
                return
            }
            this.internalMessageStatus({id: id}).then((res) => {
                if(res.code == 200) {
                    this.resData[index].read_status = '1'
                }
            }) 
        }
    }
}
</script>

<style lang="scss" scoped>
.list-box{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: px2rem(20px);
}
.left-box{
    position: relative;  
}
.title-font{
    font-weight: bold;
}
.message-info{
    margin-top: px2rem(20px);
    .title{
        font-size: px2rem(34px);
        padding: px2rem(30px) 0 px2rem(20px);
        color: #333;
        .state{
            position: absolute;
            top: 50%;
            transform: translate(0, -50%);
            display: inline-block;
            width: px2rem(14px);
            height: px2rem(14px);
            background: $home-color;
            border-radius: 50%;
            margin-right: px2rem(10px);
        }
        .info{
            color: #999;
            font-size: px2rem(30px);
        }
    }
    .content{
        padding-bottom: px2rem(30px);
        color: #999;
    }
}
</style>
<style lang="scss">
.message-info{
    .van-cell{
        padding: 0;
    }
    .van-cell__right-icon{
        display: none;
    }
    .van-cell:not(:last-child)::after{
        display: none;
    }
    .van-collapse-item__content{
        padding: 0;
    }
    .van-collapse-item{
        padding: 0 px2rem(20px);
    }
}
</style>