<template>
	<!-- 弹幕 -->
	<view style="position: fixed;bottom:120rpx;left:0;" class="">
		<scroll-view scroll-y="true" style="width:520rpx;height:300rpx;" scroll-with-animation	class="pl-3" :scroll-into-view="scrollIntoView">
			<view :id="'danmu'+item.id" class="flex justify-start align-start rounded p-2 mb-2" style="background-color:rgba(255,255,255,.125);" v-for="(item, index) in list" :key="index">
				<text class="font-md text-danger">{{item.name}}：</text>
				<text class="font-md text-white">{{item.content}}</text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				scrollIntoView: '',
				list: []
			}
		},
		mounted() {
			// 每隔1秒发送一个弹幕，并把最后一个弹幕滚动显示置底
			// let id = 1;
			// setInterval(() => {
			// 	this.list.push({
			// 		id: id,
			// 		name: '昵称' + id,
			// 		content: '礼晨加油~' + id
			// 	})
			// 	// 置于底部
			// 	this.toBottom()
			// 	id++
			// }, 1000)
		},
		methods: {
			// 发送弹幕
			send (data) {
				this.list.push(data)
				// 置于底部
				this.toBottom()
			},
			toBottom () {
				setTimeout(()=> {
					let len = this.list.length
					// len = len > 0 ? len -1
					// 如果list数组最后一个元素存在的话
					if (len > 0 && this.list[len-1]) {
						// 让scrollIntoView去拿到list数组最后一个元素的id，那么scroll-into-view就会定位到相应的item.id的view子组件（最后一个节点滚动显示出来，达到置底的目的）
						this.scrollIntoView = 'danmu' + this.list[len-1].id
					}
				},200)
				
			}
		}
	}
</script>

<style>
</style>
