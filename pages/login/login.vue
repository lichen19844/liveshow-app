<template>
	<view>
		<!-- logo -->
		<view class="flex align-center justify-center" style="height:350rpx;">
			<text style="font-size:50rpx;">YOU-LOGO</text>
		</view>
		<!-- 输入框 -->
		<view class="px-3">
			<input type="text" v-model="form.username" class="bg-light px-3 mb-3 font" placeholder="请输入用户名" style="height:100rpx;" />
			<input type="text" v-model="form.password" class="bg-light px-3 mb-3 font" placeholder="请输入密码" style="height:100rpx;" />
			<input v-if="type !== 'login'" type="text" v-model="form.repassword" class="bg-light px-3 mb-3 font" placeholder="请输入确认密码" style="height:100rpx;" />
		</view>
		<!-- 登录	注册 -->
		<view class="p-3 flex align-center justify-center">
			<view class="bg-main rounded p-3 flex align-center justify-center flex-1" hover-class="bg-main-hover" @click="submit">
				<text class="text-white font-md">{{ type === 'login' ? '登 录' : '注 册' }}</text>
			</view>
		</view>
		<!-- 切换登录注册 -->
		<view class=" flex align-center justify-center">
			<text class="text-light-muted font p-2" @click="changeType">{{ type === 'login' ? '注 册' : '登 录' }}</text>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: "login",
				form: {
					username: '',
					password: '',
					repassword: ''
				}
			}
		},
		methods: {
			changeType() {
				this.type = this.type === 'login' ? 'reg' : 'login'
			},
			submit() {
				let msg = this.type === 'login' ? '登录' : '注册'
				this.$H.post('/' + this.type, this.form).then(res => {
					// console.log(res)
					uni.showToast({
						title: msg + '成功',
						icon: 'none'
					});
					if(this.type === 'reg') {
						// 注册成功后直接跳转到登录页并清空输入框
						this.changeType()
						this.form = {
							username: '',
							password: '',
							repassword: ''
						}
					} else {
						// 登录成功后，顺便使用vuex的方法接收要存的数据，做进一步处理
						this.$store.dispatch('login', res)
						uni.navigateBack({
							delta: 1
						})
					}
				})
			}
		}
	}
</script>

<style>

</style>
