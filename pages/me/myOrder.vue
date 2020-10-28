<template>
	<view>
		<view class="top-box":style="{'padding-top':bl+'px'}">
			<view class="text-top">
				<navigator url="/pages/me/index" open-type="switchTab"><image src="../../static/images/top1.png"></image></navigator>
				<text>我的订单</text>
			</view>
		</view>
		<scroll-view class="scrollBox" scroll-y="true">
			<view class="sBox">
				<strong>专硕比学硕容易吗？专硕比学硕容易吗？专硕比学硕容易吗？专硕比学硕容易吗？专硕比学硕容易吗？专硕比学硕容易吗？专硕比学硕容易吗？专硕比学硕容易吗？</strong>
				<view class="imgBox">
					<image src="../../static/images/me/order/img.png"></image>
					<image src="../../static/images/me/order/img.png"></image>
					<image src="../../static/images/me/order/img.png"></image>
				</view>
				<view class="sBox-bot">
					<text class="time">2020-09-08</text>
					<view class="kongj">
						<p :style="{'background-image':stat==1?'linear-gradient(#5e74f9,#7b9ffc)':'linear-gradient(#ff6176,#ff859f)'}" v-text="stat==1?'已支付':'待支付'"></p>
						<p>查看详情</p>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				bl:"",
				stat:0
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
	/* 滚动视图 */
	.scrollBox{width: 90%;margin-left: 5%;background-color: white;border-radius: 20rpx;height: 1000rpx;position: relative;z-index: 2;top: -250rpx;padding: 20rpx 40rpx 20rpx 40rpx;box-sizing: border-box;}
	.sBox{margin-top: 40rpx;}
	.sBox strong{font-size: 30rpx;font-style: normal;display: inline-block;width: 100%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
	.imgBox{display:flex;justify-content: space-around;}
	.imgBox image{width: 190rpx;height: 180rpx;display: block;}
	/* .imgBox image:nth-of-type(2){margin-left: 10rpx;}
	.imgBox image:nth-of-type(3){margin-left: 10rpx;} */
	.sBox-bot{width: 100%;height: 70rpx;line-height: 70rpx;margin-top: 15rpx;}
	.sBox-bot .time{font-size: 25rpx;float: left;}
	.kongj{float: right;margin-top: 10rpx;}
	.sBox-bot p{font-size: 25rpx;float:left;margin-left: 20rpx;width: 170rpx;height: 50rpx;line-height: 50rpx;text-align: center;border-top-right-radius: 30rpx;border-bottom-right-radius: 30rpx;border-bottom-left-radius: 30rpx;background-image: linear-gradient(#5e74f9,#7b9ffc);color: white;}
</style>
