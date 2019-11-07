<template>
  <div>
    <ul class="popup-box" v-if="marker === 'autoPay'">
      <li  v-for="(item, index) in fatherData" :key="index" @click="changeBank(item.text)" class="bank-list-item">
        {{item.text}}
      </li>
    </ul>
    <ul class="popup-box" v-if="marker === 'addBank'">
      <li  v-for="(item, index) in fatherData" :key="index" @click="changeBank(item)" class="bank-list-item">
        {{item}}
      </li>
    </ul>
    <ul class="popup-box" v-if="marker === 'user'">
      <li  v-for="(item, index) in fatherData" :key="index" @click="changeBank(item.value)" class="bank-list-item">
        {{item.text}}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"

export default {
    props: ['fatherData', 'marker'],
    data() {
        return {

        }
    },
    methods: {
        changeBank(text) {
          this.$emit('eimtChange', text)
        }
    },
}
</script>

<style scoped lang="scss">
.bank-list-item{
  box-sizing: border-box;
  font-size: px2rem(30px);
  margin-left: px2rem(30px);
  height: px2rem(80px);
  line-height: px2rem(80px);
  border-bottom: px2rem(1px) solid $home-line-color;
}
</style>