import Vue from 'vue';
import Vuex from 'vuex';
import $H from '../common/request.js'
import $C from '../common/config.js';
import io from '../common/uni-socket.io.js'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		// ceshi: 123
		user: null,
		token: null,
		socket: null,
	},
	actions: {
		// 连接socket
		connectSocket({state, dispatch}) {
			// 连接后台服务器
			// const SKT = io($C.socketUrl_one, {
			const SKT = io($C.socketUrl_two, {
				// 传参
				query: {},
				// 固定写法
				transports: ['websocket'],
				// 延时
				timeout: 5000
			});
			
			// 全局通知的回调
			// e接收onlineEvent函数拿到的数据
			let onlineEvent = (e) => {
				// 通过uniapp的emit和on机制传递数据
				uni.$emit('live', 
				// 自定义传参
				{
					type: 'online',
					// 拿到数据
					data: e
				})
			};
			
			let commentEvent = (e) => {
				// 通过uniapp的emit和on机制传递数据
				uni.$emit('live', 
				// 自定义传参
				{
					type: 'comment',
					// 拿到数据
					data: e
				})
			};
			
			let giftEvent = (e) => {
				console.log('gift e', e)
				uni.$emit('live',
				{
					type: 'gift',
					data: e
				})
			};
			
			// 监听连接
			SKT.on('connect', () => {
				console.log('已连接')
				// 测试推送消息到后端
				// SKT.emit('test', {test: 1234567})
				// 连接成功后会自动生成一个唯一的socket的ID
				// console.log(SKT.id)
				
				// 存入state
				state.socket = SKT
				const { id } = SKT
				console.log('socket id', id)
				
				// socket.io通过连接的唯一id，接收后端传过来的数据，可以监控这个id实现点对点通讯
				// 拿到监听后返回的数据，在前端展示
				SKT.on(id, res => {
					console.log('SKT return res', res)
					let d = res.data
					// console.log(d)
					if(d.action === 'error') {
						let msg = d.payload
						if(res.meta.notoast) {
							return
						}
						return uni.showToast({
							title: msg,
							icon: 'none'
						})
					}
				});
				
				// 监听直播中的直播间在线用户信息
				// SKT.on('online', (e) => {
				// 	console.log('online info', e)
				// 	// 要拿e数据
				// 	uni.$emit('live', { data: e })
				// })
				// 注册onlineEvent函数方法，后端socket接收来的数据传递到onlineEvent函数
				SKT.on('online', onlineEvent);
				
				// 监听评论
				SKT.on('comment', commentEvent);
				
				// 监听送礼物
				SKT.on('gift', giftEvent);
				
			});
			
			// 移除监听事件
			const removeListener = () => {
				if(SKT) {
					SKT.removeListener('online', onlineEvent)
					SKT.removeListener('comment', commentEvent)
					SKT.removeListener('gift', giftEvent)
				}
			};
			
			// 监听失败
			SKT.on('error', (e) => {
				console.log('连接失败', e)
				removeListener()
				// 一旦发现连接失败，就清空state.socket
				state.socket = null
				console.log('连接失败')
			});
			
			// 监听断开
			SKT.on('disconnect', () => {
				removeListener()
				// 一旦发现连接断开，就清空state.socket
				state.socket = null
				console.log('连接断开')
			});
		},
		
		// 权限验证后才能使用某些功能方法
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
			$H.post(
				'/logout', 
				{}, 
				{
					token: true,
					toast: false
				},
			)
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
			// user.avatar = $C.imageUrl_one + user.avatar
			user.avatar = $C.imageUrl_two + user.avatar
			console.log('online user', user)
			state.user = user
			state.token = user.token
			// 储存在本地
			uni.setStorageSync('user', JSON.stringify(user))
			uni.setStorageSync('token', user.token)
		},
		
		// 登录后实时获取数据库里随用户操作而变化的用户数据
		getUserInfo({ state }) {
			$H.get(
			'/user/info', 
				{
					token: true,	// 需要传token
					noJump: true,	// 获取不到token时不需要跳转登录页
					toast: false	// 获取不到token时不显示服务端失败提示
				}).then(res => {
					console.log('getUserInfo', res)
					// 覆盖state和本地储存
					// res.avatar = $C.imageUrl_one + res.avatar
					res.avatar = $C.imageUrl_two + res.avatar
					state.user = res
					uni.setStorage({
						key: 'user',
						data: JSON.stringify(state.user)
					})
				}
			)
		}
	}
})