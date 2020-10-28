<template>
	<view class="content">

		<view>
			<web-view :webview-styles="webviewStyles" src="https://pre2.easyliao.com/live/chat.do?c=12514&g=19404&config=39287&ref=xcx"></web-view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				webviewStyles: {
					progress: {
						color: '#FF3333',
						display: 'none',
					}
				}
			}
		},
		onLoad() {

		},
		onShow() {

		},
		methods: {

		}
	}
</script>

<style>
	web-view {
		/* display:none; */
	}
</style>
