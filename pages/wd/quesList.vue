<template>
	<view>
		<view class="top-box":style="{'padding-top':bl+'px'}">
			<view class="text-top">
				<navigator url="/pages/wd/toc" open-type="navigate"><image src="../../static/images/top1.png"></image></navigator>
				<text>管综</text>
			</view>
		</view>
		<view class="body">
			<view class="body-top">
				<view class="htbox">
					<view><image src="../../static/images/2s.png"></image></view>
					<view>
						<view class="v-top">管综——初数ssssssssssssssssssssssssssssss</view>
						<view class="v-bottom">222个回答</view>
					</view>
				</view>
			</view>
			<view class="body-bottom">
			<navigator url="detail" open-type="navigate">
				<view class="contBox">
					<strong>专硕比学硕容易吗？专硕比学硕容易吗？专硕比学硕容易吗？专硕比学硕容易吗？专硕比学硕容易吗？专硕比学硕容易吗？专硕比学硕容易吗？专硕比学硕容易吗？</strong>
					<view class="imgBox">
						<image src="../../static/images/me/order/img.png"></image>
						<image src="../../static/images/me/order/img.png"></image>
						<image src="../../static/images/me/order/img.png"></image>
					</view>
					<view class="sBox-bot">
						<text class="time">2020-09-08</text>
						<view class="kongj">
							<p :class="stat==1?'':'pStat'" v-text="stat==1?'已回复':'待回复'">已回复</p>
						</view>
					</view>
				</view>
			</navigator>
				<view class="contBox">
					<strong>专硕比学硕容易吗？专硕比学硕容易吗？专硕比学硕容易吗？专硕比学硕容易吗？专硕比学硕容易吗？专硕比学硕容易吗？专硕比学硕容易吗？专硕比学硕容易吗？</strong>
					<view class="sBox-bot">
						<text class="time">2020-09-08</text>
						<view class="kongj">
							<p :class="stat==1?'':'pStat'" v-text="stat==1?'已回复':'待回复'">已回复</p>
						</view>
					</view>
				</view>
				<view class="contBox">
					<strong>专硕比学硕容易吗？专硕比学硕容易吗？专硕比学硕容易吗？专硕比学硕容易吗？专硕比学硕容易吗？专硕比学硕容易吗？专硕比学硕容易吗？专硕比学硕容易吗？</strong>
					<view class="imgBox">
						<image src="../../static/images/me/order/img.png"></image>
						<image src="../../static/images/me/order/img.png"></image>
						<image src="../../static/images/me/order/img.png"></image>
					</view>
					<view class="sBox-bot">
						<text class="time">2020-09-08</text>
						<view class="kongj">
							<p :class="stat==1?'':'pStat'" v-text="stat==1?'已回复':'待回复'">已回复</p>
						</view>
					</view>
				</view>
				<view class="contBox">
					<strong>专硕比学硕容易吗？专硕比学硕容易吗？专硕比学硕容易吗？专硕比学硕容易吗？专硕比学硕容易吗？专硕比学硕容易吗？专硕比学硕容易吗？专硕比学硕容易吗？</strong>
					<view class="imgBox">
						<image src="../../static/images/me/order/img.png"></image>
						<image src="../../static/images/me/order/img.png"></image>
						<image src="../../static/images/me/order/img.png"></image>
					</view>
					<view class="sBox-bot">
						<text class="time">2020-09-08</text>
						<view class="kongj">
							<p :class="stat==1?'':'pStat'" v-text="stat==1?'已回复':'待回复'">已回复</p>
						</view>
					</view>
				</view>
				<view class="contBox">
					<strong>专硕比学硕容易吗？专硕比学硕容易吗？专硕比学硕容易吗？专硕比学硕容易吗？专硕比学硕容易吗？专硕比学硕容易吗？专硕比学硕容易吗？专硕比学硕容易吗？</strong>
					<view class="imgBox">
						<image src="../../static/images/me/order/img.png"></image>
						<image src="../../static/images/me/order/img.png"></image>
						<image src="../../static/images/me/order/img.png"></image>
					</view>
					<view class="sBox-bot">
						<text class="time">2020-09-08</text>
						<view class="kongj">
							<p :class="stat==1?'':'pStat'" v-text="stat==1?'已回复':'待回复'">已回复</p>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				bl:"",
				stat:1
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
	.top-box{ background-image: linear-gradient(to right, #4173fe, #5d6dff, #6b6dff, #707eff, #709fff, #70bdff);width: 100%;height: 88rpx;background-size: 100% 100%;overflow: hidden;position: relative;z-index: 1;}
	.top-box image{width: 24rpx;height: 40rpx;position: absolute;left: 40rpx;top: 28rpx;}
	/* body */
	.body{width: 90%;height: 800rpx;background-color: white;border-radius: 24rpx;position: relative;margin-left: 5%;z-index: 2;}
	/* body-top */
	.body-top{width: 100%;height: 150rpx;padding-top: 0rpx;padding-top: 20rpx;margin: 26rpx 0rpx 26rpx 0rpx;}
	.htbox{width: 100%;height: 120rpx;}
	.htbox view{height: 100%;width: 100%;float: left;}
	.htbox view:nth-of-type(1) {width: 20%;}
	.htbox view:nth-of-type(2) {width: 70%;}
	.htbox view image{width: 120rpx;height: 120rpx;border-radius: 15rpx;}
	.htbox view .v-top{height: 70rpx;font-size: 30rpx;width: 100%;line-height: 70rpx;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
	.htbox view .v-bottom{height: 50rpx;width: 100%;font-size: 24rpx;line-height: 50rpx;color: #999999;}
	/* body-bottom */
	.body-bottom{width:100%;padding-bottom: 100rpx;}
	/* contbox */
	.content{width: 90%;height: 830rpx;margin-left: 5%;}
	.contBox{margin-top: 30rpx;box-shadow: -1px 1px 13px #d6cccc;padding: 20rpx;}
	.contBox strong{font-size: 30rpx;font-style: normal;display: inline-block;width: 100%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
	.imgBox{display:flex;justify-content: space-around;}
	.imgBox image{width: 190rpx;height: 180rpx;display: block;}
	.sBox-bot{width: 100%;height: 70rpx;line-height: 70rpx;margin-top: 15rpx;}
	.sBox-bot .time{font-size: 25rpx;float: right;margin-right: 20rpx;}
	.kongj{float: left;margin-top: 10rpx;}
	.sBox-bot p{font-size: 25rpx;float:left;margin-left: 20rpx;width: 170rpx;height: 50rpx;line-height: 50rpx;text-align: center;border-top-right-radius: 30rpx;border-bottom-right-radius: 30rpx;border-bottom-left-radius: 30rpx;background-image: linear-gradient(to right, #5e74f9 , #7b9ffc);color: white;}
	.pStat{background-image: linear-gradient(to right, #bfdbff , #bfdbff) !important;}
</style>
