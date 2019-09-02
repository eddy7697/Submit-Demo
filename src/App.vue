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
							<li><a href="#">成本計算工具</a></li>
							<li><a href="#">聯絡諮詢</a></li>
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
			<GmapMap
				:center="center"
				:zoom="16"
				map-type-id="terrain"
				id="map" 
				:class="{'show-panel': step == 2}">
				<GmapMarker
					:position="{lat:25.0627207, lng:121.5248709}"
					:clickable="true"
					:draggable="false"
					@click="testAc"
				/>
			</GmapMap>

			<transition
				name="fadeIn"
				enter-active-class="fadeInDown"
				leave-active-class="fadeOutUp">
				<div class="fit-box" v-if="step == 1">
					<transition
						name="fadeIn"
						enter-active-class="fadeIn"
						leave-active-class="fadeOut">
						<div id="bg-mask" v-if="infoPanelVisible"></div>
					</transition>
								
					<transition
						name="fadeIn"
						enter-active-class="fadeInDown"
						leave-active-class="fadeOutUp">
						<InfoForm v-if="infoPanelVisible" v-on:goStep="goStep($event)"/>
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
			<transition
				name="fadeIn"
				enter-active-class="fadeInLeft"
				leave-active-class="fadeOutRight">
				<ConditionPanel v-if="step == 2" />
			</transition>
			
			

		</section>
		<section id="site-footer">
			<div class="container-fluid">
				<div class="row">
					<div class="col-md-2" />
					<div class="col-md-8 copyright">
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
	import InfoForm from './components/InfoForm.vue'
	import ConditionPanel from './components/ConditionPanel.vue'
	import $ from 'jquery'
	import ResizeSensor from 'css-element-queries/src/ResizeSensor'

	export default {
		name: 'app',
		components: {
			InfoForm, ConditionPanel
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
			return {
				infoPanelVisible: false,
				step: 1,
				windowHeight: 0,
				headerHeight: 0,
				footerHeight: 0,
				center: { lat:25.0627207, lng:121.5248709 }
			}
		},
		created() {
			this.$nextTick(() => {
				this.initMap()

				setTimeout(() => {
					this.infoPanelVisible = false
				}, 1000);
			})
		},
		computed: {
			contentHeight() {
				let height = this.windowHeight - this.headerHeight - this.footerHeight - 16

				return `height: ${height}px;`
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
				this.step = step
			},
			testAc() {
			}
		}
	}
</script>

<style>
	
</style>