<template>
	<view class="body">
		<button open-type="getUserInfo" @getuserinfo="wechatLogin" class="login" type="primary">微信授权登录</button>
	</view>
</template>

<script>
	import {getlogin} from '@/request/api.js';
	export default({
		name :"loginPage",
		data(){
			return {
				userData:{
					signature:"",
					encryptedData:"",
					rawData:"",
					iv:"",
					code:""
				}
			}
		},
		onLoad(){
			uni.login({
				success: (res) => {
					this.userData.code=res.code;
					console.log(res);
				},
				fail: (res) => {
					uni.showModal({
					title: '获取用户信息失败',
						showCancel: false
					});
				}
			})
			uni.getStorage({
			    key: 'msg',
			    success: (res) =>{
					let st=JSON.parse(res.data);
					let use=getApp().globalData.userInfo;
			        getApp().globalData.userInfo=use||st;
			    }
			});
			uni.getStorage({
			    key: 'access_token',
			    success: function (res) {
					let tok=getApp().globalData.member_access_token;
					getApp().globalData.member_access_token=tok||res.data;
			        if(getApp().globalData.member_access_token!=""){
			        	uni.switchTab({
			        	    url: '/pages/wd/index'
			        	});
			        }
			    }
			});
		},
		methods:{
			wechatLogin(e){
				console.log(e);
				if (e.detail.errMsg !== 'getUserInfo:ok') {
					uni.showModal({
						title: '获取用户信息失败',
						content: '错误原因' + e.detail.errMsg,
						showCancel: false
					});
					return false;
				}
				this.userData.signature=e.detail.signature;
				this.userData.encryptedData=e.detail.encryptedData;
				this.userData.rawData=e.detail.rawData;
				this.userData.iv=e.detail.iv;
				getlogin(this.userData).then((s) => {
					console.log(s,"在这里");
						if(s.code!=200){
								uni.showModal({
									title: '获取用户信息失败',
									content: '错误原因' + s.data.message,
					
									showCancel: false
								});
								return false;
						}else{
							getApp().globalData.userInfo=s.data.member;
							getApp().globalData.member_access_token=s.data.access_token;
							let str=JSON.stringify(s.data.member);
							uni.setStorage({
								key:"access_token",
								data:s.data.access_token
							})
							uni.setStorage({
								key:"msg",
								data:str
							})
							uni.switchTab({
							    url: '/pages/wd/index'
							});
						}
				});
			}
		}
	})
</script>

<style scoped>
	.login{margin-top: 500rpx;width: 80%;}
	.fontText{font-size: 35rpx;}
	.body{position: fixed;width: 100%;height:100vh;z-index: 999;left: 0rpx;top: 0rpx;}
</style>
