<template>
	<view>
		<!-- 登录	注册 -->
		<view class="p-3 flex align-center justify-center">
			<view class="bg-main rounded p-3 flex align-center justify-center flex-1" hover-class="bg-main-hover" @click="logout">
				<text class="text-white font-md">退出登录</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			logout() {
				// console.log('退出登录')
				this.$store.dispatch('logout').then(res => {
					uni.navigateBack({
						delta: 1
					})
				})
			}
		}
	}
</script>

<style>

</style>
