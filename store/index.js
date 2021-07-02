import Vue from 'vue';
import Vuex from 'vuex';
import $H from '../common/request.js'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		// ceshi: 123
		user: null,
		token: null,
	},
	actions: {
		// // 权限验证后才能使用某些功能方法
		authMethod({state}, callback) {
			if(!state.token) {
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				});
				return uni.navigateTo({
					url: '/pages/login/login'
				})
			}
			callback()
		},
		
		// 初始化用户登录状态
		initUser({state}) {
			let u = uni.getStorageSync('user')
			let t = uni.getStorageSync('token')
			// 存入state
			if(u) {
				state.user = JSON.parse(u)
				state.token = t
			}
		},
		// 退出登录
		logout({ state }) {
			$H.post('/logout', {}, {
				token: true,
				toast: false
			})
			// 移除vuex和本地储存
			state.user = null
			state.token = null
			uni.removeStorageSync('user')
			uni.removeStorageSync('token')
		},
		
		// 登录时获取用户信息
		login({state}, user) {
			console.log('user', user)
			// 储存在vuex
			state.user = user
			state.token = user.token
			// 储存在本地
			uni.setStorageSync('user', JSON.stringify(user))
			uni.setStorageSync('token', user.token)
		},
		// 登录后实时获取数据库里随用户操作而变化的用户数据
		getUserInfo({ state }) {
			$H.get('/user/info', {
				token: true,	// 需要传token
				noJump: true,	// 获取不到token时不需要跳转登录页
				toast: false	// 获取不到token时不显示服务端失败提示
			}).then(res => {
				// console.log('getUserInfo', res)
				// 覆盖state和本地储存
				state.user = res
				uni.setStorage({
					key: 'user',
					data: JSON.stringify(state.user)
				})
			})
		}
	}
})