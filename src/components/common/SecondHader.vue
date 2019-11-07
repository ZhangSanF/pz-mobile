<template>
  <div class="second-header">
    <div class="header">      
      <span class="left" @click="backPage" v-if="!$route.meta.showBack"><van-icon name="arrow-left" /></span>
      <span class="title">{{headerTitle}}</span>
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"

export default {
  props:['headerTitle'],
  methods: {
    backPage() {
      this.$router.back(-1)
    } 
  },
  data(){
    return {

    };
  },
  mounted(){
 
  },
  computed: {

  },
  watch: {

  }
}
</script>

<style lang="scss" scoped>
.header{
    height: px2rem(88px);
    position: relative;
    text-align: center;
    color: #fff;
    background: $home-color;
    line-height: px2rem(88px);
    z-index: 2015;
    .title{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: px2rem(400px);
      overflow: hidden;
      font-size: px2rem(32px);
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .left{
      position: absolute;
      top: 50%;
      left: px2rem(32px);
      transform: translate(0, -50%);
      font-size: px2rem(48px);
      .van-icon{
        vertical-align: middle;
      }
    }
    .right{
      font-size: px2rem(32px);
      position: absolute;
      top: 50%;
      right: 20px;
      transform: translate(0, -50%);
    }
  }
</style>