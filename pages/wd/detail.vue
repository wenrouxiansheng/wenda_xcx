<template>
	<view>
		<view class="top-box":style="{'padding-top':bl+'px'}">
			<view class="text-top">
				<navigator open-type="navigateBack"><image src="../../static/images/top1.png"></image></navigator>
				<text>问答详情</text>
			</view>
		</view>
		<view class="body">
			<view class="body-top">
				<view class="fontBox" id="fontBox" ref="content" :class="zk?'fontBoxzk':''">
					{{wtDetail.title}}
					<text class="dzyh">{{wtDetail.content}}</text>
				</view>
				<view class="Btn"><text @click="fontContent" v-text="zk?'收起':'查看全文'"></text><image src="../../static/images/wd/sanjiao.png" :style="{'transform':zk?'rotate(180deg)':'rotate(0deg)'}"></image></view>
				<view class="tecaBox">
					<view class="t-top">
						<view class="tiao"></view><text>最新答疑</text>
					</view>
					<view class="tecaAll">
						<view class="toux">
							<image :src="wtDetail.answer[0].member.head_portrait"></image>
							<view class="Tright">
								<view>{{wtDetail.answer[0].member.nickname}}</view>
								<view><text>考研英语老师</text></view>
							</view>
						</view>
						<view class="tc-time">1小时前</view>
						<view class="tecaContent" :class="tecaBox?'tecaContentZk':''">
							{{wtDetail.answer[0].content}}
						</view>
						<view class="teca-bottom" @click="tecaClick"><image src="../../static/images/wd/b.png" :style="{'transform':tecaBox?'rotate(180deg)':'rotate(0deg)'}"></image></view>
					</view>
				</view>
				<view class="massage">老师正在加油回答中，客官稍安勿躁......</view>
				<button type="default" class="tiwen" @click="tiwenClick">向老师提问</button>
				<view class="bottom-teacher">
					<view class="t-top">
						<view class="tiao"></view><text>专业课老师推荐</text>
					</view>
					<view class="bottomBox">
						<view class="b1">
							<image src="../../static/images/2s.png"></image>
							<view class="b1-v">
								<view>董老师<text>跨考认证老师</text></view>
								<view>已有<text>23</text>名学生向该老师提问</view>
								<view><text>985名校</text><text>MBA专业</text><text>专业第一</text><text>牛皮</text><text>牛皮</text><text>牛皮</text></view>
							</view>
						</view>
						<view style="clear: both;"></view>
						<view class="b2">
							<button type="default" v-text="statpro?'师资详情':'向ta咨询'"></button>
						</view>
						<view style="clear: both;"></view>
					</view>
					<view class="bottomBox">
						<view class="b1">
							<image src="../../static/images/2s.png"></image>
							<view class="b1-v">
								<view>董老师<text>跨考认证老师</text></view>
								<view>已有<text>23</text>名学生向该老师提问</view>
								<view><text>985名校</text><text>MBA专业</text><text>专业第一</text><text>牛皮</text><text>牛皮</text><text>牛皮</text></view>
							</view>
						</view>
						<view style="clear: both;"></view>
						<view class="b2">
							<button type="default" v-text="statpro?'师资详情':'向ta咨询'"></button>
						</view>
						<view style="clear: both;"></view>
					</view>
				</view>
			</view>
			<view class="felx" v-if="isUser">
				<button><image src="../../static/images/wd/bji.png"></image> 我来回答</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {wdDetail} from '@/request/api.js';
	export default{
		data(){
			return {
				bl:"",
				zk:false,
				tecaBox:false,
				statpro:true,
				isUser:false,
				user:"",
				wtDetail:""
			}
		},
		onLoad(options){
			let g=getApp().globalData;
			this.bl=g.gloTop;
			this.user=g.userInfo;
			if(g.userInfo){
				this.isUser=g.userInfo.type==1?false:true;
			}
			if(!options){
				uni.showToast({
				    title: '问题获取失败',
					icon:"none",
				    duration: 2000
				});
				return false;
			}
			wdDetail({
					id:options.data
				}).then(res=>{
					if(res.code=="200"){
						console.log(res);
						this.wtDetail=res.data;
					}else{
						uni.showToast({
						    title: '问题获取失败',
							icon:"none",
						    duration: 2000
						});
					}
			})
		},
		methods:{
			fontContent(){
				this.zk=!this.zk;
			},
			tecaClick(){
				this.tecaBox=!this.tecaBox;
			},
			tiwenClick(){
				let that=this.user;
				console.log(getApp().globalData.userInfo);
				console.log(that);
				console.log(that.mobile);
				if(that.mobile){
					if(that.type==1){
						uni.navigateTo({
							url:"../me/problem"
						})
					}else{
						uni.showToast({
						    title: '您是老师的身份，快去回答问题吧',
							icon:"none",
						    duration: 2000
						});
					}
				}else{
					uni.navigateTo({
						url:"../me/Improve"
					})
				}
			}
		},
		onBackPress(){
			tiwenClick()
		}
	}
</script>

