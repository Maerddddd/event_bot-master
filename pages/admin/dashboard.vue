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
        <v-col>
          <div>
            <zaza v-if = "!!chart_data" :data= "chart_data" />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CardBox from "~/components/CardBox";
import zaza from "~/pages/admin/chart";

export default {
  components: {
    CardBox,
    zaza
  },
  data() {
    return {
      member_data: [],
      event_data: [],
    };
  },
   async created () {
      await this.initialize()
    },

    methods: {
      async initialize () {
        
        let members = await this.$axios.get(`https://event-bot-628b6-default-rtdb.firebaseio.com/members.json`)
        let events = await this.$axios.get(`https://event-bot-628b6-default-rtdb.firebaseio.com/events.json`)
        this.member_data =  Object.entries(members.data).map(([key,value]) => ({id: key , ...value }))
        this.event_data =  Object.entries(events.data).map(([key,value]) => ({id: key , ...value }))
        this.chart_data = Object.fromEntries(this.event_data.map(e => {
          return [e.title,e.members?.length || 0]
        }));
        // console.log(this.chart_data);

      },
    },
    
};
</script>

<style></style>