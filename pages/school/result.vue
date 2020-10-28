<template>
	<view class="body">
		<!-- 折线Line纯数字-->
		<!-- <view class="line1"> -->
		<view class="line" :class="ismk2==true?'mk2':'mk1'">
			<view class="sn">{{school_name}}</view>
			<view class="yn">{{yuanxi_name}}</view>
			<view class="nm">{{name}}</view>
			<view class="line-chart">
				<line-chart ref="lineData2" canvasId="index_line_2" :dataAs="lineData2" />
			</view>
			
			<!-- <view style="text-align: center;line-height: 40rpx;">折线LineChart Number</view> -->
			<view class="line_info">
				从{{name}}近年考研人数和分数线的相关整体变化趋势看，考研难度逐渐增大，2021考研人数会显著攀升，跨考考研为了能让你从众多考生中脱颖而出，安排经验丰富的咨询老师为你量身定制复习方案，{{school_name}}{{name}}研究生高分学长/学姐的一对一指导.
			</view>
			<view class="huoqu" @click="getsrc()">获取备考方案</view>
		</view>
		<!-- </view> -->

		<!-- 数据 -->
		<view class="info" :class="ismk2==true?'mk2':'mk1'">
			<view class="info_opt info_opt1">招生人数</view>
			<view class="info_con">
				2020年招生人数：{{zsrs}}人
			</view>
			<view class="info_opt">考试科目</view>
			<view class="cskm">
				<text>{{cskm}}\n{{cskm_2}}\n{{cskm_3}}\n{{cskm_4}}</text>
			</view>
			<view class="info_opt">研究方向</view>
			<view class="info_con1" :class="ishow==true?'zk':''">
				{{yjfx}}
			</view>
			<view @click="more()" :class="ismore==true?'mr':''" class="open">更多</view>
			<view class="info_opt">就业前景</view>
			<view class="info_con1" :class="ishow1==true?'zk1':''">
				<text>{{jyqj}}</text>
			</view>
			<view @click="more1()" :class="ismore1==true?'mr1':''" class="open">更多</view>
			<view class="info_opt">备注</view>
			<view class="info_con1" :class="ishow2==true?'zk1':''">
				<text>{{bz}}</text>
			</view>
			<view @click="more2()" :class="ismore2==true?'mr1':''" class="open">更多</view>
		</view>
		<!-- 无数据 -->
		<view class="no_info" :class="ismk==true?'mk1':'mk2'">
			<view class="no-info">{{no_info}}</view>
		</view>
	</view>
</template>

