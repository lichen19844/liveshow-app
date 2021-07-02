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
			<!-- <view class="list-item" v-for="i in 10" :key="i" @click="openLive"> -->
			<view class="list-item" v-for="(item, index) in list" :key="index" @click="openLive(item.id)">
				<!-- 给加载图片添加一个容器，防止网络延时导致的页面抖动塌陷 -->
				<view style="overflow:hidden;width:360rpx;height:0;padding-bottom:360rpx;background-image:linear-gradient(to right, #BCABB1, #65AAF0);" class="rounded bg-light">
					<image :src="item.cover || '../../static/demo/5.jpeg'" style="width:100%;height:360rpx;" class="rounded" mode="aspectFill"></image>
				</view>
				<view class="rounded-circle px-2 flex align-center" style="position: absolute;left: 15rpx;top: 15rpx;background-color: rgba(0,0,0,.4);">
					<text class="iconfont iconbizhongguanli text-warning mr-1"></text>
					<text class="text-white font">{{item.coin}}</text>
				</view>
				<view class="rounded-circle px-2 flex align-center" style="position: absolute;right: 15rpx;top: 15rpx;background-color: rgba(0,0,0,.4);">
					<text class="font-sm text-white">人气：</text>
					<text class="text-white font-sm">{{item.look_count}}</text>
				</view>
				<view class="rounded-circle flex align-center" style="position: absolute;left: 15rpx;bottom: 15rpx;">
					<text class="text-white font">{{item.title}}</text>
				</view>
				<view class="rounded-circle px-2 flex align-center" style="position: absolute;right: 15rpx;bottom: 20rpx;background-color: rgba(0,0,0,.4);">
					<text style="width: 20rpx;height: 20rpx;" class="rounded-circle mr-1" :class="item.status | lightStatus"></text>
					<text class="text-white font-sm">{{item.status | formatStatus }}</text>
				</view>
			</view>
		</view>
		
		<view class="f-divider"></view>
		<view class="flex align-center justify-center py-3">
			<text class="font-md text-secondary">{{loadText}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				list: [],
				loadText: '上拉加载更多'
			}
		},
		filters: {
			formatStatus(value) {
				let o = {
					0: '未开始',
					1: '直播中',
					2: '暂停',
					3: '已结束'
				}
				return o[value]
			},
			lightStatus(value) {
				let o = {
					0: 'bg-warning',	// 未开始
					1: 'bg-success',	// 直播中
					2: 'bg-secondary',	// 暂停
					3: 'bg-danger'	// 已结束
				}
				return o[value]
			}
		},
		onLoad() {
			this.getData()
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.page = 1
			this.getData().then(res => {
				uni.showToast({
					title: '刷新成功',
					icon: 'none'
				})
				uni.stopPullDownRefresh()
			}).catch(err => {
				uni.stopPullDownRefresh()
			})
		},
		onReachBottom() {
			// console.log('触底')
			// 要么还处于‘加载中’要么处于'没有更多'，说明没必要请求数据了，直接终止
			if(this.loadText !== '上拉加载更多') {
				return
			}
			this.loadText = '加载中'
			this.page++
			this.getData()
		},
		methods: {
			// 获取直播间列表
			getData() {
				let page = this.page
				return this.$H.get('/live/list/' + page).then(res => {
					// console.log('liveroom list', res)
					// 在原有数据上叠加
					this.list = page === 1 ? res : [...this.list, ...res]
					// if(page === 1) {
					// 	this.list = res
					// } else {
					// 	let _t = this
					// 	setTimeout(
					// 		function() { _t.list = [..._t.list, ...res]}, 
					// 	1000);
					// }
					this.loadText = res.length < 10 ? '没有更多了' : '上拉加载更多'
				}).catch(err => {
					// 加载失败，说明处于‘上拉加载更多’状态，需要退一页
					if(this.page > 1) {
						page--
						this.loadText = '上拉加载更多'
					}
				})
			},
			openLive (id) {
				uni.navigateTo({
					url: '../live/live?id=' + id
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
