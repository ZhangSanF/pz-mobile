<template>
  <div class="website-notice">
    <SecondHader headerTitle="网站公告"/>
    <scroll class="user-container-m" :click="false" :data="getAnnouncement" :pullup="true" @scrollToEnd="scrollEnd">
      <ul class="ul-box">
        <li class="list-item" 
        @click="toAnnouncementInfo(item.id)"
        v-for="(item, index) in getAnnouncement" 
        :key="index">
          <p class="title">{{item.title}}</p>
          <span class="font_family icon-youjiantou icon-style"></span>
        </li>
      </ul>
    </scroll>
    <div class="loading-style" v-if="getShowLoadMore">
      <van-loading color="#FD591E" size="24px"><span style="color:#FD591E">加载中...</span></van-loading>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import Scroll from "@/components/common/scroll"
import SecondHader from "@/components/common/SecondHader"

export default {
  components: { Scroll, SecondHader },
  data() {
    return {
      getAnnouncement: [],
      actionData: {
        page: 1,
        page_size: 20,
        category_identification: 'announcement'
      }
    }
  },
  created() {
    this.getAboutUsListFun()
  },
  methods: {
    ...mapActions(['getAboutUsList']),
    toAnnouncementInfo(id) {
      this.$router.push({path: '/articleInfo', query: {id: id}})
    },
    getAboutUsListFun() {
      this.getAboutUsList(this.actionData).then(res => {
        if(res.code == 200) {
          if(this.actionData.page == 1) {
            this.getAnnouncement = res.data.rows
          }else {
            if(res.data.rows.length <= 0) return this.$Toast.fail('没有更多数据')
            this.getAnnouncement = [...this.getAnnouncement, ...res.data.rows]
          }
        }
      })
    },
    scrollEnd() {
      this.actionData.page++
      this.$store.commit('SHOW_LOADMORE', true)
      this.getAboutUsListFun()
    }
  },
  mounted() {

  },
  computed: {
    ...mapGetters(["getShowLoadMore"]),
  }
}
</script>

<style lang="scss" scoped>
.loading-style{
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 100;
}
.website-notice{
  .ul-box{      
    background: #fff;
    .list-item{
      margin-left: px2rem(30px);
      display: flex;
      justify-content: space-between;
      padding: px2rem(20px) px2rem(30px) px2rem(20px) 0;
      border-bottom: px2rem(1px) solid $home-line-color;
      align-items: center;
      font-size: px2rem(26px);
      .title{
        width: px2rem(550px);
        height: px2rem(38px);
        line-height: px2rem(38px);
        color: #333;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .icon-style{
        color: #999;
        font-size: px2rem(20px);
      }
    }   
    .list-item:last-child{
      border-bottom: none;
    }     
  }
}
</style>