<script>
	import LineChart from '@/components/stan-ucharts/LineChart.vue';
	import {
		getindex
	} from '@/request/api.js';

	export default {
		name: 'Index',
		components: {
			LineChart,
		},
		data() {
			return {
				ishow: false,
				ismore: false,
				ishow1: false,
				ismore1: false,
				ishow2: false,
				ismore2: false,
				ismk: false,
				ismk2: false,
				bannerlist: [],
				school_name: '',
				yuanxi_name: '',
				name: '',
				cskm: '',
				cskm_2: '',
				cskm_3: '',
				cskm_4: '',
				zsrs: '',
				jyqj: '',
				yjfx: '',
				bz: '',
				lineData2: {
					//数字的图--折线图数据
					// categories: ['2016', '2017', '2018', '2019', '2020'],
					// series: [{
					// 	name: '分数',
					// 	data: [310, 315, 333, 315, 340]
					// }],
					categories: [],
					series: [{
						name: '分数',
						data: []
					}]
				},
				no_info: '',
				current: 0
			};
		},
		onLoad(options) {
			let data = {
				menlei: options.menlei,
				type: options.type,
				yjxk: options.yjxk,
				major: options.major,
				school: options.school
			}
			getindex(data).then(res => {
				if (res.code == 200) {
					if (res.data != "暂无数据！" && res.data.score != "") {
						this.school_name = res.data.base.school_name;
						this.yuanxi_name = res.data.base.yuanxi_name;
						this.name = res.data.base.name;
						this.cskm = res.data.base.cskm;
						this.cskm_2 = res.data.base.cskm_2;
						this.cskm_3 = res.data.base.cskm_3;
						this.cskm_4 = res.data.base.cskm_4;
						if (res.data.base.zsrs == "null") {
							this.zsrs = "";
						} else {
							this.zsrs = res.data.base.zsrs;
						}
						this.yjfx = res.data.base.yjfx;
						this.jyqj = res.data.base.jyqj;
						this.bz = res.data.base.bz;
						//没有内容不显示更多按钮
						if(!res.data.base.yjfx) {
							this.ismore = true;
							this.ishow = true;
							this.yjfx = '暂无研究方向';
						}
						if(!res.data.base.jyqj) {
							this.ismore1 = true;
							this.ishow1 = true;
							this.jyqj = '暂无就业前景';
						}
						if(!res.data.base.bz) {
							this.ismore2 = true;
							this.ishow2 = true;
							this.bz = '暂无备注';
						}

						// 折线图
						var ml = res.data.score;
						// var arr1=[266]
						var arr = new Array();
						var arr1 = new Array();
						for (var i in ml) {
							var oldStr = ml[i].zongfen;
							var newStr = parseInt(ml[i].zongfen);
							arr.push(ml[i].year);
							arr1.push(newStr);

						}
						console.log(arr1)
						var categories = arr;
						var series = [{
							name: '分数线',
							data: arr1
						}];
						this.$set(this.lineData2, 'categories', categories);
						this.$set(this.lineData2, 'series', series);
						// this.$refs['lineData2'].showCharts();
						this.$refs['lineData2'].changeData({
							series,
							categories
						});
						console.log(this.lineData2.categories)
						console.log(this.lineData2.series[0].data)
					} else {
						console.log(res.data)
						var ts = ["扎心了老铁，你的选择超出了我的更新速度，运营小姐姐在哭泣", "厉害了我的小伙伴！你的查询居然超出了我的更新速度，决定扣程序员小哥哥的鸡腿了！",
							"老哥，稳得一波啊~查点我已经更新的吧！或者加我的微信小助手为你专项寻找吧！（v：kkedu2018）", "难道本仙女法力减退了，居然没查到你要的信息，加我的微信小助手为你专项寻找吧！（v：kkedu2018）"
						]
						var ts1 = ts[Math.floor(Math.random() * ts.length)];
						this.no_info = ts1
						this.mk();
					}
				}
			})

		},
		methods: {
			// 提示框
			sT() {
				let that = this;
				var ts = ["暂无数据！", "暂无！", "数据！"]
				var ts1 = ts[Math.floor(Math.random() * ts.length)];
				uni.showModal({
					title: '提示',
					content: ts1,
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							// that.getsrc1()
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

			},
			// 跳转客服
			getsrc() {
				uni.navigateTo({
					url: '/pages/school/kefu'
				})
			},
			// getsrc1(){
			// 	uni.navigateTo({
			// 		url:'/pages/test/index'
			// 	})
			// },
			// 更多
			more() {
				this.ishow = true;
				this.ismore = true;
			},
			more1() {
				this.ishow1 = true;
				this.ismore1 = true;
			},
			more2() {
				this.ishow2 = true;
				this.ismore2 = true;
			},
			// 无数据
			mk() {
				this.ismk2 = true;
				this.ismk = true;

			},
			moreShow(res) {
				if(!res) {
					
				}
			}
		},
		created() {
			this.$nextTick(() => {
				this.$refs['lineData2'].showCharts();
			});
		}
	};
</script>

<style scoped>
	.body {
		background: #097bf8;
	}

	.no_info {
		width: 750rpx;
		height: 1200rpx;
		/* background-image:url("~@/static/images/bg10.png");
		background-size:100% auto;
		background-position:center top;
		background-repeat: no-repeat; */
		/* background:#097bf8;
		padding-bottom:260rpx;
		padding-top:100rpx; */
		background-image: url('~@/static/images/bg7.png');
		background-size: 100% auto;
		background-repeat: no-repeat;
		background-position: center top;
	}

	.no-info {
		margin: 0 auto;
		font-size: 36rpx;
		text-align: center;
		color: #333;
		width: 700rpx;
		height: 500rpx;
		line-height: 40rpx;
		padding-top: 433rpx;
		/* background:#fff; */
		border-radius: 10rpx;

	}

	.arcbar {
		display: flex;
	}

	.sn {
		width: auto;
		height: 40rpx;
		line-height: 40rpx;
		color: #fff;
		text-align: left;
		font-size: 36rpx;
		float: left;
		margin-right: 30rpx;
		margin-left: 40rpx;
		margin-top: 30rpx;
	}

	.yn {
		width: auto;
		height: 40rpx;
		line-height: 40rpx;
		color: #fff;
		text-align: left;
		font-size: 36rpx;
		float: left;
		margin-top: 30rpx;
	}

	.nm {
		width: 400rpx;
		height: 40rpx;
		line-height: 40rpx;
		color: #fff;
		text-align: left;
		font-size: 30rpx;
		float: left;
		margin-left: 40rpx;
		margin-top: 14rpx;
	}

	line-chart {
		width: 600rpx;
		height: 400rpx;
		/* margin: 0 auto;
		position: absolute;
		top: 160rpx;
		left: 80rpx; */
	}
	.line-chart {
		padding-top: 160rpx;
		padding-left: 80rpx;
	}

	.line {
		width: 750rpx;
		height: 905rpx;
		background-image: url("~@/static/images/bg10.png");
		background-size: 100% auto;
		background-position: center top;
		background-repeat: no-repeat;
		position: relative;
	}

	.info {
		/* display:flex; */
		width: 719rpx;
		height: auto;
		padding-bottom: 60rpx;
		/* min-height:1070rpx; */
		margin: 0 auto;
		background-image: url('~@/static/images/bg3.png');
		background-size: 100% 100%;
		background-position: center center;
	}

	.info .info_opt {
		width: 570rpx;
		height: 50rpx;
		line-height: 50rpx;
		text-align: left;
		margin: 0 auto;
		font-size: 26rpx;
		color: #000;
		padding-top: 10rpx;
	}

	.info .info_opt1 {
		padding-top: 50rpx;
	}

	.info .info_con {
		width: 570rpx;
		/* 	max-height:160rpx; */
		height: auto;
		overflow: hidden;
		line-height: 40rpx;
		text-align: left;
		margin: 0 auto;
		font-size: 26rpx;
		color: #888;
	}

	.info_con1 {
		width: 570rpx;
		/* 	max-height:160rpx; */
		height: 160rpx;
		overflow: hidden;
		line-height: 40rpx;
		text-align: left;
		margin: 0 auto;
		font-size: 26rpx;
		color: #888;
	}

	.cskm {
		width: 570rpx;
		/* 	max-height:160rpx; */
		height: auto;
		overflow: hidden;
		line-height: 40rpx;
		text-align: left;
		margin: 0 auto;
		font-size: 26rpx;
		color: #888;
	}

	.line_info {
		width: 560rpx;
		height: auto;
		line-height: 40rpx;
		color: #000;
		font-size: 24rpx;
		text-align: left;
		margin: 0 auto;
		position: absolute;
		top: 525rpx;
		left: 50%;
		margin-left: -280rpx;

	}

	.huoqu {
		width: 500rpx;
		height: 100rpx;
		background-image: url("~@/static/images/btn2.png");
		background-size: 500rpx 100rpx;
		background-position: center center;
		font-size: 32rpx;
		color: #fff;
		text-align: center;
		line-height: 100rpx;
		position: absolute;
		top: 770rpx;
		left: 50%;
		margin-left: -250rpx;
	}

	.zk {
		overflow: auto !important;
		height: auto !important;
	}

	.zk1 {
		overflow: auto !important;
		height: auto !important;
	}

	.mr {
		display: none;
	}

	.mr1 {
		display: none;
	}

	.mr {
		display: none;
	}

	.mk1 {
		display: block;
	}

	.mk2 {
		display: none;
	}

	.open {
		width: 100%;
		height: 40rpx;
		line-height: 40rpx;
		color: #287dfe;
		font-size: 26rpx;
		text-align: center;

	}
	.official-account {
		position: fixed;
		bottom: 0;
	}
</style>