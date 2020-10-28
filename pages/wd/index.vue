<template>
	<view>
		<view class="top" :style="{'padding-top':bl+'px'}">
			<view class="text-top">考研问答</view>
			<view class="text-top-h1">
				<text>精选话题</text><image src="../../static/images/cont1-top.png"></image>
			</view>
		</view>
		<view class="content1">
			<button type="default" v-for="item in cont1Btn" :style="{'background-image':'url('+item.src+')'}" hover-class="cont1-btnactive">{{item.text}}</button>
		<navigator url="./toc"  open-type="redirect"><text class="cont1-text">全部话题>></text></navigator>
		</view>
		<view class="content2">热门排行</view>
		<view class="content3">
			<!-- <navigator url="detail" open-type="navigate" hover-class="none"> -->
			<view v-for="item in htList" class="cont3-box" :data-flag="item.id" @click="navigateD($event)">
				<view class="cont3-wen">
					<image src="../../static/images/cont1-wen.png" class="cont3-wen-icon"></image>
					<view class="cont3-wen-text">{{item.title}}</view>
					<view class="cont3-wen-img">
						<image src="../../static/images/2s.png"></image>
						<image src="../../static/images/2s.png"></image>
						<image src="../../static/images/2s.png"></image>
					</view>
				</view>
				<view class="cont3-da">
					<image src="../../static/images/cont1-da.png" class="cont3-da-icon"></image>
					<view class="cont3-da-text" v-if="true">{{item.answer[0].content}}</view>
					<view class="cont3-da-text" v-else>暂无回答</view>
				</view>
				<view class="cont3-zan">
					<view class="cont3zanBox">
						<image :src="zanFlag? '../../static/images/cont1-zanac.png':'../../static/images/cont1-zan.png'" @click.stop="cont3amcl($event)"></image><text>{{item.good_number}}</text>
					</view>
					<!-- <view class="cont3zanBox">
						<image src="../../static/images/cont1-pl.png"></image><text>4526</text>
					</view> -->
					<view class="cont3zanBox cont3gkBox">
						<image src="../../static/images/cont1-gk.png"></image><text>{{item.click_number}}</text>
					</view>
				</view>
			</view>
			<!-- </navigator> -->
		</view>
	</view>
</template>

<script>
	import {wdIndex,wdDetail} from "@/request/api.js"
	export default{
		data(){
			return {
				cont1Btn:[
					{id:1,text:"政治",src:require("../../static/images/cont1-1.png")},
					{id:2,text:"英语",src:require("../../static/images/cont1-2.png")},
					{id:3,text:"数学",src:require("../../static/images/cont1-3.png")},
					{id:4,text:"初数",src:require("../../static/images/cont1-4.png")},
					{id:5,text:"逻辑",src:require("../../static/images/cont1-5.png")},
					{id:6,text:"写作",src:require("../../static/images/cont1-6.png")}
				],
				zanFlag:false,
				bl:"",
				htList:[]
			}
		},
		onPullDownRefresh() {
		        //监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
		        console.log('refresh');
		        setTimeout(function () {
		            uni.stopPullDownRefresh();  //停止下拉刷新动画
		        }, 1000);
		},
		onLoad(){
			this.bl=getApp().globalData.gloTop;
			wdIndex({
				page:1
			}).then(res=>{
				if(res.code=="200"){
					this.htList=res.data;
				}else{
					uni.showModal({
					title: '获取列表失败',
					showCancel: false
					});
				}
			})
		},
		methods:{
			cont3amcl(e){
				this.zanFlag=!this.zanFlag;
			},
			navigateD(e){
				let num=e.currentTarget.dataset.flag;
				console.log(e.currentTarget.dataset.flag);
				uni.navigateTo({
					url:"./detail?data="+num
				})
			}
		}
	}
</script>

<style scoped>
	.top{width: 100%;height: 420rpx;background-image: url(../../static/images/cont1bg.png);background-size: 100% 100%;overflow: hidden;}
	.text-top-h1{color: white;font-size: 50rpx;padding: 0rpx 45rpx 0rpx 45rpx;margin-top: 60rpx;}
	.text-top-h1 image{width: 49rpx;height: 34rpx;margin-left: 15rpx;}
	/* content样式1 */
	.content1{width: 90%;height:360rpx;margin-left: 5%;background-color: white;margin-top: -170rpx;box-shadow: -1px 2px 12px 0px #ccc;border-radius: 25rpx;position: relative;}
	.content1 button{width: 132rpx;height: 108rpx;float: left;background-size: 100% 100%;color: white;line-height: 108rpx;font-size: 35rpx;margin-left: 70rpx;margin-top: 40rpx;transition: .1s;}
	.content1 button::after{border: 0px;}
	.cont1-btnactive{transform: scale(0.9);}
	.cont1-text{position: absolute;bottom: 20rpx;right:50rpx;color: #5e74f9;font-size: 30rpx;}
	/* content2标题样式 */
	.content2{width:90%;height: 50rpx;line-height: 50rpx;margin-left: 5%;font-size: 38rpx;margin-top: 30rpx;}
	/* content3下拉容器样式 */
	.content3{width: 90%;margin-left: 5%;}
	.cont3-box{min-height:300rpx;width: 94%;margin-left:2%;box-shadow: -1px 1px 13px #d6cccc;border-radius: 20rpx;margin-top: 30rpx;overflow: hidden;padding-right: 20rpx;margin-bottom: 40rpx;}
	/* 问 */
	.cont3-wen{position: relative;width: 100%;min-height:80rpx;margin-top: 15rpx;overflow: hidden;}
	.cont3-wen-icon{width: 91rpx;height: 92rpx;position: absolute;}
	.cont3-wen-text{width: 87%;min-height: 40rpx;max-height: 120rpx;margin-left: 10%;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3;overflow: hidden;font-size: 28rpx;margin-top: 15rpx;padding-left: 20rpx;font-weight: bold;padding-top:2px ;}
	.cont3-wen-img{width:90%;margin-left: 5%;height: 170rpx;display: flex;justify-content : space-between;margin-top: 20rpx;}
	.cont3-wen-img image{width: 180rpx;height: 170rpx;border-radius: 20rpx;}
	/* 答 */
	.cont3-da{width: 100%;min-height:45rpx;max-height:96rpx;position: relative;overflow: hidden;margin-top: 20rpx;}
	.cont3-da-icon{width: 91rpx;height: 92rpx;position: absolute;}
	.cont3-da-text{width: 87%;min-height: 60rpx;max-height:100rpx;margin-left: 10%;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;font-size:24rpx;margin-top: 15rpx;padding-left: 20rpx;color: #666666;padding-top: 5rpx;}
	/* 点赞信息 */
	.cont3-zan{width: 88%;margin-left: 12%;height:50rpx;margin-bottom: 30rpx;margin-top: 8rpx;line-height: 50rpx;}
	.cont3zanBox{font-size:30rpx;color: #bfbfbf;position: relative;padding-left: 50rpx;height: 50rpx;float: left;min-width:50rpx;margin-right: 24rpx;}
	.cont3anmin{position: absolute;top: -24rpx;left: 0rpx;transition: .4s;}/* -36 */
	.cont3zanBox image{width: 40rpx;height: 37rpx;position: absolute;top: 5rpx;left: 0rpx;}
	.cont3gkBox{float: right !important;}
</style>
