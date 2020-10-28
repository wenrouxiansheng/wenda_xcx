<template>
	<view class="content">
		<view class="content1">
			<view class="head">{{title}}</view>
			<view class="head1">{{name}}</view>
			<view class="view_flex">
				<view class="yxName">院校：</view>
				<!-- <view class="yx">
					<picker @change="bindPickerChange1" :value="schoolindex" :range="schoollist" range-key="name">
						<view class="uni-input">{{schoollist[schoolindex].name}}</view>
					</picker>
				</view> -->
				<input class="uni-input yx" @input="onKeyInput" placeholder="请输入院校全称" placeholder-style="color:#999;" :value="inputValue" />
				<view class="del" @click="del()"></view>
			</view>
			<!-- 下拉学校 -->
			<view class="sch" :class="ismk2==true?'mk1':'mk2'">
				<view class="sch2">
					<view class="sch1" v-for="(item,schoolindex) in schoollist" :key="schoolindex" @click="sch_name(schoolindex)">{{schoollist[schoolindex].name}}({{schoollist[schoolindex].code}})</view>
				</view>
			</view>
			<view class="uni-padding-wrap">
				<view>
					<radio-group @change="typeChange" class="view_flex">
						<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value">
							<view>
								<radio :value="item.value" :checked="index === current" color="#097bf8" />
							</view>
							<view class="raName">{{item.name}}</view>
						</label>
					</radio-group>
				</view>
			</view>
			<view class="view_flex">
				<view class="mlName">门类：</view>
				<view class="ml">
					<picker @change="menleiPicker" :value="menleiindex" :range="menleilist">
						<view class="uni-input">{{menleilist[menleiindex]}}</view>
					</picker>
				</view>
			</view>
			<view class="view_flex">
				<view class="xkName">学科：</view>
				<view class="xk">
					<picker @change="yjxkPickerChange" :value="yjxkindex" :range="yjxklist">
						<view class="uni-input">{{yjxklist[yjxkindex]}}</view>
					</picker>
				</view>
			</view>
			<view class="view_flex">
				<view class="zyName">专业：</view>
				<view class="zy">
					<picker @change="majorPickerChange" :value="majorindex" :range="majorlist">
						<view class="uni-input">{{majorlist[majorindex]}}</view>
					</picker>
				</view>
			</view>
			<!-- #ifdef APP-PLUS || H5 -->
			<button lang="zh_CN" @click="submitfn" class="submit" :disabled="!iscls" :class="iscls==true?'cl1':'cl2'">确定</button>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN ||  MP-BAIDU-->
			<button open-type="getUserInfo" lang="zh_CN" @getuserinfo="mpGetUserInfo" class="submit" :disabled="!iscls" :class="iscls==true?'cl1':'cl2'">确定</button>
			<!-- #endif -->
		</view>
		
	</view>
</template>

