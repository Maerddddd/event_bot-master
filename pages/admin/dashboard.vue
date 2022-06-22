<template>
  <div>
    <v-container grid-list-xs fluid>
      <v-row>
        <v-col cols="2">
          <card-box
            title="Members"
            :fileCount="Object.keys(member_data).length"
            color="white"
            icon="mdi-account-multiple"
            flat
          ></card-box>
        </v-col>
        <v-col cols="2">
          <card-box
            title="Events"
            :fileCount="Object.keys(event_data).length"
            color="white"
            flat
            icon="mdi-alpha-e-box"
          ></card-box>
        </v-col>
      </v-row>

      <v-row>

        <v-col cols="8">
          <v-card elevation="0" class="pa-5">
            <BarChart v-if = "loaded" :data= "chart_data" />
          </v-card>
        </v-col>

        <v-col cols="4">
          <v-card elevation="0"
           class="pa-5">
            <CardData 
              v-for="(items,n) in cardData"
              :key="n"
              :data= "items"
            />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CardBox from "~/components/CardBox";
import CardData from "~/components/CardData";
import BarChart from "~/pages/admin/chart";

export default {
  components: {
    CardBox,
    CardData,
    BarChart,
  },
  data() {
    return {
      loaded: false,
      member_data: [],
      event_data: [],
      chart_data: null,
      cardData: [],
    };
  },
    async mounted () {
      this.loaded = false

      try {
        this.loaded = false
          let members = await this.$axios.get(`https://event-bot-628b6-default-rtdb.firebaseio.com/members.json`)
          let events = await this.$axios.get(`https://event-bot-628b6-default-rtdb.firebaseio.com/events.json`)
          this.member_data =  Object.entries(members.data).map(([key,value]) => ({id: key , ...value }))
          this.event_data =  Object.entries(events.data).map(([key,value]) => ({id: key , ...value }))
          this.chart_data = Object.fromEntries(this.event_data.map(e => {
            
            let count = 0
            if (e.member!= null) {
              Object.entries(e.member).forEach( element => count++)
            }
            this.cardData.push({title: e.title , count: count})
            return [e.title,count]
            
          }));
        // console.log(this.chart_data);
        this.loaded = true
      } catch (e) {
        console.error(e)
      }
      }
    
};
</script>
