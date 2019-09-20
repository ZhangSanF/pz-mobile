<template>
  <scroll class="indexContent">
    <div class="Index">
    </div>
  </scroll>

</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Scroll from '../common/scroll'
export default {
  name: "quotes",
  data() {
    return {
    };
  },
  components: {Scroll},
  mounted() {
    this.$emit('tabChanged', 'home');
  },
  computed: {
    ...mapGetters([
    ]),
  },
  methods: {
  }
}; 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.vanSwipe {
  img {
    width: 100%;
    height: px2rem(300px); ;
  }
}
.Index {
  font-size: px2rem(20px);
}
.vanTabs {
  width: 100%;
}
.free{
  background-color: #198Ad9;
}
.day{
  background-color: #d91919;
}
.mouth{
  background-color: #ff8000;
}
.vip{
  background-color: #ff5d5d;
}

.indexContent {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  overflow: hidden;
}
</style>