<style scoped>
	*{box-sizing: border-box;}
	/* 头部 */
	.top-box{ background-image: linear-gradient(to right, #4173fe, #5d6dff, #6b6dff, #707eff, #709fff, #70bdff);width: 100%;height: 88rpx;background-size: 100% 100%;overflow: hidden;position: relative;z-index: 1;}
	.top-box image{width: 24rpx;height: 40rpx;position: absolute;left: 40rpx;top: 28rpx;}
	/* body */
	.body{width: 90%;background-color: white;border-radius: 24rpx;position: relative;margin-left: 5%;z-index: 2;padding: 40rpx 0rpx 60rpx 0rpx;	}
	.fontBox{width: 100%;height:120rpx;font-size: 30rpx;line-height: 40rpx;font-weight: bold;overflow: hidden;}
	.fontBoxzk{width: 100%;height:auto !important;font-size: 30rpx;line-height: 40rpx;font-weight: bold;overflow: initial !important;}
	.Btn{display: inline-block;padding-right: 30rpx;font-size: 28rpx;color: #4073fe;position: relative;margin-top: 20rpx;}
	.Btn image{width: 22rpx;height: 13rpx;position: absolute;top: 12rpx;right: 0rpx;transition: .3s;}
	.massage{height:120rpx;line-height: 120rpx;background-color: #f4f7fe;color: #989cb8;font-size: 24rpx;margin-top: 20rpx;padding-left: 20rpx;border-radius: 15rpx;}
	.tiwen{width: 100%;background-image: linear-gradient(#7f98fd,#5c7ffd);color: white;height: 80rpx;font-size: 30rpx;margin-top: 40rpx;}
	/* teacher */
	.t-top{width: 100%;height: 60rpx;font-size: 30rpx;font-weight: bold;position: relative;padding-left: 20rpx;line-height: 60rpx;margin-top: 20rpx;}
	.tiao{height: 50rpx;width: 8rpx;background-image: linear-gradient(#7f98fd,#5a7dfd);position: absolute;left: 0rpx;top: 5rpx;border-radius: 20rpx;}
	.tecaAll{box-shadow: -1px 2px 13px #d6cccc;padding: 30rpx;border-radius: 20rpx;margin-top: 20rpx;}
	.toux{width: 100%;}
	.toux image{display: block;width:118rpx;height: 118rpx;border-radius: 50%;float: left;}
	.toux .Tright{float: left;margin-left: 10rpx;width: 70%;padding-top: 8rpx;}
	.toux view view:nth-of-type(1){font-size: 36rpx;font-weight: bold;padding-left: 14rpx;}
	.toux view view:nth-of-type(2) text{display: inline-block;font-size: 24rpx;background-image: linear-gradient(#a4b7fe,#91a9fe);padding: 10rpx 20rpx 10rpx 20rpx;border-radius: 30rpx;color: white;}
	.tc-time{clear: both;font-size: 24rpx;color: #999999;padding-top: 10rpx;padding-left:14rpx;}
	.tecaContent{width: 100%;height:120rpx;line-height: 40rpx;font-size: 30rpx;overflow: hidden;margin-top: 16rpx;padding-left: 10rpx;}
	.tecaContentZk{height:auto;overflow: initial;}
	.teca-bottom{height: 40rpx;text-align: center;line-height: 40rpx;margin-top: 10rpx;}
	.teca-bottom image{width: 38rpx;height: 19rpx;transition: .2s;}
	/* bottom推荐 */
	.bottomBox{padding: 20rpx;box-shadow: -1px 2px 13px #d6cccc;border-radius: 15rpx;margin-top: 20rpx;}
	.b1 image{width: 138rpx;height: 138rpx;border-radius: 50%;display: block;float: left;}
	.b1 view{float: left;padding-left: 10rpx;}
	.b1-v{width: 70%;}
	.b1-v view{clear:left;width: 100%;}
	.b1-v view:nth-of-type(1){font-size:36rpx;font-weight:bold;}
	.b1-v view:nth-of-type(1) text{display: inline-block;padding: 10rpx 20rpx 10rpx 20rpx;font-size: 24rpx;font-weight: normal;color: #8b633c;background-image: linear-gradient(to right,#faeed8,#f7e8c6);border-radius: 30rpx;margin-left: 15rpx;}
	.b1-v view:nth-of-type(2){font-size:24rpx;color: #7798f8;}
	.b1-v view:nth-of-type(2) text{color: red;}
	.b1-v view:nth-of-type(3) text{display: inline-block;background-color:#e6ebfb;font-size: 24rpx;color: #5a7dfd;margin-right: 10rpx;}
	.b2 button{width: 200rpx;height: 60rpx;line-height: 60rpx;background-image: linear-gradient(to right,#6e92f6,#79b6f8);color: white;font-size: 28rpx;float: right;border-radius: 30rpx;}
	.felx{position: fixed;bottom: 100rpx;z-index: 20;left: 50%;transform: translateX(-50%);}
	.felx button{background-image: linear-gradient(#7f98fd,#6585fd);color: white;font-size: 32rpx;width: 300rpx;border-radius: 40rpx;}
	.felx image{width: 30rpx;height: 30rpx;}
	.dzyh{display: block;}
</style>
