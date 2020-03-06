// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import ELEMENT from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import './assets/font/font-icon/iconfont.css';
import Vue from 'vue'
import App from './App'

import router from './router'
import store from './store/index';
import Axios from 'axios';

// 给axios简单封装
if (window.localStorage.getItem('token')) {
  Axios.defaults.headers.common['Authorization'] = window.localStorage.getItem('token');
}
Vue.prototype.$axios = Axios;


Vue.config.productionTip = false
Vue.use(ELEMENT);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
