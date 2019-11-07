// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueClipboard from 'vue-clipboard2'//复制
import axios from "axios"

import { 
  Checkbox,DropdownMenu, DropdownItem,
  CheckboxGroup,Collapse, CollapseItem,
  Row, ActionSheet, Loading,
  Col, Divider, Area,
  Tag,
  Cell, 
  CellGroup,
  Picker ,Swipe, 
  SwipeItem, Lazyload,
  NoticeBar, Grid, 
  GridItem, Image, 
  Tab, Tabs, Tabbar,
  TabbarItem, Icon,
  NavBar, Button,
  Panel, Field,
  Popup,Notify,Toast ,Dialog, DatetimePicker } from "vant";

Vue.use(Swipe).use(SwipeItem);
Vue.use(Lazyload);
Vue.use(NoticeBar);
Vue.use(Grid).use(GridItem);
Vue.use(Image);
Vue.use(Tab).use(Tabs);
Vue.use(Tabbar).use(TabbarItem);
Vue.use(Icon);
Vue.use(NavBar);
Vue.use(Button);
Vue.use(Panel);
Vue.use(Field);
Vue.use(Popup);
Vue.use(Picker);
Vue.use(Cell).use(CellGroup);
Vue.use(Tag);
Vue.use(Row).use(Col);
Vue.use(Checkbox).use(CheckboxGroup);
Vue.use(DatetimePicker);
Vue.use(DropdownMenu).use(DropdownItem);
Vue.use(Collapse).use(CollapseItem);
Vue.use(ActionSheet);
Vue.use(Loading);
Vue.use(Divider);
Vue.use(Area);

Vue.use(VueClipboard);
Vue.prototype.$notify = Notify;
Vue.prototype.$Toast  = Toast ;
Vue.prototype.$Dialog  = Dialog ;
Vue.config.productionTip = false;

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
Vue.prototype.$http = axios;


import '@/assets/css/reset.scss'
import '@/assets/css/icon/iconfont.css'
import '@/assets/css/public.scss'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created() {
    // 判断是否登录
    store.dispatch('isLogin')
    // 获取基础数据
    store.dispatch('setting')
    //杠杆倍数
    store.dispatch('loansrate')
  },
  methods: {
    salcFontSize() {
      let width = window.innerWidth;
      if (width > 600) {
        width = 600;
      }
      document.getElementsByTagName('html')[0].style.fontSize = width / 10 + 'px';
    }
  },
  mounted() {
    this.$nextTick(() => {
      let self = this;
      window.addEventListener('resize', function () {
        self.salcFontSize();
      });
      this.salcFontSize();
    })
  }
})

