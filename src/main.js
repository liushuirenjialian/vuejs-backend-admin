// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../static/css/bootstrap.min.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import {ereaseTokenFromStorage, fetchToken} from './common/tools';

import '../static/css/index.css';
import '../static/css/reset.css';
import '../static/css/invalid.css';
import '../static/css/AdminLTE.min.css';
import '../static/css/style.css';
import '../static/css/font-awesome.min.css';
import '../static/js/adminlte.min.js';
import '../static/js/bootstrap.min.js';
//注册全局方法
import util from './common/util';
Vue.use(util);


Vue.use(ElementUI);


Vue.config.productionTip = false


router.beforeEach((to, from, next) => {
  document.title = '股宝网|' + to.name;
  if (to.path == '/login') {
    ereaseTokenFromStorage()
  }
  if (!fetchToken() && to.path != '/login') {
    next({path: '/login'})
  } else {
    next()
  }
});


new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

