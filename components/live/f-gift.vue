<template>
	<!-- 收到礼物 -->
	<list :show-scrollbar="false" style="width:520rpx;height:500rpx;background-color:rgba(255,255,255,.2);">
		<cell class="flex px-3 pt-3 align-center" v-for="i in 10" :key="i" insert-animation="default" delete-animation="default">
			<!-- 显示谁送的礼物 -->
			<view style="width:325rpx;background-image:linear-gradient(to right, #BCABB1, #65AAF0);" class="flex justify-between align-center rounded-circle">
				<view class="p">
					<image src="/static/tabbar/min.png" mode="" style="width:70rpx;height:70rpx;" class="rounded-circle"></image>
				</view>
				<view class="flex-1 flex-column justify-center align-start">
					<text class="text-white font">昵称</text>
					<text class="text-white font-sm">送蛋糕</text>
				</view>
				<view class="p">
					<image src="/static/gift/1.png" mode="" style="width:70rpx;height:70rpx;" class="rounded-circle"></image>
				</view>
			</view>
			<!-- 礼物数量 -->
			<text class="text-warning font-lg mx-1">X 12</text>
		</cell>
	</list>
</template>

<script>
	export default {
		data () {
			return {
				gifts: []
			}
		},
		onLoad () {
			setInterval(() => {
				
			},3000)
		}
	}
</script>

<style>
</style>
