<template>
	<view>
		<view class="top-box":style="{'padding-top':bl+'px'}">
			<view class="text-top">
				<navigator open-type="navigateBack"><image src="../../static/images/top1.png"></image></navigator>
				<text>完善信息</text>
			</view>
		</view>
		<view class="content">
			<view class="cont-form">
				<form>
					<input type="text" placeholder="请输入手机号" placeholder-class="cont-input-pl" v-model="formValue.contPhone" maxlength="11"/>
					<input type="text" placeholder="请输入验证码" placeholder-class="cont-input-pl" maxlength="6" v-model="formValue.yzm"/>
					<button class="cont-button" type="default" @click="contButton($event)" :disabled="buttonFlag" :style="{'opacity':buttonFlag ? '0.5':'1'}">{{contButtonT}}</button>
					<view class="clear"></view>
					<radio-group class="danx" @change="radioChange">
						<label class="redio"><radio value="学生" checked="true"/>学生</label>
						<label class="redio"><radio value="教师" />教师</label>
					</radio-group>
				<view class="form-bottom">
					<view>
						<input type="text" placeholder="*姓 名"  v-model="formValue.name"/>
					</view>
					<view>
						<input type="text" placeholder="*目标院校" v-model="formValue.targetSc"/>
						<input type="text" placeholder="在读院校" v-model="formValue.zdyx"/>
					</view>
					<view>
						<input type="text" placeholder="*目标专业" v-model="formValue.targetMajor" />
						<input type="text" placeholder="在读专业" v-model="formValue.zdzy" />
					</view>
				</view>
				<button hover-class="buttonActive" @click="sunbmit">提交</button>
				</form>
			</view>
		</view>
	</view>
</template>

<script>
	import {fsYzm,perfect} from '@/request/api.js';
	export default{
		data(){
			return {
				contButtonT:"获取验证码",
				buttonFlag:false,
				formValue:{contPhone:"",status:"学生",name:"",targetSc:"",zdyx:"",targetMajor:"",zdzy:"",yzm:""},
				bl:""
			}
		},
		onLoad(){
			this.bl=getApp().globalData.gloTop;
		},
		methods:{
			ts(text){
				uni.showToast({
				    title: text,
				    duration: 2000,
					image:"../../static/images/error1.png"
				});
			},
			sunbmit(){
				let that=this;
				if(!that.formValue.contPhone){this.ts("请填写手机号");return false;};
				if(!that.formValue.yzm){this.ts("请填写验证码");return false;};
				if(!that.formValue.name){this.ts("请填写姓名");return false;};
				if(!that.formValue.targetSc){this.ts("请填写目标院校");return false;};
				if(!that.formValue.targetMajor){this.ts("请填写目标专业");return false;};
				console.log(this.formValue);
				perfect({
					mobile:that.formValue.contPhone,
					realname:that.formValue.name,
					target_school:that.formValue.targetSc,
					target_major:that.formValue.targetMajor,
					stay_school:that.formValue.zdyx,
					stay_major:that.formValue.zdzy,
					code:that.formValue.yzm
				}).then(res=>{
					if(res.code=="200"){
						uni.navigateBack({
						    delta: 1
						});
					}else{
						uni.showToast({
						    title: '提交失败',
							icon:"none",
						    duration: 2000
						});
					}
				})
			},
			radioChange(e){
				this.formValue.status=e.target.value;
			},
			contButton(e){
				let phone=this.formValue.contPhone;
				if(!(/^1[3456789]\d{9}$/.test(phone))){
					uni.showToast({
					    title: '手机号错误',
					    duration: 2000,
						image:"../../static/images/error1.png"
					});
					return false;
				}
				let num=60;
				fsYzm({
					mobile:phone,
					usage:"login"
					}).then(data => {//data为一个数组，数组第一项为错误信息，第二项为返回数据
						console.log(data);
						if(data.code=="200"){
						    this.buttonFlag=true;
							let time=setInterval(()=>{
							num--;
							if(num<1){
								this.contButtonT="获取验证码";
								clearInterval(time);
								this.buttonFlag=false;
								num=60;
								return false;
							}
							this.contButtonT=num;
						},1000);
						console.log(num);
					}else{
						uni.showToast({
						    title: '验证码发送失败',
						    duration: 2000,
							image:"../../static/images/error.png"
						});
					}
				   })
			}
		}
	}
</script>

<style scoped>
	*{box-sizing: border-box;}
	/* 头部 */
	.top-box{background-image: url(../../static/images/mebg.png);width: 100%;height: 420rpx;background-size: 100% 100%;overflow: hidden;position: relative;z-index: 1;}
	.top-box image{width: 24rpx;height: 40rpx;position: absolute;left: 40rpx;top: 28rpx;}
	/* 内容容器 */
	.content{width: 90%;margin-left: 5%;height: 960rpx;margin-top: -200rpx;box-shadow: -1px 2px 12px 0px #ccc;border-radius: 25rpx;background-color: white;overflow: hidden;position: relative;z-index: 8;}
	/* 表单样式 */
	.cont-form{width: 520rpx;height: 770rpx;margin: 0 auto;margin-top: 70rpx;}
	.cont-form input{border-bottom: 0rpx solid #888888;margin-top: 40rpx;padding-left:16rpx;box-sizing: border-box;height: 70rpx;}
	.cont-form input:nth-of-type(2){width: 55%;float: left;}
	.cont-input-pl{font-size: 30rpx;}
	.cont-button{width: 40%;background-color: #097bf8;height: 70rpx;line-height: 70rpx;font-size: 28rpx;color: white;float: left;margin-top: 38rpx;margin-left: 5%;transition: .3s;border-radius: 25rpx;}
	.danx{margin-top: 60rpx;font-size: 30rpx;display: flex;justify-content : space-around;}
	.danx radio{transform: scale(0.8);}
	.form-bottom view{border-bottom: 2rpx solid #888888;width: 100%;height: 60rpx;margin-top: 40rpx;}
	.form-bottom view input{margin: 0;width: 45%;float: left;}
	.cont-form button:nth-of-type(2){background-color: #287dfe;font-size: 32rpx;color: white;transition: 0.3s;margin-top: 100rpx;}
	.buttonActive{transform: scale(0.9);}
</style>
