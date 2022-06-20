<template>
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
      default: 300
    },
    height: {
      type: Number,
      default: 100
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
    }
  },
  data() {
    return {
      chartData: {
        labels: [ 'January', 'February', 'March', '1', '2', '3' ],
        datasets: [ { data: [40, 20, 12 , 12, 12, 12, 12] } ]
      },
      chartOptions: {
        responsive: true
      }
    }
  },

  async created () {
      await this.initialize()
    },

  methods: {
      async initialize () {

        let events = await this.$axios.get("https://event-bot-628b6-default-rtdb.firebaseio.com/events.json")
        let select_events = await this.$axios.get("https://event-bot-628b6-default-rtdb.firebaseio.com/select_events.json")
        let members = await this.$axios.get("https://event-bot-628b6-default-rtdb.firebaseio.com/members.json")
        const entries_select_event = Object.entries(select_events.data).map(([userId, userValue]) => ({id : userId, ...userValue }))
        const entries_events =  Object.entries(events.data).map(([eventId, eventValue]) => ({id : eventId, ...eventValue }))
        const entries_members = Object.entries(members.data).map(([memberId, membersValue]) => ({id : memberId, ...membersValue }))
        
        this.event_data = entries_events.map(e => {
            return {
                ...e,
                members : entries_select_event
                .filter(se =>  e.id in se)
                .map(se => ({...entries_members.find(e => e.id == se.id) , time_stamp: se[e.id].time_stamp , }))
                
            }
        })

      },
  }
}
</script>