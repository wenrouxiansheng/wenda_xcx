<template>
	<view>
		<view class="top-box" :style="{'padding-top':bl+'px'}">
			<view class="text-top">
				<view class="text-topLift">
					<image src="../../static/images/top1.png" @click="black"></image>|<image src="../../static/images/top2.png" @click="home"></image>
				</view>
				<text>我的</text>
			</view>
			<view class="top-img">
				<view class="top-img-left" :style="{'background-image':'url('+topImg.img+')'}"></view>
				<view class="top-img-right">{{topImg.name}}</view>
			</view>
		</view>
		<view class="userBody" v-if="stat==1">
			<navigator v-for="item in userBody" :url="item.url"  open-type="navigate">
			<view :key="item.id" :style="{'background-image':'url('+item.src+')'}" @click="userClick(item.id)">{{item.text}}<image src="../../static/images/me-fh.png" class="userBodyjt"></image></view>
			</navigator>
		</view>
		<view class="userBody2" v-if="stat==2">
			<navigator v-for="item in userBody2" :url="item.url"  open-type="navigate">
			<view :key="item.id" :style="{'background-image':'url('+item.src+')'}" :class="item.id>1&&item.id<5? 'userBody2Tm':''" @click="user2click(item.id)">{{item.text}}<image src="../../static/images/me-fh.png" class="userBodyjt"></image></view>
			</navigator>
		</view>
		<view class="tcaBody" v-if="stat==3">
			<navigator v-for="item in tacBody" :url="item.url"  open-type="navigate">
			<view :key="item.id" :style="{'background-image':'url('+item.src+')'}" @click="tcaclick(item.id)">{{item.text}}<image src="../../static/images/me-fh.png" class="userBodyjt"></image></view>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				topImg:{img:require("../../static/images/me-img.png"),name:"CKemz_初见"},
				userBody:[
					{id:1,text:"我的提问",src:require("../../static/images/me-zx.png"),url:"/pages/me/myQuestions"},
					{id:2,text:"公共课提问",src:require("../../static/images/me-tw.png"),url:"/pages/me/problem"},
					{id:3,text:"专业课提问",src:require("../../static/images/me-zx2.png"),url:"javascript:void(0)"},
					{id:4,text:"我的订单",src:require("../../static/images/me-dd.png"),url:"/pages/me/myOrder"},
					{id:5,text:"联系客服",src:require("../../static/images/me-kf.png"),url:"javascript:void(0)"}
					],
				userBody2:[
					{id:1,text:"身份认证",src:require("../../static/images/me-sf.png"),url:"/pages/me/Improve"},
					{id:2,text:"公共课提问",src:require("../../static/images/me-tw.png"),url:"javascript:void(0)"},
					{id:3,text:"专业课提问",src:require("../../static/images/me-zx2.png"),url:"javascript:void(0)"},
					{id:4,text:"我的订单",src:require("../../static/images/me-dd.png"),url:"javascript:void(0)"},
					{id:5,text:"联系客服",src:require("../../static/images/me-kf.png"),url:"javascript:void(0)"}
					],
				tacBody:[
					{id:1,text:"我的回答",src:require("../../static/images/me-zx2.png"),url:"javascript:void(0)"},
					{id:2,text:"待我回答",src:require("../../static/images/me-zx.png"),url:"javascript:void(0)"},
					{id:3,text:"联系客服",src:require("../../static/images/me-kf.png"),url:"javascript:void(0)"},
					],
				stat:"",
				bl:""
					}
			},
			computed:{
			},
		onLoad(){
				this.bl=getApp().globalData.gloTop;
				this.stat=getApp().globalData.userInfo;
				console.log(this.stat,"asds");
				if(this.stat){
					this.topImg.img=this.stat.head_portrait;
					this.topImg.name=this.stat.nickname;
					if(this.stat.type==1){
						this.stat=1;
					}else{
						this.stat=3;
					}
				}else{
					this.stat=2;
				}
			},
		beforeCreate(){
			console.log("zhelne");
		},
		methods:{
			black(){
				console.log("返回")
			},
			home(){
				console.log("首页");
			},
			userClick(e){
				if(e==1){
					console.log("我的提问");
				}
				if(e==2){
					console.log("公共课提问");
				}
				if(e==3){
					console.log("专业课提问");
				}
				if(e==4){
					console.log("我的订单");
				}
				if(e==5){
					console.log("联系客服");
				}
			},
			user2click(e){
				if(e==1){
					console.log("身份认证");
				}else if(e==5){
					console.log("联系客服");
				}else{
					return false;
				}
			},
			tcaclick(e){
				if(e==1){
					console.log("我的回答");
				}else if(e==2){
					console.log("待我回答");
				}else{
					console.log("联系客服");
				}
			}
		}
	}
