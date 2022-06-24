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
        //Object.keys(this.data)
        datasets: [ 
          {
          label: 'Male',
          data: Object.values(this.data).map(element =>{return element[0] }),
          //Object.values(this.data[0]),
          backgroundColor: '#83C4F3',
          },
          {
          label: 'Female',
          data: Object.values(this.data).map(element =>{return element[1] }),
          //Object.values(this.data)[1]
          backgroundColor: '#B0C2D7',
          },
          ]
      },
      chartOptions: {
        // responsive: true,
        // legend: {
        //   display: false,
        // },
        // title: {
        //   display: true,
        //   text: "eiei",
        //   fontSize: 20,
        //   fontColor: "#6b7280",
        // },
        // tooltips: {
        //   backgroundColor: "#17BF62",
        // },
        scales: {
          // xAxes: [
          //   {
          //     gridLines: {
          //       display: true,
          //     },
          //   },
          // ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                min: 0,
                stepSize: 1,
              },
              // gridLines: {
              //   display: true,
              // },
            },
          ],
        },
      },
    }
  }
}
</script>


