import Vue from 'vue'
import App from './App.vue'
import ResizeSensor from 'css-element-queries/src/ResizeSensor'
import * as VueGoogleMaps from 'vue2-google-maps'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/style.scss'
import 'vue2-animate/dist/vue2-animate.min.css'
// import './assets/font-awesome.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fab);
Vue.component('font-awesome-icon', FontAwesomeIcon)

window.ResizeSensor = ResizeSensor

Vue.config.productionTip = false
Vue.use(VueGoogleMaps, {
	load: {
		key: 'AIzaSyCkXI6aEAaNQZUGDLORJ-vvA2SWYQ_eIew',
		libraries: 'places,drawing,visualization', // This is required if you use the Autocomplete plugin
		// OR: libraries: 'places,drawing'
		// OR: libraries: 'places,drawing,visualization'
		// (as you require)

		//// If you want to set the version, you can do so:
		// v: '3.26',
	},

	//// If you intend to programmatically custom event listener code
	//// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
	//// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
	//// you might need to turn this on.
	// autobindAllEvents: false,

	//// If you want to manually install components, e.g.
	//// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
	//// Vue.component('GmapMarker', GmapMarker)
	//// then disable the following:
	// installComponents: true,
})

new Vue({
	render: h => h(App),
}).$mount('#app')