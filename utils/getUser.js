import {getlogin} from '@/request/api.js'

/**
 * 获取微信用户信息
 */
export function getWeixin() {
	uni.login({
		provider: 'weixin',
		success: function(loginRes) {
			// 获取用户信息
			uni.getUserInfo({
				provider: 'weixin',
				success: function(infoRes) {
					// 接口data写进来
					let data = {
						signature: infoRes.signature,
						encryptedData: infoRes.encryptedData,
						rawData: infoRes.rawData,
						iv: infoRes.iv,
						code: loginRes.code
					}
					getlogin(data).then(res => {
						if (res.code == 200) {
							// 返回的用户表识存起来
							uni.setStorage({
								key: 'access_token',
								data: res.data.access_token
							});
							uni.setStorage({
								key: 'mobile',
								data: res.data.member.mobile
							});
						}
					})
				}
			});
		}
	});
}