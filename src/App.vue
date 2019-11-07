<template>
  <div id="app" class="unrem-app">
    <router-view />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "App",
  created () {
    //在页面加载时读取localStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
    }
    //在页面刷新时将vuex里的信息保存到localStorage里
    window.addEventListener("beforeunload",()=>{
        sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    })
    this.getAdvertisement({}) //轮播
  },
  methods: {
    ...mapActions(['getAdvertisement']),
  }
};
</script>

<style lang="scss" scoped>
@import 'assets/css/public.scss';
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;
}
.unrem-app{
  width: 100%;
  height: 100%;
  // max-width: 600px;
}
</style>
