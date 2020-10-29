import {http} from '@/request/golbal.js'
//登录
export function getlogin(data) {
	return http({
		method: 'post',
		url: 'api/xcx/v1/index/login',
		data: data
	})
}
//发送验证码
export function fsYzm(data) {
	return http({
		method: 'post',
		url: 'api/xcx/v1/site/sms-code',
		data: data
	})
}
//完善信息提交
export function perfect(data) {
	return http({
		method: 'post',
		url: 'api/xcx/v1/index/info',
		data: data
	})
}
//上传图片
export function scImg(data){
	return http({
		method: 'post',
		url: 'api/xcx/v1/file/images',
		data: data
	})
	/* return new Promise((resolve, reject) => {
	const systemInfo = uni.getSystemInfoSync();
	const systemInfoHeaders = {
		'device-name': systemInfo.brand, // 设备名称
		'width': systemInfo.screenWidth, // 屏幕宽度
		'height': systemInfo.screenHeight, // 屏幕高度
		'os': systemInfo.platform, // 客户端平台
		'os-version': systemInfo.system // 操作系统版本
	};
	uni.uploadFile({
	            url: getApp().globalData.app_url+obj.url, //仅为示例，非真实的接口地址
	            filePath: obj.img,
	            name: 'file',
				header: {
					'x-api-key': getApp().globalData.member_access_token || uni.getStorageSync('access_token'),
					'merchant-id': getApp().globalData.merchant_id,
					...systemInfoHeaders
				},
				data:obj.data,
	            success: (uploadFileRes) => {
	                resolve(uploadFileRes);
	            }
		})
	}) */
}
//话题选择列表
export function xzhtProblem(data) {
	return http({
		method: 'GET',
		url: 'api/xcx/v1/wenda/topic/list',
		data: data
	})
}
//问答首页热门话题分页加载
export function wdIndex(data) {
	return http({
		method: 'GET',
		url: 'api/xcx/v1/wenda/index/hot-question',
		data: data
	})
}
//问答详情
export function wdDetail(data) {
	return http({
		method: 'GET',
		url: 'api/xcx/v1/wenda/question/detail',
		data: data
	})
}
export function loginBaidu(data) {
	return http({
		method: 'post',
		url: 'api/xcx/v1/index/login-baidu',
		data: data
	})
}
// 登录重置
export function refresh(data) {
	return http({
		method: 'post',
		url: 'v1/site/refresh',
		data: data
	})
}
// 获取院校
export function getschool(data) {
	return http({
		method: 'post',
		url: 'api/xcx/v1/info/get/school',
		data: data
	})
}
// 获取门类
export function getmenlei(data) {
	return http({
		method: 'post',
		url: 'api/xcx/v1/info/get/menlei',
		data: data
	})
}
// 获取一级学科
export function getyjxk(data) {
	return http({
		method: 'post',
		url: 'api/xcx/v1/info/get/yjxk',
		data: data
	})
}
// 获取专业
export function getmajor(data) {
	return http({
		method: 'post',
		url: 'api/xcx/v1/info/get/major',
		data: data
	})
}
// 提交结果
export function getindex(data) {
	return http({
		method: 'post',
		url: 'api/xcx/v1/info/result/index',
		data: data
	})
}
// 测试
export function gettest(data) {
	return http({
		method: 'post',
		url: 'api/xcx/v1/info/test/ti',
		data: data
	})
}
// 测试提交答案
export function getresult(data) {
	return http({
		method: 'post',
		url: 'api/xcx/v1/info/test/result',
		data: data
	})
}
// 手机号
export function getphone(data) {
	return http({
		method: 'post',
		url: 'api/xcx/v1/index/getmobile',
		data: data
	})
}
// 手机号
export function getBaiduPhone(data) {
	return http({
		method: 'post',
		url: 'api/xcx/v1/index/getmobile-baidu',
		data: data
	})
}