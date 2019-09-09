<template>
	<div id="app">
		<section id="site-header">
			<div class="container">
				<div class="row">
					<div class="col-md-3">
						<div class="header-logo">
							<img src="./assets/logo-white.png" alt="">
						</div>
					</div>
					<div class="col-md-9 header-right-side">
						<ul class="header-menu">
							<li><a href="#">重製資料</a></li>
							<li><a href="#" @click="caculatorVisiable = !caculatorVisiable">成本計算工具</a></li>
							<li><a href="#" @click="getPosition">聯絡諮詢</a></li>
						</ul>
						<div class="user-info-bar">
							<img src="./assets/celia.png" width="50" alt="">
							<div class="user-identity">
								思想科技有限公司 / 資料工程師
								<br>
								celia.chen@dev.hkmci.com.tw
							</div>
							<a href="#">登出</a>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section id="site-content" :style="contentHeight">
			<GmapMap :center="center" :zoom="zoomLevel" map-type-id="terrain" id="map" ref="mapRef" :clickable="false"
				:class="{'show-panel': step == 2}">
				<gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen"
					@closeclick="infoWinOpen=false" />
				<GmapMarker v-for="(item, index) in predictedPosition" :key="index"
					:position="{lat: item.lat, lng: item.lng}" :clickable="true" :draggable="false"
					@click="showDetail(item, index)" />
			</GmapMap>

			<transition name="fadeIn" enter-active-class="fadeInDown" leave-active-class="fadeOutUp">
				<div class="fit-box" v-if="step == 1">
					<transition name="fadeIn" enter-active-class="fadeIn" leave-active-class="fadeOut">
						<div id="bg-mask" v-if="infoPanelVisible"></div>
					</transition>

					<transition name="fadeIn" enter-active-class="fadeInDown" leave-active-class="fadeOutUp">
						<InfoForm v-if="infoPanelVisible" v-on:goStep="goStep($event)" />
					</transition>

					<div id="methods-bar">
						<div class="container">
							<div class="row">
								<div class="col-md-12">
									<button class="open-form-btn" @click="infoPanelVisible = !infoPanelVisible">
										<i class="fa fa-sort-asc" aria-hidden="true" v-if="infoPanelVisible"></i>
										<i class="fa fa-sort-desc" aria-hidden="true" v-else></i>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>

			</transition>
			<transition name="fadeIn" enter-active-class="fadeInLeft" leave-active-class="fadeOutRight">
				<ConditionPanel 
					v-if="step == 2" 
					@clearPosition="chosenPosition = null"
					@changeTurnover="changeTurnover($event)" 
					v-on:goStep="goStep($event)"
					:isLoading='isLoading'
					:chosenPosition="chosenPosition"/>
			</transition>

			<transition name="fadeIn" enter-active-class="fadeInDown" leave-active-class="fadeOutUp">
				<CostCaculator 
					:chosenPosition="chosenPosition" 
					:turnover="turnover"
					v-if="caculatorVisiable && chosenPosition != null && step == 2" 
					@toggleVisiable="caculatorVisiable = $event"/>
			</transition>

			<transition name="fadeIn" enter-active-class="fadeIn" leave-active-class="fadeOut">
				<ResultPanel v-if="step == 3" v-on:goStep="goStep($event)"/>
			</transition>
			
			<div class="loading-mask fit-box" v-if="isLoading">
				<div style="width: 200px; text-align: center">
					<img style="width: 200px;" src="./assets/logo2.png" alt="">
					<br>
					<img style="width: 75px" src="./assets/loading-bar.svg" alt="">
				</div>
			</div>
		</section>
		<section id="site-footer">
			<div class="container-fluid">
				<div class="row">
					<div class="col-md-2" />
					<div class="col-md-8 copyright" @click="parseData">
						<img src="./assets/com-logo.png" height="24" alt="">
						&nbsp;Copyright &#9400; Master Concept Technology. BHD. Taiwan Branch all right reserved.
					</div>
					<div class="col-md-2 version">
						v 1.23.01 Beta
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
	import dummyData from './dummy/data.js'
	import InfoForm from './components/InfoForm.vue'
	import ConditionPanel from './components/ConditionPanel.vue'
	import CostCaculator from './components/CostCaculator'
	import ResultPanel from './components/ResultPanel'
	import $ from 'jquery'
	import ResizeSensor from 'css-element-queries/src/ResizeSensor'
	import axios from 'axios'
	import _ from 'lodash'

	export default {
		name: 'app',
		components: {
			InfoForm,
			ConditionPanel,
			CostCaculator,
			ResultPanel
		},
		mounted() {
			new ResizeSensor($('#site-header'), () => {
				this.headerHeight = $('#site-header').height()
			})
			new ResizeSensor($('#site-footer'), () => {
				this.footerHeight = $('#site-footer').height()
			})
			new ResizeSensor($('#app'), () => {
				this.windowHeight = $(window).height()
			})
		},
		data() {
			let allLocation = dummyData.data()
			return {
				isLoading: true,
				infoWinOpen: false,
				infoWindowPos: null,
				caculatorVisiable: true,
				infoOptions: {
					content: '',
					//optional: offset infowindow so it visually sits nicely on top of our marker
					pixelOffset: {
						width: 0,
						height: -35
					}
				},
				infoPanelVisible: false,
				step: 1,
				zoomLevel: 16,
				turnover: 10000,
				windowHeight: 0,
				headerHeight: 0,
				footerHeight: 0,
				center: {
					lat: 25.0627207,
					lng: 121.5248709
				},
				allLocation: allLocation,
                chosenPosition: null
			}
		},
		created() {
			this.$nextTick(() => {
				this.initMap()

				setTimeout(() => {
					this.isLoading = false
					this.infoPanelVisible = false
				}, 1000);
			})
		},
		computed: {
			contentHeight() {
				let height = this.windowHeight - this.headerHeight - this.footerHeight - 16

				return `height: ${height}px;`
			},
			predictedPosition() {
				let filted = this.allLocation.map(elm => {
					if (elm.predRev >= this.turnover) {
						return elm
					}
				})

				if (this.step == 2) {
					return _.compact(filted)
				}
				return []
			}
		},
		methods: {
			initMap() {
				let self = this
				navigator.geolocation.getCurrentPosition(position => {
					self.center = {
						lat: position.coords.latitude,
						lng: position.coords.longitude
					}
				});
			},
			goStep(step) {
				this.isLoading = true

				setTimeout(() => {
					this.isLoading = false
					this.step = step	
				}, Math.random() * 1000 + 500)
			},
			getPosition() {
				let allData = dummyData.data()

				allData.forEach(elm => {
					let post_id = elm.link.replace('https://rent.591.com.tw/rent-detail-', '').replace('.html', '')
					axios.get(`http://localhost:3000/users?id=${post_id}`)
						.then(res => {
							this.allLocation.push({
								link: elm.link,
								label: elm.label,
								monthlyRent: elm.monthlyRent,
								predRev: elm.predRev,
								where: elm.where,
								lat: res.data.lat,
								lng: res.data.lng
							})
						})
				});
			},
			changeTurnover(turnover) {
				this.turnover = turnover
			},
			parseData() {
				localStorage.setItem('allPosition', JSON.stringify(this.allLocation))
			},
			showDetail() {
				let arg = arguments[0],
					lat = arg.lat,
					lng = arg.lng

				this.zoomLevel = 16
				this.$refs.mapRef.$mapPromise.then((map) => {
					map.panTo({
						lat: lat,
						lng: lng
					})
					this.zoomLevel = 18

					this.infoWindowPos = {
						lat: lat,
						lng: lng
					}
					this.infoOptions.content = `
						<h2>${arg.label}</h2>
						<hr>
						<table>
							<tr>
								<td>租屋地點</td>
								<td>${arg.where}</td>
							</tr>
							<tr>
								<td>物件連結</td>
								<td><a target="_blank" href="${arg.link}">${arg.link}</a></td>
							</tr>
							<tr>
								<td>租金</td>
								<td>${arg.monthlyRent}</td>
							</tr>
							<tr>
								<td>預計營業額</td>
								<td>${arg.predRev}</td>
							</tr>
							<tr>
								<td colspan="2">
									<a target="_blank" href="http://maps.google.com/maps?q=&layer=c&cbll=${lat},${lng}&cbp=11,0,0,0,0" class="street-view-btn">點我看街景</a>
								</td>

							</tr>
						</table>
						<button id="save-position" position-id="${arguments[1]}">
							儲存<br>地點
						</button>
						`

					this.infoWinOpen = true;
					
					this.$nextTick(() => {
						$('#save-position').on('click', () => {
							this.selectPosition(arg)
						})
					})
				})
			},
			selectPosition(item) {
				this.chosenPosition = item
			},
			testAc() {}
		}
	}
</script>

<style lang="scss">
.loading-mask {
	background-color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 909;
}
.gm-style-iw {
	padding-bottom: 10px !important;

	.gm-ui-hover-effect {
		top: 0px !important;
		right: 50px !important;
	}
	.gm-style-iw-d {
		padding-right: 60px !important;
		overflow: initial !important;

		h2 {
			color: #127a85;
			font-size: 16px;
			font-weight: 900;
		}

		#save-position {
			position: absolute;
			top: -12px;
			right: -60px;
			bottom: -12px;
			width: 50px;
			background-color: #127a85;
			color: white;
			border: none;
		}

		hr {
			margin: 10px 0;
		}

		table {
			tr {
				td {
					padding: 5px 7px 5px 0;

					a.street-view-btn {
						padding: 5px 10px;
						color: white;
						background-color: #127a85;
					}
				}
			}
		}
	}
}
</style>