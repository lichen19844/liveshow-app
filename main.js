import Vue from 'vue'
import App from './App'
import $H from './common/request.js';
Vue.prototype.$H = $H

import store from './store/index.js';
Vue.prototype.$store = store

// 权限验证后才能跳转页面
Vue.prototype.authJump = (options) => {
	if(!store.state.token) {
		uni.showToast({
			title: '请先登录',
			icon: 'none'
		});
		return uni.navigateTo({
			url: '/pages/login/login'
		})
	}
	uni.navigateTo(options)
}

// 权限验证后才能使用某些功能方法，移到store中处理，因为nvue目前用不了vue原型挂载方法功能

// Vue.prototype.authMethod = (callback) => {
// 	if(!store.state.token) {
// 		uni.showToast({
// 			title: '请先登录',
// 			icon: 'none'
// 		});
// 		return uni.navigateTo({
// 			url: '/pages/login/login'
// 		})
// 	}
// 	callback()
// }

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
		store,
    ...App
})
app.$mount()