</script>

<style scoped>
	*{box-sizing: border-box;}
	.top-box{background-image: url(../../static/images/mebg.png);width: 100%;height: 420rpx;background-size: 100% 100%;overflow: hidden;}
	.text-topLift{width: 175rpx;height: 65rpx;border: 1px solid #7e9bfe;border-radius: 20px;position: absolute;left: 20rpx;line-height: 55rpx;text-align: center;padding-right: 10rpx;box-sizing: border-box;top: 20rpx;}
	.text-topLift image:nth-of-type(1){width:24rpx;height: 40rpx;position: absolute;left: 30rpx;top: 10rpx;}
	.text-topLift image:nth-of-type(2){width:41rpx;height: 38rpx;position: absolute;right: 25rpx;top: 10rpx;}
	.top-img{width: 100%;height: 130rpx;margin-top:50rpx;padding: 0px 40rpx 0px 60rpx;}
	.top-img-left{width: 120rpx;height: 120rpx;border-radius: 50%;border: 1px solid #7b9afe;background-size:cover;float: left;}
	.top-img-right{float: left;width: 300rpx;height: 120rpx;line-height: 120rpx;color: white;font-size: 30rpx;padding: 0px 0px 0px 20rpx;}
	/* userBody已认证用户 */
	.userBody{width: 90%;height:590rpx;margin-left: 5%;box-shadow: -1px 2px 12px 0px #ccc;border-radius: 25rpx;margin-top: -130rpx;background-color: white;overflow: hidden;padding-top: 60rpx;}
	.userBody view{width: 100%;height: 76rpx;padding: 0rpx 80rpx 0rpx 80rpx;line-height: 76rpx;font-size: 28rpx;background-size:33rpx 33rpx;background-repeat: no-repeat;background-position:30rpx;margin-top: 20rpx;position: relative;}
	.userBodyjt{width: 14rpx;height: 24rpx;position: absolute;top: 27rpx;right: 40rpx;}
	/* userBody2 未认证用户 */
	.userBody2{width: 90%;height:590rpx;margin-left: 5%;box-shadow: -1px 2px 12px 0px #ccc;border-radius: 25rpx;margin-top: -130rpx;background-color: white;overflow: hidden;padding-top: 60rpx;}
	.userBody2 view{width: 100%;height: 76rpx;padding: 0rpx 80rpx 0rpx 80rpx;line-height: 76rpx;font-size: 28rpx;background-size:33rpx 33rpx;background-repeat: no-repeat;background-position:30rpx;margin-top: 20rpx;position: relative;}
	.userBodyjt{width: 14rpx;height: 24rpx;position: absolute;top: 27rpx;right: 40rpx;}
	.userBody2Tm{opacity: 0.5;}
	/* tcaBody 老师界面  */
	.tcaBody{width: 90%;height:590rpx;margin-left: 5%;box-shadow: -1px 2px 12px 0px #ccc;border-radius: 25rpx;margin-top: -130rpx;background-color: white;overflow: hidden;padding-top: 60rpx;}
	.tcaBody view{width: 100%;height: 76rpx;padding: 0rpx 80rpx 0rpx 80rpx;line-height: 76rpx;font-size: 28rpx;background-size:33rpx 33rpx;background-repeat: no-repeat;background-position:30rpx;margin-top: 20rpx;position: relative;}
	.userBodyjt{width: 14rpx;height: 24rpx;position: absolute;top: 27rpx;right: 40rpx;}
</style>