<script>
	import {
		getindex,
		getschool,
		getmenlei,
		getyjxk,
		getmajor,
		getlogin,
		loginBaidu
	} from '@/request/api.js';
	export default {
		data() {
			return {
				title: '2020年硕士专业信息查询',
				name: '可查询院校专业分数线、考试科目等信息',
				ismk2: false,
				schoollist: [],
				menleilist: ["请选择门类"],
				yjxklist: ["请选择一级学科"],
				majorlist: ["请选择专业"],
				menleilist1: [],
				yjxklist1: [],
				majorlist1: [],
				schoolindex: 0,
				menleiindex: 0,
				yjxkindex: 0,
				majorindex: 0,
				inputValue: '',
				inputValue1: '',
				changeValue: '',
				items: [{
					value: '学术硕士',
					name: '学术硕士',
					checked: 'true'
				},
					{
						value: '专业硕士',
						name: '专业硕士'
					}
				],
				src: '',
				ishow1: false,
				iscls: false,
				result: '',
				current: 0,
				form: {
					school: '',
					menlei: '',
					yjxk: '',
					major: '',
					type: '学术硕士',
					menlei1: '',
					major1: ''
				},
				providerList: {},
				code: '',
			}
		},
		onLoad() {
			// #ifdef MP
			uni.getProvider({
				service: 'oauth',
				success: (result) => {
					result.provider.map((value) => {
						let providerName = '';
						switch (value) {
							case 'weixin':
								providerName = 'wechatMp'
								break;
							case 'qq':
								providerName = 'QQ登录'
								break;
							case 'sinaweibo':
								providerName = '新浪微博登录'
								break;
							case 'xiaomi':
								providerName = '小米登录'
								break;
							case 'alipay':
								providerName = '支付宝登录'
								break;
							case 'baidu':
								providerName = 'baiduMp'
								break;
							case 'toutiao':
								providerName = 'touTiaoMp'
								break;
							case 'apple':
								providerName = '苹果登录'
								break;
						}
						this.providerList = {
							name: providerName,
							id: value
						}
					});
				},
				fail: (error) => {
					console.log('获取登录通道失败', error);
				}
			});
			// #endif
		},
		onShow() {

		},
		methods: {
			// 搜索学校
			onKeyInput: function(event) {
				this.inputValue = event.target.value
				//console.log(this.inputValue)
				this.getschools()
				this.ishow()
				this.menleiindex = 0;
				this.yjxkindex = 0;
				this.majorindex = 0;
				this.iscls = false;
			},
			// 获取学校名
			sch_name(schoolindex) {
				this.inputValue = this.schoollist[schoolindex].name
				this.inputValue1 = this.schoollist[schoolindex].name
				this.form.school = this.inputValue1
				this.getmenleis()
				this.ishide()
			},
			del() {
				this.inputValue = "";
				this.inputValue1 = "";
				this.form.school = ""
				this.ishide()
				this.menleiindex = 0;
				this.yjxkindex = 0;
				this.majorindex = 0;
				this.iscls = false;
				this.menleilist = ["请选择门类"]
				this.yjxklist = ["请选择一级学科"]
				this.majorlist = ["请选择专业"]
			},
			// 提交按钮
			cl() {
				this.iscls = true;
			},
			// 显示学校搜索下拉框
			ishow() {
				this.ismk2 = true;
			},
			// 隐藏学校搜索下拉框
			ishide() {
				this.ismk2 = false;
			},
			getUserInfo() {
				let provider = this.providerList.id;
				uni.getUserInfo({
					provider: provider,
					success: (result) => {
						console.log('getUserInfo success', result);
					},
					fail: (error) => {
						console.log('getUserInfo fail', error);
						let content = error.errMsg;
						if (~content.indexOf('uni.login')) {
							content = '请在登录页面完成登录操作';
						}
						uni.getSetting({
							success: (res) => {
								let authStatus = res.authSetting['scope.userInfo'];
								if (!authStatus) {
									uni.showModal({
										title: '授权失败',
										content: 'Hello uni-app需要获取您的用户信息，请在设置界面打开相关权限',
										success: (res) => {
											if (res.confirm) {
												uni.openSetting()
											}
										}
									})
								} else {
									uni.showModal({
										title: '获取用户信息失败',
										content: '错误原因' + content,
										showCancel: false
									});
								}
							}
						})
					}
				});
			},
			mpGetUserInfo(result) {
				let that = this;
				let access_token = uni.getStorageSync("access_token");
				if(access_token) {
					that.submitfn();
					return ;
				}
				if (result.detail.errMsg !== 'getUserInfo:ok') {
					uni.showModal({
						title: '获取用户信息失败',
						content: '错误原因' + result.detail.errMsg,
						showCancel: false
					});
					return;
				}
				uni.login({
					provider: that.providerList.id,
					success: function(loginRes) {
						let data = {
							signature: result.detail.signature,
							encryptedData: result.detail.encryptedData,
							rawData: result.detail.rawData,
							iv: result.detail.iv,
							code: loginRes.code,
							provider: that.providerList.name
						}
						console.log(data)
						// #ifdef MP-WEIXIN
						getlogin(data).then(res => {
							if (res.code == 200) {
								// 返回的用户表识存起来
								uni.setStorage({
									key: 'access_token',
									data: res.data.access_token
								});
								if(res.data.member.mobile) {
									uni.setStorage({
										key: 'mobile',
										data: res.data.member.mobile
									});
								}
							} else {
								uni.showModal({
									title: '获取用户信息失败',
									content: '错误原因' + res.message,
									showCancel: false
								});
							}
						})
						// #endif
						// #ifdef MP-BAIDU
						loginBaidu(data).then(res => {
							if (res.code == 200) {
								// 返回的用户表识存起来
								uni.setStorage({
									key: 'access_token',
									data: res.data.access_token
								});
								if(res.data.member.mobile) {
									uni.setStorage({
										key: 'mobile',
										data: res.data.member.mobile
									});
								}
							} else {
								uni.showModal({
									title: '获取用户信息失败',
									content: '错误原因' + res.message,
									showCancel: false
								});
							}
						})
						// #endif
						that.submitfn();
					}
				})
			},
			// 院校
			// bindPickerChange1: function(e) {
			// 	console.log('picker发送选择改变，携带值为', e.target.value)
			// 	this.schoolindex = e.target.value;
			// 	console.log(this.schoolindex)
			// 	this.form.school = this.schoollist[this.schoolindex].name;
			// 	this.getmenleis();
			//              this.cl()
			// },
			// 硕士类型
			typeChange: function(evt) {
				this.form.type = evt.target.value
				this.menleiindex = 0;
				this.yjxkindex = 0;
				this.majorindex = 0;
				this.iscls = false;
				this.menleilist = ["请选择门类"]
				this.yjxklist = ["请选择一级学科"]
				this.majorlist = ["请选择专业"]
				this.getmenleis();
			},
			// 门类
			menleiPicker: function(e) {
				this.menleiindex = e.target.value;
				this.yjxkindex = 0;
				this.majorindex = 0;
				this.iscls = false;
				this.yjxklist = ["请选择一级学科"]
				this.majorlist = ["请选择专业"]
				this.form.menlei1 = this.menleilist1[e.target.value];
				if(e.target.value != 0) {
					this.getyjxks();
				}
			},
			// 一级学科
			yjxkPickerChange: function(e) {
				this.yjxkindex = e.target.value;
				this.majorindex = 0;
				this.iscls = false;
				this.majorlist = ["请选择专业"]
				this.form.yjxk1 = this.yjxklist1[e.target.value];
				if(e.target.value != 0) {
					this.getmajors();
				}
			},
			// 专业
			majorPickerChange: function(e) {
				this.majorindex = e.target.value;
				this.form.major1 = this.majorlist1[e.target.value];
				if ( e.target.value != 0) {
					this.iscls = true;
				} else {
					this.iscls = false;
				}
			},

			// 院校
			getschools() {
				let data = {
					keyword: this.inputValue
				}
				getschool(data).then(res => {
					if (res.code == 200) {
						this.schoollist = res.data;
						//this.getmenleis()
					}
				})
			},
			// 门类
			getmenleis() {
				let data = {
					school: this.form.school,
					type: this.form.type
				}
				getmenlei(data).then(res => {
					if (res.code == 200) {
						var ml = res.data;
						var arr = new Array("请选择门类");
						var arr1 = new Array("请选择门类");
						for (var i in ml) {
							let mls = "(" + ml[i].code + ")" + ml[i].name
							arr.push(mls);
							arr1.push(ml[i].name)
						}
						this.menleilist = arr;
						this.menleilist1 = arr1;
						//this.getyjxks();
					}
				})
			},
			// 一级学科
			getyjxks() {
				let data = {
					school: this.form.school,
					menlei: this.form.menlei1,
					type: this.form.type,
				}
				getyjxk(data).then(res => {
					if (res.code == 200) {
						let ml = res.data;
						let yjs = new Array("请选择一级学科")
						let yjs1 = new Array("请选择一级学科")
						for (var i in ml) {
							let mls = "(" + ml[i].code + ")" + ml[i].yjxk_name
							yjs.push(mls);
							yjs1.push(ml[i].yjxk_name)
						}
						this.yjxklist = yjs;
						this.yjxklist1 = yjs1;
						//this.getmajors();
					}
				})
			},
			// 专业
			getmajors() {
				let data = {
					school: this.form.school,
					menlei: this.form.menlei1,
					type: this.form.type,
					yjxk: this.form.yjxk1
				}
				getmajor(data).then(res => {
					if (res.code == 200) {
						var ml = res.data;
						var arr = new Array("请选择专业");
						var arr1 = new Array("请选择专业");
						for (var i in ml) {
							let mls = "(" + ml[i].code + ")" + ml[i].name
							arr.push(mls);
							arr1.push(ml[i].name)
						}
						this.majorlist = arr;
						this.majorlist1 = arr1;
					}
				})
			},
			submitfn() {
				console.log('submit')
				uni.navigateTo({
					url: '/pages/school/result?menlei=' + this.form.menlei1 + "&type=" + this.form.type + "&yjxk=" + this.form.yjxk1 +
							"&major=" + this.form.major1 + "&school=" + this.form.school
				})
			}
		}
	}
