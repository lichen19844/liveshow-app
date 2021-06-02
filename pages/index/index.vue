<template>
	<view>
		<!-- 轮播图 -->
		<!-- 给加载图片添加一个容器，防止网络延时导致的页面抖动塌陷 -->
		<view style="overflow:hidden;width:750rpx;height:0;padding-bottom:250rpx;background-image:linear-gradient(to right, #BCABB1, #65AAF0);" class="bg-light">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="200" style="width: 100%;height: 250rpx;">
				<swiper-item>
					<image src="../../static/demo/banner/1.jpg" style="width: 100%;height: 100%;" mode=""></image>
				</swiper-item>
				<swiper-item>
					<image src="../../static/demo/banner/2.jpg" style="width: 100%;height: 100%;" mode=""></image>
				</swiper-item>
			</swiper>
		</view>
		
		<!-- 列表 -->
		<view class="flex flex-wrap">
			<!-- <view style="width:375rpx;height: 375rpx;padding: 5rpx;box-sizing: border-box;position: relative;"> -->
			<!-- 样式抽离 -->
			<view class="list-item" v-for="i in 10" :key="i" @click="openLive">
				<!-- 给加载图片添加一个容器，防止网络延时导致的页面抖动塌陷 -->
				<view style="overflow:hidden;width:360rpx;height:0;padding-bottom:360rpx;background-image:linear-gradient(to right, #BCABB1, #65AAF0);" class="rounded bg-light">
					<image src="../../static/demo/5.jpeg" style="width:100%;height:360rpx;" class="rounded" mode="aspectFill"></image>
				</view>
				<view class="rounded-circle px-2 flex align-center" style="position: absolute;left: 15rpx;top: 15rpx;background-color: rgba(0,0,0,.4);">
					<text class="iconfont iconbizhongguanli text-warning mr-1"></text>
					<text class="text-white font">0</text>
				</view>
				<view class="rounded-circle px-2 flex align-center" style="position: absolute;right: 15rpx;top: 15rpx;background-color: rgba(0,0,0,.4);">
					<text class="font-sm text-white">人气：</text>
					<text class="text-white font-sm">0</text>
				</view>
				<view class="rounded-circle flex align-center" style="position: absolute;left: 15rpx;bottom: 15rpx;">
					<text class="text-white font">标题</text>
				</view>
				<view class="rounded-circle px-2 flex align-center" style="position: absolute;right: 15rpx;bottom: 20rpx;background-color: rgba(0,0,0,.4);">
					<text style="width: 20rpx;height: 20rpx;" class="rounded-circle bg-danger mr-1"></text>
					<text class="text-white font-sm">已结束</text>
				</view>
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
		onLoad() {

		},
		methods: {
			openLive () {
				uni.navigateTo({
					url: '../live/live'
				})
			}
		}
	}
</script>

<style>
		.list-item {
			width:375rpx;height: 375rpx;padding: 5rpx;box-sizing: border-box;position: relative;
		}
</style>
