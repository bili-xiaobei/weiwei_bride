import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
Vue.prototype.$axios = axios;
axios.defaults.baseURL = '/api';
import qs from 'qs';

// 清除标签默认样式
import '../public/css/reset.css';


Vue.config.productionTip = false


import {
  Button,
  NavBar,
  Tab,
  Tabs,
  Tabbar,
  TabbarItem,
  Lazyload,
  Swipe,
  SwipeItem,
  Image as VanImage,
  Grid,
  GridItem,
  PullRefresh,
  Search,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  SwitchCell,
  Popup,
  Cell,
  Picker,
  Icon,
  Card,
  SwipeCell,
  Stepper,
  SubmitBar,
  NoticeBar,
  List,
  Sku,
  RadioGroup, Radio,

} from 'vant';



Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Sku);
Vue.use(List);
Vue.use(NoticeBar);
Vue.use(SubmitBar);
Vue.use(SwipeCell);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Button);
Vue.use(NavBar);
Vue.use(Lazyload);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(VanImage);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(PullRefresh);
Vue.use(Search);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(SwitchCell);
Vue.use(Popup);
Vue.use(Cell);
Vue.use(Picker);
Vue.use(Icon);
Vue.use(Card);
Vue.use(Stepper);

Vue.use(Lazyload, {
  lazyComponent: true,
});



// -------------------------------------
Vue.prototype.qs = qs;
Vue.config.productionTip = false

//导入mintui模块
import MintUI from 'mint-ui';
//导入样式文件
import 'mint-ui/lib/style.min.css';
//通过Vue.use()方法将MintUI注册为插件
Vue.use(MintUI);

// ----------------------------------------




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')