</script>

<style>
	.mk2 {
		display: none;
	}

	.mk1 {
		display: block;
	}

	/* .web-view{
		display:none;
	} */
	.zk1 {
		display: block;
	}

	.zk2 {
		display: none;
	}

	.cl1 {
		background-image: url("~@/static/images/btn2.png");
		background-size: 500rpx 100rpx;
		background-position: center center;
	}

	.cl2 {
		background-image: url("~@/static/images/btn1.png");
		background-size: 500rpx 100rpx;
		background-position: center center;
	}

	.content {
		width: 100%;
		height: 1097rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-image: url('~@/static/images/bg8.png');
		background-size: 100% auto;
		background-repeat: no-repeat;
		background-position: center top;
	}

	.content1 {
		width: 100%;
		height: 1123rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-image: url('~@/static/images/bg7.png');
		background-size: 100% auto;
		background-repeat: no-repeat;
		background-position: center top;
	}

	/* .logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	} */

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
		width: 100%;
	}

	.head {
		font-size: 30rpx;
		height: 70rpx;
		line-height: 70rpx;
		/* padding-top: 30rpx; */
		margin-top: -170rpx;
	}

	.head1 {
		font-size: 24rpx;
		color: #7f87a2;
		height: 30rpx;
		line-height: 30rpx;
	}

	.view_flex {
		display: flex;

	}

	.yxName {
		width: 120rpx;
		height: 110rpx;
		line-height: 110rpx;
		text-align: center;
		color: #576b95;
		font-size: 32rpx;
	}

	.yx {
		width: 308rpx;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 26rpx;
		text-align: center;
		padding-left: 55rpx;
		padding-right: 55rpx;
		/* background-image: url("~@/static/images/bg1.png");
		background-size: 518rpx 47rpx;
		background-position: center bottom;
		background-repeat: no-repeat; */
		border-bottom: 1rpx solid #6b7ca0;
	}

	.del {
		width: 100rpx;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 30rpx;
		text-align: center;
		color: #C8C7CC;
		border-bottom: 1rpx solid #6b7ca0;
		background-image: url("~@/static/images/img6.png");
		background-size: 24rpx 26rpx;
		background-position: center 48rpx;
		background-repeat: no-repeat;
	}

	.yx .uni-input {
		width: 518rpx;
		height: 110rpx;
		line-height: 110rpx;
		font-size: 26rpx;
		text-align: center;
		color: #000;
		margin-left: -40rpx;
	}

	.mlName {
		width: 120rpx;
		height: 110rpx;
		line-height: 110rpx;
		text-align: center;
		color: #576b95;
		font-size: 32rpx;
	}

	.ml {
		width: 518rpx;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 26rpx;
		text-align: center;
		background-image: url("~@/static/images/bg1.png");
		background-size: 518rpx 47rpx;
		background-position: center bottom;
		background-repeat: no-repeat;
	}

	.ml .uni-input {
		width: 518rpx;
		height: 110rpx;
		line-height: 110rpx;
		font-size: 26rpx;
		text-align: center;
		color: #000;
		margin-left: -40rpx;
	}

	.xkName {
		width: 120rpx;
		height: 110rpx;
		line-height: 110rpx;
		text-align: center;
		color: #576b95;
		font-size: 32rpx;
	}

	.xk {
		width: 518rpx;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 26rpx;
		text-align: center;
		background-image: url("~@/static/images/bg1.png");
		background-size: 518rpx 47rpx;
		background-position: center bottom;
		background-repeat: no-repeat;
	}

	.xk .uni-input {
		width: 518rpx;
		height: 110rpx;
		line-height: 110rpx;
		font-size: 26rpx;
		text-align: center;
		color: #000;
		margin-left: -40rpx;
	}

	.zyName {
		width: 120rpx;
		height: 110rpx;
		line-height: 110rpx;
		text-align: center;
		color: #576b95;
		font-size: 32rpx;
	}

	.zy {
		width: 518rpx;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 26rpx;
		text-align: center;
		background-image: url("~@/static/images/bg1.png");
		background-size: 518rpx 47rpx;
		background-position: center bottom;
		background-repeat: no-repeat;
	}

	.zy .uni-input {
		width: 518rpx;
		height: 110rpx;
		line-height: 110rpx;
		font-size: 26rpx;
		text-align: center;
		color: #000;
		margin-left: -40rpx;
	}

	/* 单选 */
	.uni-padding-wrap radio {
		width: 10rpx;
		height: 10rpx;
		transform: scale(0.7);
		float: left;
	}

	.uni-padding-wrap .uni-list-cell {
		width: 24 0rpx;
		height: 60rpx;
		/* line-height:110rpx; */
	}

	.uni-padding-wrap .raName {
		display: block;
		width: 152rpx;
		font-size: 24rpx;
		float: left;
		margin-left: 50rpx;
		/* height:110rpx; */
		/* line-height:110rpx; */
		margin-top: -8rpx;
	}

	.uni-padding-wrap {
		padding-top: 50rpx;
	}

	.submit {
		width: 500rpx;
		height: 100rpx;

		font-size: 32rpx;
		color: #fff;
		text-align: center;
		line-height: 100rpx;
		margin-top: 90rpx;
	}

	.submit1 {
		width: 500rpx;
		height: 100rpx;
		background-image: url("~@/static/images/btn1.png");
		background-size: 500rpx 100rpx;
		background-position: center center;
		font-size: 32rpx;
		color: #fff;
		text-align: center;
		line-height: 100rpx;
		margin-top: 90rpx;
	}

	/* 下拉框 */
	.uni-picker-item {
		border-top: 1rpx solid #999;
	}

	.sch {
		width: 100%;
		height: 609rpx;
		background-image: url("~@/static/images/bg11.png");
		background-size: 750rpx 669rpx;
		background-position: center top;
		z-index: 999;
		position: fixed;
		/* #ifdef H5 */
		top: 320rpx;
		/* #endif */
		/* #ifndef H5 */
		top: 240rpx;
		/* #endif */
		left: 0;
		padding-top: 60rpx;
	}

	.sch2 {
		width: 100%;
		height: 470rpx;
		overflow-y: scroll;
		overflow-x: hidden;
		margin-top: 40rpx;
	}

	.sch1 {
		width: 620rpx;
		height: 80rpx;
		line-height: 80rpx;
		border-bottom: 2rpx solid #ddd;
		text-align: left;
		color: #007AFF;
		font-size: 24rpx;
		margin: 0 auto;
	}
</style>