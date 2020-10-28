<template>
	<view>
		<view class="top-box":style="{'padding-top':bl+'px'}">
			<view class="text-top">
				<navigator url="/pages/me/index" open-type="switchTab"><image src="../../static/images/top1.png"></image></navigator>
				<text>我的订单</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				bl:""
			}
		},
		onLoad(){
			this.bl=getApp().globalData.gloTop;
		},
		methods:{
			
		}
	}
</script>

<style scoped>
	*{box-sizing: border-box;}
	/* 头部 */
	.top-box{background-image: url(../../static/images/mebg.png);width: 100%;height: 420rpx;background-size: 100% 100%;overflow: hidden;position: relative;z-index: 1;}
	.top-box image{width: 24rpx;height: 40rpx;position: absolute;left: 40rpx;top: 28rpx;}
</style>
