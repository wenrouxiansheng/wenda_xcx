export const http = (options) => {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: '加载中...'
		})
		const systemInfo = uni.getSystemInfoSync();
		const systemInfoHeaders = {
			'device-name': systemInfo.brand, // 设备名称
			'width': systemInfo.screenWidth, // 屏幕宽度
			'height': systemInfo.screenHeight, // 屏幕高度
			'os': systemInfo.platform, // 客户端平台
			'os-version': systemInfo.system // 操作系统版本
		};
		uni.request({
				method: options.method,
				url: getApp().globalData.app_url + options.url,
				data: options.data,
				header: {
					'x-api-key': getApp().globalData.member_access_token || uni.getStorageSync('access_token'),
					'merchant-id': getApp().globalData.merchant_id,
					...systemInfoHeaders
				}
			}).then(result => {
				resolve(result[1].data);
				uni.hideLoading();
			})
			.catch(result => {
				reject();
				uni.hideLoading();
			})
	}).catch((e) => {})
}