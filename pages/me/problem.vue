<template>
	<view>
		<view class="top-box":style="{'padding-top':bl+'px'}">
			<view class="text-top">
				<navigator url="/pages/me/index" open-type="switchTab"><image src="../../static/images/top1.png"></image></navigator>
				<text>提问</text>
			</view>
		</view>
		<view class="mengCeng" v-show="htShow">
			<view class="top-box":style="{'padding-top':bl+'px'}">
				<view class="text-top">
					<image src="../../static/images/top1.png" @click="fh"></image>
					<text>话题列表</text>
				</view>
			</view>
			<view class="meng-body">
				<scroll-view scroll-y="true" class="mengScroll">
					<view class="meng-cont" id="ht1" data-flag="1" @click="selectHt($event)">
						<view class="tiao"><view></view>政治</view>
						<view class="smart">不限</view>
						<view class="smart">数学</view>
						<view class="smart smartActive">英语</view>
						<view class="smart">安上的</view>
						<view class="smart">安上的</view>
						<view class="smart">安上的</view>
						<view style="clear: both;"></view>
					</view>
				</scroll-view>
				<button type="default">确定</button>
			</view>
		</view>
		<cover-view class="tanChaung" @touchmove.stop.prevent="moveHandle" v-show="tcShow">
			<cover-view class="tCont">
				<cover-view>提示</cover-view>
				<cover-view>提交成功，正在审核，请耐心等待。</cover-view>
				<cover-view class="tCimg2" @click="closeBox">确定</cover-view>
				<cover-view class="tCimg3" @click="closeBox">+</cover-view>
			</cover-view>
		</cover-view>
		<view class="body" v-show="!htShow">
			<view class="topContent">
				<view class="cont1">
					<button @click="fh">选择话题</button>
					<view style="clear: both;"></view>
					<view class="cont1-font">至少选择一个话题，可以选择多个</view>
					<view class="cont1-ul">
						<view>英语<text @click="clearLabel">+</text></view>
						<view>数学<text>+</text></view>
					</view>
				</view>
				<view class="cont2">
					<view class="cont2-font">请写下你的问题并以“？”结尾</view>
					<view>
						<input type="text" placeholder="问题标题字数限制在50字以内" class="cont2Input" maxlength="50"/>
					</view>
					<view class="cont2-font">请添加问题补充描述<text>（选填）</text></view>
					<view>
						<textarea placeholder="问题描述字数限制在200字以内" class="cont2Text" maxlength="200">
							
						</textarea>
					</view>
				</view>
				<view class="cont3">
					<view class="left">
						<image src="../../static/images/me/photo.png" @click="file"></image>
						<text>最多5张</text>
					</view>
					<view class="right">
						<image v-for="item in img" :src="item"></image>
					</view>
				</view>
				<view style="clear: both;"></view>
				<view class="cont4">
					<h3>提问规则</h3>
					<view class="contentText">
						<view>1.在跨考教育小程序提问需要实名验证；</view>
						<view>2.所有提问都会审核；</view>
						<view>3.不得发布违反法律法规、危害国家及社会安全的信息；</view>
						<view>4.不得发布不友善内容，例如贬低某个学校、某个专业，侮辱谩骂学校、老师、学生等；</view>
						<view>5.不得发布含有广告类信息的内容</view>
						<view>6.不得发布跟考研不想关的内容</view>
					</view>
					<button type="default">提交</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {scImg,xzhtProblem} from "@/request/api.js"
	export default{
		data(){
			return {
				bl:"",
				img:[],
				htShow:false,
				tcShow:false
			}
		},
		onLoad(){
			this.bl=getApp().globalData.gloTop;
		},
		methods:{
			clearLabel(){
				console.log("guanbi ")
			},
			fh(){
				this.htShow=!this.htShow;
				xzhtProblem({}).then(res =>{
					console.log(res);
				})
			},
			file(){
				uni.chooseImage({
					count:5,
					success:res=>{
						console.log(res);
						this.img=res.tempFilePaths;
						scImg({
							url:"api/xcx/v1/file/images",
							img:res.tempFilePaths[0],
							data:{
								file:res.tempFilePaths[0]
							}
						}).then(res => {
							console.log(res);
						})
					},
					fail:res=>{
						console.log(res);
					}
				})
			},
			moveHandle(){
				return false;
			},
			closeBox(){
				this.tcShow=!this.tcShow;
			},
			selectHt(e){
				console.log(e);
				console.log(e.currentTarget.dataset.flag);
			}
		}
	}
</script>

