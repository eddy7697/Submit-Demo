<script>
import { HorizontalBar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
	mixins: [reactiveProp],
	extends: HorizontalBar,
	data: () => ({
		options: {
			responsive: true,
			legend: {
				position: 'top',
			},
			title: {
				display: false,
				text: 'Chart.js Bar Chart'
			}
		}
	}),
	mounted() {
		this.renderLineChart()
	},
	methods: {
		renderLineChart() {
			this.renderChart(this.chartData, this.options)
		}
	}
}
</script>
