// import $store from '@/store/index.js';
import $C from './config.js';
export default {
	// 全局配置
	common: {
		// #ifndef H5
		// baseUrl: "http://127.0.0.1:7001",
		baseUrl: $C.baseUrl + "/api",
		// #endif
		// #ifdef H5
		// baseUrl: "/api",
		// #endif
		header: {
			'Content-Type': 'application/json;charset=UTF-8',
		},
		data: {},
		method: 'GET',
		dataType: 'json',
		token: false
	},
	// 请求 返回promise
	request(options = {}) {
		// 组织参数
		options.url = this.common.baseUrl + options.url
		options.header = options.header || this.common.header
		options.data = options.data || this.common.data
		options.method = options.method || this.common.method
		options.dataType = options.dataType || this.common.dataType
		options.token = options.token === true ? true : this.common.token

		// 请求
		return new Promise((res, rej) => {
			// 请求之前验证...
			// token验证
			if (options.token) {
				let token = uni.getStorageSync('token')
				// 二次验证
				if (!token && options.noJump !== true) {	// 如果 没有token  并且 需要跳转，  不传noJump=true代表需要跳转，则触发以下方法
					uni.showToast({
						title: '请先登录',
						icon: 'none'
					});
					// token不存在时跳转
					uni.navigateTo({
						url: '/pages/login/login',
					});
					return rej("请先登录")
				}
				// 往header头中添加token
				options.header.token = token
			}

			// 请求中...
			uni.request({
				...options,
				success: (result) => {
					// 返回原始数据
					if (options.native) {
						return res(result)
					}
					// 服务端失败
					if (result.statusCode !== 200) {
						if (options.toast !== false) {
							uni.showToast({
								title: result.data.data || '服务端失败',
								icon: 'none'
							});
						}
						// token不合法，直接退出登录
						if (result.data.data === 'Token 令牌不合法!') {
							// 退出登录操作
							// $store.dispatch('logout')
						}
						return rej(result.data)
					}
					// 其他验证...
					// 成功
					let data = result.data.data
					res(data)
				},
				fail: (error) => {
					uni.showToast({
						title: error.errMsg || '请求失败',
						icon: 'none'
					});
					return rej(error)
				}
			});
		})
	},
	// get请求
	get(url, options = {}) {
		options.url = url
		options.data = {}
		options.method = 'GET'
		return this.request(options)
	},
	// post请求
  // data是所提交数据，最终归并到options
	post(url, data = {}, options = {}) {
		options.url = url
		options.data = data
		options.method = 'POST'
		return this.request(options)
	},
	// delete请求
	del(url, data = {}, options = {}) {
		options.url = url
		options.data = data
		options.method = 'DELETE'
		return this.request(options)
	},
	// 上传文件
	upload(url, data, onProgress = false) {
		return new Promise((result, reject) => {
			// 上传
			let token = uni.getStorageSync('token')
			if (!token) {
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				});
				// token不存在时跳转
				return uni.reLaunch({
					url: '/pages/login/login',
				});
			}

			const uploadTask = uni.uploadFile({
				url: this.common.baseUrl + url,
				filePath: data.filePath,
				name: data.name || "files",
				header: {
					token
				},
				formData: data.formData || {},
				success: (res) => {
					if (res.statusCode !== 200) {
						result(false)
						return uni.showToast({
							title: '上传失败',
							icon: 'none'
						});
					}
					let message = JSON.parse(res.data)
					result(message.data);
				},
				fail: (err) => {
					console.log(err);
					reject(err)
				}
			})

			uploadTask.onProgressUpdate((res) => {
				if (typeof onProgress === 'function') {
					onProgress(res.progress)
				}
			});

		})
	}
}
