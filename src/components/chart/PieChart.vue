<script>
import { Pie, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
	mixins: [reactiveProp],
	extends: Pie,
	data: () => ({
		options: {
			responsive: true,
			legend: {
				position: 'right',
			},
		}
	}),
	mounted() {
		this.renderPieChart()
	},
	methods: {
		renderPieChart() {
			this.renderChart(this.chartData, this.options)
		}
	}
}
</script>