<style scoped>
	*{box-sizing: border-box;}
	/* 头部 */
	.top-box{ background-image: linear-gradient(to right, #4173fe, #5d6dff, #6b6dff, #707eff, #709fff, #70bdff);width: 100%;height: 88rpx;background-size: 100% 100%;overflow: hidden;position: relative;z-index: 1;}
	.top-box image{width: 24rpx;height: 40rpx;position: absolute;left: 40rpx;top: 28rpx;}
	/* 内容 */
	.body{width: 90%;margin-left: 5%;}
	.topContent{}
	.cont1 button{width: 170rpx;height: 60rpx;font-size: 28rpx;line-height: 60rpx;float: left;margin-top: 50rpx;background-image: linear-gradient(#7f98fd,#6383fd);color: white;border-radius: 20rpx;}
	.cont1-font{clear: both;color:#999999;font-size: 24rpx;margin-top: 20rpx;}
	.cont1-ul{margin-top: 20rpx;}
	.cont1-ul view{display:inline-block;padding: 20rpx 60rpx 20rpx 20rpx;background-image: linear-gradient(#7f98fd,#6383fd);color: white;font-size: 26rpx;margin-right: 20rpx;position: relative;}
	.cont1-ul view text{position:absolute;font-size: 60rpx;transform: rotate(45deg);top: -6rpx;right: 0rpx;}
	/* cont2 */
	.cont2 view{margin-top: 30rpx;}
	.cont2-font{font-size: 38rpx;font-weight: bold;}
	.cont2-font text{color:red;}
	.cont2Input{height: 80rpx;}
	.cont2Input,.cont2Text{font-size: 26rpx;padding: 20rpx;background-color: #f3f7fe;}
	.cont2Text{width: 100%;}
	/* cont3 */
	.cont3{margin-top: 20rpx;}
	.cont3 view{float: left;}
	.cont3 .left{width:25%;height: 180rpx;font-size: 26rpx;}
	.cont3 .left image{width:145rpx;height: 135rpx;display: block;}
	.cont3 .left text{display: inline-block;margin-left: 25rpx;color: #999999;margin-top: 6rpx;}
	.cont3 .right{width: 75%;}
	.cont3 .right image{width:145rpx;height: 135rpx;margin-left: 20rpx;}
	/* cont4 */
	.cont4{margin-top: 20rpx;}
	.cont4 h3{font-size: 38rpx;}
	.cont4 .contentText{width: 100%;padding: 10rpx;background-color: #f3f7fe;font-size: 26rpx;}
	.contentText view{margin-top: 10rpx;}
	.cont4 button{width: 70%;height: 80rpx;font-size: 30rpx;line-height: 80rpx;margin-top: 20rpx;margin-bottom:40rpx;background-image: linear-gradient(#7c96fd,#5a7dfd);color: white;}
	/* mengCeng */
	.mengCeng{position: fixed;z-index: 100;background-color: white;width: 100%;height:100vh;top: 0rpx;left: 0rpx;}
	.meng-body{width: 90%;margin-left: 5%;}
	.tiao{font-size: 40rpx;position: relative;padding-left: 30rpx;margin-top: 40rpx;font-weight: bold;color: #6585fd;}
	.tiao view{width: 10rpx;height: 50rpx;background-image: linear-gradient(#7f98fd,#6585fd);position: absolute;top: 4rpx;left: 0rpx;border-radius: 10rpx;}
	.smart{padding: 5rpx 24rpx 5rpx 24rpx;font-size: 30rpx;float: left;margin-left: 40rpx;margin-top: 40rpx;border-radius: 30rpx;}
	.mengScroll{height: 75vh;width: 100%;}
	.smartActive{background-image: linear-gradient(#7f98fd,#6585fd) !important;color: white !important;}
	.meng-body button{width:50%;background-image: linear-gradient(#7f98fd,#6585fd);height: 80rpx;color: white;line-height: 80rpx;margin-top: 60rpx;}
	/* tanChaung */
	.tanChaung{position: fixed;width: 100%;height: 100vh;background-color: rgba(0,0,0,0.5);z-index:999;}
	.tCont{position:relative;background-color: white;width: 70%;margin-left: 15%;height: auto;border-radius: 20rpx;margin-top: 400rpx;padding: 40rpx 0rpx 140rpx 0rpx;overflow: initial;}
	.tCont cover-view{width: 90%;margin-left: 5%;text-align: center;margin-top:30rpx;}
	.tCont cover-view:nth-of-type(1){color: #6c77f3;font-size: 60rpx;font-weight: bold;}
	.tCont cover-view:nth-of-type(2){color: #333;font-size: 28rpx;white-space:pre-wrap;}
	.tCimg2{width:260rpx !important;height: 80rpx;text-align: center;line-height: 80rpx;background-color:#79b6f8;color: white;border-radius: 40rpx;position: absolute;left: 20%;z-index: 99999;}
	.tCimg3{position: absolute;color: #b1b0c0;transform: rotate(45deg);top: -20rpx;right: 20rpx;font-size: 50rpx;width: 50rpx !important;height: 50rpx !important;}
	</style>
