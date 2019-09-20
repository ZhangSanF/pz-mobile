// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueClipboard from 'vue-clipboard2'//复制
import 'vue-area-linkage/dist/index.css'; // v2 or higher
import VueAreaLinkage from 'vue-area-linkage';

import { 
  Checkbox,DropdownMenu, DropdownItem,
  CheckboxGroup,Collapse, CollapseItem,
  Row, ActionSheet, Loading,
  Col, 
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

Vue.use(VueClipboard);
Vue.use(VueAreaLinkage);

Vue.prototype.$notify = Notify;
Vue.prototype.$Toast  = Toast ;
Vue.prototype.$Dialog  = Dialog ;
Vue.config.productionTip = false

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

