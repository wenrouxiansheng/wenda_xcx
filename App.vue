<script>
	export default {
		globalData: {
			app_url: 'http://test.wxxcx.kuakao.com/',/* https://wxxcx.kuakao.com/ */
			//app_url: 'http://rg.cms.com/',
			merchant_id: 1,
			member_info:'',
			member_access_token:'',
			gloTop:"",
			userInfo:""
		},
		onLaunch: function() {
			 let that=this;
			uni.getSystemInfo({
			    success: function (res) {
				   that.globalData.gloTop=res.statusBarHeight;
				   console.log(that.globalData.gloTop,"高度");
			    }
			});
			
		},
		onShow: function() {

		},
		onHide: function() {
			console.log('App Hide');
		},
		methods: {

		}
	}
</script>
<style>
	/*每个页面公共css */
	*{margin: 0rpx;padding: 0rpx;}
	.text-top{text-align: center;color: white;font-size: 36rpx;position: relative;font-weight: bold;height: 88rpx;line-height: 88rpx;}
	.clear{clear: both;}
</style>
