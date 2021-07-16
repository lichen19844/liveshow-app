<template>
	<view class="border-top border-secondary p-3">
		<view class="rounded py-4 flex flex-column align-center justify-center bg-main">
			<text class="font-sm text-white mb-2">当前金币</text>
			<text class="font-weight-bold text-white" style="font-size:60rpx;">50</text>
		</view>
		<view class="border-top border-light-secondary my-3"></view>
		<view class="">
			<text class="font-sm text-muted">请选择充值金币</text>
		</view>
		<view class="flex flex-wrap" style="margin-left:-20rpx;margin-right:-20rpx;">
			<view style="width:33.33%;box-sizing:border-box;" class="p-2" v-for="(item, index) in list" :key="index" @click="chooseCoin(index)">
				<view v-if="item.price > 0" style="height:130rpx;" class="border rounded flex flex-column justify-center align-center" :class="activeIndex === index ? 'border-main' : ''">
					<view class="flex justify-center align-center">
						<text class="iconfont text-warning mr-1">&#xe633;</text>
						<text class="font-md font-weight-bold">{{item.coin}}</text>
					</view>
					<text class="font text-light-muted">￥{{item.price}}</text>
				</view>
				<!-- 自定义 -->
				<view v-else style="height:130rpx;" class="border rounded flex flex-column justify-center align-center">
					<text class="font text-light-muted">自定义</text>
				</view>
			</view>
		</view>
		<!-- 操作条 -->
		<view class="position-fixed left-0 bottom-0 right-0 border-top flex justify-between align-center px-3" style="height:100rpx;">
			<view class="flex justify-center align-center">
				<text class="iconfont text-warning mr-1">&#xe633;</text>
				<text class="font-md font-weight-bold">{{price}}</text>
			</view>
			<view class="bg-main flex align-center justify-center ml-auto rounded" style="width:150rpx;height:70rpx;" @click="pay">
				<text class="font-md text-white">去充值</text>
			</view>
		</view>
		
		<!-- 充值弹窗 -->
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog mode="input" message="自定义充值" :duration="2000" placeholder="充值金额" inputType="number" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-ui/uni-popup/uni-popup.vue';
	import uniPopupDialog from '@/components/uni-ui/uni-popup/uni-popup-dialog.vue';
	export default {
		components: {
			uniPopup,
			uniPopupDialog
		},
		data() {
			return {
				activeIndex: 0,
				list: [{
					coin: 1,
					price: 1
				},{
					coin: 20,
					price: 20
				},{
					coin: 30,
					price: 30
				},{
					coin: 50,
					price: 50
				},{
					coin: 100,
					price: 100
				},{
					price: 0
				}],
				price: 0
			}
		},
		onLoad () {
			let p = this.list[this.activeIndex].price
			console.log('p', p)
			if (p > 0) {
				this.price = p
			}
		},
		methods: {
			pay() {
				this.$H.post(
					'/gift/wxpay', 
					{
						price: this.price
					}, 
					{
						token: true
					}).then(orderInfo => {
						console.log('get orderInfo success', orderInfo)
						uni.requestPayment({
							provider: "wxpay",
							orderInfo: orderInfo,
							success: function (res) {
								console.log('success:' + JSON.stringify(res));
								this.$store.dispatch('getUserInfo')
								uni.showToast({
									title: '充值成功',
									icon: 'none'
								});
								uni.navigateBack({
									delta: 1
								})
							},
							fail: function (err) {
								console.log('fail:' + JSON.stringify(err));
								uni.showModal({
									title: '提示',
									content: '支付失败',
									showCancel: false,
								});
							}
						})
					}).catch(err => {
						console.log('get orderInfo fail', err)
					}
				)
			},
			chooseCoin (index) {
				this.activeIndex = index
				let p = this.list[index].price
				if (p > 0) {
					this.price = p
				} else {
					// 自定义价格
					this.$refs.popup.open()
				}
			},
			open() {
					this.$refs.popup.open()
			},
			/**
			 * 点击取消按钮触发
			 * @param {Object} done
			 */
			close() {
					// TODO 做一些其他的事情，before-close 为true的情况下，手动执行 close 才会关闭对话框
					// ...
					this.$refs.popup.close()
			},
			/**
			 * 点击确认按钮触发
			 * @param {Object} done
			 * @param {Object} value
			 */
			confirm(done, value) {
					// 输入框的值
					console.log('in coin page', value)
					// TODO 做一些其他的事情，手动执行 close 才会关闭对话框
					// ...
					if(!value || value <= 0){
						return uni.showToast({
							title: '请输入要充值的金额',
							icon: 'none'
						});
					}
					this.price = value
					// 关闭弹窗
					// done()  // 可以执行
					this.$refs.popup.close()
			}
		}
	}
</script>

<style>

</style>
