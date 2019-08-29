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
				id="map" >
				<GmapMarker
					:position="{lat:25.0627207, lng:121.5248709}"
					:clickable="true"
					:draggable="false"
					@click="testAc"
				/>
			</GmapMap>
			<!-- <div id="map" ref="map">

			</div> -->
			<HelloWorld msg="Welcome to Your Vue.js App" />
		</section>
		<section id="site-footer">
			<div class="container-fluid">
				<div class="row">
					<div class="col-md-2">

					</div>
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
	import HelloWorld from './components/HelloWorld.vue'
	import $ from 'jquery'
	import ResizeSensor from 'css-element-queries/src/ResizeSensor'

	export default {
		name: 'app',
		components: {
			HelloWorld
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
				windowHeight: 0,
				headerHeight: 0,
				footerHeight: 0,
				center: { lat:10, lng:10 }
			}
		},
		created() {
			this.$nextTick(() => {
				this.initMap()
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
			testAc() {
				console.log(arguments)
			}
		}
	}
</script>

<style>
	
</style>