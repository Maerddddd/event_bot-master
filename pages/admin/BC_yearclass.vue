<template>
<div>
  <Bar
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs/legacy'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 800
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Object,
      default: () => {}
    },
    data: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      chartData: {
        labels: Object.keys(this.data),
        datasets: [ 
          {
          data: Object.values(this.data).map(element =>{return element[0] }),
          label: "ชั้นปี 1",
          backgroundColor: '#F7D7D4',
          },
          {
          data: Object.values(this.data).map(element =>{return element[1] }),
          label: "ชั้นปี 2",
          backgroundColor: '#E4C2C7',
          },
          {
          data: Object.values(this.data).map(element =>{return element[2] }),
          label: "ชั้นปี 3",
          backgroundColor: '#B2A7BB',
          },
          {
          data: Object.values(this.data).map(element =>{return element[3] }),
          label: "ชั้นปี 4",
          backgroundColor: '#B0C2D7',
          },
          ]
      },
      chartOptions: {
        responsive: true
      }
    }
  }
}
</script>


