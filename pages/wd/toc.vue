<template>
	<view>
		<view class="top-box":style="{'padding-top':bl+'px'}">
			<view class="text-top">
				<navigator url="/pages/wd/index" open-type="switchTab"><image src="../../static/images/top1.png"></image></navigator>
				<text>话题</text>
			</view>
		</view>
		<view class="body">
			<navigator url="quesList" open-type="navigate">
			<view class="htbox">
				<view><image src="../../static/images/2s.png"></image></view>
				<view>
					<view class="v-top">管综——初数</view>
					<view class="v-bottom">222个回答</view>
				</view>
			</view>
			</navigator>
			<view class="htbox">
				<view><image src="../../static/images/2s.png"></image></view>
				<view>
					<view class="v-top">管综——初数</view>
					<view class="v-bottom">222个回答</view>
				</view>
			</view>
			<view class="htbox">
				<view><image src="../../static/images/2s.png"></image></view>
				<view>
					<view class="v-top">管综——初数</view>
					<view class="v-bottom">222个回答</view>
				</view>
			</view>
			<view class="htbox">
				<view><image src="../../static/images/2s.png"></image></view>
				<view>
					<view class="v-top">管综——初数</view>
					<view class="v-bottom">222个回答</view>
				</view>
			</view>
			<view class="htbox">
				<view><image src="../../static/images/2s.png"></image></view>
				<view>
					<view class="v-top">管综——初数</view>
					<view class="v-bottom">222个回答</view>
				</view>
			</view>
			<view class="htbox">
				<view><image src="../../static/images/2s.png"></image></view>
				<view>
					<view class="v-top">管综——初数</view>
					<view class="v-bottom">222个回答</view>
				</view>
			</view>
			<view class="htbox">
				<view><image src="../../static/images/2s.png"></image></view>
				<view>
					<view class="v-top">管综——初数</view>
					<view class="v-bottom">222个回答</view>
				</view>
			</view>
			<view class="htbox">
				<view><image src="../../static/images/2s.png"></image></view>
				<view>
					<view class="v-top">管综——初数</view>
					<view class="v-bottom">222个回答</view>
				</view>
			</view>
			<view class="htbox">
				<view><image src="../../static/images/2s.png"></image></view>
				<view>
					<view class="v-top">管综——初数</view>
					<view class="v-bottom">222个回答</view>
				</view>
			</view>
			<view class="htbox">
				<view><image src="../../static/images/2s.png"></image></view>
				<view>
					<view class="v-top">管综——初数</view>
					<view class="v-bottom">222个回答</view>
				</view>
			</view>
			<view class="htbox">
				<view><image src="../../static/images/2s.png"></image></view>
				<view>
					<view class="v-top">管综——初数</view>
					<view class="v-bottom">222个回答</view>
				</view>
			</view>
			
			<view class="htbox">
				<view><image src="../../static/images/2s.png"></image></view>
				<view>
					<view class="v-top">管综——初数ssssssssssssssssssssssssssssss</view>
					<view class="v-bottom">222个回答</view>
				</view>
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
	/* body */
	.body{width: 90%;height: 800rpx;background-color: white;border-radius: 24rpx;position: relative;top: -200rpx;margin-left: 5%;z-index: 2;padding: 10rpx 40rpx 10rpx 40rpx;box-sizing: border-box;}
	.htbox{width: 90%;height: 120rpx;margin-left: 5%;margin-top: 30rpx;}
	.htbox view{height: 100%;width: 100%;float: left;}
	.htbox view:nth-of-type(1) {width: 25%;}
	.htbox view:nth-of-type(2) {width: 75%;}
	.htbox view image{width: 120rpx;height: 120rpx;border-radius: 15rpx;}
	.htbox view .v-top{height: 70rpx;font-size: 30rpx;width: 100%;line-height: 70rpx;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
	.htbox view .v-bottom{height: 50rpx;width: 100%;font-size: 24rpx;line-height: 50rpx;color: #999999;}
</style>
