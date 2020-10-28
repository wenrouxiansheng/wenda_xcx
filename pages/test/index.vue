<template>
	<view class="content">
		<view class="content1">
			<view class="test">
				<view class="test_opt">根据你目前的状态，对相关问题进行真实作答，通过作答结果，您可以更了解自己现在备考的心里状态，并预估之后你在备考过程中可能遇到的</view>
				<view v-for="(item,index) in qusArray" :key="index">
					<view class="test_op">Q{{index+1}}:{{item.question_name}}</view>
					<view class="uni-padding-wrap">
						<view>
							<radio-group @change="radioChange($event,index)" class="view_flex">
								<label class="uni-list-cell uni-list-cell-pd" v-for="(question, number) in item.answers" :key="item.index">
									<view class="raimg">
										<radio :value="question" color="#097bf8" />
									</view>
									<view class="raName">{{question}}</view>
								</label>
							</radio-group>
						</view>
					</view>
				</view>
				<!-- <view class="uni-form-item uni-column test_op">
					<view class="title">Q10:{{text}}</view>
			        <input class="uni-input" focus />
			    </view> -->
				<view class="uni-form-item uni-column test_op">
					<view class="title">Q10:{{text}}(必填)</view>
					<input class="uni-input" :value="inputValue" @input="onKeyInput" />
				</view>
				<!-- #ifdef MP-BAIDU || MP-WEIXIN -->
				<button class="tijiao" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" v-if="ishow6">提交</button>
				<button class="tijiao" @click="getresults()" v-if="ishow7">提交</button>
				<!-- #endif -->
				<!-- #ifdef APP-PLUS || H5 -->
				<button class="tijiao" @click="getresults()">提交</button>
				<!-- #endif -->
				<!-- 未授权提示框 -->
				<view class="tj1" v-if="ishow1">
					<view class="tj">
						<view class="tj_info">登录信息已过期，请重新登录！</view>
						<button open-type="getUserInfo" lang="zh_CN" @getuserinfo="mpGetUserInfo" class="submit1">登录</button>
						<button class="submit2" @click="show2()">取消</button>
					</view>
				</view>
				<!-- 获取结果 -->
				<view class="jieguo">
					<view class="jieguo1" v-if="ishow2">
						<text>您的得分为<text class="fen">{{jieguo}}</text>分，说明您对考研秉持着很自信的状态，并不会因为考研而让自己变得慌张，这样的信心会为你摒弃考研途中很多不必要的情绪干扰，请继续保持。\n</text>
						<text>且您的院校和专业选择在了自己能力范围内，这样会让你的考研备考的过程相对轻松，考研备考犹如一场拉锯战，最磨人的时间还未来临，请继续保持您现在的学习状态，向着既定的目标院校前进！\n</text>
						<text>如果您后期需要帮助，可前往跨考考研官方微信号：kkedu2018，进行咨询。</text>
					</view>
					<view class="jieguo2" v-if="ishow3">
						<text>您的得分为<text class="fen">{{jieguo}}</text>分，说明您目前对考研有一丢丢的慌张，也侧面反映出您对考研很重视，但是虽然有些小慌张，可总体来说您对考研还是比较有信心的，您的目标院校专业的选择是在自己付出一些努力就可以达到的范围内，这样您的备考过程整体压力会在自我可控的范围内，如果因为院校专业复习方面有什么疑惑，可以预约跨考教育专职咨询老师，为您解答。\n</text>
						<text @click="getsrc()" class="zx">立即预约</text>
					</view>
					<view class="jieguo3" v-if="ishow4">
						<text>您的得分为<text class="fen">{{jieguo}}</text>分，说明您目前处于一个比较慌张的备考状态，对考研这件事很重视的同时，考研也给了你不小的压力，现在如果不好好调整状态，后面会有更兵荒马乱的时刻，不过压力不全然是坏事，有压力才有动力！为了舒缓你的压力，让你有充足的动力备考，也让你更了解目标院校专业，合理规划复习节奏，特准备了如下方案\n</text>
						<text @click="getsrc()" class="zx">目标院校专业信息查询</text>
						<text @click="getsrc()" class="zx">“只为你”定制版复习方案</text>
						<text @click="getsrc()" class="zx">定制化辅导提升</text>
					</view>
					<view class="jieguo4" v-if="ishow5">
						<text>您的得分为<text class="fen">{{jieguo}}</text>分，说明目前考研带给您很大的压力，让您觉得十分慌张，您可能出现对目标院校或专业的设立没有很清晰的概念，又对自己的自身的目标院校或专业并不满意，想复习，有无从入手的摇摆阶段，同时还要面对来自家人和朋友的压力…\n</text>
						想要理清头绪，找到复习的入手方向→<text @click="getsrc()" class="zx">点我咨询\n</text>
						想要了解不同院校专业方向、报考难度→<text @click="getsrc()" class="zx">点我咨询\n</text>
						想要了解院校专业发展前景、就业情况、薪资水平→<text @click="getsrc()" class="zx">点我咨询\n</text>
						想要疏解内心压力，可前往跨考考研官方微博，我们愿当你的树洞→<text @click="getsrc()" class="zx">我是通道\n</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		gettest,
		getresult,
		getphone,
		getlogin,
		loginBaidu,
		getBaiduPhone
		// logins
	} from '@/request/api.js';
	export default {
		data() {
			return {
				title: '2020年硕士专业信息查询',
				name: '可查询院校专业分数线、考试科目等信息',
				index1: 0,
				index2: 0,
				index3: 0,
				qusArray: [],
				current: '',
				focus: false,
				inputValue: '',
				changeValue: '',
				text: '',
				anser: ["", "", "", "", "", "", "", "", ""],
				access_token: '',
				codes: '',
				encryptedData: '',
				iv: '',
				ishow1: false, //登录弹窗
				ishow2: false, //提交结果 1
				ishow3: false, //提交结果 2
				ishow4: false, //提交结果 3
				ishow5: false, //提交结果 4
				ishow6: false, //获取手机号提交按钮
				ishow7: false, //直接提交按钮
				jieguo: '', //结果分数
				answerif: false,
				providerList: {},
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
			this.gettests() //请求问题数据
			this.qusArray = []
			this.inputValue = ''
			// #ifdef MP-BAIDU || MP-WEIXIN
			let that = this;
			that.access_token = uni.getStorageSync('access_token');
			if (that.access_token == "" || that.access_token == "undefind") {
				this.show1();
			}
			let moble = uni.getStorageSync('mobile')
			if (moble == "" || moble == "undefind") {
				this.sh1()
			} else {
				this.sh2()
			}
			// #endif
		},
		methods: {
			// 提示框
			sT() {
				uni.showModal({
					title: '提示',
					content: '您有题目未完成',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			// 打开客服
			getsrc() {
				uni.navigateTo({
					url: '/pages/school/kefu'
				})
			},
			// 打开重新登录页
			show1() {
				this.ishow1 = true;
			},
			// 关闭重新登录页
			show2() {
				// uni.showToast({
				// 	title: '需要授权信息才可以提交',
				// 	duration: 2000,
				// 	icon: 'none'
				// });
				this.ishow1 = false;
			},
			// 获取手机号
			sh1() {
				this.ishow6 = true;
				this.ishow7 = false;
			},
			// 提交数据
			sh2() {
				this.ishow7 = true;
				this.ishow6 = false;
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
								if (res.data.member.mobile == "" || res.data.member.mobile == "undefind") {
									that.sh1() //获取手机号
								} else {
									uni.setStorage({
										key: 'mobile',
										data: res.data.member.mobile
									});
									that.sh2() //直接提交数据
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
								if (res.data.member.mobile == "" || res.data.member.mobile == "undefind") {
									that.sh1() //获取手机号
								} else {
									uni.setStorage({
										key: 'mobile',
										data: res.data.member.mobile
									});
									that.sh2() //直接提交数据
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
					}
				})
				this.show2();
			},
			getPhoneNumber(e) {
				console.log(e)
				if (e.detail.errMsg == 'getPhoneNumber:ok') {
					this.encryptedData = e.detail.encryptedData;
					this.iv = e.detail.iv;
					this.getphones();
				} else {
					uni.showToast({
						title: '需要授权手机号才可以提交',
						duration: 2000,
						icon: 'none'
					});
					return false;
				}
			},
			onKeyInput: function(event) {
				this.inputValue = event.target.value
				console.log(this.inputValue)
			},

			radioChange: function(evt, index) {
				for (let i = 0; i < this.qusArray[index].answers.length; i++) {
					if (this.qusArray[index].answers[i] === evt.target.value) {
						i + 1;
						var res = "";
						var ans = "";
						res = this.qusArray[index].answers[i];
						var result = res.split(":");
						var xx = result[0];
						var q = index + 1;
						ans = xx;
						this.anser[index] = ans;
						break;
					}
				}
			},
			// 测试
			gettests() {
				gettest().then(res => {
					if (res.code == 200) {
						this.title = res.data.text
						let list = []
						for (var item in res.data) {
							if (item != "text") {
								let answers = [];
								for (var i in res.data[item]) {
									let answerlist = i + ":" + res.data[item][i]
									answers.push(answerlist)
								}
								let data = {
									question_name: item,
									answers: answers
								}
								list.push(data)
							} else {
								this.text = res.data[item]
							}
						}
						this.qusArray = list //问题列表
						this.showifs = false;
						this.showifs = true;
					}
				})
			},
			// 提交结果
			getresults() {
				let data = {
					answer: this.anser,
					content: this.inputValue,
				}
				let len = this.anser.length;
				for (let l = 0; l < len; l++) {
					if (this.anser[l] == "") {
						this.answerif = false;
						break;
					} else {
						this.answerif = true;
					}
				}
				if (this.inputValue == "" || this.answerif == false) {
					// #ifdef MP-BAIDU || MP-WEIXIN
					let moble = uni.getStorageSync('mobile')
					if (moble == "" || moble == "undefind") {
						this.sh1()
					} else {
						this.sh2()
					}
					// #endif
					this.sT();
				} else {
					getresult(data).then(res => {
						if (res.code == 200) {
							let num = res.data.number
							this.jieguo = num
							if (num > 0 && num <= 14) {
								this.ishow2 = true;
							} else if (num > 14 && num <= 27) {
								this.ishow3 = true;
							} else if (num > 27 && num <= 37) {
								this.ishow4 = true;
							} else if (num > 37 && num <= 45) {
								this.ishow5 = true;
							}
						} else if (res.code == 401) {
							this.show1();
						}
					})
				}
			},
			// 获取手机号
			getphones() {
				let that = this;
				uni.login({
					provider: that.providerList.id,
					success: loginRes => {
						let data = {
							encryptedData: that.encryptedData,
							iv: that.iv,
							code: loginRes.code
						}
						// #ifdef MP-WEIXIN
						getphone(data).then(res => {
							if (res.code == 200) {
								uni.setStorage({
									key: 'mobile',
									data: res.data
								});
								this.getresults();
							} else if (res.code == 401) {
								this.show1()
							}
						})
						// #endif
						// #ifdef MP-BAIDU
						getBaiduPhone(data).then(res => {
							if (res.code == 200) {
								uni.setStorage({
									key: 'mobile',
									data: res.data
								});
								this.getresults();
							} else if (res.code == 401) {
								this.show1()
							}
						})
						// #endif
					}
				})
			}
		}
	}
</script>

<style>
	.div-class {
		width: 600rpx;
		height: auto;
		line-height: 40rpx;
		color: #333;
		text-align: left;
		margin: 0 auto;
		font-size: 24rpx;
		word-wrap: break-word;
		word-break: bresk-all;
		overflow: hidden;
	}

	.fen {
		color: #097bf8;
	}

	.zx {
		color: #097bf8;
		margin-right: 44rpx;
	}

	.zx1 {
		display: block;
		color: #097bf8;
	}

	.content {
		background: #097bf8;
	}

	.tj1 {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		background: rgba(0, 0, 0, 0.5)
	}

	.tj {
		width: 500rpx;
		height: 400rpx;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -250rpx;
		margin-top: -200rpx;
		background: #fff;
		border-radius: 10rpx;
	}

	.tj_info {
		width: 100%;
		height: 40rpx;
		line-height: 40rpx;
		color: #333;
		text-align: center;
		font-size: 36rpx;
		padding-top: 90rpx;
	}

	.submit1 {
		width: 200rpx;
		height: 100rpx;
		background-image: url("~@/static/images/btn1.png");
		background-size: 500rpx 100rpx;
		background-position: center center;
		font-size: 32rpx;
		color: #fff;
		text-align: center;
		line-height: 100rpx;
		margin-top: 90rpx;
		margin-left: 46rpx;
		float: left;
	}

	.submit2 {
		width: 200rpx;
		height: 100rpx;
		background-image: url("~@/static/images/btn1.png");
		background-size: 500rpx 100rpx;
		background-position: center center;
		font-size: 32rpx;
		color: #fff;
		text-align: center;
		line-height: 100rpx;
		margin-top: 90rpx;
		/* margin-left:46rpx; */
		float: left;
	}

	official-account {
		width: 500rpx;
		height: 100rpx;
		display: block;
	}

	.content1 {
		width: 750rpx;
		height: auto;
		background-image: url("http://cacheimg.kuakao.com/kuakaoVip/2020-6-8xcx/images/bg6.png");
		background-size: 100% 500rpx;
		background-repeat: no-repeat;
		background-position: center top;
		padding-top: 246rpx;
	}

	.test {
		width: 700rpx;
		min-height: 1123rpx;
		margin: 0 auto;
		background: #fff;
		border-radius: 10rpx;
		padding-bottom: 40rpx;
	}

	radio {
		transform: scale(0.7);
		margin-top: 7rpx;
	}

	.test_opt {
		width: 640rpx;
		height: auto;
		margin: 0 auto;
		line-height: 40rpx;
		font-size: 28rpx;
		color: #000;
		text-align: left;
		padding-top: 50rpx;
	}

	.test_op {
		width: 640rpx;
		height: auto;
		margin: 0 auto;
		line-height: 40rpx;
		font-size: 28rpx;
		color: #000;
		text-align: left;
		padding-top: 50rpx;
		background: #fdf8ea;
		padding: 10rpx 0rpx;
		margin-top: 40rpx;
		margin-bottom: 40rpx;
	}

	.uni-padding-wrap {
		display: flex;
	}

	.raimg {
		display: block;
		width: 40rpx;
		height: 40rpx;
		float: left;
		margin-left: 100rpx;
	}

	.raName {
		display: block;
		width: 505rpx;
		height: auto;
		line-height: 60rpx;
		float: left;
		margin-left: 26rpx;
		font-size: 26rpx;
		text-align: left;
		color: #000;
	}

	.tijiao {
		width: 500rpx;
		height: 100rpx;
		background-image: url("~@/static/images/btn2.png");
		background-size: 500rpx 100rpx;
		background-position: center center;
		font-size: 32rpx;
		color: #fff;
		text-align: center;
		line-height: 100rpx;
		margin: 30rpx auto;
		/* position:absolute;
		top:770rpx;
		left:50%;
		margin-left:-250rpx; */
	}

	.uni-input {
		width: 620rpx;
		height: 50rpx;
		line-height: 50rpx;
		color: #333;
		text-align: left;
		font-size: 24rpx;
		border: 1rpx solid #999;
		border-radius: 8rpx;
	}

	.jieguo {
		width: 620rpx;
		height: auto;
		line-height: 50rpx;
		color: #333;
		text-align: left;
		font-size: 24rpx;
		margin: 0 auto;
		/* border:1rpx solid #999; */
		/* border-radius:8rpx; */
	}
</style>