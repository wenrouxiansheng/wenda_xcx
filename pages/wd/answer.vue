<template>
	<view>
		<view class="top-box":style="{'padding-top':bl+'px'}">
			<view class="text-top">
				<navigator url="/pages/wd/detail" open-type="navigate"><image src="../../static/images/top1.png"></image></navigator>
				<text>回答</text>
			</view>
		</view>
		<view class="body">
			<view class="wenti">
				<view class="title">各位老师我考不上？？？？？各位老师我考不上？？？？？各位老师我考不上？？？？？各位老师我考不上？？？？？</view>
				<view class="content":class="zk?'fontBoxzk':''">各位老师我考不上？？？？？各位老师我考不上？？？？？各位老师我考不上？？？？？各位老师我考不上？？？？？各位老师我考不上？？？？？各位老师我考不上？？？？？各位老师我考不上？？？？？各位老师我考不上？？？？？</view>
				<view class="Btn"><text @click="fontContent" v-text="zk?'收起':'查看全文'"></text><image src="../../static/images/wd/sanjiao.png" :style="{'transform':zk?'rotate(180deg)':'rotate(0deg)'}"></image></view>
			</view>
			<view class="text">
				<textarea maxlength="800" placeholder="回答">
					
				</textarea>
			</view>
			<view class="anBox">
				<image src="../../static/images/wd/tjzp.png" @click="imgClick"></image>
			</view>
			<view class="zpBox">
				<image v-for="item in zpList" :src="item"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				bl:"",
				zk:false,
				zpList:[]
			}
		},
		onLoad(){
			this.bl=getApp().globalData.gloTop;
		},
		methods:{
			fontContent(){
				this.zk=!this.zk;
			},
			imgClick(){
				uni.chooseImage({
					count:5,
					success: (res) => {
						console.log(res);
						this.zpList=res.tempFilePaths;
					},
					fail: (res) => {
						console.log(res);
					}
				})
			}
		}
	}
</script>

<style scoped>
	*{box-sizing: border-box;}
	/* 头部 */
	.top-box{ background-image: linear-gradient(to right, #4173fe, #5d6dff, #6b6dff, #707eff, #709fff, #70bdff);width: 100%;height: 88rpx;background-size: 100% 100%;overflow: hidden;position: relative;z-index: 1;}
	.top-box image{width: 24rpx;height: 40rpx;position: absolute;left: 40rpx;top: 28rpx;}
	/* body */
	.body{width: 90%;margin-left: 5%;}
	/* 问题 */
	.wenti{width: 100%;border-bottom: solid 1px #e3e3e3;margin-top: 50rpx;padding-bottom: 20rpx;}
	.title{font-size: 30rpx;font-weight: bold;color:#333;}
	.content{font-size: 24rpx;color:#666666;margin-top: 10rpx;height: 90rpx;line-height: 30rpx;overflow: hidden;}
	.fontBoxzk{height:auto !important;overflow: initial !important;}
	.Btn{display: inline-block;padding-right: 30rpx;font-size: 28rpx;color: #4073fe;position: relative;margin-top: 20rpx;}
	.Btn image{width: 22rpx;height: 13rpx;position: absolute;top: 12rpx;right: 0rpx;transition: .3s;}
	.massage{width: 100%;height:90rpx;line-height: 90rpx;background-color: #f4f7fe;color: #989cb8;font-size: 24rpx;margin-top: 20rpx;padding-left: 20rpx;}
	/* text */
	.text{margin-top: 20rpx;}
	.text textarea{width: 100%;height: 300rpx;font-size: 30rpx;color:#333333;padding: 20rpx;background-color: #f4f7fe;}
	/* anBox */
	.anBox{padding-left: 20rpx;margin-top: 20rpx;}
	.anBox image{width:160rpx;height: 35rpx;}
	/* zpBox */
	.zpBox{width: 100%;margin-top: 20rpx;}
	.zpBox image{width: 130rpx;height: 130rpx;margin-right:30rpx;margin-top: 20rpx;}
	.zpBox{padding-left: 20rpx;}
</style>
