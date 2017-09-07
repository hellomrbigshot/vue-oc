// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.config.productionTip = false

// 进度条组件
NProgress.inc(0.2)
NProgress.configure({easing: 'ease', speed: 500, showSpinner: false})
Vue.use(Vuex)
Vue.use(ElementUI)
Vue.use(VueAxios, axios)

router.beforeEach((to, from, next) => {
	NProgress.start();
	if(to.path == '/login') {
		sessionStorage.removeItem('oc_user');
	}
	let user = JSON.parse(sessionStorage.getItem('oc_user'))
	if(!user && to.path != '/login' && to.path != '/register') {
		next({path: '/login'})
	} else {
		next();
	}
})
router.afterEach(() => {
	NProgress.done()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
