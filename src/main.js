import Vue from 'vue'
import App from './App.vue'
import ResizeSensor from 'css-element-queries/src/ResizeSensor'
import * as VueGoogleMaps from 'vue2-google-maps'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/style.scss'
// import './assets/font-awesome.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css';
import lang from 'element-ui/lib/locale/lang/zh-TW'
import locale from 'element-ui/lib/locale'  
import axios from "axios";

Vue.use(ElementUI);
locale.use(lang)

library.add(fab);
Vue.component('font-awesome-icon', FontAwesomeIcon)

window.ResizeSensor = ResizeSensor
window.axios = axios

Vue.config.productionTip = false
Vue.use(VueGoogleMaps, {
	load: {
		key: 'AIzaSyDZCVF4qKbZCvWsOY2lb67xwQ4T8kU5gNc',
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