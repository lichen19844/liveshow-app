<template>
	<!-- 收到礼物 -->
	<list :show-scrollbar="false" style="width:520rpx;height:500rpx;">
		<cell class="flex px-3 pt-3 align-center" v-for="(item, index) in gifts" :key="index" insert-animation="default" delete-animation="default" :ref="'item'+index">
			<!-- 显示谁送的礼物 -->
			<view style="width:325rpx;background-image:linear-gradient(to right, #BCABB1, #65AAF0);" class="flex justify-between align-center rounded-circle">
				<view class="p">
					<image :src="item.avatar || defaultAvatar" mode="" style="width:70rpx;height:70rpx;" class="rounded-circle"></image>
				</view>
				<view class="flex-1 flex-column justify-center align-start">
					<text class="text-white font">{{item.username}}</text>
					<text class="text-white font-sm">送{{item.gift_name}}</text>
				</view>
				<view class="p">
					<image :src="item.gift_image" mode="" style="width:70rpx;height:70rpx;" class="rounded-circle"></image>
				</view>
			</view>
			<!-- 礼物数量 -->
			<text class="text-warning font-lg mx-1">X {{item.num}}</text>
		</cell>
	</list>
</template>

<script>
	// 对应nvue的方法
	const dom = weex.requireModule('dom')
	export default {
		data () {
			return {
				gifts: [],
				defaultAvatar: '/static/tabbar/min.png'
			}
		},
		// created () {
		// 	// 模拟送礼物
		// 	setInterval(() => {
		// 		this.send()
		// 	},3000)
		// },
		methods: {
			// 模拟送礼物，被父组件调用
			send (gift) {
				this.gifts.push(gift)
				this.toBottom()
				this.autoHide()
			},
			// 置于底部
			toBottom () {
				this.$nextTick(() => {
					// 拿到最后一个索引
					let index = this.gifts.length - 1
					let ref = 'item' + index
					// 如果节点存在
					if (this.$refs[ref]) {
						// 滚动到最后一个节点（最后一个节点滚动显示出来，达到置底的目的）
						dom.scrollToElement(this.$refs[ref][0],	{ offset: 0, animated: true })
					}		
				})	
			},
			// 顶部礼物自动消失(先送先入数组的先消失)
			autoHide () {
				if (this.gifts.length) {
					let timer = setTimeout(() => {
						// 数组元素先进先出
						this.gifts.splice(0, 1)
					}, 5000)
				}
			}
		}
	}
</script>

<style>
</style>
