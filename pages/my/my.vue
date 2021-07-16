<template>
	<view>
		<!-- 未登录 -->
		<view v-if="!user" class="flex align-center">
			<view class="flex align-center justify-center" style="width:180rpx;height:180rpx;">
				<image src="../../static/gift/4.png" mode="" class="rounded-circle" style="width:105rpx;height:105rpx;"></image>
			</view>
			<view class="flex flex-column align-center">
				<text class="font-md">未登录</text>
				<text class="font text-muted">登录体验更多功能</text>
			</view>
			<view class="ml-auto mr-3">
				<view class="border border-main rounded flex flex-column align-center justify-center p-2" hover-class="bg-light" @click="openLogin">
					<text class="text-main font">立即登录</text>
				</view>
			</view>
		</view>
		<!-- 已登录 -->
		<view v-else class="flex align-center">
			<view class="flex align-center justify-center" style="width:180rpx;height:180rpx;">
				<image :src="user.avatar || '../../static/gift/4.png'" mode="" class="rounded-circle" style="width:105rpx;height:105rpx;"></image>
			</view>
			<view class="flex flex-column align-center">
				<text class="font-md">{{user.username}}</text>
				<!-- <text class="font text-muted">描述</text> -->
			</view>
			<view class="ml-auto mr-3">
				<view class="border border-main rounded flex flex-column align-center justify-center p-2" hover-class="bg-light">
					<text class="text-main font">编辑资料</text>
				</view>
			</view>
		</view>
		
		<view class="f-divider"></view>
		
		<f-list-item icon="iconbizhongguanli" title="我的金币" :showRight="false" @click="authJump({url: '/pages/coin/coin'})">
			<text class="text-muted font">{{user ? user.coin : 0}}金币 立即充值</text>
		</f-list-item>
		<f-list-item icon="iconzhengzaizhibo" title="我的直播">
			<text class="text-muted font">0</text>
		</f-list-item>
		<f-list-item icon="iconwode" title="我的关注">
			<text class="text-muted font">0</text>
		</f-list-item>
		<f-list-item icon="iconfaxian" title="历史记录"></f-list-item>
		
	</view>
</template>

<script>
	import fListItem from '@/components/common/f-list-item.vue';
	import { mapState } from 'vuex';
	
	export default {
		components: {
			fListItem
		},
		data() {
			return {
				
			}
		},
		computed: {
			...mapState({
				user: state => state.user
			})
		},
		onShow() {
			// console.log('user', this.user)
			// 登录后实时获取数据库里随用户操作而变化的用户数据，存入state.user
			this.$store.dispatch('getUserInfo')
		},
		// 监听原生标题栏按钮点击事件，参数为Object
		onNavigationBarButtonTap() {
			// uni.navigateTo({
			// 	url: '../user-set/user-set'
			// })
			// 上面改写成这样
			this.authJump({
				url: '../user-set/user-set'
			})
		},
		methods: {
			openLogin() {
				uni.navigateTo({
					url: '../login/login'
				})
			}
		}
	}
</script>

<style>

</style>
