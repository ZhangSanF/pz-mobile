<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import { mapGetters, mapState } from 'vuex';
  export default {
    props: {
        /** * 1 滚动的时候会派发scroll事件，会截流。
            * 2 滚动的时候实时派发scroll事件，不会截流。
            * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件 */
      probeType: {
        type: Number,
        default: 2
      },
      eventPassthrough:{
        type: String,
        default: 'horizontal'
      },
      /** * 点击列表是否派发click事件 */
      click: {
        type: Boolean,
        default: true
      },
      /** * tap事件 */
      tap: {
        type: Boolean,
        default: false
      },
      /** * 是否开启横向滚动 */
      scrollX: {
        type: Boolean,
        default: false
      },
      scrollY: {
        type: Boolean,
        default: true
      },
      /** * 是否派发滚动事件 */
      listenScroll: {
        type: Boolean,
        default: false
      },
      /** * 列表的数据 */
      data: {
        type: [Array,Object],
        default: function(){
          return []
        }
      },
      /** * 是否派发滚动到底部的事件，用于上拉加载 */
      pullup: {
        type: Boolean,
        default: false
      },
      /** * 是否派发顶部下拉的事件，用于下拉刷新 */
      pulldown: {
        type: Boolean,
        default: false
      },
      /** * 是否派发列表滚动开始的事件 */
      beforeScroll: {
        type: Boolean,
        default: false
      },
      /** * 当数据更新后，刷新scroll的延时。 */
      refreshDelay: {
        type: Number,
        default: 20
      },
      type: {
        type: String,
        default: ''
      },
      scrollId: {
        type: String,
        default: ''
      }
    },
    computed: {

    },
    mounted() { // 保证在DOM渲染完毕后初始化better-scroll
      setTimeout(() => {
        this._initScroll()
      }, 100)
    },
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) {
          return
        }
        // console.log('初始化scroll')
        // better-scroll的初始化
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click,
          tap: this.tap,
          scrollX: this.scrollX,
          scrollY: this.scrollY,
          eventPassthrough: this.eventPassthrough
        })
        // 是否派发滚动事件
        if (this.listenScroll) {
          let me = this          
          this.scroll.on('scroll', (pos) => {
            this.scroll.hasVerticalScroll = true
            // console.log(pos)          
            if(pos.y > 20) {
              me.$emit('scroll', pos)
            }else {
              this.$store.commit('RELEASE_REFRESH', false)
            }
          })
        }
        // 是否派发滚动到底部事件，用于上拉加载
        if (this.pullup) {
          this.scroll.on('scrollEnd', () => {
            // 滚动到底部
            if(this.scroll.maxScrollY == 0) return
            if (this.pullup && this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              this.$emit('scrollToEnd')
            }
          })
        }
        // 是否派发顶部下拉事件，用于下拉刷新
        if (this.pulldown) {
          this.scroll.on('touchEnd', (pos) => {
            // console.log(pos)
            // 下拉动作           
            if (pos.y > 20) {
              this.$emit('topRefresh')
            }
          })
        }
        // 是否派发列表滚动开始的事件
        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          })
        }
      }, disable() {
        // 代理better-scroll的disable方法
        this.scroll && this.scroll.disable()
      },
      enable() {
        // 代理better-scroll的enable方法
        this.scroll && this.scroll.enable()
      },
      refresh() {
        // 代理better-scroll的refresh方法
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {
        // 代理better-scroll的scrollTo方法
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        // 代理better-scroll的scrollToElement方法
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch: {
      // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
      data() {
        setTimeout(() => {
          this.refresh()
        }, 500)
      },
      type() {
        setTimeout(() => {
          this._initScroll()
        }, this.refreshDelay)
      },
      
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
