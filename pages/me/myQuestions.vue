<template>
	<view>
		<view class="top-box":style="{'padding-top':bl+'px'}">
			<view class="text-top">
				<navigator url="/pages/me/index" open-type="switchTab"><image src="../../static/images/top1.png"></image></navigator>
				<text>我的提问</text>
			</view>
		</view>
		<view class="body">
			<view class="topBox">
				<view class="nav" @click="nav1">
					<text :class="category==0?'fontActive':''">公共课</text>
					<image src="../../static/images/me/quesIc.png" v-show="category==0"></image>
				</view>
				<view class="nav" @click="nav2">
					<text :class="category==0?'':'fontActive'">专业课</text>
					<image src="../../static/images/me/quesIc.png" v-show="category==1"></image>
				</view>
			</view>
			<scroll-view class="content" scroll-y="true">
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
				<view class="contBox2">
					<h3><image src="../../static/images/cont1-wen.png"></image>过了国家线就是考上研究生了吗？了国家线就是考上研究生了吗？</h3>
					<view class="imgBox">
						<image src="../../static/images/me/order/img.png"></image>
						<image src="../../static/images/me/order/img.png"></image>
						<image src="../../static/images/me/order/img.png"></image>
					</view>
					<view class="techerBox">
						<h4><image src="../../static/images/me/teca.png"></image>跨考董老师</h4>
						<text>首先要搞清楚两个概念首先要搞清楚两个概念首先要搞清楚两个概念首先要搞清楚两个概念</text>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				bl:"",
				category:0,
				stat:0
			}
		},
		onLoad(){
			this.bl=getApp().globalData.gloTop;
		},
		methods:{
			nav1(){
				this.category=0;
			},
			nav2(){
				this.category=1;
			}
		}
	}
</script>

<style scoped>
	*{box-sizing: border-box;}
	/* 头部 */
	.top-box{background-image: url(../../static/images/mebg.png);width: 100%;height: 420rpx;background-size: 100% 100%;overflow: hidden;position: relative;z-index: 1;}
	.top-box image{width: 24rpx;height: 40rpx;position: absolute;left: 40rpx;top: 28rpx;}
	/* body */
	.body{width: 90%;margin-left: 5%;height: 980rpx;position: relative;z-index: 2;top: -260rpx;border-radius:20rpx;background-color: white;overflow: hidden;}
	/* topBox */
	.topBox{width:100%;height: 150rpx;line-height: 150rpx;display: flex;justify-content: space-around;}
	.topBox .nav{width: 30%;text-align: center;font-size: 35rpx;position: relative;}
	.nav image{width: 44rpx;height: 18rpx;position: absolute;top: 100rpx;left: 80rpx;}
	.nav text{display:block;}
	.fontActive{color: #229bff;}
	/* content */
	.content{width: 90%;height: 830rpx;margin-left: 5%;}
	.contBox{margin-top: 30rpx;}
	.contBox strong{font-size: 30rpx;font-style: normal;display: inline-block;width: 100%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
	.imgBox{display:flex;justify-content: space-around;}
	.imgBox image{width: 190rpx;height: 180rpx;display: block;}
	/* .imgBox image:nth-of-type(2){margin-left: 10rpx;}
	.imgBox image:nth-of-type(3){margin-left: 10rpx;} */
	.sBox-bot{width: 100%;height: 70rpx;line-height: 70rpx;margin-top: 15rpx;}
	.sBox-bot .time{font-size: 25rpx;float: right;margin-right: 20rpx;}
	.kongj{float: left;margin-top: 10rpx;}
	.sBox-bot p{font-size: 25rpx;float:left;margin-left: 20rpx;width: 170rpx;height: 50rpx;line-height: 50rpx;text-align: center;border-top-right-radius: 30rpx;border-bottom-right-radius: 30rpx;border-bottom-left-radius: 30rpx;background-image: linear-gradient(to right, #5e74f9 , #7b9ffc);color: white;}
	.pStat{background-image: linear-gradient(to right, #bfdbff , #bfdbff) !important;}
	/* contBox2 */
	.contBox2 h3{font-size: 30rpx;line-height: 90rpx;position: relative;padding-left: 80rpx;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
	.contBox2 h3 image{width:90rpx;height: 90rpx;position: absolute;top: 6rpx;left: 0rpx;}
	.techerBox{position: relative;margin-top: 10rpx;}
	.techerBox h4{font-size: 25rpx;line-height: 90rpx;position: relative;padding-left: 86rpx;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
	.techerBox h4 image{width: 68rpx;height: 68rpx;border-radius: 50%;position: absolute;top: 5rpx;left: 6rpx;}
	.techerBox text{display: inline-block;width: 100%;font-size: 25rpx;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
</style>
